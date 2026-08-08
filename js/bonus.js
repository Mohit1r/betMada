/* ==========================================================================
   BETMADA PROMO CARDS COMPONENT
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class Bonus {
  static render() {
    const promoOffers = [
      {
        id: 'rake',
        title: '15% Instant Rakeback',
        tag: 'EXCLUSIVE PERK',
        tagClass: 'badge-stake',
        icon: '💎',
        desc: 'Earn instant cash back on every single wager, win or lose. No wagering requirements.',
        code: 'BETMADA',
        bonusVal: '15% Rakeback',
        perks: ['Zero Wagering Requirement', 'Claim Anytime in VIP Menu', 'Applies to Slots & Originals']
      },
      {
        id: 'deposit',
        title: '200% Deposit Match',
        tag: 'WELCOME OFFER',
        tagClass: 'badge-gold',
        icon: '🚀',
        desc: 'Triple your starting bankroll on Stake with up to $2,000 extra on your initial deposit.',
        code: 'BETMADA',
        bonusVal: 'Up to $2,000 Extra',
        perks: ['Min. Deposit $50', '200% Match Ratio', 'Instant Account Credit']
      },
      {
        id: 'race',
        title: '$25,000 VIP Monthly Race',
        tag: '🔥 $25K MONTHLY',
        tagClass: 'badge-cyan',
        icon: '🏆',
        desc: 'Climb the BetMada community leaderboard by wagering on Stake. Top 50 split $25,000.',
        code: 'BETMADA',
        bonusVal: '$25K Pool',
        perks: ['Auto-entry via Code BETMADA', 'Real-time Leaderboard', 'Crypto Payouts']
      },
      {
        id: 'reload',
        title: 'Daily & Weekly Reloads',
        tag: 'RECURRING BONUS',
        tagClass: 'badge-stake',
        icon: '🔥',
        desc: 'Receive non-stop reload bonuses credited directly into your Stake vault every single day.',
        code: 'BETMADA',
        bonusVal: 'Daily Cash Boost',
        perks: ['Calculated on Recent Volume', 'Claimable Every 24h', 'VIP Bronze+ Unlocked']
      }
    ];

    return `
      <section class="section-padding" id="promos">
        <div class="container">
          <div class="section-title-wrap">
            <div class="section-subtitle">
              <span>🎁 EXCLUSIVE STAKE BONUSES</span>
            </div>
            <h2 class="section-title">Claim Exclusive Stake VIP Perks</h2>
            <p class="section-description">
              Activate promo code <strong class="text-stake font-mono">BETMADA</strong> upon registration to unlock instant rakeback, reload bonuses, and monthly leaderboard rewards.
            </p>
          </div>

          <div class="grid-4">
            ${promoOffers.map(offer => `
              <div class="glass-card promo-card glass-card-hover" id="promo-${offer.id}">
                <div class="promo-header">
                  <span class="badge ${offer.tagClass}">${offer.tag}</span>
                  <span class="promo-icon">${offer.icon}</span>
                </div>

                <h3 class="promo-title">${offer.title}</h3>
                <div class="promo-value-tag font-mono">${offer.bonusVal}</div>
                <p class="promo-desc">${offer.desc}</p>

                <div class="promo-perks-list">
                  ${offer.perks.map(p => `
                    <div class="perk-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e701" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>${p}</span>
                    </div>
                  `).join('')}
                </div>

                <div class="promo-footer">
                  <button class="btn btn-primary btn-sm copy-promo-btn" style="width: 100%;" data-code="${offer.code}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>CLAIM CODE: ${offer.code}</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <style>
        .section-padding {
          padding: 5rem 0;
        }
        .promo-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .promo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .promo-icon {
          font-size: 2rem;
        }
        .promo-title {
          font-size: 1.35rem;
          margin-bottom: 0.35rem;
        }
        .promo-value-tag {
          color: var(--stake-green);
          font-weight: 800;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        .promo-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }
        .promo-perks-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          background: rgba(15, 33, 46, 0.6);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }
        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
      </style>
    `;
  }

  static attachEvents() {
    // Promo copy events handled globally in navbar / hero copy handlers
  }
}
