/* ==========================================================================
   BETMADA STAKE ORIGINALS - MINES SIMULATOR
   ========================================================================== */

import { sounds } from '../sound.js';
import { ModalManager } from '../modal.js';

export class MinesGame {
  constructor() {
    this.mineCount = 3;
    this.betAmount = 10;
    this.balance = 1000.00;

    this.grid = Array(25).fill(null); // 'gem' or 'mine'
    this.revealed = Array(25).fill(false);
    this.gemsFound = 0;

    this.gameActive = false;
    this.currentMultiplier = 1.00;
  }

  calculateNextMultiplier() {
    // Standard Stake Mines multiplier formula estimation
    const totalTiles = 25;
    const safeTiles = totalTiles - this.mineCount;
    if (this.gemsFound === 0) return 1.00;

    let prob = 1.0;
    for (let i = 0; i < this.gemsFound; i++) {
      prob *= (safeTiles - i) / (totalTiles - i);
    }
    const houseEdge = 0.99;
    return Math.max(1.01, (1 / prob) * houseEdge);
  }

  startGame() {
    if (this.balance < this.betAmount) {
      ModalManager.showToast("Insufficient demo balance!", "error");
      return;
    }

    this.balance -= this.betAmount;
    this.gameActive = true;
    this.gemsFound = 0;
    this.currentMultiplier = 1.00;
    this.revealed = Array(25).fill(false);

    // Place mines randomly
    this.grid = Array(25).fill('gem');
    let placed = 0;
    while (placed < this.mineCount) {
      const idx = Math.floor(Math.random() * 25);
      if (this.grid[idx] !== 'mine') {
        this.grid[idx] = 'mine';
        placed++;
      }
    }

    sounds.playClick();
    this.renderUI();
  }

  revealTile(index) {
    if (!this.gameActive || this.revealed[index]) return;

    this.revealed[index] = true;
    const item = this.grid[index];

    if (item === 'mine') {
      // EXPLOSION
      this.gameActive = false;
      sounds.playExplosion();
      this.revealed = Array(25).fill(true); // Reveal all tiles
      ModalManager.showToast(`💣 BOOM! Hit a mine. Lost $${this.betAmount.toFixed(2)}`, "error");
    } else {
      // GEM
      this.gemsFound++;
      this.currentMultiplier = this.calculateNextMultiplier();
      sounds.playGemReveal(this.gemsFound);

      // Check auto win (all gems found)
      if (this.gemsFound === 25 - this.mineCount) {
        this.cashout();
      }
    }

    this.renderUI();
  }

  cashout() {
    if (!this.gameActive || this.gemsFound === 0) return;

    const winAmount = this.betAmount * this.currentMultiplier;
    this.balance += winAmount;
    this.gameActive = false;

    sounds.playWin(this.currentMultiplier);
    ModalManager.showToast(`🎉 CASHED OUT! Won $${winAmount.toFixed(2)} (${this.currentMultiplier.toFixed(2)}x)`);

    this.renderUI();
  }

  renderUI() {
    const balEl = document.getElementById('mines-balance');
    if (balEl) balEl.textContent = `$${this.balance.toFixed(2)}`;

    const multEl = document.getElementById('mines-current-mult');
    if (multEl) multEl.textContent = `${this.currentMultiplier.toFixed(2)}x`;

    const payoutEl = document.getElementById('mines-current-payout');
    if (payoutEl) payoutEl.textContent = `$${(this.betAmount * this.currentMultiplier).toFixed(2)}`;

    const startBtn = document.getElementById('mines-start-btn');
    const cashoutBtn = document.getElementById('mines-cashout-btn');

    if (startBtn) startBtn.disabled = this.gameActive;
    if (cashoutBtn) cashoutBtn.disabled = !this.gameActive || this.gemsFound === 0;

    // Render Grid Tiles
    const gridContainer = document.getElementById('mines-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const tile = document.createElement('button');
      tile.className = `mines-tile ${this.revealed[i] ? 'revealed' : ''} ${this.gameActive ? 'active-tile' : ''}`;
      
      if (this.revealed[i]) {
        if (this.grid[i] === 'mine') {
          tile.innerHTML = `💣`;
          tile.classList.add('tile-mine');
        } else {
          tile.innerHTML = `💎`;
          tile.classList.add('tile-gem');
        }
      } else {
        tile.innerHTML = `<span class="tile-icon font-mono">?</span>`;
      }

      tile.addEventListener('click', () => this.revealTile(i));
      gridContainer.appendChild(tile);
    }
  }
}
