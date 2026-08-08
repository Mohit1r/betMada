/* ==========================================================================
   BETMADA MODAL MANAGER
   ========================================================================== */

export class ModalManager {
  static init() {
    let modalOverlay = document.getElementById('modal-overlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'modal-overlay';
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = `
        <div class="modal-container glass-card">
          <button class="modal-close" id="modal-close-btn">&times;</button>
          <div id="modal-body"></div>
        </div>
      `;
      document.body.appendChild(modalOverlay);

      // Add CSS for modal overlay dynamically if needed
      const style = document.createElement('style');
      style.textContent = `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(7, 18, 26, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .modal-container {
          position: relative;
          width: 100%;
          max-width: 620px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0f212e;
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          transform: translateY(20px) scale(0.95);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .modal-overlay.active .modal-container {
          transform: translateY(0) scale(1);
        }
        .modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .modal-close:hover {
          background: rgba(255, 42, 95, 0.2);
          color: #ff2a5f;
        }
      `;
      document.head.appendChild(style);

      // Event listeners
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) ModalManager.close();
      });
      document.getElementById('modal-close-btn').addEventListener('click', () => {
        ModalManager.close();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
          ModalManager.close();
        }
      });
    }
  }

  static open(htmlContent) {
    ModalManager.init();
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  static close() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  static showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#00e701' : '#00f0ff'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }
}
