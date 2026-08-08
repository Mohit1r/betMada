/* ==========================================================================
   BETMADA SLOTS & BIG WINS COMPONENT
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class Slots {
  static render() {
    const slotsData = [
      {
        id: 'gates',
        name: 'Gates of Olympus 1000',
        provider: 'Pragmatic Play',
        rtp: '96.50%',
        volatility: 'Very High',
        maxWin: '15,000x',
        category: 'popular',
        badge: 'HOT SLOT',
        icon: '⚡'
      },
      {
        id: 'sweet',
        name: 'Sweet Bonanza 1000',
        provider: 'Pragmatic Play',
        rtp: '96.53%',
        volatility: 'High',
        maxWin: '25,000x',
        category: 'popular',
        badge: 'FEATURED',
        icon: '🍭'
      },
      {
        id: 'wanted',
        name: 'Wanted Dead or a Wild',
        provider: 'Hacksaw Gaming',
        rtp: '96.38%',
        volatility: 'Extreme',
        maxWin: '12,500x',
        category: 'hacksaw',
        badge: '12,500X MAX',
        icon: '🤠'
      },
      {
        id: 'sugar',
        name: 'Sugar Rush 1000',
        provider: 'Pragmatic Play',
        rtp: '96.53%',
        volatility: 'High',
        maxWin: '25,000x',
        category: 'pragmatic',
        badge: 'TOP MULTI',
        icon: '🍬'
      },
      {
        id: 'limbo',
        name: 'Stake Limbo',
        provider: 'Stake Originals',
        rtp: '99.00%',
        volatility: 'Custom',
        maxWin: '1,000,000x',
        category: 'originals',
        badge: '99% RTP',
        icon: '🚀'
      },
      {
        id: 'lebandit',
        name: 'Le Bandit',
        provider: 'Hacksaw Gaming',
        rtp: '96.34%',
        volatility: 'Medium',
        maxWin: '10,000x',
        category: 'hacksaw',
        badge: 'NEW',
        icon: '🦝'
      }
    ];

    return `
      <section class="section-padding slots-section" id="slots">
        <div class="container">
          
          <!-- Live Big Wins Ticker Header -->
          <div class="big-wins-container glass-card">
            <div class="ticker-header">
              <span class="badge badge-live">
                <span class="badge-live-dot"></span> LIVE HIGH ROLLER WINS
              </span>
              <span class="ticker-sub">Real-Time Community Win Feed on Stake</span>
            </div>

            <div class="ticker-wrapper">
              <div class="ticker-track" id="live-wins-track">
                <!-- Dynamic win items -->
              </div>
            </div>
          </div>

          <div class="section-title-wrap" style="margin-top: 4rem;">
            <div class="section-subtitle">
              <span>🎰 FEATURED STAKE GAMES</span>
            </div>
            <h2 class="section-title">Highest RTP Slots & Originals</h2>
            <p class="section-description">
              Explore the top played games on Stake. Check RTP percentages, volatility ratings, and maximum multiplier potentials.
            </p>
          </div>

          <!-- Category Filter Bar -->
          <div class="slot-filters">
            <button class="filter-btn active" data-filter="all">All Games</button>
            <button class="filter-btn" data-filter="popular">🔥 Most Played</button>
            <button class="filter-btn" data-filter="originals">⚡ Stake Originals</button>
            <button class="filter-btn" data-filter="hacksaw">🤠 Hacksaw Gaming</button>
            <button class="filter-btn" data-filter="pragmatic">🍭 Pragmatic Play</button>
          </div>

          <!-- Slot Grid -->
          <div class="grid-3" id="slots-grid">
            ${slotsData.map(slot => `
              <div class="glass-card slot-card glass-card-hover" data-category="${slot.category}">
                <div class="slot-banner">
                  <span class="badge badge-gold">${slot.badge}</span>
                  <span class="slot-big-icon">${slot.icon}</span>
                </div>

                <div class="slot-info">
                  <span class="slot-provider">${slot.provider}</span>
                  <h3 class="slot-name">${slot.name}</h3>

                  <div class="slot-specs">
                    <div class="spec-item">
                      <span class="spec-label">RTP</span>
                      <span class="spec-val text-stake font-mono">${slot.rtp}</span>
                    </div>
                    <div class="spec-item">
                      <span class="spec-label">VOLATILITY</span>
                      <span class="spec-val text-gradient-cyan font-mono">${slot.volatility}</span>
                    </div>
                    <div class="spec-item">
                      <span class="spec-label">MAX WIN</span>
                      <span class="spec-val text-gradient-gold font-mono">${slot.maxWin}</span>
                    </div>
                  </div>

                  <div class="slot-card-actions">
                    <button class="btn btn-primary btn-sm slot-play-btn" data-name="${slot.name}" style="flex: 1;">
                      <span>Play on Stake</span>
                    </button>
                    <button class="btn btn-glass btn-sm slot-info-btn" data-name="${slot.name}" data-rtp="${slot.rtp}" data-max="${slot.maxWin}">
                      <span>Stats</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <style>
        .big-wins-container {
          padding: 1.25rem 1.5rem;
          background: rgba(15, 33, 46, 0.95);
          border: 1px solid var(--border-glow);
          box-shadow: 0 10px 30px rgba(0, 231, 1, 0.1);
        }
        .ticker-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .ticker-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .ticker-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .ticker-track {
          display: flex;
          gap: 1.25rem;
          white-space: nowrap;
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }

        .win-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(26, 44, 56, 0.8);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .win-chip:hover {
          border-color: var(--stake-green);
          background: var(--bg-card-hover);
        }
        .win-user { font-weight: 700; color: #fff; }
        .win-game { color: var(--text-secondary); }
        .win-mult { color: var(--stake-green); font-weight: 800; }
        .win-amt { color: var(--neon-gold); font-weight: 800; }

        /* Slot Filters */
        .slot-filters {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-btn:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
        }
        .filter-btn.active {
          background: var(--stake-green);
          color: #07121a;
          border-color: var(--stake-green);
          box-shadow: 0 4px 16px var(--stake-green-glow);
        }

        .slot-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .slot-banner {
          background: radial-gradient(circle, rgba(26,44,56,1) 0%, rgba(15,33,46,1) 100%);
          border-radius: var(--radius-md);
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-light);
        }
        .slot-big-icon {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
        }

        .slot-provider {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }
        .slot-name {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .slot-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          background: rgba(15, 33, 46, 0.7);
          padding: 0.65rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
        }
        .spec-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .spec-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 800;
        }
        .spec-val {
          font-size: 0.82rem;
          font-weight: 800;
        }

        .slot-card-actions {
          display: flex;
          gap: 0.6rem;
        }
      </style>
    `;
  }

  static attachEvents() {
    // Generate live win feed entries
    const winsTrack = document.getElementById('live-wins-track');
    const mockUsers = ['StakeWhale', 'CryptoNinja', 'DiamondHands99', 'BetMadaVIP', 'HighRollerX', 'SatoshiBet', 'PlinkoKing'];
    const mockGames = ['Gates of Olympus 1000', 'Stake Plinko', 'Sweet Bonanza', 'Wanted Dead or a Wild', 'Stake Mines'];

    const generateWins = () => {
      let html = '';
      for (let i = 0; i < 14; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const game = mockGames[Math.floor(Math.random() * mockGames.length)];
        const mult = (Math.random() * 800 + 50).toFixed(1);
        const amt = (parseFloat(mult) * (Math.random() * 20 + 5)).toFixed(2);

        html += `
          <div class="win-chip" onclick="window.showWinReplay('${user}', '${game}', '${mult}x', '$${amt}')">
            <span class="win-user">${user}</span>
            <span class="win-game">${game}</span>
            <span class="win-mult font-mono">${mult}x</span>
            <span class="win-amt font-mono">+$${amt}</span>
          </div>
        `;
      }
      if (winsTrack) winsTrack.innerHTML = html + html; // Duplicate for smooth looping ticker
    };
    generateWins();

    window.showWinReplay = (user, game, mult, amt) => {
      sounds.playClick();
      ModalManager.open(`
        <div style="text-align: center;">
          <div class="badge badge-gold" style="margin-bottom: 1rem;">VERIFIED STAKE REPLAY</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${game} High Roller Win</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Player <b>${user}</b> landed an incredible multiplier!</p>

          <div style="background: rgba(0, 231, 1, 0.1); border: 1.5px dashed var(--stake-green); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <span style="font-size: 0.75rem; color: var(--stake-green); letter-spacing: 0.1em;" class="font-mono">MULTIPLIER HIT</span>
            <div style="font-size: 2.75rem; font-weight: 900; color: #fff;" class="font-mono">${mult}</div>
            <div style="font-size: 1.2rem; color: var(--neon-gold); font-weight: 800;" class="font-mono">TOTAL WIN: ${amt}</div>
          </div>

          <a href="https://stake.com/?c=BETMADA" target="_blank" class="btn btn-primary btn-lg" style="width: 100%;">
            Try Your Luck on Stake (Code: BETMADA)
          </a>
        </div>
      `);
    };

    // Filter logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        sounds.playClick();

        document.querySelectorAll('.slot-card').forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Slot play & info button triggers
    document.querySelectorAll('.slot-play-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        const name = btn.getAttribute('data-name');
        window.open('https://stake.com/?c=BETMADA', '_blank');
      });
    });

    document.querySelectorAll('.slot-info-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        const name = btn.getAttribute('data-name');
        const rtp = btn.getAttribute('data-rtp');
        const max = btn.getAttribute('data-max');

        ModalManager.open(`
          <div style="text-align: center;">
            <span style="font-size: 3rem;">🎰</span>
            <h3 style="font-size: 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">${name} Statistics</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Game Overview & Highest Multiplier Thresholds</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">THEORETICAL RTP</span>
                <div style="font-size: 1.5rem; font-weight: 900; color: var(--stake-green);" class="font-mono">${rtp}</div>
              </div>
              <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">MAX MULTIPLIER CAP</span>
                <div style="font-size: 1.5rem; font-weight: 900; color: var(--neon-gold);" class="font-mono">${max}</div>
              </div>
            </div>

            <a href="https://stake.com/?c=BETMADA" target="_blank" class="btn btn-primary btn-lg" style="width: 100%;">
              Play ${name} with Code BETMADA
            </a>
          </div>
        `);
      });
    });
  }
}
