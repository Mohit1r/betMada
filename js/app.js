/* ==========================================================================
   BETMADA MAIN ENTRY POINT - CLEAN FOCUSED EDITION
   ========================================================================== */

import { Navbar } from './navbar.js';
import { Hero } from './hero.js';
import { Bonus } from './bonus.js';
import { Giveaways } from './giveaways.js';
import { StakeReview } from './stakeReview.js';
import { Footer } from './footer.js';
import { AgeGate } from './ageGate.js';

class BetMadaApp {
  static init() {
    AgeGate.init();
    const root = document.getElementById('app');
    if (!root) return;

    root.innerHTML = `
      ${Navbar.render()}
      <main>
        ${Hero.render()}
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
