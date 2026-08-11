/* ==========================================================================
   BETMADA NAVBAR COMPONENT - MULTI-PAGE EDITION
   ========================================================================== */

import { sounds } from './sound.js';
import { ModalManager } from './modal.js';

export class Navbar {
  static render() {
    return `
      <header class="navbar-wrapper">
        <div class="container navbar-container">
          <!-- Logo with Mascot Image -->
          <a href="index.html" class="navbar-brand">
            <div class="brand-mascot-avatar">
              <img src="assets/logo.jpg" alt="BetMada Mascot Logo" class="mascot-img">
            </div>
            <span class="brand-text"><span class="text-silver">BET</span><span class="text-purple">MADA</span></span>
            <span class="brand-badge">STAKE PRO</span>
          </a>

          <!-- Nav Links -->
          <nav class="nav-menu" id="nav-menu">
            <a href="index.html#promos" class="nav-link"><span class="nav-icon">🎁</span> Stake Bonuses</a>
            <a href="index.html#giveaways" class="nav-link"><span class="nav-icon">🏆</span> Discord & X Drops</a>
            <a href="leaderboard.html" class="nav-link nav-highlight-lb"><span class="nav-icon">👑</span> $25K Leaderboard</a>
            <a href="index.html#review" class="nav-link"><span class="nav-icon">🛡️</span> Why Stake</a>
          </nav>

          <!-- Right Actions -->
          <div class="nav-actions">
            <!-- Mute Toggle -->
            <button class="sound-toggle-btn" id="sound-toggle-btn" title="Toggle Audio Effects">
              <span id="sound-icon">🔊</span>
            </button>

            <!-- Claim Code CTA -->
            <button class="btn btn-primary btn-sm copy-promo-btn" data-code="MADA">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>CODE: <strong class="font-mono">MADA</strong></span>
            </button>

            <!-- Mobile menu trigger -->
            <button class="mobile-toggle" id="mobile-menu-btn">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Sub-bar Community Rewards Indicator -->
      <div class="live-bar">
        <div class="container live-bar-container">
          <div class="live-status">
            <span class="badge badge-discord">
              💬 DAILY DISCORD DROPS LIVE
            </span>
            <span class="live-stream-title">🔥 EXCLUSIVE CASH DROPS FOR CODE <b>BETMADA</b> USERS & WEEKLY X DROPS!</span>
          </div>
          <div class="live-meta">
            <button class="btn btn-discord btn-sm" id="nav-join-discord-btn">💬 Join Discord</button>
            <button class="btn btn-x btn-sm" id="nav-follow-x-btn">𝕏 Follow X</button>
          </div>
        </div>
      </div>

      <!-- Mobile App Bottom Navigation Bar -->
      <nav class="bottom-nav-bar" id="bottom-nav">
        <a href="index.html" class="bottom-nav-item" data-path="index.html">
          <span class="bottom-nav-icon">🏠</span>
          <span class="bottom-nav-label">Home</span>
        </a>
        <a href="index.html#promos" class="bottom-nav-item" data-path="index.html#promos">
          <span class="bottom-nav-icon">🎁</span>
          <span class="bottom-nav-label">Bonuses</span>
        </a>
        <a href="index.html#giveaways" class="bottom-nav-item" data-path="index.html#giveaways">
          <span class="bottom-nav-icon">💬</span>
          <span class="bottom-nav-label">Drops</span>
        </a>
        <a href="leaderboard.html" class="bottom-nav-item" data-path="leaderboard.html">
          <span class="bottom-nav-icon">👑</span>
          <span class="bottom-nav-label">Race</span>
        </a>
      </nav>

      <style>
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(18, 7, 32, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-purple);
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .brand-mascot-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--neon-purple);
          box-shadow: 0 0 14px var(--neon-purple-glow);
          background: #150a26;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mascot-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .brand-text {
          font-family: var(--font-main);
          font-weight: 900;
          font-size: 1.6rem;
          letter-spacing: -0.02em;
        }
        .text-silver {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
        .brand-badge {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(0, 231, 1, 0.2));
          border: 1px solid var(--border-purple);
          color: var(--neon-purple);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.18rem 0.55rem;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .nav-link:hover {
          color: var(--neon-purple);
        }
        .nav-highlight-lb {
          color: var(--cash-gold);
          font-weight: 700;
        }
        .nav-highlight-lb:hover {
          color: #ffffff;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .sound-toggle-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s ease;
        }
        .sound-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--border-purple);
        }

        /* Live community bar */
        .live-bar {
          background: linear-gradient(90deg, rgba(88, 101, 242, 0.2) 0%, rgba(27, 13, 46, 0.95) 50%, rgba(168, 85, 247, 0.2) 100%);
          border-bottom: 1px solid rgba(88, 101, 242, 0.3);
          padding: 0.45rem 0;
          font-size: 0.85rem;
        }
        .live-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .live-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .live-stream-title {
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .live-meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .mobile-toggle span {
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
        }

        @media (max-width: 992px) {
          .nav-menu { 
            display: none; 
            position: absolute;
            top: 76px;
            left: 0;
            width: 100%;
            background: rgba(18, 7, 32, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-purple);
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            gap: 1.25rem;
          }
          .nav-menu.mobile-active {
            display: flex;
          }
          .mobile-toggle { display: flex; }
          .live-stream-title { font-size: 0.75rem; }
          .nav-actions .copy-promo-btn { display: none; } /* Hide big copy btn on mobile navbar to save space */
        }
        
        /* Under 768px (Mobile phones) use bottom nav bar instead of hamburger */
        @media (max-width: 768px) {
          .mobile-toggle { display: none !important; }
          .nav-menu.mobile-active { display: none !important; }
          .live-bar-container { flex-direction: column; gap: 0.75rem; text-align: center; padding: 0.5rem 0; }
          .live-status { flex-direction: column; gap: 0.5rem; }
          .live-stream-title { white-space: normal; overflow: visible; font-size: 0.75rem; }
          .brand-text { font-size: 1.3rem; }
          .nav-actions { gap: 0.5rem; }
        }
      </style>
    `;
  }

  static attachEvents() {
    // Sound toggle listener
    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const muted = sounds.toggleMute();
        soundIcon.textContent = muted ? '🔇' : '🔊';
        ModalManager.showToast(muted ? 'Audio Muted' : 'Audio Enabled', 'info');
      });
    }

    // Copy promo code triggers
    document.querySelectorAll('.copy-promo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = btn.getAttribute('data-code') || 'BETMADA';
        navigator.clipboard.writeText(code).then(() => {
          sounds.playCopy();
          ModalManager.showToast(`Stake Code "${code}" Copied to Clipboard!`);
        });
      });
    });

    // Nav Join Discord trigger
    const discordNavBtn = document.getElementById('nav-join-discord-btn');
    if (discordNavBtn) {
      discordNavBtn.addEventListener('click', () => {
        sounds.playClick();
        window.open('https://discord.gg/mada', '_blank');
      });
    }

    // Nav Follow X trigger
    const xNavBtn = document.getElementById('nav-follow-x-btn');
    if (xNavBtn) {
      xNavBtn.addEventListener('click', () => {
        sounds.playClick();
        window.open('https://x.com', '_blank');
      });
    }

    // Mobile Menu Toggle logic (for tablets)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
      });
      // Close mobile menu when a link is clicked
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('mobile-active');
        });
      });
    }

    // Set Active State for Bottom Nav Bar
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
      const itemPath = item.getAttribute('data-path');
      if (itemPath === currentPath) {
        item.classList.add('active');
      }
    });
  }
}
