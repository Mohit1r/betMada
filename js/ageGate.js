/* ==========================================================================
   BETMADA AGE VERIFICATION GATE (FRIDA'S GUARD)
   ========================================================================== */

export class AgeGate {
  static init() {
    // Check if user is already verified
    const status = localStorage.getItem('age-verified');
    
    if (status === 'true') {
      return; // Granted access
    }

    if (status === 'underage') {
      this.showFrida(); // Show dog pictures immediately
      return;
    }

    this.renderGate();
  }

  static renderGate() {
    const gateHtml = `
      <div id="frida-age-gate" class="age-gate-overlay">
        <div class="age-gate-card glass-card">
          <div class="gate-icon">🛡️</div>
          <h2 class="gate-title">Frida Wants Your Age</h2>
          <p class="gate-desc">Please verify your age before accessing the platform.</p>
          
          <div class="gate-input-group">
            <input type="number" id="age-input" placeholder="Enter your age" class="form-input font-mono" min="1" max="120">
            <button class="btn btn-primary" id="age-submit-btn">Verify</button>
          </div>
          <p id="age-error" class="gate-error"></p>
        </div>
      </div>
      <style>
        .age-gate-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100dvh;
          background: rgba(10, 3, 18, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999999; /* Stay above absolutely everything */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .age-gate-card {
          width: 100%;
          max-width: 420px;
          padding: 2.5rem 2rem;
          text-align: center;
          border: 2px solid var(--border-purple);
          box-shadow: 0 0 50px var(--neon-purple-glow);
          animation: gatePopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gate-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .gate-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .gate-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        .gate-input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .gate-input-group input {
          text-align: center;
          font-size: 1.5rem;
          padding: 1rem;
        }
        .gate-input-group .btn {
          font-size: 1.2rem;
          padding: 1rem;
        }
        .gate-error {
          color: #ff5f56;
          margin-top: 1rem;
          font-weight: 700;
          height: 20px;
        }
        @keyframes gatePopIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Frida Full Screen Gallery */
        .frida-gallery {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100dvh;
          background-color: #000;
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .frida-img {
          max-width: 90%;
          max-height: 80vh;
          border-radius: 20px;
          border: 4px solid var(--neon-purple);
          box-shadow: 0 0 40px var(--neon-purple-glow);
          object-fit: contain;
          margin-bottom: 1.5rem;
        }
        .frida-msg {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-main);
          text-align: center;
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', gateHtml);

    const submitBtn = document.getElementById('age-submit-btn');
    const input = document.getElementById('age-input');
    const errorMsg = document.getElementById('age-error');

    const handleVerify = () => {
      const ageStr = input.value.trim();
      if (!ageStr) {
        errorMsg.textContent = "Please enter an age.";
        return;
      }
      
      const age = parseInt(ageStr, 10);
      
      if (age > 21) {
        // Access Granted
        localStorage.setItem('age-verified', 'true');
        document.getElementById('frida-age-gate').remove();
      } else {
        // Access Denied - Show Frida
        localStorage.setItem('age-verified', 'underage');
        document.getElementById('frida-age-gate').remove();
        this.showFrida();
      }
    };

    submitBtn.addEventListener('click', handleVerify);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleVerify();
    });
  }

  static showFrida() {
    // Hide all normal content entirely
    document.body.innerHTML = '';
    
    // Inject Frida gallery
    const fridaHtml = `
      <div class="frida-gallery">
        <img src="assets/frida.jpg" alt="Frida the Dog" class="frida-img">
        <h2 class="frida-msg">You must be older than 21 to enter. Please enjoy these pictures of Frida instead! 🐶</h2>
      </div>
      <style>
        .frida-gallery {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100dvh;
          background-color: #000;
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .frida-img {
          max-width: 90%;
          max-height: 70vh;
          border-radius: 20px;
          border: 4px solid var(--neon-purple);
          box-shadow: 0 0 40px var(--neon-purple-glow);
          object-fit: cover;
          margin-bottom: 1.5rem;
        }
        .frida-msg {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 800;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          text-align: center;
          max-width: 600px;
          line-height: 1.4;
        }
      </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fridaHtml);
  }
}
