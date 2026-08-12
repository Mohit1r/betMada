/* ==========================================================================
   BETMADA MAIN ENTRY POINT - CLEAN FOCUSED EDITION
   ========================================================================== */

import { Navbar } from './navbar.js';
import { Hero } from './hero.js';
import { Bonus } from './bonus.js';
import { Giveaways } from './giveaways.js';
import { StakeReview } from './stakeReview.js';
import { Footer } from './footer.js';

class BetMadaApp {
  static init() {
    const root = document.getElementById('app');
    if (!root) return;

    root.innerHTML = `
      ${Navbar.render()}
      <main>
        ${Hero.render()}
        
        <!-- Blurred Leaderboard Preview on Main Page -->
        <section style="position: relative; padding: 4rem 0; overflow: hidden; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); margin: 2rem 0;">
          <!-- Coming Soon Overlay -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(10, 3, 18, 0.4);">
            <div style="text-align: center; background: rgba(18, 7, 32, 0.95); padding: 3rem 2rem; border-radius: 20px; border: 2px solid var(--neon-purple); box-shadow: 0 0 50px var(--neon-purple-glow); backdrop-filter: blur(10px); max-width: 90%;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
              <h2 style="font-size: clamp(1.5rem, 4vw, 2.5rem); color: #fff; margin-bottom: 0.5rem; font-family: var(--font-main); text-transform: uppercase; letter-spacing: 2px;">Leaderboard Coming Soon</h2>
              <p style="color: var(--text-secondary); font-size: 1rem;">The Mada $25,000 Wager Race is under construction.</p>
            </div>
          </div>

          <!-- Blurred Fake Leaderboard Content -->
          <div style="filter: blur(12px); pointer-events: none; user-select: none; opacity: 0.4; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
              <div>
                <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">Live Wager Race</h3>
                <p style="color: var(--text-secondary);">Top 50 wagers share the prize pool!</p>
              </div>
              <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-light);">
                <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.2rem;">TOTAL POOL</span>
                <span style="font-size: 1.5rem; font-weight: 800; color: var(--cash-gold);">$25,000.00</span>
              </div>
            </div>
            
            <div style="background: rgba(18, 7, 32, 0.8); border: 1px solid var(--border-light); border-radius: 16px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-weight: 700; font-size: 0.8rem;">
                <span style="flex: 1;">RANK</span>
                <span style="flex: 2;">PLAYER</span>
                <span style="flex: 2; text-align: right;">WAGERED</span>
                <span style="flex: 2; text-align: right;">PRIZE</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 1.5rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="flex: 1; font-weight: 900; color: var(--cash-gold);">#1</span>
                <span style="flex: 2; font-weight: 700;">HiddenPlayer1</span>
                <span style="flex: 2; text-align: right; font-family: monospace;">$450,210.00</span>
                <span style="flex: 2; text-align: right; font-family: monospace; color: var(--stake-green);">$5,000.00</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 1.5rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="flex: 1; font-weight: 900; color: #cbd5e1;">#2</span>
                <span style="flex: 2; font-weight: 700;">StakeUser99</span>
                <span style="flex: 2; text-align: right; font-family: monospace;">$380,444.00</span>
                <span style="flex: 2; text-align: right; font-family: monospace; color: var(--stake-green);">$2,500.00</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 1.5rem 1rem;">
                <span style="flex: 1; font-weight: 900; color: #f97316;">#3</span>
                <span style="flex: 2; font-weight: 700;">CryptoKing</span>
                <span style="flex: 2; text-align: right; font-family: monospace;">$310,123.00</span>
                <span style="flex: 2; text-align: right; font-family: monospace; color: var(--stake-green);">$1,250.00</span>
              </div>
            </div>
          </div>
        </section>

        ${Bonus.render()}
        ${Giveaways.render()}
        ${StakeReview.render()}
      </main>
      ${Footer.render()}
    `;

    // Attach component interactive event handlers
    Navbar.attachEvents();
    Hero.attachEvents();
    Bonus.attachEvents();
    Giveaways.attachEvents();
    StakeReview.attachEvents();
    Footer.attachEvents();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  BetMadaApp.init();
});
