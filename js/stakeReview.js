/* ==========================================================================
   BETMADA STAKE REVIEW COMPONENT - FOCUSED EDITION
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class StakeReview {
  static render() {
    return `
      <section class="section-padding review-section" id="review">
        <div class="container">
          <div class="section-title-wrap">
            <div class="section-subtitle">
              <span>🛡️ STAKE.COM DEEP-DIVE</span>
            </div>
            <h2 class="section-title">Why Stake is the World's #1 Crypto Casino</h2>
            <p class="section-description">
              Backed by industry-leading security, instant crypto cashouts, 100% provably fair algorithms, and premier VIP perks.
            </p>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid-3" style="margin-bottom: 3rem;">
            
            <div class="glass-card review-feature-card">
              <div class="feature-icon font-mono">⚡</div>
              <h3 class="feature-title">Instant Crypto Cashouts</h3>
              <p class="feature-desc">Enjoy zero withdrawal delays and 0% withdrawal fees. Instant deposits and cashouts in Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL), Litecoin (LTC), and Dogecoin (DOGE).</p>
            </div>

            <div class="glass-card review-feature-card">
              <div class="feature-icon font-mono">🔍</div>
              <h3 class="feature-title">100% Provably Fair</h3>
              <p class="feature-desc">Stake Originals run on open-source cryptographic seed verification. Anyone can inspect and verify every bet's randomness independently in real-time.</p>
            </div>

            <div class="glass-card review-feature-card">
              <div class="feature-icon font-mono">👑</div>
              <h3 class="feature-title">Industry-Best VIP Program</h3>
              <p class="feature-desc">Unlock dedicated VIP hosts, weekly boost bonuses, monthly reload envelopes, and 15% instant rakeback with no wagering restrictions using code <b>MADA</b>.</p>
            </div>

          </div>

          <!-- Stake.com Registration CTA Banner -->
          <div class="glass-card review-cta-banner">
            <div class="banner-content">
              <span class="badge badge-stake font-mono" style="margin-bottom: 0.75rem;">⚡ OFFICIAL STAKE PARTNER</span>
              <h3 style="font-size: 1.85rem; margin-bottom: 0.5rem;">Ready to Claim Your VIP Perks?</h3>
              <p style="color: var(--text-secondary); max-width: 600px; margin-bottom: 1.5rem;">
                Sign up on Stake.com using code <strong class="text-purple font-mono">MADA</strong> to activate instant rakeback, reload rewards, and entry into daily Discord drops.
              </p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-stake btn-lg copy-promo-btn" data-code="MADA">
                  <span>Copy Code: MADA</span>
                </button>
                <a href="https://stake.com/?c=MADA" target="_blank" class="btn btn-primary btn-lg">
                  Register on Stake.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>
        .review-section {
          position: relative;
        }
        .review-feature-card {
          padding: 2rem;
          background: rgba(18, 7, 32, 0.85);
          border: 1px solid var(--border-light);
        }
        .feature-icon {
          font-size: 2.25rem;
          margin-bottom: 1rem;
          background: rgba(168, 85, 247, 0.1);
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-purple);
        }
        .feature-title {
          font-size: 1.35rem;
          margin-bottom: 0.6rem;
        }
        .feature-desc {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .review-cta-banner {
          padding: 2.5rem;
          background: linear-gradient(135deg, rgba(27, 13, 46, 0.95) 0%, rgba(18, 7, 32, 0.98) 100%);
          border: 1.5px solid var(--border-purple);
          box-shadow: 0 15px 40px var(--neon-purple-glow);
          border-radius: var(--radius-xl);
        }
      </style>
    `;
  }

  static attachEvents() {}
}
