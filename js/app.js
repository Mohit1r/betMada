/* ==========================================================================
   BETMADA MAIN ENTRY POINT - CLEAN FOCUSED EDITION
   ========================================================================== */

import { Navbar } from './navbar.js';
import { Hero } from './hero.js';
import { Giveaways } from './giveaways.js';
import { StakeReview } from './stakeReview.js';
import { Footer } from './footer.js';
import { RaffleTracker } from './raffleTracker.js';

class BetMadaApp {
  static init() {
    const root = document.getElementById('app');
    if (!root) return;

    root.innerHTML = `
      ${Navbar.render()}
      <main>
        ${Hero.render()}
        ${RaffleTracker.render()}
        
        ${Giveaways.render()}
        ${StakeReview.render()}
      </main>
      ${Footer.render()}
    `;

    // Attach component interactive event handlers
    Navbar.attachEvents();
    Hero.attachEvents();
    RaffleTracker.attachEvents();
    
    Giveaways.attachEvents();
    StakeReview.attachEvents();
    Footer.attachEvents();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  BetMadaApp.init();
});
