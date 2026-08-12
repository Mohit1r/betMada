/* ==========================================================================
   BETMADA VIP LEVEL-UP RAFFLE TRACKER COMPONENT
   ========================================================================== */

const RAFFLE_MAX_SLOTS = 15;
const RAFFLE_MAX_WINNERS = 5;
const RAFFLE_STORAGE_KEY = 'mada_raffle_data_v1';

const RAFFLE_LEVELS = [
  {
    id: 'bronze',
    name: 'Bronze',
    icon: '🥉',
    color: '#cd7f32',
    border: 'rgba(205,127,50,0.7)',
    glow: 'rgba(205,127,50,0.35)',
    gradient: 'linear-gradient(135deg, rgba(205,127,50,0.25) 0%, rgba(139,69,19,0.15) 100%)',
    slotFill: 'linear-gradient(135deg, #cd7f32, #8b4513)',
    textColor: '#ffd4a0',
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: '🥈',
    color: '#b0c4d8',
    border: 'rgba(180,200,220,0.7)',
    glow: 'rgba(192,192,192,0.3)',
    gradient: 'linear-gradient(135deg, rgba(192,192,192,0.2) 0%, rgba(100,120,140,0.1) 100%)',
    slotFill: 'linear-gradient(135deg, #c0c0c0, #8899aa)',
    textColor: '#e8f0f8',
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: '🥇',
    color: '#ffd700',
    border: 'rgba(255,215,0,0.7)',
    glow: 'rgba(255,215,0,0.35)',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,140,0,0.1) 100%)',
    slotFill: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    textColor: '#fff4b0',
  },
  {
    id: 'platinum',
    name: 'Platinum I',
    icon: '💎',
    color: '#00f0ff',
    border: 'rgba(0,240,255,0.7)',
    glow: 'rgba(0,240,255,0.35)',
    gradient: 'linear-gradient(135deg, rgba(0,240,255,0.2) 0%, rgba(0,128,255,0.1) 100%)',
    slotFill: 'linear-gradient(135deg, #00f0ff, #0080ff)',
    textColor: '#b0f8ff',
  },
];

export class RaffleTracker {
  static getData() {
    try {
      const raw = localStorage.getItem(RAFFLE_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // Default: empty slots per level
    const defaults = {};
    RAFFLE_LEVELS.forEach(l => { defaults[l.id] = []; });
    return defaults;
  }

  static saveData(data) {
    localStorage.setItem(RAFFLE_STORAGE_KEY, JSON.stringify(data));
  }

  static render() {
    const data = RaffleTracker.getData();

    const levelCards = RAFFLE_LEVELS.map(level => {
      const players = data[level.id] || [];
      const filled = players.length;
      const isFull = filled >= RAFFLE_MAX_SLOTS;
      const pct = Math.min(100, (filled / RAFFLE_MAX_SLOTS) * 100);

      // Build 15 slots
      const slots = Array.from({ length: RAFFLE_MAX_SLOTS }, (_, i) => {
        const player = players[i];
        if (player) {
          return `<div class="raffle-slot raffle-slot--filled" data-level="${level.id}" data-index="${i}" style="--slot-color: ${level.color}; --slot-fill: ${level.slotFill}; --slot-glow: ${level.glow}; animation-delay: ${i * 60}ms;">
            <span class="slot-num">${i + 1}</span>
            <span class="slot-username">${player}</span>
            <span class="slot-check">✓</span>
          </div>`;
        } else {
          return `<div class="raffle-slot raffle-slot--empty" data-level="${level.id}" data-index="${i}">
            <span class="slot-num">${i + 1}</span>
            <span class="slot-empty-label">Open Slot</span>
          </div>`;
        }
      }).join('');

      return `
        <div class="raffle-card glass-card ${isFull ? 'raffle-card--full' : ''}" 
             data-level="${level.id}"
             style="--card-border: ${level.border}; --card-glow: ${level.glow}; --card-gradient: ${level.gradient}; --card-color: ${level.color}; --text-color: ${level.textColor};">
          
          <!-- Card Header -->
          <div class="raffle-card-header">
            <div class="raffle-tier-info">
              <span class="raffle-tier-icon">${level.icon}</span>
              <div>
                <div class="raffle-tier-name" style="color: ${level.color};">${level.name}</div>
                <div class="raffle-tier-sub">VIP Level Raffle</div>
              </div>
            </div>
            <div class="raffle-winners-badge">
              <span class="raffle-winners-num">${RAFFLE_MAX_WINNERS}</span>
              <span class="raffle-winners-label">WINNERS</span>
            </div>
          </div>

          <!-- Prize Breakdown Strip -->
          <div class="raffle-prizes">
            <div class="raffle-prize-row prize-1st">
              <span class="prize-place">🥇 1st</span>
              <span class="prize-arrow">→</span>
              <span class="prize-reward">5× Level-Up Match</span>
            </div>
            <div class="raffle-prize-row prize-2nd">
              <span class="prize-place">🥈 2nd</span>
              <span class="prize-arrow">→</span>
              <span class="prize-reward">3× Level-Up Match</span>
            </div>
            <div class="raffle-prize-row prize-3rd">
              <span class="prize-place">🥉 3rd</span>
              <span class="prize-arrow">→</span>
              <span class="prize-reward">2× Level-Up Match</span>
            </div>
            <div class="raffle-prize-row prize-4th">
              <span class="prize-place">4️⃣ 4th</span>
              <span class="prize-arrow">→</span>
              <span class="prize-reward">2× Level-Up Match</span>
            </div>
            <div class="raffle-prize-row prize-5th">
              <span class="prize-place">5️⃣ 5th</span>
              <span class="prize-arrow">→</span>
              <span class="prize-reward">1× Level-Up Match</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="raffle-progress-wrap">
            <div class="raffle-progress-bar">
              <div class="raffle-progress-fill" style="width: ${pct}%; background: ${level.slotFill};"></div>
            </div>
            <div class="raffle-progress-label">
              <span style="color: ${level.color}; font-weight: 800;">${filled}</span>
              <span style="color: var(--text-muted);">/ ${RAFFLE_MAX_SLOTS} Spots Claimed</span>
              ${isFull ? `<span class="raffle-locked-badge">🎲 RAFFLE LOCKED IN</span>` : ''}
            </div>
          </div>

          <!-- Player Slots Grid -->
          <div class="raffle-slots-grid">
            ${slots}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="raffle-section section-padding" id="raffle">
        <div class="container">
          <div class="section-title-wrap" id="raffle-title-trigger">
            <div class="section-subtitle">
              <span>🎲 EARLY LEVEL-UP RAFFLE</span>
            </div>
            <h2 class="section-title">VIP Level-Up Raffle Tracker</h2>
            <p class="section-description">
              The first <strong>15 players</strong> to level up at each VIP tier earn a raffle spot. 
              <strong>5 winners</strong> per level are drawn — prizes scale from a massive <strong>5× level-up match</strong> for 1st place down to <strong>1× match</strong> for 5th!
            </p>
          </div>

          <div class="raffle-grid">
            ${levelCards}
          </div>
        </div>
      </section>

      <!-- Admin Panel Modal -->
      <div id="raffle-admin-modal" class="raffle-admin-overlay" style="display:none;">
        <div class="raffle-admin-panel glass-card">
          <div class="raffle-admin-header">
            <h3>🛡️ Raffle Admin Panel</h3>
            <button id="raffle-admin-close" class="raffle-admin-close-btn">✕</button>
          </div>
          <div class="raffle-admin-body">
            <div class="raffle-admin-level-tabs">
              ${RAFFLE_LEVELS.map((l, i) => `
                <button class="raffle-admin-tab ${i === 0 ? 'active' : ''}" data-tab="${l.id}" style="--tab-color: ${l.color};">
                  ${l.icon} ${l.name}
                </button>
              `).join('')}
            </div>
            ${RAFFLE_LEVELS.map((l, i) => `
              <div class="raffle-admin-tab-panel ${i === 0 ? 'active' : ''}" data-panel="${l.id}">
                <div class="raffle-admin-add-row">
                  <input type="text" class="form-input raffle-admin-input" id="admin-input-${l.id}" placeholder="Enter player username..." maxlength="30">
                  <button class="btn btn-primary raffle-admin-add-btn" data-level="${l.id}">+ Add</button>
                </div>
                <div class="raffle-admin-player-list" id="admin-list-${l.id}"></div>
                <button class="btn btn-glass raffle-admin-clear-btn" data-level="${l.id}" style="margin-top: 1rem; width: 100%; font-size: 0.8rem;">🗑 Clear All ${l.name} Slots</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <style>
        /* ===================== RAFFLE SECTION ===================== */
        .raffle-section { position: relative; }

        .raffle-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        /* ===================== RAFFLE CARD ===================== */
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
        .raffle-card--full {
          animation: rcard-pulse 2.5s ease-in-out infinite;
        }
        @keyframes rcard-pulse {
          0%, 100% { box-shadow: 0 8px 30px var(--card-glow); }
          50% { box-shadow: 0 0 50px var(--card-glow), 0 0 80px var(--card-glow); }
        }

        /* ===================== CARD HEADER ===================== */
        .raffle-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .raffle-tier-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .raffle-tier-icon { font-size: 2rem; }
        .raffle-tier-name {
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .raffle-tier-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
        .raffle-winners-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 0.4rem 0.75rem;
          text-align: center;
        }
        .raffle-winners-num {
          display: block;
          font-family: var(--font-main);
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--card-color);
          line-height: 1;
        }
        .raffle-winners-label {
          display: block;
          font-size: 0.6rem;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* ===================== PROGRESS BAR ===================== */
        .raffle-progress-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
        .raffle-progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
        }
        .raffle-progress-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 8px var(--card-glow);
        }
        .raffle-progress-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          flex-wrap: wrap;
        }
        .raffle-locked-badge {
          background: rgba(255,215,0,0.15);
          border: 1px solid rgba(255,215,0,0.4);
          color: #ffd700;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 99px;
          animation: badge-pulse 1.5s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* ===================== SLOTS GRID ===================== */
        .raffle-slots-grid {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .raffle-slot {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.78rem;
          font-family: var(--font-body);
          transition: all 0.3s ease;
        }

        .raffle-slot--empty {
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.1);
        }
        .raffle-slot--empty .slot-num {
          color: rgba(255,255,255,0.2);
        }
        .raffle-slot--empty .slot-empty-label {
          color: rgba(255,255,255,0.15);
          font-style: italic;
          font-size: 0.7rem;
        }

        .raffle-slot--filled {
          background: linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
          border: 1px solid var(--slot-color, rgba(255,255,255,0.2));
          box-shadow: inset 0 0 10px var(--slot-glow, transparent), 0 0 5px var(--slot-glow, transparent);
          animation: slot-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes slot-appear {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        .slot-num {
          font-family: var(--font-main);
          font-size: 0.65rem;
          font-weight: 900;
          color: var(--slot-color, rgba(255,255,255,0.3));
          min-width: 18px;
          text-align: center;
        }
        .slot-username {
          flex: 1;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-main);
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }
        .slot-check {
          font-size: 0.7rem;
          color: var(--slot-color);
          font-weight: 900;
        }

        /* ===================== ADMIN PANEL ===================== */
        .raffle-admin-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100dvh;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .raffle-admin-panel {
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          overflow-y: auto;
          padding: 1.75rem;
          border: 1.5px solid var(--border-purple);
          box-shadow: 0 0 60px var(--neon-purple-glow);
        }
        .raffle-admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }
        .raffle-admin-header h3 { margin: 0; font-size: 1.2rem; }
        .raffle-admin-close-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--border-light);
          color: #fff;
          width: 32px; height: 32px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .raffle-admin-close-btn:hover { background: rgba(255,0,0,0.2); }
        .raffle-admin-level-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .raffle-admin-tab {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          transition: all 0.2s;
          font-family: var(--font-main);
        }
        .raffle-admin-tab.active {
          background: rgba(255,255,255,0.1);
          border-color: var(--tab-color);
          color: var(--tab-color);
        }
        .raffle-admin-tab-panel { display: none; }
        .raffle-admin-tab-panel.active { display: block; }
        .raffle-admin-add-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .raffle-admin-input { flex: 1; }
        .raffle-admin-player-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-height: 280px;
          overflow-y: auto;
        }
        .admin-player-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
        }
        .admin-player-name {
          font-weight: 700;
          font-size: 0.85rem;
          color: #fff;
          flex: 1;
        }
        .admin-player-rank {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-right: 0.75rem;
        }
        .admin-remove-btn {
          background: rgba(255,60,60,0.15);
          border: 1px solid rgba(255,60,60,0.3);
          color: #ff6060;
          width: 24px; height: 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .admin-remove-btn:hover { background: rgba(255,60,60,0.3); }
        .admin-empty-msg {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
          padding: 2rem;
          font-style: italic;
        }

        /* ===================== PRIZE BREAKDOWN ===================== */
        .raffle-prizes {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding: 0.75rem;
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .raffle-prize-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.4rem;
          border-radius: 6px;
          font-size: 0.72rem;
          transition: background 0.2s;
        }
        .raffle-prize-row:hover { background: rgba(255,255,255,0.04); }
        .prize-place {
          font-weight: 800;
          min-width: 46px;
          font-family: var(--font-main);
          font-size: 0.7rem;
        }
        .prize-arrow { color: rgba(255,255,255,0.25); font-size: 0.65rem; }
        .prize-reward {
          flex: 1;
          font-weight: 700;
          font-family: var(--font-main);
          letter-spacing: 0.3px;
        }
        .prize-1st .prize-reward { color: #ffd700; }
        .prize-2nd .prize-reward { color: #c0c0c0; }
        .prize-3rd .prize-reward { color: #cd7f32; }
        .prize-4th .prize-reward { color: var(--text-secondary); }
        .prize-5th .prize-reward { color: var(--text-muted); }
        .prize-1st { background: rgba(255,215,0,0.06); }
        .prize-2nd { background: rgba(192,192,192,0.04); }

        /* ===================== MOBILE ===================== */
        @media (max-width: 1100px) {
          .raffle-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .raffle-grid { grid-template-columns: 1fr; }
          .raffle-admin-level-tabs { grid-template-columns: repeat(2, 1fr); }
        }
      </style>
    `;
  }

  static refreshCard(levelId) {
    const data = RaffleTracker.getData();
    const level = RAFFLE_LEVELS.find(l => l.id === levelId);
    if (!level) return;
    const players = data[levelId] || [];
    const filled = players.length;
    const isFull = filled >= RAFFLE_MAX_SLOTS;
    const pct = Math.min(100, (filled / RAFFLE_MAX_SLOTS) * 100);

    const card = document.querySelector(`.raffle-card[data-level="${levelId}"]`);
    if (!card) return;

    // Update full class
    card.classList.toggle('raffle-card--full', isFull);

    // Update progress fill
    const fill = card.querySelector('.raffle-progress-fill');
    if (fill) fill.style.width = `${pct}%`;

    // Update progress label
    const label = card.querySelector('.raffle-progress-label');
    if (label) {
      label.innerHTML = `
        <span style="color: ${level.color}; font-weight: 800;">${filled}</span>
        <span style="color: var(--text-muted);">/ ${RAFFLE_MAX_SLOTS} Spots Claimed</span>
        ${isFull ? `<span class="raffle-locked-badge">🎲 RAFFLE LOCKED IN</span>` : ''}
      `;
    }

    // Update slots
    const grid = card.querySelector('.raffle-slots-grid');
    if (grid) {
      grid.innerHTML = Array.from({ length: RAFFLE_MAX_SLOTS }, (_, i) => {
        const player = players[i];
        if (player) {
          return `<div class="raffle-slot raffle-slot--filled" style="--slot-color: ${level.color}; --slot-fill: ${level.slotFill}; --slot-glow: ${level.glow}; animation-delay: ${i * 50}ms;">
            <span class="slot-num">${i + 1}</span>
            <span class="slot-username">${player}</span>
            <span class="slot-check">✓</span>
          </div>`;
        } else {
          return `<div class="raffle-slot raffle-slot--empty">
            <span class="slot-num">${i + 1}</span>
            <span class="slot-empty-label">Open Slot</span>
          </div>`;
        }
      }).join('');
    }
  }

  static refreshAdminList(levelId) {
    const data = RaffleTracker.getData();
    const players = data[levelId] || [];
    const list = document.getElementById(`admin-list-${levelId}`);
    if (!list) return;

    if (players.length === 0) {
      list.innerHTML = `<div class="admin-empty-msg">No players added yet.</div>`;
      return;
    }

    list.innerHTML = players.map((p, i) => `
      <div class="admin-player-row">
        <span class="admin-player-rank">#${i + 1}</span>
        <span class="admin-player-name">${p}</span>
        <button class="admin-remove-btn" data-level="${levelId}" data-index="${i}" title="Remove">✕</button>
      </div>
    `).join('');

    // Attach remove listeners
    list.querySelectorAll('.admin-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lId = btn.getAttribute('data-level');
        const idx = parseInt(btn.getAttribute('data-index'));
        const d = RaffleTracker.getData();
        d[lId].splice(idx, 1);
        RaffleTracker.saveData(d);
        RaffleTracker.refreshAdminList(lId);
        RaffleTracker.refreshCard(lId);
      });
    });
  }

  static attachEvents() {
    // ---- Secret admin trigger: click title 5 times ----
    let clicks = 0;
    let clickTimer;
    const trigger = document.getElementById('raffle-title-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        clicks++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clicks = 0; }, 2000);
        if (clicks >= 5) {
          clicks = 0;
          const modal = document.getElementById('raffle-admin-modal');
          if (modal) {
            modal.style.display = 'flex';
            // Refresh all admin lists
            RAFFLE_LEVELS.forEach(l => RaffleTracker.refreshAdminList(l.id));
          }
        }
      });
    }

    // ---- Admin tab switching ----
    document.querySelectorAll('.raffle-admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.raffle-admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.raffle-admin-tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(`.raffle-admin-tab-panel[data-panel="${tab.dataset.tab}"]`);
        if (panel) panel.classList.add('active');
        RaffleTracker.refreshAdminList(tab.dataset.tab);
      });
    });

    // ---- Add player buttons ----
    document.querySelectorAll('.raffle-admin-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const levelId = btn.getAttribute('data-level');
        const input = document.getElementById(`admin-input-${levelId}`);
        if (!input) return;
        const name = input.value.trim();
        if (!name) return;
        const d = RaffleTracker.getData();
        if (!d[levelId]) d[levelId] = [];
        if (d[levelId].length >= RAFFLE_MAX_SLOTS) {
          alert(`All ${RAFFLE_MAX_SLOTS} slots for this level are full!`);
          return;
        }
        d[levelId].push(name);
        RaffleTracker.saveData(d);
        input.value = '';
        RaffleTracker.refreshAdminList(levelId);
        RaffleTracker.refreshCard(levelId);
      });
    });

    // ---- Enter key on input ----
    RAFFLE_LEVELS.forEach(l => {
      const input = document.getElementById(`admin-input-${l.id}`);
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            document.querySelector(`.raffle-admin-add-btn[data-level="${l.id}"]`)?.click();
          }
        });
      }
    });

    // ---- Clear all buttons ----
    document.querySelectorAll('.raffle-admin-clear-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const levelId = btn.getAttribute('data-level');
        if (!confirm(`Are you sure you want to clear all ${levelId} slots?`)) return;
        const d = RaffleTracker.getData();
        d[levelId] = [];
        RaffleTracker.saveData(d);
        RaffleTracker.refreshAdminList(levelId);
        RaffleTracker.refreshCard(levelId);
      });
    });

    // ---- Close admin modal ----
    const closeBtn = document.getElementById('raffle-admin-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const modal = document.getElementById('raffle-admin-modal');
        if (modal) modal.style.display = 'none';
      });
    }

    // Close on backdrop click
    const modal = document.getElementById('raffle-admin-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  }
}
