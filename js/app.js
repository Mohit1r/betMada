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
      <main style="position: relative; min-height: 80vh; overflow: hidden;">
        <!-- Coming Soon Overlay -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(10, 3, 18, 0.2);">
          <div style="text-align: center; background: rgba(18, 7, 32, 0.95); padding: 4rem 3rem; border-radius: 24px; border: 2px solid var(--neon-purple); box-shadow: 0 0 60px var(--neon-purple-glow); backdrop-filter: blur(10px); max-width: 90%;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🚧</div>
            <h2 style="font-size: clamp(2rem, 5vw, 4rem); color: #fff; margin-bottom: 1rem; font-family: var(--font-main); text-transform: uppercase; letter-spacing: 2px; font-weight: 900;">Coming Soon</h2>
            <p style="color: var(--text-secondary); font-size: 1.1rem;">The Mada platform is currently under construction.</p>
          </div>
        </div>

        <!-- Blurred Content Container -->
        <div style="filter: blur(14px); pointer-events: none; user-select: none; opacity: 0.3;">
          ${Hero.render()}
          ${Bonus.render()}
          ${Giveaways.render()}
          ${StakeReview.render()}
        </div>
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
