/* ==========================================================================
   BETMADA VIP CALCULATOR COMPONENT
   ========================================================================== */

import { sounds } from './sound.js';

export class VipCalculator {
  static render() {
    return `
      <section class="section-padding calculator-section" id="calculator">
        <div class="container">
          <div class="section-title-wrap">
            <div class="section-subtitle">
              <span>🧮 STAKE VIP REWARD CALCULATOR</span>
            </div>
            <h2 class="section-title">Calculate Your Rakeback & VIP Payouts</h2>
            <p class="section-description">
              Estimate your weekly reloads, instant rakeback, and VIP level-up rewards on Stake using your estimated monthly wager volume.
            </p>
          </div>

          <div class="calculator-card glass-card">
            <div class="calc-grid">
              <!-- Controls Column -->
              <div class="calc-controls">
                <!-- Wager Volume Slider -->
                <div class="control-group">
                  <div class="control-label-row">
                    <label class="control-label">Monthly Wager Volume</label>
                    <span class="control-val text-stake font-mono" id="wager-val-display">$25,000</span>
                  </div>
                  <input type="range" id="wager-slider" min="1000" max="500000" step="1000" value="25000">
                  <div class="range-ticks font-mono">
                    <span>$1K</span>
                    <span>$100K</span>
                    <span>$500K+</span>
                  </div>
                </div>

                <!-- VIP Tier Selection -->
                <div class="control-group">
                  <label class="control-label">Select Your Target VIP Tier</label>
                  <div class="tier-grid" id="tier-selector">
                    <button class="tier-btn" data-tier="bronze" data-level="1" data-bonus="15">Bronze</button>
                    <button class="tier-btn active" data-tier="silver" data-level="2" data-bonus="50">Silver</button>
                    <button class="tier-btn" data-tier="gold" data-level="3" data-bonus="110">Gold</button>
                    <button class="tier-btn" data-tier="plat1" data-level="4" data-bonus="220">Platinum I</button>
                    <button class="tier-btn" data-tier="plat3" data-level="5" data-bonus="880">Platinum III</button>
                    <button class="tier-btn" data-tier="diamond" data-level="6" data-bonus="12500">Diamond</button>
                  </div>
                </div>

                <!-- Game Type Preference -->
                <div class="control-group">
                  <label class="control-label">Primary Game Selection</label>
                  <select class="form-input" id="game-type-select">
                    <option value="originals" selected>Stake Originals (Plinko, Mines, Dice - 1% House Edge)</option>
                    <option value="slots">Video Slots (Gates of Olympus, Sweet Bonanza - 3.5% House Edge)</option>
                    <option value="table">Live Casino & Blackjack (0.5% House Edge)</option>
                  </select>
                </div>
              </div>

              <!-- Output Results Column -->
              <div class="calc-results glass-card">
                <h3 class="results-header">
                  <span>💎 ESTIMATED VIP PAYOUTS</span>
                  <span class="badge badge-stake font-mono" id="selected-tier-badge">SILVER VIP</span>
                </h3>

                <div class="results-grid">
                  <div class="result-box">
                    <span class="result-label">Instant Rakeback (15%)</span>
                    <span class="result-val text-stake font-mono" id="res-rakeback">$37.50</span>
                    <span class="result-sub">Claimable every single bet</span>
                  </div>

                  <div class="result-box">
                    <span class="result-label">Weekly Boost</span>
                    <span class="result-val text-gradient-cyan font-mono" id="res-weekly">$48.00</span>
                    <span class="result-sub">Credited every Saturday</span>
                  </div>

                  <div class="result-box">
                    <span class="result-label">Monthly VIP Bonus</span>
                    <span class="result-val text-gradient-gold font-mono" id="res-monthly">$135.00</span>
                    <span class="result-sub">Credited ~15th of each month</span>
                  </div>

                  <div class="result-box">
                    <span class="result-label">Level-Up Cash Reward</span>
                    <span class="result-val font-mono" style="color: #fff;" id="res-levelup">$50.00</span>
                    <span class="result-sub">Instant raw cash bonus</span>
                  </div>
                </div>

                <div class="total-result-box">
                  <div class="total-label-wrap">
                    <span class="total-title">Total Estimated VIP Earnings</span>
                    <span class="total-sub">Rakeback + Weekly + Monthly + Level Up</span>
                  </div>
                  <span class="total-val text-stake font-mono" id="res-total">$270.50</span>
                </div>

                <button class="btn btn-primary btn-lg copy-promo-btn" style="width: 100%; margin-top: 1.5rem;" data-code="BETMADA">
                  Unlock VIP Bonus with Code: BETMADA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        .calculator-section {
          position: relative;
        }
        .calculator-card {
          padding: 2.5rem;
          background: rgba(15, 33, 46, 0.85);
          border: 1px solid var(--border-glow);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        }
        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .control-group {
          margin-bottom: 2rem;
        }
        .control-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .control-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .control-val {
          font-size: 1.4rem;
          font-weight: 900;
        }
        .range-ticks {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.4rem;
        }
        .tier-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }
        .tier-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tier-btn:hover {
          border-color: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
        .tier-btn.active {
          background: var(--bg-card-hover);
          border-color: var(--stake-green);
          color: var(--stake-green);
          box-shadow: 0 0 12px var(--stake-green-glow);
        }

        /* Results Box */
        .calc-results {
          padding: 1.75rem;
          background: #0b1823;
          border: 1px solid var(--border-light);
        }
        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .result-box {
          background: rgba(26, 44, 56, 0.6);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }
        .result-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }
        .result-val {
          font-size: 1.4rem;
          font-weight: 900;
          margin: 0.2rem 0;
        }
        .result-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .total-result-box {
          background: linear-gradient(135deg, rgba(0, 231, 1, 0.15) 0%, rgba(0, 240, 255, 0.1) 100%);
          border: 1.5px solid var(--stake-green);
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .total-title {
          display: block;
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
        }
        .total-sub {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .total-val {
          font-size: 2rem;
          font-weight: 900;
        }

        @media (max-width: 992px) {
          .calc-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .calculator-card { padding: 1.25rem; }
          .results-grid { grid-template-columns: 1fr; }
          .total-result-box { flex-direction: column; align-items: flex-start; gap: 0.75rem; padding: 1rem; }
          .tier-grid { grid-template-columns: repeat(2, 1fr); }
          .calc-results { padding: 1.25rem; }
          .control-label-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
        }
      </style>
    `;
  }

  static attachEvents() {
    const slider = document.getElementById('wager-slider');
    const wagerDisplay = document.getElementById('wager-val-display');
    const gameSelect = document.getElementById('game-type-select');
    const tierBtns = document.querySelectorAll('.tier-btn');

    let currentWager = 25000;
    let currentHouseEdge = 0.01;
    let currentTierBonus = 50;
    let currentTierName = 'SILVER VIP';

    const updateCalculator = () => {
      // 15% rakeback calculation = wager * houseEdge * 0.15
      const rakeback = currentWager * currentHouseEdge * 0.15;
      
      // Weekly boost estimate
      const weekly = (currentWager * currentHouseEdge * 0.10) + (currentTierBonus * 0.2);

      // Monthly bonus estimate
      const monthly = (currentWager * currentHouseEdge * 0.18) + (currentTierBonus * 0.5);

      // Level up reward
      const levelup = currentTierBonus;

      const total = rakeback + weekly + monthly + levelup;

      // Update DOM
      document.getElementById('res-rakeback').textContent = `$${rakeback.toFixed(2)}`;
      document.getElementById('res-weekly').textContent = `$${weekly.toFixed(2)}`;
      document.getElementById('res-monthly').textContent = `$${monthly.toFixed(2)}`;
      document.getElementById('res-levelup').textContent = `$${levelup.toFixed(2)}`;
      document.getElementById('res-total').textContent = `$${total.toFixed(2)}`;
    };

    if (slider) {
      slider.addEventListener('input', (e) => {
        currentWager = parseInt(e.target.value);
        wagerDisplay.textContent = `$${currentWager.toLocaleString()}`;
        updateCalculator();
      });
    }

    if (gameSelect) {
      gameSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        currentHouseEdge = val === 'originals' ? 0.01 : val === 'slots' ? 0.035 : 0.005;
        updateCalculator();
      });
    }

    tierBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tierBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTierBonus = parseInt(btn.getAttribute('data-bonus'));
        currentTierName = `${btn.textContent.toUpperCase()} VIP`;
        document.getElementById('selected-tier-badge').textContent = currentTierName;
        sounds.playClick();
        updateCalculator();
      });
    });

    updateCalculator();
  }
}
