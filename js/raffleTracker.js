/* ==========================================================================
   BETMADA VIP LEVEL-UP RAFFLE TRACKER — GOOGLE SHEETS POWERED
   ========================================================================== */

// ── CONFIG ──────────────────────────────────────────────────────────────────
const SHEET_ID   = '1J7wLmB0cM2g09lHnnZKGYfgEzMKmNBaqDzMoPRK8Yng';
// Tab names in your Google Sheet — must match exactly
const SHEET_TABS = {
  bronze:   'Bronze',
  silver:   'Silver',
  gold:     'Gold',
  platinum: 'Plat1',
};
const RAFFLE_MAX_SLOTS    = 15;
const RAFFLE_MAX_WINNERS  = 5;
const REFRESH_MS          = 5 * 60 * 1000; // auto-refresh every 5 minutes

// ── LEVEL DEFINITIONS ────────────────────────────────────────────────────────
const RAFFLE_LEVELS = [
  {
    id: 'bronze', name: 'Bronze', icon: '🥉',
    color: '#cd7f32', border: 'rgba(205,127,50,0.7)', glow: 'rgba(205,127,50,0.35)',
    gradient: 'linear-gradient(135deg,rgba(205,127,50,0.25) 0%,rgba(139,69,19,0.15) 100%)',
    slotFill: 'linear-gradient(135deg,#cd7f32,#8b4513)',
  },
  {
    id: 'silver', name: 'Silver', icon: '🥈',
    color: '#b0c4d8', border: 'rgba(180,200,220,0.7)', glow: 'rgba(192,192,192,0.3)',
    gradient: 'linear-gradient(135deg,rgba(192,192,192,0.2) 0%,rgba(100,120,140,0.1) 100%)',
    slotFill: 'linear-gradient(135deg,#c0c0c0,#8899aa)',
  },
  {
    id: 'gold', name: 'Gold', icon: '🥇',
    color: '#ffd700', border: 'rgba(255,215,0,0.7)', glow: 'rgba(255,215,0,0.35)',
    gradient: 'linear-gradient(135deg,rgba(255,215,0,0.2) 0%,rgba(255,140,0,0.1) 100%)',
    slotFill: 'linear-gradient(135deg,#ffd700,#ff8c00)',
  },
  {
    id: 'platinum', name: 'Platinum I', icon: '💎',
    color: '#00f0ff', border: 'rgba(0,240,255,0.7)', glow: 'rgba(0,240,255,0.35)',
    gradient: 'linear-gradient(135deg,rgba(0,240,255,0.2) 0%,rgba(0,128,255,0.1) 100%)',
    slotFill: 'linear-gradient(135deg,#00f0ff,#0080ff)',
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export class RaffleTracker {
  // In-memory store populated from Google Sheets
  static _data = { bronze: [], silver: [], gold: [], platinum: [] };

  // ── FETCH from Google Sheets gviz endpoint ──────────────────────────────
  static async fetchSheet(levelId) {
    const tab = SHEET_TABS[levelId];
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}`;
    try {
      const res  = await fetch(url);
      const text = await res.text();
      // Strip JSONP wrapper: /*O_o*/ google.visualization.Query.setResponse({...});
      const json = JSON.parse(text.substring(text.indexOf('(') + 1, text.lastIndexOf(')')));
      if (json.status !== 'ok') return [];
      return (json.table?.rows || [])
        .slice(1)  // skip header row ("USERNAME")
        .map(r => r.c?.[0]?.v?.toString().trim())
        .filter(Boolean)
        .slice(0, RAFFLE_MAX_SLOTS);
    } catch (e) {
      console.warn(`[RaffleTracker] Could not fetch "${tab}" sheet:`, e);
      return null; // null = error (keep existing data)
    }
  }

  static async fetchAll() {
    const results = await Promise.allSettled(
      RAFFLE_LEVELS.map(l => RaffleTracker.fetchSheet(l.id))
    );
    let anyUpdate = false;
    RAFFLE_LEVELS.forEach((l, i) => {
      const r = results[i];
      if (r.status === 'fulfilled' && r.value !== null) {
        RaffleTracker._data[l.id] = r.value;
        anyUpdate = true;
      }
    });
    if (anyUpdate) {
      RAFFLE_LEVELS.forEach(l => RaffleTracker.refreshCard(l.id));
    }
  }

  // ── RENDER (initial loading state) ─────────────────────────────────────
  static render() {
    const levelCards = RAFFLE_LEVELS.map(level => {
      return RaffleTracker._buildCard(level, [], true);
    }).join('');

    return `
      <section class="raffle-section section-padding" id="raffle">
        <div class="container">
          <div class="section-title-wrap" id="raffle-title-trigger">
            <div class="section-subtitle"><span>🎲 EARLY LEVEL-UP RAFFLE</span></div>
            <h2 class="section-title">VIP Level-Up Raffle Tracker</h2>
            <p class="section-description">
              The first <strong>${RAFFLE_MAX_SLOTS} players</strong> to level up at each VIP tier earn a raffle spot.
              <strong>${RAFFLE_MAX_WINNERS} raffle winners</strong> per level take the big multipliers — and all remaining 10 players still earn a <strong>0.75× level-up match</strong>!
            </p>
          </div>

          <div class="raffle-grid" id="raffle-grid">
            ${levelCards}
          </div>

          <!-- Shared Prize Breakdown -->
          <div class="raffle-prize-table glass-card">
            <div class="rpt-header">
              <span class="rpt-title">🏆 Prize Breakdown — Applies to All Levels</span>
              <span class="rpt-sub">Drawn by raffle for each VIP tier</span>
            </div>
            <div class="rpt-rows">
              <div class="rpt-row rpt-1st">
                <div class="rpt-place">🥇<span>1st</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:100%;"></div></div>
                <div class="rpt-mult">5× <span>Level-Up Match</span></div>
              </div>
              <div class="rpt-row rpt-2nd">
                <div class="rpt-place">🥈<span>2nd</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:60%;"></div></div>
                <div class="rpt-mult">3× <span>Level-Up Match</span></div>
              </div>
              <div class="rpt-row rpt-3rd">
                <div class="rpt-place">🥉<span>3rd</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:40%;"></div></div>
                <div class="rpt-mult">2× <span>Level-Up Match</span></div>
              </div>
              <div class="rpt-row rpt-4th">
                <div class="rpt-place">4️⃣<span>4th</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:40%;"></div></div>
                <div class="rpt-mult">2× <span>Level-Up Match</span></div>
              </div>
              <div class="rpt-row rpt-5th">
                <div class="rpt-place">5️⃣<span>5th</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:20%;"></div></div>
                <div class="rpt-mult">1× <span>Level-Up Match</span></div>
              </div>
              <div class="rpt-row rpt-rest">
                <div class="rpt-place">🎁<span>6th–15th</span></div>
                <div class="rpt-bar-wrap"><div class="rpt-bar" style="width:15%;"></div></div>
                <div class="rpt-mult">0.75× <span>Level-Up Match</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        /* ===================== GRID ===================== */
        .raffle-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        /* ===================== CARD ===================== */
        .raffle-card {
          background: var(--card-gradient);
          border: 1.5px solid var(--card-border);
          box-shadow: 0 8px 30px var(--card-glow);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .raffle-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 50px var(--card-glow);
        }
        .raffle-card--full { animation: rcard-pulse 2.5s ease-in-out infinite; }
        .raffle-card--loading { opacity: 0.6; }
        @keyframes rcard-pulse {
          0%,100% { box-shadow: 0 8px 30px var(--card-glow); }
          50%      { box-shadow: 0 0 50px var(--card-glow), 0 0 80px var(--card-glow); }
        }

        /* ===================== CARD HEADER ===================== */
        .raffle-card-header { display: flex; align-items: center; justify-content: space-between; }
        .raffle-tier-info   { display: flex; align-items: center; gap: 0.75rem; }
        .raffle-tier-icon   { font-size: 2rem; }
        .raffle-tier-name   { font-family: var(--font-main); font-size: 1.1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; }
        .raffle-tier-sub    { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
        .raffle-winners-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0.4rem 0.75rem; text-align: center; }
        .raffle-winners-num   { display: block; font-family: var(--font-main); font-size: 1.4rem; font-weight: 900; color: var(--card-color); line-height: 1; }
        .raffle-winners-label { display: block; font-size: 0.6rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; }

        /* ===================== BOTTLE ===================== */
        .raffle-bottle-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
        .bottle-container   { display: flex; flex-direction: column; align-items: center; }
        .bottle-neck {
          width: 30px; height: 24px;
          border: 2px solid; border-bottom: none;
          border-radius: 5px 5px 0 0;
          background: rgba(0,0,0,0.25);
        }
        .bottle-body {
          width: 88px; height: 150px;
          border: 2px solid; border-top: none;
          border-radius: 2px 2px 20px 20px;
          position: relative; overflow: hidden;
          background: rgba(0,0,0,0.2);
        }
        .bottle-liquid {
          position: absolute; bottom: 0; left: 0; width: 100%; min-height: 0;
          transition: height 1.4s cubic-bezier(0.4,0,0.2,1);
          opacity: 0.8;
        }
        .bottle-wave {
          position: absolute; top: -8px; left: -25%;
          width: 150%; height: 16px; border-radius: 50%;
          opacity: 0.6;
          animation: bottle-wave-motion 2.2s ease-in-out infinite;
        }
        @keyframes bottle-wave-motion {
          0%,100% { transform: translateX(0) scaleY(0.9); border-radius: 50%; }
          50%      { transform: translateX(12%) scaleY(1.2); border-radius: 40%; }
        }
        .bottle-count-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          text-align: center; z-index: 10; pointer-events: none;
        }
        .bottle-count-filled { display: block; font-family: var(--font-main); font-size: 2rem; font-weight: 900; line-height: 1; }
        .bottle-count-sep    { display: block; font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.55); font-family: var(--font-main); margin-top: 2px; }
        .bottle-status { font-size: 0.7rem; font-weight: 700; text-align: center; font-family: var(--font-main); text-transform: uppercase; letter-spacing: 0.5px; }
        .bottle-loading-text { font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-main); text-align: center; animation: badge-pulse 1s ease-in-out infinite; }
        .bottle-full-badge {
          background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.5);
          color: #ffd700; font-size: 0.65rem; font-weight: 800;
          padding: 0.25rem 0.6rem; border-radius: 99px;
          animation: badge-pulse 1.5s ease-in-out infinite;
          text-align: center; font-family: var(--font-main);
        }
        @keyframes badge-pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

        /* ===================== SLOTS ===================== */
        .raffle-slots-grid { display: flex; flex-direction: column; gap: 0.35rem; }
        .raffle-slot { display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.78rem; font-family: var(--font-body); transition: all 0.3s ease; }
        .raffle-slot--empty { background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.1); }
        .raffle-slot--empty .slot-num { color: rgba(255,255,255,0.2); }
        .raffle-slot--empty .slot-empty-label { color: rgba(255,255,255,0.15); font-style: italic; font-size: 0.7rem; }
        .raffle-slot--loading { background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.06); animation: badge-pulse 1.2s ease-in-out infinite; }
        .raffle-slot--filled {
          background: linear-gradient(90deg,rgba(0,0,0,0.3),rgba(0,0,0,0.1));
          border: 1px solid var(--slot-color,rgba(255,255,255,0.2));
          box-shadow: inset 0 0 10px var(--slot-glow,transparent), 0 0 5px var(--slot-glow,transparent);
          animation: slot-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes slot-appear { 0% { transform: scaleY(0); opacity:0; } 100% { transform: scaleY(1); opacity:1; } }
        .slot-num      { font-family: var(--font-main); font-size: 0.65rem; font-weight: 900; color: var(--slot-color,rgba(255,255,255,0.3)); min-width: 18px; text-align: center; }
        .slot-username { flex: 1; font-weight: 700; color: #fff; font-family: var(--font-main); font-size: 0.8rem; letter-spacing: 0.5px; }
        .slot-check    { font-size: 0.7rem; color: var(--slot-color); font-weight: 900; }

        /* ===================== PRIZE TABLE ===================== */
        .raffle-prize-table { margin-top: 2.5rem; padding: 1.75rem 2rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(18,7,32,0.7); }
        .rpt-header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .rpt-title  { font-family: var(--font-main); font-size: 1.05rem; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
        .rpt-sub    { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .rpt-rows   { display: flex; flex-direction: column; gap: 0.5rem; }
        .rpt-row    { display: grid; grid-template-columns: 80px 1fr 130px; align-items: center; gap: 1rem; padding: 0.6rem 1rem; border-radius: 10px; transition: background 0.2s; }
        .rpt-row:hover { background: rgba(255,255,255,0.04); }
        .rpt-place  { display: flex; align-items: center; gap: 0.4rem; font-size: 1.1rem; }
        .rpt-place span { font-family: var(--font-main); font-size: 0.75rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; }
        .rpt-bar-wrap { background: rgba(255,255,255,0.07); border-radius: 99px; height: 8px; overflow: hidden; }
        .rpt-bar  { height: 100%; border-radius: 99px; transition: width 1s ease; }
        .rpt-mult { font-family: var(--font-main); font-weight: 900; font-size: 1rem; text-align: right; white-space: nowrap; }
        .rpt-mult span { font-size: 0.7rem; font-weight: 600; color: var(--text-muted); display: block; }
        .rpt-1st { background: rgba(255,215,0,0.07); }
        .rpt-1st .rpt-bar  { background: linear-gradient(90deg,#ffd700,#ff8c00); box-shadow: 0 0 8px rgba(255,215,0,0.5); }
        .rpt-1st .rpt-mult { color: #ffd700; }
        .rpt-2nd .rpt-bar  { background: linear-gradient(90deg,#c0c0c0,#8899aa); }
        .rpt-2nd .rpt-mult { color: #c0c0c0; }
        .rpt-3rd .rpt-bar  { background: linear-gradient(90deg,#cd7f32,#8b4513); }
        .rpt-3rd .rpt-mult { color: #cd7f32; }
        .rpt-4th .rpt-bar  { background: linear-gradient(90deg,#a855f7,#7c3aed); }
        .rpt-4th .rpt-mult { color: #a855f7; }
        .rpt-5th .rpt-bar  { background: linear-gradient(90deg,#6366f1,#4338ca); }
        .rpt-5th .rpt-mult { color: #818cf8; }
        .rpt-rest { border: 1px dashed rgba(255,255,255,0.1); }
        .rpt-rest .rpt-bar  { background: rgba(255,255,255,0.25); }
        .rpt-rest .rpt-mult { color: var(--text-secondary); }

        /* ===================== MOBILE ===================== */
        @media (max-width: 1100px) { .raffle-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  {
          .raffle-grid { grid-template-columns: 1fr; }
          .rpt-row { grid-template-columns: 70px 1fr 100px; gap: 0.6rem; padding: 0.5rem 0.75rem; }
          .rpt-mult { font-size: 0.85rem; }
          .raffle-prize-table { padding: 1.25rem; }
        }
      </style>
    `;
  }

  // ── BUILD A SINGLE CARD ─────────────────────────────────────────────────
  static _buildCard(level, players, loading = false) {
    const filled = players.length;
    const isFull = filled >= RAFFLE_MAX_SLOTS;
    const pct    = Math.min(100, (filled / RAFFLE_MAX_SLOTS) * 100);

    const slots = Array.from({ length: RAFFLE_MAX_SLOTS }, (_, i) => {
      const player = players[i];
      if (loading) {
        return `<div class="raffle-slot raffle-slot--loading">
          <span class="slot-num" style="color:rgba(255,255,255,0.15);">${i + 1}</span>
          <span style="font-size:0.7rem;color:rgba(255,255,255,0.1);">···</span>
        </div>`;
      }
      if (player) {
        return `<div class="raffle-slot raffle-slot--filled" style="--slot-color:${level.color};--slot-glow:${level.glow};animation-delay:${i * 50}ms;">
          <span class="slot-num">${i + 1}</span>
          <span class="slot-username">${player}</span>
          <span class="slot-check">✓</span>
        </div>`;
      }
      return `<div class="raffle-slot raffle-slot--empty">
        <span class="slot-num">${i + 1}</span>
        <span class="slot-empty-label">Open Slot</span>
      </div>`;
    }).join('');

    const bottleStatus = loading
      ? `<span class="bottle-loading-text">Loading…</span>`
      : isFull
        ? `<div class="bottle-full-badge">🎲 RAFFLE LOCKED IN</div>`
        : `<div class="bottle-status" style="color:${level.color};">${filled} of ${RAFFLE_MAX_SLOTS} spots filled</div>`;

    const countDisplay = loading
      ? `<span class="bottle-count-filled" style="color:rgba(255,255,255,0.2);">—</span><span class="bottle-count-sep">/ ${RAFFLE_MAX_SLOTS}</span>`
      : `<span class="bottle-count-filled" style="color:${level.color};text-shadow:0 0 12px ${level.color};">${filled}</span><span class="bottle-count-sep">/ ${RAFFLE_MAX_SLOTS}</span>`;

    return `
      <div class="raffle-card glass-card ${isFull ? 'raffle-card--full' : ''} ${loading ? 'raffle-card--loading' : ''}"
           data-level="${level.id}"
           style="--card-border:${level.border};--card-glow:${level.glow};--card-gradient:${level.gradient};--card-color:${level.color};">

        <!-- Header -->
        <div class="raffle-card-header">
          <div class="raffle-tier-info">
            <span class="raffle-tier-icon">${level.icon}</span>
            <div>
              <div class="raffle-tier-name" style="color:${level.color};">${level.name}</div>
              <div class="raffle-tier-sub">VIP Level Raffle</div>
            </div>
          </div>
          <div class="raffle-winners-badge">
            <span class="raffle-winners-num">${RAFFLE_MAX_WINNERS}</span>
            <span class="raffle-winners-label">WINNERS</span>
          </div>
        </div>

        <!-- Bottle -->
        <div class="raffle-bottle-wrap">
          <div class="bottle-container">
            <div class="bottle-neck" style="border-color:${level.color};"></div>
            <div class="bottle-body" style="border-color:${level.color};box-shadow:inset 0 0 20px rgba(0,0,0,0.4),0 0 15px ${level.glow};">
              <div class="bottle-liquid" style="height:${pct}%;background:${level.slotFill};">
                <div class="bottle-wave" style="background:${level.color};"></div>
              </div>
              <div class="bottle-count-text">${countDisplay}</div>
            </div>
          </div>
          ${bottleStatus}
        </div>

        <!-- Player Slots -->
        <div class="raffle-slots-grid">${slots}</div>
      </div>
    `;
  }

  // ── REFRESH A SINGLE CARD IN THE DOM ────────────────────────────────────
  static refreshCard(levelId) {
    const level  = RAFFLE_LEVELS.find(l => l.id === levelId);
    if (!level) return;
    const players = RaffleTracker._data[levelId] || [];
    const card    = document.querySelector(`.raffle-card[data-level="${levelId}"]`);
    if (!card) return;

    // Replace entire card with freshly built HTML
    const tmp = document.createElement('div');
    tmp.innerHTML = RaffleTracker._buildCard(level, players, false);
    const newCard = tmp.firstElementChild;
    card.replaceWith(newCard);
  }

  // ── ATTACH EVENTS & KICK OFF FETCH ──────────────────────────────────────
  static attachEvents() {
    // Initial fetch
    RaffleTracker.fetchAll();
    // Auto-refresh every REFRESH_MS
    setInterval(() => RaffleTracker.fetchAll(), REFRESH_MS);
  }
}
