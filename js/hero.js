/* ==========================================================================
   BETMADA HERO COMPONENT - DISCORD & X REWARDS THEME
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class Hero {
  static render() {
    return `
      <section class="hero-section">
        <div class="container hero-container">
          <!-- Hero Text & CTA -->
          <div class="hero-content">
            <div class="hero-badge-row">
              <span class="badge badge-discord">
                💬 DAILY DISCORD CASH DROPS
              </span>
              <span class="badge badge-x">
                𝕏 WEEKLY X GIVEAWAYS
              </span>
            </div>

            <h1 class="hero-title">
              Exclusive Rewards for <span class="text-gradient-purple">Stake & BETMADA</span> Users
            </h1>

            <p class="hero-subtitle">
              Register on Stake using promo code <span class="text-purple font-mono" style="font-weight: 800;">BETMADA</span> to unlock <strong>15% Instant Rakeback</strong>, <strong>200% Deposit Bonus</strong>, plus automatic access to <strong>Daily Discord Drops</strong> and <strong>Weekly X Cash Giveaways</strong>!
            </p>

            <!-- Quick Code Copy Card -->
            <div class="hero-code-box glass-card">
              <div class="code-info">
                <span class="code-label">EXCLUSIVE STAKE PROMO CODE</span>
                <span class="code-val font-mono">BETMADA</span>
              </div>
              <div class="code-actions">
                <button class="btn btn-primary copy-promo-btn" data-code="BETMADA">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>COPY CODE</span>
                </button>
                <button class="btn btn-stake" id="register-guide-btn">
                  <span>PLAY ON STAKE</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Social Action Buttons -->
            <div class="hero-social-cta-row">
              <button class="btn btn-discord btn-lg" id="hero-discord-btn">
                <span>💬 Join Discord Drops</span>
              </button>
              <button class="btn btn-x btn-lg" id="hero-x-btn">
                <span>𝕏 Follow X Giveaways</span>
              </button>
            </div>

            <!-- Trust Stats -->
            <div class="hero-stats" style="margin-top: 2rem;">
              <div class="stat-item">
                <span class="stat-num text-gradient-purple">$5.8M+</span>
                <span class="stat-label">Community Wagered</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num text-gradient-discord">$1,000</span>
                <span class="stat-label">Daily Discord Drops</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num text-gradient-gold">$5,000</span>
                <span class="stat-label">Weekly X Cash Pool</span>
              </div>
            </div>
          </div>

          <!-- Hero Visual Card featuring Mascot Logo & Active Drops -->
          <div class="hero-visual">
            <div class="visual-card glass-card animate-float">
              <div class="card-header-bar">
                <div class="card-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="card-title-tag font-mono">BETMADA_REWARDS_HUB</div>
                <span class="badge badge-discord">LIVE DROPS</span>
              </div>

              <!-- Mascot Display Screen -->
              <div class="mascot-display-screen">
                <div class="logo-hero-wrapper">
                  <img src="assets/logo.jpg" alt="BetMada Mascot" class="hero-mascot-img">
                </div>

                <!-- Community Drops Showcase Cards -->
                <div class="social-drop-cards">
                  <div class="mini-drop-card glass-card">
                    <div class="mini-drop-header">
                      <span class="badge badge-discord">💬 DISCORD DAILY</span>
                      <span class="mini-drop-val font-mono">$1,000.00</span>
                    </div>
                    <span class="mini-drop-title">Exclusive Code BETMADA Rain</span>
                    <span class="mini-drop-sub">Active in #code-users channel</span>
                  </div>

                  <div class="mini-drop-card glass-card">
                    <div class="mini-drop-header">
                      <span class="badge badge-x">𝕏 WEEKLY X</span>
                      <span class="mini-drop-val font-mono">$5,000.00</span>
                    </div>
                    <span class="mini-drop-title">Retweet & Wager Cash Drops</span>
                    <span class="mini-drop-sub">Drawn every Sunday on X</span>
                  </div>
                </div>
              </div>

              <!-- Mascot Info Footer -->
              <div class="card-footer-info">
                <div class="streamer-profile">
                  <img src="assets/logo.jpg" class="footer-mascot-avatar">
                  <div class="profile-details">
                    <span class="profile-name">BETMADA Community Hub</span>
                    <span class="profile-sub">Code: BETMADA Verified</span>
                  </div>
                </div>
                <button class="btn btn-sm btn-glass copy-promo-btn" data-code="BETMADA">Code: BETMADA</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        .hero-section {
          padding: 4rem 0 3rem;
          position: relative;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }
        .hero-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
          max-width: 580px;
          line-height: 1.6;
        }

        /* Hero Code Copy Box */
        .hero-code-box {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          background: rgba(27, 13, 46, 0.9);
          border: 1px solid var(--border-purple);
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px var(--neon-purple-glow);
        }
        .code-info {
          display: flex;
          flex-direction: column;
        }
        .code-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .code-val {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--neon-purple);
          letter-spacing: 0.05em;
        }
        .code-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-social-cta-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        /* Hero Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-family: var(--font-main);
          font-size: 1.85rem;
          font-weight: 900;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border-light);
        }

        /* Visual Card with Mascot Artwork & Drop Showcase */
        .visual-card {
          border: 1.5px solid var(--border-purple);
          box-shadow: 0 20px 60px var(--neon-purple-glow);
          overflow: hidden;
          background: #120720;
        }
        .card-header-bar {
          background: #0a0312;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
        }
        .card-dots {
          display: flex;
          gap: 6px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }
        .card-title-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .mascot-display-screen {
          background: radial-gradient(circle at center, #1b0d2e 0%, #0a0312 100%);
          padding: 1.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .logo-hero-wrapper {
          width: 100%;
          max-width: 240px;
          aspect-ratio: 1;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid var(--border-purple);
          box-shadow: 0 0 30px var(--neon-purple-glow);
          margin-bottom: 1.25rem;
        }
        .hero-mascot-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .social-drop-cards {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .mini-drop-card {
          padding: 0.85rem 1rem;
          background: rgba(18, 7, 32, 0.85);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }
        .mini-drop-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }
        .mini-drop-val {
          color: var(--cash-gold);
          font-weight: 800;
          font-size: 0.95rem;
        }
        .mini-drop-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
        }
        .mini-drop-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .card-footer-info {
          padding: 1rem 1.25rem;
          background: #0a0312;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-light);
        }
        .streamer-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-mascot-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid var(--neon-purple);
          object-fit: cover;
        }
        .profile-name {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .profile-sub {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .hero-container { grid-template-columns: 1fr; gap: 2.5rem; }
          .hero-title { font-size: 2.5rem; }
          .hero-code-box { flex-direction: column; text-align: center; }
          .hero-stats { justify-content: space-around; width: 100%; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem !important; }
          .hero-cta-group { flex-direction: column; width: 100%; }
          .hero-cta-group .btn { width: 100%; margin: 0; }
        }
      </style>
    `;
  }

  static attachEvents() {
    // Discord Button trigger
    const discordBtn = document.getElementById('hero-discord-btn');
    if (discordBtn) {
      discordBtn.addEventListener('click', () => {
        sounds.playClick();
        window.open('https://discord.gg/mada', '_blank');
      });
    }

    // X Button trigger
    const xBtn = document.getElementById('hero-x-btn');
    if (xBtn) {
      xBtn.addEventListener('click', () => {
        sounds.playClick();
        window.open('https://x.com', '_blank');
      });
    }

    // Play on Stake registration modal guide
    const regBtn = document.getElementById('register-guide-btn');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        sounds.playClick();
        ModalManager.open(`
          <div style="text-align: center;">
            <img src="assets/logo.jpg" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--neon-purple); box-shadow: 0 0 20px var(--neon-purple-glow); margin-bottom: 0.75rem;">
            <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">How to Register & Claim Bonus on Stake</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">
              Follow these simple steps to claim your 200% deposit bonus + 15% instant rakeback:
            </p>
            <div style="text-align: left; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start;">
                <span class="font-mono" style="background: var(--neon-purple); color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">1</span>
                <div>
                  <strong style="color: #fff;">Click the Registration Link</strong>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">Navigate to Stake.com or Stake.us (US players).</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start;">
                <span class="font-mono" style="background: var(--neon-purple); color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">2</span>
                <div>
                  <strong style="color: #fff;">Enter Code "BETMADA" in Code Box</strong>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">Check "Code (Optional)" during signup and enter <b>BETMADA</b>.</p>
                </div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <span class="font-mono" style="background: var(--neon-purple); color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">3</span>
                <div>
                  <strong style="color: #fff;">Instant VIP Rakeback Unlocked</strong>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">Enjoy 15% rakeback on every single bet, level-up reloads, and giveaway eligibility!</p>
                </div>
              </div>
            </div>
            <a href="https://stake.com/?c=BETMADA" target="_blank" class="btn btn-stake btn-lg" style="width: 100%;">
              Go to Stake & Register with BETMADA
            </a>
          </div>
        `);
      });
    }
  }
}
