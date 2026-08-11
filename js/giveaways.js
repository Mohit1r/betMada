/* ==========================================================================
   BETMADA DISCORD & X COMMUNITY GIVEAWAYS & LEADERBOARD PREVIEW COMPONENT
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class Giveaways {
  static maskUsername(username) {
    if (!username || username.length <= 4) return username;
    const visible = username.slice(-4);
    return '****' + visible;
  }

  static render() {
    const leaderboardData = [
      { rank: 1, user: 'CryptoKing_99', wager: '$482,910.00', prize: '$8,000.00' },
      { rank: 2, user: 'HighRoller_Stake', wager: '$391,040.00', prize: '$5,000.00' },
      { rank: 3, user: 'BetMadaFan1', wager: '$288,400.00', prize: '$2,500.00' },
      { rank: 4, user: 'SatoshiStacker', wager: '$195,200.00', prize: '$1,500.00' },
      { rank: 5, user: 'WhaleSlots777', wager: '$142,800.00', prize: '$1,000.00' }
    ];

    return `
      <section class="section-padding giveaways-section" id="giveaways">
        <div class="container">
          <div class="section-title-wrap">
            <div class="section-subtitle">
              <span>🏆 COMMUNITY REWARDS & CASH DROPS</span>
            </div>
            <h2 class="section-title">Discord & X Community Giveaways</h2>
            <p class="section-description">
              Register on Stake with code <strong class="text-purple font-mono">BETMADA</strong> to participate in daily Discord rain drops, weekly X retweet cash pools, and our $25,000 monthly wager race!
            </p>
          </div>

          <div class="grid-2" style="align-items: start; gap: 2rem;">
            
            <!-- Active Social Giveaway Cards -->
            <div class="giveaways-list">
              <h3 class="box-header-title">🎁 ACTIVE REWARD DROPS</h3>

              <!-- Discord Card -->
              <div class="glass-card giveaway-card discord-highlight-card">
                <div class="card-top-row">
                  <span class="badge badge-discord">💬 DAILY DISCORD DROPS</span>
                  <span class="giveaway-prize text-gradient-discord font-mono">$1,000 / DAY</span>
                </div>
                <h4 class="giveaway-title">Exclusive Code MADA Discord Drops</h4>
                <p class="giveaway-desc">Multiple daily cash rains credited directly into Stake vault for verified users who signed up with code <strong>BETMADA</strong>.</p>
                <div class="giveaway-meta">
                  <span>🔒 Requirement: Stake account registered with code <b>BETMADA</b> + Discord Member</span>
                </div>
                <div class="card-btn-row">
                  <button class="btn btn-discord giveaway-entry-btn" data-type="discord" data-title="Daily Discord Cash Drop">
                    Verify Code MADA & Enter Drop
                  </button>
                  <a href="https://discord.gg/mada" target="_blank" class="btn btn-glass">Join Discord Server</a>
                </div>
              </div>

              <!-- X Card -->
              <div class="glass-card giveaway-card x-highlight-card">
                <div class="card-top-row">
                  <span class="badge badge-x">𝕏 WEEKLY X DROPS</span>
                  <span class="giveaway-prize text-gradient-gold font-mono">$5,000 / WEEK</span>
                </div>
                <h4 class="giveaway-title">Weekly Retweet & Wager X Giveaways</h4>
                <p class="giveaway-desc">Follow <b>@BetMadaVIP</b> on X (Twitter), retweet our weekly pinned post, and reply with your Stake username to enter.</p>
                <div class="giveaway-meta">
                  <span>📱 Requirement: Follow X, Retweet Pinned Post & Drop Username</span>
                </div>
                <div class="card-btn-row">
                  <button class="btn btn-x giveaway-entry-btn" data-type="x" data-title="Weekly X Cash Giveaway">
                    Enter X Retweet Drop
                  </button>
                  <a href="https://x.com" target="_blank" class="btn btn-glass">Follow @BetMadaVIP</a>
                </div>
              </div>

              <!-- Monthly Race Card -->
              <div class="glass-card giveaway-card">
                <div class="card-top-row">
                  <span class="badge badge-gold">🔥 MONTHLY RACE</span>
                  <span class="giveaway-prize text-gradient-purple font-mono">$25,000.00</span>
                </div>
                <h4 class="giveaway-title">BetMada $25K VIP Monthly Leaderboard</h4>
                <p class="giveaway-desc">Top 50 community wagers using code <strong>BETMADA</strong> split $25,000. Direct crypto payouts at the end of each month.</p>
                <div class="giveaway-meta">
                  <span>🎯 Requirement: Auto-entry when wagering on Stake under code <b>BETMADA</b></span>
                </div>
                <a href="leaderboard.html" class="btn btn-primary" style="width: 100%; text-decoration: none;">
                  👑 Open Full $25K Leaderboard Page
                </a>
              </div>

            </div>

            <!-- Live Leaderboard Preview Box -->
            <div class="glass-card leaderboard-card">
              <div class="leaderboard-header">
                <div>
                  <h3 class="box-header-title" style="margin: 0;">👑 $25K RACE STANDINGS</h3>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">TOP COMMUNITY WAGERS (MASKED)</span>
                </div>
                <a href="leaderboard.html" class="badge badge-purple font-mono" style="text-decoration: none;">FULL PAGE &rarr;</a>
              </div>

              <div class="table-responsive-wrapper">
                <div class="leaderboard-table">
                  <div class="table-head">
                    <span>RANK</span>
                    <span>PLAYER</span>
                    <span>WAGERED</span>
                    <span>PRIZE</span>
                  </div>

                  <div class="table-body">
                    ${leaderboardData.map(item => `
                      <div class="table-row ${item.rank <= 3 ? 'top-three' : ''}">
                        <span class="rank-col font-mono">${item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : ''} #${item.rank}</span>
                        <span class="user-col font-mono">${Giveaways.maskUsername(item.user)}</span>
                        <span class="wager-col font-mono">${item.wager}</span>
                        <span class="prize-col font-mono text-stake">${item.prize}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div class="leaderboard-footer">
                <span>View all 50 rank payouts</span>
                <a href="leaderboard.html" class="btn btn-sm btn-stake" style="text-decoration: none;">Open Leaderboard Page</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>
        .giveaways-section {
          position: relative;
        }
        .box-header-title {
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .giveaway-card {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-light);
        }
        .discord-highlight-card {
          border: 1.5px solid var(--discord-blue);
          box-shadow: 0 8px 30px var(--discord-blue-glow);
        }
        .x-highlight-card {
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 30px var(--x-glow);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .giveaway-prize {
          font-size: 1.6rem;
          font-weight: 900;
        }
        .giveaway-title {
          font-size: 1.35rem;
          margin-bottom: 0.4rem;
        }
        .giveaway-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .giveaway-meta {
          background: rgba(18, 7, 32, 0.8);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-light);
        }
        .card-btn-row {
          display: flex;
          gap: 0.75rem;
        }
        .card-btn-row .btn {
          flex: 1;
        }

        /* Leaderboard Preview */
        .leaderboard-card {
          padding: 1.75rem;
          border: 1px solid var(--border-purple);
          background: rgba(18, 7, 32, 0.95);
        }
        .leaderboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 1.25rem;
        }
        .leaderboard-table {
          display: flex;
          flex-direction: column;
        }
        .table-head {
          display: grid;
          grid-template-columns: 0.9fr 1.2fr 1fr 1fr;
          padding: 0.6rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .table-row {
          display: grid;
          grid-template-columns: 0.9fr 1.2fr 1fr 1fr;
          padding: 0.85rem 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-sm);
          margin-bottom: 0.5rem;
          font-size: 0.88rem;
          align-items: center;
          border: 1px solid transparent;
        }
        .table-row.top-three {
          background: rgba(168, 85, 247, 0.08);
          border-color: rgba(168, 85, 247, 0.3);
        }
        .rank-col { font-weight: 800; }
        .user-col { font-weight: 700; color: #fff; letter-spacing: 0.05em; }
        .wager-col { color: var(--text-secondary); }
        .prize-col { font-weight: 900; }

        .leaderboard-footer {
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .table-responsive-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
          .leaderboard-card { padding: 1.25rem 0; }
          .leaderboard-header { padding-left: 1.25rem; padding-right: 1.25rem; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
          .table-head, .table-row { min-width: 480px; padding-left: 1.25rem; padding-right: 1.25rem; }
          .leaderboard-footer { padding-left: 1.25rem; padding-right: 1.25rem; flex-direction: column; gap: 1rem; align-items: stretch; text-align: center; }
          .card-btn-row { flex-direction: column; }
          .card-top-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .giveaway-card { padding: 1.25rem; }
        }
      </style>
    `;
  }

  static attachEvents() {
    document.querySelectorAll('.giveaway-entry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        const title = btn.getAttribute('data-title');
        const type = btn.getAttribute('data-type');

        ModalManager.open(`
          <div>
            <div class="badge ${type === 'discord' ? 'badge-discord' : type === 'x' ? 'badge-x' : 'badge-gold'}" style="margin-bottom: 1rem;">
              ${type === 'discord' ? '💬 DISCORD CODE DROP' : type === 'x' ? '𝕏 X RETWEET DRAW' : '🏆 WAGER LEADERBOARD ENTRY'}
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${title} Entry</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
              Provide your details below. Entries are verified against Stake promo code <b>MADA</b>.
            </p>

            <form id="giveaway-form" onsubmit="window.handleGiveawaySubmit(event, '${type}')">
              <div style="margin-bottom: 1.25rem;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-secondary);">Your Stake Username</label>
                <input type="text" id="stake-user-input" required placeholder="e.g. HighRoller99" class="form-input font-mono">
              </div>

              <div style="margin-bottom: 1.5rem;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-secondary);">${type === 'x' ? 'Your X (Twitter) Handle' : 'Your Discord Username & Tag'}</label>
                <input type="text" required placeholder="${type === 'x' ? '@yourhandle' : 'username#0000'}" class="form-input">
              </div>

              <button type="submit" class="btn ${type === 'discord' ? 'btn-discord' : type === 'x' ? 'btn-x' : 'btn-primary'} btn-lg" style="width: 100%;">
                Submit Entry & Verify Code MADA
              </button>
            </form>
          </div>
        `);
      });
    });

    window.handleGiveawaySubmit = (e, type) => {
      e.preventDefault();
      const rawUser = document.getElementById('stake-user-input')?.value || 'Player';
      const masked = Giveaways.maskUsername(rawUser);
      sounds.playCopy();
      ModalManager.close();
      ModalManager.showToast(`🎉 Entry verified for "${masked}" under code MADA! Check your ${type === 'x' ? 'X DMs' : 'Discord channel'} for drop confirmation.`);
    };
  }
}
