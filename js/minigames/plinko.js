/* ==========================================================================
   BETMADA STAKE ORIGINALS - PLINKO SIMULATOR
   ========================================================================== */

import { sounds } from '../sound.js';

export class PlinkoGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.rows = 12;
    this.risk = 'medium'; // low, medium, high
    this.betAmount = 10;
    this.balance = 1000.00;

    this.balls = [];
    this.pins = [];
    this.buckets = [];
    this.history = [];

    // Physics parameters
    this.gravity = 0.28;
    this.bounce = 0.55;

    this.isRunning = false;
    this.initBoard();
    this.startLoop();
  }

  getMultipliers() {
    const table = {
      low: {
        8: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
        12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
        16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16]
      },
      medium: {
        8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
        12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
        16: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110]
      },
      high: {
        8: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
        12: [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170],
        16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000]
      }
    };
    return table[this.risk][this.rows] || table['medium'][12];
  }

  initBoard() {
    this.width = this.canvas.width = 600;
    this.height = this.canvas.height = 460;
    this.pins = [];

    const startY = 40;
    const endY = 380;
    const rowSpacing = (endY - startY) / this.rows;
    const pinRadius = 4;

    for (let r = 0; r < this.rows; r++) {
      const pinCount = r + 3;
      const rowWidth = pinCount * 28;
      const startX = (this.width - rowWidth) / 2 + 14;

      for (let c = 0; c < pinCount; c++) {
        this.pins.push({
          x: startX + c * 28,
          y: startY + r * rowSpacing,
          radius: pinRadius,
          hitAnim: 0
        });
      }
    }

    // Build buckets at bottom
    const mults = this.getMultipliers();
    this.buckets = [];
    const lastRowPinCount = this.rows + 2;
    const lastRowWidth = lastRowPinCount * 28;
    const startX = (this.width - lastRowWidth) / 2 + 14;
    const bucketY = 400;

    mults.forEach((m, idx) => {
      this.buckets.push({
        x: startX + idx * 28 - 14,
        y: bucketY,
        width: 26,
        height: 28,
        multiplier: m,
        hitAnim: 0
      });
    });
  }

  dropBall() {
    if (this.balance < this.betAmount) {
      alert("Insufficient demo balance! Reset balance below.");
      return;
    }

    this.balance -= this.betAmount;
    this.updateBalanceUI();

    const topPinX = this.width / 2;
    // Jitter start slightly
    const startX = topPinX + (Math.random() * 8 - 4);

    this.balls.push({
      x: startX,
      y: 20,
      vx: (Math.random() - 0.5) * 1.2,
      vy: 0,
      radius: 6,
      color: '#00e701'
    });

    sounds.playClick();
  }

  updatePhysics() {
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      ball.vy += this.gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Pin collisions
      this.pins.forEach(pin => {
        const dx = ball.x - pin.x;
        const dy = ball.y - pin.y;
        const dist = Math.hypot(dx, dy);
        const minDist = ball.radius + pin.radius;

        if (dist < minDist) {
          // Collision bounce
          const angle = Math.atan2(dy, dx);
          const force = 1.8;
          ball.vx = Math.cos(angle) * force + (Math.random() - 0.5) * 0.4;
          ball.vy = Math.sin(angle) * force + 0.5;

          // Reposition to prevent sticking
          ball.x = pin.x + Math.cos(angle) * minDist;
          ball.y = pin.y + Math.sin(angle) * minDist;

          pin.hitAnim = 1;
          sounds.playPlinkoPeg(0.8 + Math.random() * 0.4);
        }
      });

      // Bucket collision check (at bottom)
      if (ball.y >= 395) {
        // Find closest bucket
        let closestBucket = null;
        let minDx = Infinity;

        this.buckets.forEach(b => {
          const centerB = b.x + b.width / 2;
          const dist = Math.abs(ball.x - centerB);
          if (dist < minDx) {
            minDx = dist;
            closestBucket = b;
          }
        });

        if (closestBucket) {
          const winAmount = this.betAmount * closestBucket.multiplier;
          this.balance += winAmount;
          closestBucket.hitAnim = 1;

          this.history.unshift({
            multiplier: closestBucket.multiplier,
            win: winAmount,
            time: new Date().toLocaleTimeString()
          });
          if (this.history.length > 8) this.history.pop();

          sounds.playWin(closestBucket.multiplier);
          this.updateBalanceUI();
          this.updateHistoryUI();
        }

        // Remove ball
        this.balls.splice(i, 1);
      }
    }

    // Decay pin/bucket hit animations
    this.pins.forEach(p => { if (p.hitAnim > 0) p.hitAnim -= 0.08; });
    this.buckets.forEach(b => { if (b.hitAnim > 0) b.hitAnim -= 0.05; });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Pins
    this.pins.forEach(pin => {
      this.ctx.beginPath();
      this.ctx.arc(pin.x, pin.y, pin.radius + (pin.hitAnim * 2), 0, Math.PI * 2);
      this.ctx.fillStyle = pin.hitAnim > 0 ? '#00f0ff' : '#6c788d';
      this.ctx.shadowColor = pin.hitAnim > 0 ? '#00f0ff' : 'transparent';
      this.ctx.shadowBlur = pin.hitAnim * 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // Draw Buckets
    this.buckets.forEach(b => {
      const isHigh = b.multiplier >= 10;
      const isMid = b.multiplier >= 2;

      this.ctx.fillStyle = b.hitAnim > 0 
        ? '#00e701' 
        : isHigh ? 'rgba(255, 42, 95, 0.85)' : isMid ? 'rgba(255, 183, 3, 0.85)' : 'rgba(26, 44, 56, 0.9)';

      this.ctx.strokeStyle = isHigh ? '#ff2a5f' : isMid ? '#ffb703' : 'rgba(255, 255, 255, 0.15)';
      this.ctx.lineWidth = 1.5;

      this.ctx.beginPath();
      this.ctx.roundRect(b.x, b.y, b.width, b.height, 4);
      this.ctx.fill();
      this.ctx.stroke();

      // Multiplier Text
      this.ctx.fillStyle = b.hitAnim > 0 ? '#07121a' : '#ffffff';
      this.ctx.font = 'bold 9px "JetBrains Mono"';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`${b.multiplier}x`, b.x + b.width / 2, b.y + 17);
    });

    // Draw Balls
    this.balls.forEach(ball => {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = ball.color;
      this.ctx.shadowColor = '#00e701';
      this.ctx.shadowBlur = 12;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  startLoop() {
    const loop = () => {
      this.updatePhysics();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }

  updateBalanceUI() {
    const balEl = document.getElementById('plinko-balance');
    if (balEl) balEl.textContent = `$${this.balance.toFixed(2)}`;
  }

  updateHistoryUI() {
    const histEl = document.getElementById('plinko-history');
    if (!histEl) return;
    histEl.innerHTML = this.history.map(item => `
      <span class="history-chip ${item.multiplier >= 2 ? 'chip-win' : 'chip-loss'} font-mono">
        ${item.multiplier}x
      </span>
    `).join('');
  }
}
