/* ==========================================================================
   BETMADA FOOTER COMPONENT - FOCUSED EDITION
   ========================================================================== */

export class Footer {
  static render() {
    return `
      <footer class="footer-wrapper">
        <div class="container">
          
          <!-- Top Row: Brand & Quick Links -->
          <div class="footer-main-grid">
            <div class="footer-brand-col">
              <a href="#" class="navbar-brand" style="margin-bottom: 1rem;">
                <div class="brand-mascot-avatar">
                  <img src="assets/logo.jpg" alt="BetMada Mascot Logo" class="mascot-img">
                </div>
                <span class="brand-text"><span class="text-silver">BET</span><span class="text-purple">MADA</span></span>
              </a>
              <p class="footer-brand-desc">
                BetMada is an official affiliate platform and community hub for Stake.com. We provide exclusive promo code bonuses, daily Discord cash drops, weekly X giveaways, and monthly wager races.
              </p>
              <div class="social-links">
                <a href="https://discord.gg/mada" target="_blank" class="social-btn" title="Discord">💬 Discord</a>
                <a href="https://twitter.com" target="_blank" class="social-btn" title="Twitter / X">🐦 X (Twitter)</a>
                <a href="https://telegram.org" target="_blank" class="social-btn" title="Telegram">✈️ Telegram</a>
              </div>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Platform Hub</h4>
              <ul class="footer-links">
                <li><a href="#promos">Exclusive Stake Bonuses</a></li>
                <li><a href="#giveaways">Daily Discord Rains</a></li>
                <li><a href="#giveaways">Weekly X Giveaways</a></li>
                <li><a href="#giveaways">$25K Wager Leaderboard</a></li>
                <li><a href="#review">Why Stake.com</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Stake Official</h4>
              <ul class="footer-links">
                <li><a href="https://stake.com/?c=MADA" target="_blank">Stake.com Official</a></li>
                <li><a href="https://stake.com/vip-club" target="_blank">Stake VIP Club</a></li>
                <li><a href="https://stake.com/provably-fair" target="_blank">Provably Fair System</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Responsible Gambling</h4>
              <div class="rg-badge-box">
                <span class="badge badge-live" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">18+ / 21+ ONLY</span>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.5rem;">
                  Gambling involves financial risk. Please gamble responsibly. Seek help if you experience gambling problems.
                </p>
                <a href="https://www.begambleaware.org" target="_blank" class="btn btn-sm btn-glass" style="margin-top: 0.6rem; width: 100%;">
                  BeGambleAware.org
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Disclaimer & Copyright -->
          <div class="footer-bottom-bar">
            <div class="affiliate-disclosure">
              <p>
                <strong>Affiliate Disclosure:</strong> BetMada contains affiliate referral links to Stake.com. When you register an account using promo code <strong>MADA</strong>, we may earn an affiliate commission at no extra cost to you. BetMada does not offer real-money gambling directly on this website.
              </p>
            </div>
            <div class="copyright-row">
              <span>© ${new Date().getFullYear()} BetMada. All Rights Reserved. Not affiliated with Stake LLC beyond independent partnership.</span>
            </div>
          </div>

        </div>
      </footer>

      <style>
        .footer-wrapper {
          background: #06010c;
          border-top: 1px solid var(--border-purple);
          padding: 4rem 0 2rem;
          color: var(--text-secondary);
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .footer-brand-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .social-links {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .social-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: var(--neon-purple);
          border-color: var(--neon-purple);
        }

        .footer-heading {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.2s ease;
        }
        .footer-links a:hover {
          color: var(--neon-purple);
        }

        .rg-badge-box {
          background: rgba(18, 7, 32, 0.6);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }

        .footer-bottom-bar {
          border-top: 1px solid var(--border-light);
          padding-top: 1.75rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .affiliate-disclosure {
          margin-bottom: 1rem;
        }
        .copyright-row {
          text-align: center;
        }

        @media (max-width: 992px) {
          .footer-main-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 600px) {
          .footer-main-grid { grid-template-columns: 1fr; }
        }
      </style>
    `;
  }

  static attachEvents() {}
}
