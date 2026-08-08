/* ==========================================================================
   BETMADA STAKE ORIGINALS GAME MANAGER COMPONENT
   ========================================================================== */

import { PlinkoGame } from './plinko.js';
import { MinesGame } from './mines.js';
import { sounds } from '../sound.js';

export class GameManager {
  static render() {
    return `
      <section class="section-padding minigames-section" id="minigames">
        <div class="container">
          <div class="section-title-wrap">
            <div class="section-subtitle">
              <span>🕹️ INTERACTIVE STAKE ORIGINALS</span>
            </div>
            <h2 class="section-title">Play Stake Originals Simulators</h2>
            <p class="section-description">
              Test your strategies on Stake's most famous games directly on BetMada! Enjoy real physics Plinko and high-stakes Mines with zero risk.
            </p>
          </div>

          <!-- Mini Games Container -->
          <div class="minigames-wrapper glass-card">
            <!-- Game Switcher Tabs -->
            <div class="game-tabs-bar">
              <div class="tabs-left">
                <button class="game-tab-btn active" data-game="plinko">
                  <span>🔴 Plinko Simulator</span>
                </button>
                <button class="game-tab-btn" data-game="mines">
                  <span>💣 Mines Simulator</span>
                </button>
              </div>

              <div class="badge badge-stake font-mono">
                ⚡ 99% RTP PROVABLY FAIR
              </div>
            </div>

            <!-- PLINKO TAB CONTENT -->
            <div class="tab-pane active" id="tab-plinko">
              <div class="game-play-area">
                <!-- Controls Sidebar -->
                <div class="game-sidebar glass-card">
                  <div class="sidebar-header">
                    <span class="sidebar-title">Plinko Controls</span>
                    <span class="balance-badge font-mono" id="plinko-balance">$1,000.00</span>
                  </div>

                  <!-- Bet Amount -->
                  <div class="control-box">
                    <label class="control-lbl">Bet Amount ($)</label>
                    <div class="input-with-btns">
                      <input type="number" id="plinko-bet-input" value="10" min="1" max="500" class="form-input font-mono">
                      <button class="btn btn-sm btn-glass" id="plinko-half-btn">½</button>
                      <button class="btn btn-sm btn-glass" id="plinko-double-btn">2×</button>
                    </div>
                  </div>

                  <!-- Risk Level -->
                  <div class="control-box">
                    <label class="control-lbl">Risk Level</label>
                    <div class="segmented-control" id="plinko-risk-select">
                      <button class="seg-btn" data-risk="low">Low</button>
                      <button class="seg-btn active" data-risk="medium">Medium</button>
                      <button class="seg-btn" data-risk="high">High</button>
                    </div>
                  </div>

                  <!-- Rows -->
                  <div class="control-box">
                    <label class="control-lbl">Rows</label>
                    <select class="form-input font-mono" id="plinko-rows-select">
                      <option value="8">8 Rows</option>
                      <option value="12" selected>12 Rows</option>
                      <option value="16">16 Rows</option>
                    </select>
                  </div>

                  <!-- Drop Ball CTA -->
                  <button class="btn btn-primary btn-lg" id="plinko-drop-btn" style="width: 100%; margin-top: 1rem;">
                    🔴 Drop Ball
                  </button>
                </div>

                <!-- Canvas Visualizer -->
                <div class="game-viewport">
                  <div class="history-bar" id="plinko-history">
                    <!-- Dynamic chips -->
                  </div>
                  <canvas id="plinko-canvas"></canvas>
                </div>
              </div>
            </div>

            <!-- MINES TAB CONTENT -->
            <div class="tab-pane" id="tab-mines">
              <div class="game-play-area">
                <!-- Controls Sidebar -->
                <div class="game-sidebar glass-card">
                  <div class="sidebar-header">
                    <span class="sidebar-title">Mines Controls</span>
                    <span class="balance-badge font-mono" id="mines-balance">$1,000.00</span>
                  </div>

                  <!-- Bet Amount -->
                  <div class="control-box">
                    <label class="control-lbl">Bet Amount ($)</label>
                    <input type="number" id="mines-bet-input" value="10" min="1" max="500" class="form-input font-mono">
                  </div>

                  <!-- Mine Count -->
                  <div class="control-box">
                    <label class="control-lbl">Number of Mines</label>
                    <select class="form-input font-mono" id="mines-count-select">
                      <option value="1">1 Mine</option>
                      <option value="3" selected>3 Mines</option>
                      <option value="5">5 Mines</option>
                      <option value="10">10 Mines</option>
                      <option value="24">24 Mines</option>
                    </select>
                  </div>

                  <!-- Multiplier & Payout readout -->
                  <div class="mines-readout-box">
                    <div class="readout-item">
                      <span class="readout-lbl">Current Multiplier</span>
                      <span class="readout-val text-stake font-mono" id="mines-current-mult">1.00x</span>
                    </div>
                    <div class="readout-item">
                      <span class="readout-lbl">Cashout Value</span>
                      <span class="readout-val text-gradient-cyan font-mono" id="mines-current-payout">$0.00</span>
                    </div>
                  </div>

                  <!-- Game Action Buttons -->
                  <button class="btn btn-primary btn-lg" id="mines-start-btn" style="width: 100%; margin-bottom: 0.75rem;">
                    🚀 Start Game
                  </button>
                  <button class="btn btn-cyan btn-lg" id="mines-cashout-btn" style="width: 100%;" disabled>
                    💰 Cash Out
                  </button>
                </div>

                <!-- 5x5 Mines Grid Viewport -->
                <div class="game-viewport">
                  <div class="mines-grid-wrapper">
                    <div class="mines-grid" id="mines-grid">
                      <!-- 25 dynamic tiles -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>
        .minigames-wrapper {
          padding: 1.5rem;
          background: rgba(15, 33, 46, 0.9);
          border: 1px solid var(--border-glow);
        }
        .game-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
        .tabs-left {
          display: flex;
          gap: 0.75rem;
        }
        .game-tab-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .game-tab-btn:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
        }
        .game-tab-btn.active {
          background: var(--bg-card-hover);
          border-color: var(--stake-green);
          color: var(--stake-green);
          box-shadow: 0 0 16px var(--stake-green-glow);
        }

        .tab-pane {
          display: none;
        }
        .tab-pane.active {
          display: block;
        }

        .game-play-area {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .game-sidebar {
          padding: 1.25rem;
          background: #0b1823;
          border: 1px solid var(--border-light);
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        .sidebar-title {
          font-weight: 800;
          font-size: 1rem;
        }
        .balance-badge {
          background: rgba(0, 231, 1, 0.12);
          color: var(--stake-green);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 800;
        }

        .control-box {
          margin-bottom: 1.25rem;
        }
        .control-lbl {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }
        .input-with-btns {
          display: flex;
          gap: 0.4rem;
        }

        .segmented-control {
          display: flex;
          background: rgba(7, 18, 26, 0.8);
          padding: 3px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }
        .seg-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.4rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .seg-btn.active {
          background: var(--bg-card);
          color: var(--stake-green);
        }

        /* Viewport & Canvas */
        .game-viewport {
          background: #07121a;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          position: relative;
        }
        #plinko-canvas {
          max-width: 100%;
          height: auto;
        }
        .history-bar {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.4rem;
        }
        .history-chip {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }
        .chip-win { background: rgba(0, 231, 1, 0.2); color: var(--stake-green); }
        .chip-loss { background: rgba(255, 255, 255, 0.08); color: var(--text-muted); }

        /* Mines Grid Layout */
        .mines-grid-wrapper {
          width: 100%;
          max-width: 420px;
        }
        .mines-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.6rem;
        }
        .mines-tile {
          aspect-ratio: 1;
          background: #142836;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: #fff;
          font-size: 1.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .mines-tile:hover {
          background: #1a3547;
          border-color: var(--stake-green);
          transform: translateY(-2px);
        }
        .mines-tile.revealed {
          background: #0f212e;
          transform: scale(0.95);
        }
        .mines-tile.tile-gem {
          background: rgba(0, 231, 1, 0.15);
          border-color: var(--stake-green);
          box-shadow: 0 0 15px var(--stake-green-glow);
        }
        .mines-tile.tile-mine {
          background: rgba(255, 42, 95, 0.2);
          border-color: var(--neon-red);
        }

        .mines-readout-box {
          background: rgba(7, 18, 26, 0.8);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .readout-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }
        .readout-lbl { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        .readout-val { font-size: 1.1rem; font-weight: 900; }

        @media (max-width: 992px) {
          .game-play-area { grid-template-columns: 1fr; }
        }
      </style>
    `;
  }

  static attachEvents() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.game-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const game = btn.getAttribute('data-game');
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        document.getElementById(`tab-${game}`).classList.add('active');
        sounds.playClick();
      });
    });

    // Initialize Plinko Game Engine
    const plinkoEngine = new PlinkoGame('plinko-canvas');

    const plinkoBetInput = document.getElementById('plinko-bet-input');
    if (plinkoBetInput) {
      plinkoBetInput.addEventListener('change', (e) => {
        plinkoEngine.betAmount = parseFloat(e.target.value) || 10;
      });
    }

    const dropBtn = document.getElementById('plinko-drop-btn');
    if (dropBtn) {
      dropBtn.addEventListener('click', () => plinkoEngine.dropBall());
    }

    const halfBtn = document.getElementById('plinko-half-btn');
    const doubleBtn = document.getElementById('plinko-double-btn');
    if (halfBtn && plinkoBetInput) {
      halfBtn.addEventListener('click', () => {
        plinkoBetInput.value = Math.max(1, Math.floor(plinkoBetInput.value / 2));
        plinkoEngine.betAmount = parseFloat(plinkoBetInput.value);
        sounds.playClick();
      });
    }
    if (doubleBtn && plinkoBetInput) {
      doubleBtn.addEventListener('click', () => {
        plinkoBetInput.value = Math.min(500, Math.floor(plinkoBetInput.value * 2));
        plinkoEngine.betAmount = parseFloat(plinkoBetInput.value);
        sounds.playClick();
      });
    }

    // Risk buttons
    document.querySelectorAll('#plinko-risk-select .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#plinko-risk-select .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        plinkoEngine.risk = btn.getAttribute('data-risk');
        plinkoEngine.initBoard();
        sounds.playClick();
      });
    });

    // Rows select
    const rowsSelect = document.getElementById('plinko-rows-select');
    if (rowsSelect) {
      rowsSelect.addEventListener('change', (e) => {
        plinkoEngine.rows = parseInt(e.target.value);
        plinkoEngine.initBoard();
        sounds.playClick();
      });
    }

    // Initialize Mines Engine
    const minesEngine = new MinesGame();
    minesEngine.renderUI();

    const minesBetInput = document.getElementById('mines-bet-input');
    if (minesBetInput) {
      minesBetInput.addEventListener('change', (e) => {
        minesEngine.betAmount = parseFloat(e.target.value) || 10;
      });
    }

    const minesCountSelect = document.getElementById('mines-count-select');
    if (minesCountSelect) {
      minesCountSelect.addEventListener('change', (e) => {
        minesEngine.mineCount = parseInt(e.target.value);
      });
    }

    const minesStartBtn = document.getElementById('mines-start-btn');
    if (minesStartBtn) {
      minesStartBtn.addEventListener('click', () => minesEngine.startGame());
    }

    const minesCashoutBtn = document.getElementById('mines-cashout-btn');
    if (minesCashoutBtn) {
      minesCashoutBtn.addEventListener('click', () => minesEngine.cashout());
    }
  }
}
