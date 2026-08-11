/* ==========================================================================
   BETMADA DEDICATED LEADERBOARD PAGE - 3D WINNERS PODIUM EDITION
   ========================================================================== */

import { Navbar } from './navbar.js';
import { Footer } from './footer.js';
import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class LeaderboardPage {
  static maskUsername(username) {
    if (!username || username.length <= 4) return username;
    const visible = username.slice(-4);
    return '****' + visible;
  }

  static getFullLeaderboardData() {
    return [
      { rank: 1, user: 'CryptoKing_99', wager: 482910.00, prize: 8000.00, badge: '🥇 1st Place' },
      { rank: 2, user: 'HighRoller_Stake', wager: 391040.00, prize: 5000.00, badge: '🥈 2nd Place' },
      { rank: 3, user: 'BetMadaFan1', wager: 288400.00, prize: 2500.00, badge: '🥉 3rd Place' },
      { rank: 4, user: 'SatoshiStacker', wager: 195200.00, prize: 1500.00, badge: 'Top 5' },
      { rank: 5, user: 'WhaleSlots777', wager: 142800.00, prize: 1000.00, badge: 'Top 5' },
      { rank: 6, user: 'AlphaGambler', wager: 121500.00, prize: 800.00, badge: 'Top 10' },
      { rank: 7, user: 'PlinkoMaster', wager: 108900.00, prize: 700.00, badge: 'Top 10' },
      { rank: 8, user: 'DiamondHandsX', wager: 97400.00, prize: 600.00, badge: 'Top 10' },
      { rank: 9, user: 'StakeGod', wager: 84600.00, prize: 500.00, badge: 'Top 10' },
      { rank: 10, user: 'LuckyRider_77', wager: 76200.00, prize: 400.00, badge: 'Top 10' },
      { rank: 11, user: 'VipCrypto_01', wager: 68400.00, prize: 250.00, badge: 'Top 25' },
      { rank: 12, user: 'GatesChaser', wager: 62100.00, prize: 200.00, badge: 'Top 25' },
      { rank: 13, user: 'NeonRoller', wager: 55900.00, prize: 150.00, badge: 'Top 25' },
      { rank: 14, user: 'MadaWhale_X', wager: 49800.00, prize: 150.00, badge: 'Top 25' },
      { rank: 15, user: 'BullishBetter', wager: 44200.00, prize: 100.00, badge: 'Top 25' },
      { rank: 16, user: 'MoonBet_99', wager: 39500.00, prize: 100.00, badge: 'Top 25' },
      { rank: 17, user: 'RakebackHunter', wager: 35100.00, prize: 100.00, badge: 'Top 25' },
      { rank: 18, user: 'CryptoAce_X', wager: 31800.00, prize: 100.00, badge: 'Top 25' },
      { rank: 19, user: 'SweetMultiplier', wager: 28900.00, prize: 100.00, badge: 'Top 25' },
      { rank: 20, user: 'StakeElite', wager: 25400.00, prize: 100.00, badge: 'Top 25' }
    ];
  }

  static render() {
    const allData = LeaderboardPage.getFullLeaderboardData();
    const firstPlace = allData.find(d => d.rank === 1);
    const secondPlace = allData.find(d => d.rank === 2);
    const thirdPlace = allData.find(d => d.rank === 3);
    const tableData = allData.filter(d => d.rank >= 4);

    return `
      ${Navbar.render()}
      
      <main>
        <!-- Dedicated Leaderboard Hero Banner -->
        <section class="lb-hero-section">
          <div class="container">
            <div class="lb-hero-content">
              <div class="hero-badge-row" style="justify-content: center;">
                <span class="badge badge-gold">🏆 OFFICIAL STAKE WAGER RACE</span>
                <span class="badge badge-purple">👑 CODE: BETMADA EXCLUSIVE</span>
              </div>

              <h1 class="lb-hero-title">
                BetMada <span class="text-gradient-gold">$25,000</span> VIP Monthly Leaderboard
              </h1>

              <p class="lb-hero-desc">
                Wager on Stake.com using affiliate code <strong class="text-purple font-mono">BETMADA</strong> to climb the community leaderboard. Top 50 wagers automatically split $25,000 in raw crypto payouts!
              </p>

              <!-- Race Countdown & Prize Highlight -->
              <div class="lb-race-stats glass-card">
                <div class="lb-stat-box">
                  <span class="lb-stat-lbl">TOTAL RACE POOL</span>
                  <span class="lb-stat-val text-gradient-gold font-mono">$25,000.00</span>
                </div>
                <div class="lb-stat-divider"></div>
                <div class="lb-stat-box">
                  <span class="lb-stat-lbl">RACE ENDS IN</span>
                  <span class="lb-stat-val text-purple font-mono" id="lb-timer">04D : 12H : 45M : 00S</span>
                </div>
                <div class="lb-stat-divider"></div>
                <div class="lb-stat-box">
                  <span class="lb-stat-lbl">ACTIVE PARTICIPANTS</span>
                  <span class="lb-stat-val text-stake font-mono">1,842 PLAYERS</span>
                </div>
              </div>

              <!-- Quick Verification CTA -->
              <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                <button class="btn btn-stake btn-lg copy-promo-btn" data-code="MADA">
                  <span>Copy Code: MADA</span>
                </button>
                <button class="btn btn-primary btn-lg" id="lb-check-user-btn">
                  <span>🔎 Lookup My Stake Username</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- WINNERS PODIUM SECTION (RANKS 1, 2, 3) -->
        <section class="podium-section">
          <div class="container">
            <div class="section-title-wrap" style="margin-bottom: 2rem;">
              <div class="section-subtitle">
                <span>👑 WINNERS PODIUM</span>
              </div>
              <h2 class="section-title" style="font-size: 2rem;">Top 3 Wager Leaders</h2>
            </div>

            <div class="podium-container">
              
              <!-- 2nd Place Podium Stand (Left) -->
              <div class="podium-card podium-silver glass-card">
                <div class="podium-avatar-wrap">
                  <div class="podium-avatar avatar-silver font-mono">${secondPlace.user.charAt(0)}</div>
                  <div class="podium-crown font-mono">🥈</div>
                </div>
                <div class="podium-rank-tag font-mono">2nd Place</div>
                <div class="podium-user font-mono">${LeaderboardPage.maskUsername(secondPlace.user)}</div>
                <div class="podium-wager-lbl">WAGERED</div>
                <div class="podium-wager-val font-mono">$${secondPlace.wager.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div class="podium-prize-badge font-mono">$${secondPlace.prize.toLocaleString('en-US', {minimumFractionDigits: 2})} PAYOUT</div>
                <div class="podium-base base-silver font-mono">#2 SILVER</div>
              </div>

              <!-- 1st Place Podium Stand (Center - Highest) -->
              <div class="podium-card podium-gold glass-card">
                <div class="podium-avatar-wrap">
                  <div class="podium-avatar avatar-gold">
                    <img src="assets/logo.jpg" alt="Champion Mascot" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                  </div>
                  <div class="podium-crown font-mono">👑</div>
                </div>
                <div class="podium-rank-tag font-mono gold-tag">CHAMPION</div>
                <div class="podium-user font-mono gold-user">${LeaderboardPage.maskUsername(firstPlace.user)}</div>
                <div class="podium-wager-lbl">WAGERED</div>
                <div class="podium-wager-val font-mono text-gradient-gold">$${firstPlace.wager.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div class="podium-prize-badge gold-prize font-mono">$${firstPlace.prize.toLocaleString('en-US', {minimumFractionDigits: 2})} PAYOUT</div>
                <div class="podium-base base-gold font-mono">#1 GOLD CHAMPION</div>
              </div>

              <!-- 3rd Place Podium Stand (Right) -->
              <div class="podium-card podium-bronze glass-card">
                <div class="podium-avatar-wrap">
                  <div class="podium-avatar avatar-bronze font-mono">${thirdPlace.user.charAt(0)}</div>
                  <div class="podium-crown font-mono">🥉</div>
                </div>
                <div class="podium-rank-tag font-mono">3rd Place</div>
                <div class="podium-user font-mono">${LeaderboardPage.maskUsername(thirdPlace.user)}</div>
                <div class="podium-wager-lbl">WAGERED</div>
                <div class="podium-wager-val font-mono">$${thirdPlace.wager.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div class="podium-prize-badge font-mono">$${thirdPlace.prize.toLocaleString('en-US', {minimumFractionDigits: 2})} PAYOUT</div>
                <div class="podium-base base-bronze font-mono">#3 BRONZE</div>
              </div>

            </div>
          </div>
        </section>

        <!-- Leaderboard Table Section (Ranks 4 - 50) -->
        <section class="section-padding" style="padding-top: 1rem;">
          <div class="container">
            
            <!-- Controls Bar: Search & Filter -->
            <div class="glass-card lb-controls-bar">
              <div class="search-input-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="search-icon">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="lb-search-input" placeholder="Search Stake Username (e.g. ****cker)..." class="form-input font-mono">
              </div>

              <div class="lb-filter-tabs">
                <!-- Filters removed as requested -->
              </div>
            </div>

            <!-- Main Leaderboard Table Card -->
            <div class="glass-card lb-table-card">
              <div class="table-responsive-wrapper">
                <div class="lb-table-header">
                  <span class="col-rank">RANK</span>
                  <span class="col-user">STAKE PLAYER (MASKED)</span>
                  <span class="col-wager">MONTHLY WAGERED</span>
                  <span class="col-prize">PRIZE PAYOUT</span>
                </div>

                <div class="lb-table-body" id="lb-table-body">
                  ${tableData.map(item => `
                    <div class="lb-table-row" data-rank="${item.rank}" data-rawname="${item.user.toLowerCase()}" data-maskedname="${LeaderboardPage.maskUsername(item.user).toLowerCase()}">
                      <span class="col-rank font-mono">
                        <span class="rank-badge">
                          #${item.rank}
                        </span>
                      </span>
                      <span class="col-user">
                        <strong class="user-name font-mono">${LeaderboardPage.maskUsername(item.user)}</strong>
                      </span>
                      <span class="col-wager font-mono">$${item.wager.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      <span class="col-prize font-mono text-stake">$${item.prize.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- How Wager Race Works -->
            <div class="grid-3" style="margin-top: 3rem;">
              <div class="glass-card lb-info-card">
                <span class="info-icon">1️⃣</span>
                <h4>Register with Code MADA</h4>
                <p>Sign up on Stake.com using referral code <b>BETMADA</b> to link your account to the BetMada leaderboard.</p>
              </div>
              <div class="glass-card lb-info-card">
                <span class="info-icon">2️⃣</span>
                <h4>Wager on Any Game</h4>
                <p>All bets placed on Slots, Live Casino, and Stake Originals count 100% towards your wager leaderboard total.</p>
              </div>
              <div class="glass-card lb-info-card">
                <span class="info-icon">3️⃣</span>
                <h4>Direct Crypto Payouts</h4>
                <p>Prizes are automatically paid directly into your Stake account vault at midnight on the 1st of each month.</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      ${Footer.render()}

      <style>
        .lb-hero-section {
          padding: 4rem 0 2rem;
          text-align: center;
          background: radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 60%);
        }
        .lb-hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }
        .lb-hero-desc {
          max-width: 720px;
          margin: 0 auto 2.5rem;
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .lb-race-stats {
          max-width: 860px;
          margin: 0 auto;
          padding: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: rgba(27, 13, 46, 0.9);
          border: 1.5px solid var(--border-purple);
          box-shadow: 0 15px 45px var(--neon-purple-glow);
        }
        .lb-stat-box {
          display: flex;
          flex-direction: column;
        }
        .lb-stat-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .lb-stat-val {
          font-size: 1.8rem;
          font-weight: 900;
        }
        .lb-stat-divider {
          width: 1px;
          height: 44px;
          background: var(--border-light);
        }

        /* 3D WINNERS PODIUM STYLING */
        .podium-section {
          padding: 2rem 0;
        }
        .podium-container {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0.25rem; /* close together to look like a contiguous podium */
          max-width: 900px;
          margin: 0 auto;
        }
        
        .podium-avatar-wrap {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .podium-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          position: relative;
          z-index: 2;
        }
        .avatar-gold {
          background: linear-gradient(135deg, #f59e0b, #b45309);
          border: 3px solid var(--cash-gold);
          box-shadow: 0 0 30px var(--cash-gold-glow);
          width: 86px;
          height: 86px;
          font-size: 2.5rem;
        }
        .avatar-silver {
          background: linear-gradient(135deg, #94a3b8, #475569);
          border: 3px solid #cbd5e1;
          box-shadow: 0 0 20px rgba(203, 213, 225, 0.3);
        }
        .avatar-bronze {
          background: linear-gradient(135deg, #d97706, #9a3412);
          border: 3px solid #f97316;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }
        .podium-crown {
          position: absolute;
          bottom: -10px;
          right: -10px;
          font-size: 1.5rem;
          z-index: 3;
          background: rgba(18, 7, 32, 0.9);
          border-radius: 50%;
          padding: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .podium-gold .podium-crown {
          font-size: 2rem;
          bottom: -12px;
          right: -15px;
        }
        @keyframes podiumEntrance {
          0% { opacity: 0; transform: translateY(60px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatGold {
          0%, 100% { transform: scale(1.06) translateY(0); }
          50% { transform: scale(1.06) translateY(-10px); }
        }

        .podium-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1.25rem 0; /* no bottom padding, base handles it */
          position: relative;
          opacity: 0;
          animation: podiumEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          border-radius: 12px 12px 0 0 !important; /* Flat bottoms for pedestals */
          border-bottom: none !important;
        }

        /* Gold (1st Place) Center Stage */
        .podium-gold {
          order: 2;
          background: linear-gradient(180deg, rgba(251, 191, 36, 0.15) 0%, rgba(10, 3, 18, 0.95) 100%);
          border: 2px solid var(--cash-gold);
          border-top: 5px solid var(--cash-gold); /* thick neon top */
          border-bottom: none !important;
          box-shadow: 0 -10px 40px var(--cash-gold-glow);
          transform: scale(1.06);
          animation: podiumEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, floatGold 4s ease-in-out infinite alternate;
          animation-delay: 0s, 0.7s;
          transition: filter 0.3s;
          z-index: 10;
        }
        .podium-gold:hover { filter: brightness(1.2); box-shadow: 0 -15px 60px var(--cash-gold); }

        .podium-silver {
          order: 1;
          background: linear-gradient(180deg, rgba(203, 213, 225, 0.08) 0%, rgba(10, 3, 18, 0.95) 100%);
          border: 1.5px solid #cbd5e1;
          border-top: 4px solid #cbd5e1;
          border-bottom: none !important;
          box-shadow: 0 -5px 20px rgba(203, 213, 225, 0.15);
          animation-delay: 0.15s;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 5;
        }
        .podium-silver:hover { transform: translateY(-8px); box-shadow: 0 -10px 30px rgba(203, 213, 225, 0.3); }

        .podium-bronze {
          order: 3;
          background: linear-gradient(180deg, rgba(249, 115, 22, 0.08) 0%, rgba(10, 3, 18, 0.95) 100%);
          border: 1.5px solid #f97316;
          border-top: 4px solid #f97316;
          border-bottom: none !important;
          box-shadow: 0 -5px 20px rgba(249, 115, 22, 0.15);
          animation-delay: 0.3s;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 5;
        }
        .podium-bronze:hover { transform: translateY(-8px); box-shadow: 0 -10px 30px rgba(249, 115, 22, 0.3); }
        .podium-rank-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }
        .gold-tag { color: var(--cash-gold); }
        .podium-user {
          font-size: 1.3rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        .gold-user { font-size: 1.5rem; text-shadow: 0 0 12px var(--cash-gold-glow); }

        .podium-wager-lbl {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .podium-wager-val {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
        }

        .podium-prize-badge {
          background: rgba(0, 231, 1, 0.15);
          color: var(--stake-green);
          border: 1px solid var(--stake-green);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
        }
        .gold-prize {
          background: rgba(251, 191, 36, 0.2);
          color: var(--cash-gold);
          border-color: var(--cash-gold);
          box-shadow: 0 0 16px var(--cash-gold-glow);
          font-size: 0.95rem;
        }

        .podium-base {
          width: 100%;
          padding: 0.8rem;
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          margin-top: 1rem;
        }
        .base-gold { background: linear-gradient(135deg, #fbbf24, #d97706); color: #0a0312; }
        .base-silver { background: linear-gradient(135deg, #e2e8f0, #94a3b8); color: #0a0312; }
        .base-bronze { background: linear-gradient(135deg, #ea580c, #9a3412); color: #ffffff; }

        /* Controls bar */
        .lb-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          background: rgba(18, 7, 32, 0.85);
          border: 1px solid var(--border-purple);
        }
        .search-input-wrap {
          position: relative;
          width: 320px;
        }
        @media (max-width: 768px) {
          .lb-controls-bar { flex-direction: column; gap: 1rem; padding: 1rem; align-items: stretch; }
          .search-input-wrap { width: 100%; }
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input-wrap .form-input {
          padding-left: 2.75rem;
        }
        .lb-filter-tabs {
          display: flex;
          gap: 0.6rem;
        }
        .lb-tab-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lb-tab-btn.active {
          background: var(--neon-purple);
          color: #fff;
          border-color: var(--neon-purple);
          box-shadow: 0 0 14px var(--neon-purple-glow);
        }

        /* Table Card */
        .lb-table-card {
          padding: 1.5rem;
          background: rgba(18, 7, 32, 0.95);
          border: 1.5px solid var(--border-purple);
        }
        .table-responsive-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .lb-table-header {
          display: grid;
          grid-template-columns: 0.8fr 1.5fr 1.2fr 1.2fr;
          padding: 0.85rem 1rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border-light);
        }
        .lb-table-row {
          display: grid;
          grid-template-columns: 0.8fr 1.5fr 1.2fr 1.2fr;
          padding: 1rem;
          align-items: center;
          border-radius: var(--radius-sm);
          margin-top: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .lb-table-row:hover {
          background: rgba(168, 85, 247, 0.08);
          border-color: var(--border-purple);
          transform: translateX(4px);
        }

        .rank-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-weight: 900;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.08);
        }

        .user-name { font-size: 1.05rem; color: #fff; letter-spacing: 0.05em; }
        .col-wager { font-size: 1rem; font-weight: 700; color: var(--text-secondary); }
        .col-prize { font-size: 1.1rem; font-weight: 900; }

        .lb-info-card {
          padding: 1.5rem;
          text-align: center;
        }
        .info-icon { font-size: 2.25rem; display: block; margin-bottom: 0.75rem; }
        .lb-info-card h4 { font-size: 1.2rem; margin-bottom: 0.5rem; }
        .lb-info-card p { font-size: 0.88rem; color: var(--text-secondary); }

        @media (max-width: 992px) {
          .podium-container { flex-direction: column; align-items: center; gap: 1rem; }
          .podium-card { border-radius: 12px !important; border-bottom: 2px solid auto !important; width: 100%; max-width: 400px; padding-bottom: 0; }
          .podium-gold { order: 1; transform: scale(1); margin-bottom: 0; border-bottom: 5px solid var(--cash-gold) !important; }
          .podium-silver { order: 2; border-bottom: 4px solid #cbd5e1 !important; }
          .podium-bronze { order: 3; border-bottom: 4px solid #f97316 !important; }
          
          .lb-table-card { padding: 1rem 0; } /* Remove side padding so scroll goes to edge */
          .lb-table-header, .lb-table-row { min-width: 600px; padding-left: 1rem; padding-right: 1rem; }
          .lb-race-stats { flex-direction: column; gap: 1rem; }
          .lb-stat-divider { display: none; }
        }
      </style>
    `;
  }

  static startLiveTimer() {
    const durationMs = (4 * 86400 + 12 * 3600 + 45 * 60) * 1000;
    const targetTime = Date.now() + durationMs;

    const tick = () => {
      const timerEl = document.getElementById('lb-timer');
      if (!timerEl) return;

      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const pad = (n) => String(n).padStart(2, '0');
      timerEl.textContent = `${pad(days)}D : ${pad(hours)}H : ${pad(mins)}M : ${pad(secs)}S`;
    };

    tick();
    setInterval(tick, 1000);
  }

  static attachEvents() {
    Navbar.attachEvents();
    Footer.attachEvents();
    LeaderboardPage.startLiveTimer();

    // Search filter logic
    const searchInput = document.getElementById('lb-search-input');
    const tableBody = document.getElementById('lb-table-body');

    if (searchInput && tableBody) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const rows = tableBody.querySelectorAll('.lb-table-row');
        rows.forEach(row => {
          const rawName = row.getAttribute('data-rawname') || '';
          const maskedName = row.getAttribute('data-maskedname') || '';
          if (rawName.includes(query) || maskedName.includes(query)) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }

    // Filter tabs removed

    // Lookup user trigger
    const checkBtn = document.getElementById('lb-check-user-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        sounds.playClick();
        ModalManager.open(`
          <div style="text-align: center;">
            <div class="badge badge-gold" style="margin-bottom: 1rem;">STAKE USERNAME LOOKUP</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Check Your Wager Rank</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
              Enter your Stake username to check your current monthly wager leaderboard position under code <b>BETMADA</b>.
            </p>

            <form onsubmit="window.handleRankSearch(event)">
              <input type="text" id="lookup-username-input" required placeholder="e.g. HighRoller99" class="form-input font-mono" style="margin-bottom: 1.25rem;">
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                Lookup Leaderboard Rank
              </button>
            </form>
          </div>
        `);
      });
    }

    window.handleRankSearch = (e) => {
      e.preventDefault();
      const rawInput = document.getElementById('lookup-username-input')?.value || 'Player';
      const masked = LeaderboardPage.maskUsername(rawInput);
      sounds.playCopy();
      ModalManager.close();
      ModalManager.showToast(`📊 Verified user "${masked}" under code MADA! Active Rank: #14 (Wagered: $49,800.00)`);
    };
  }
}
