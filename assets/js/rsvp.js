/**
 * RSVP Handler & Guest Submission Manager
 * Provides validation, localStorage persistence, celebratory modal,
 * and direct WhatsApp RSVP integration.
 */
class WeddingRSVPManager {
  constructor() {
    this.form = null;
    this.modal = null;
  }

  init() {
    this.form = document.getElementById("wedding-rsvp-form");
    this.modal = document.getElementById("rsvp-success-modal");

    if (!this.form) return;

    this.checkExistingRSVP();

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    const closeBtn = document.getElementById("rsvp-modal-close");
    if (closeBtn && this.modal) {
      closeBtn.addEventListener("click", () => {
        this.modal.classList.remove("active");
      });
    }

    // Modal backdrop click
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.modal.classList.remove("active");
        }
      });
    }
  }

  checkExistingRSVP() {
    const saved = localStorage.getItem("wedding_rsvp_chika_noblegold");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const noticeEl = document.getElementById("existing-rsvp-notice");
        if (noticeEl) {
          noticeEl.innerHTML = `
            <div class="existing-rsvp-card">
              <span class="badge-gold">✓ You have already RSVP'd</span>
              <p>Welcome back, <strong>${data.name}</strong>! Your attendance is registered: <em>${data.attendance}</em> (${data.guests} guest${data.guests > 1 ? 's' : ''}). You can update your response below anytime.</p>
            </div>
          `;
          noticeEl.style.display = "block";
        }
        // Pre-fill form
        if (this.form.elements["guest-name"]) this.form.elements["guest-name"].value = data.name || "";
        if (this.form.elements["guest-phone"]) this.form.elements["guest-phone"].value = data.phone || "";
        if (this.form.elements["guest-email"]) this.form.elements["guest-email"].value = data.email || "";
        if (this.form.elements["guest-count"]) this.form.elements["guest-count"].value = data.guests || "1";
        if (this.form.elements["guest-events"]) this.form.elements["guest-events"].value = data.events || "both";
        if (this.form.elements["guest-message"]) this.form.elements["guest-message"].value = data.message || "";
        if (this.form.elements["guest-attendance"]) {
          const radio = this.form.querySelector(`input[name="guest-attendance"][value="${data.attendanceKey}"]`);
          if (radio) radio.checked = true;
        }
      } catch (err) {
        console.warn("Could not parse existing RSVP:", err);
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const name = this.form.elements["guest-name"].value.trim();
    const phone = this.form.elements["guest-phone"].value.trim();
    const email = this.form.elements["guest-email"].value.trim();
    const guests = this.form.elements["guest-count"].value;
    const events = this.form.elements["guest-events"].value;
    const message = this.form.elements["guest-message"].value.trim();
    const attendanceRadio = this.form.querySelector('input[name="guest-attendance"]:checked');

    if (!name) {
      alert("Please enter your full name.");
      return;
    }

    if (!attendanceRadio) {
      alert("Please select whether you will attend.");
      return;
    }

    const attendanceKey = attendanceRadio.value;
    const attendanceText = attendanceKey === "yes" ? "Joyfully Attending" : "Regretfully Declining";

    const rsvpData = {
      name,
      phone,
      email,
      attendance: attendanceText,
      attendanceKey,
      guests: attendanceKey === "yes" ? guests : "0",
      events: attendanceKey === "yes" ? events : "N/A",
      message,
      submittedAt: new Date().toISOString()
    };

    // Save locally
    localStorage.setItem("wedding_rsvp_chika_noblegold", JSON.stringify(rsvpData));

    // Optional remote submission if endpoint configured
    if (WEDDING_CONFIG.rsvp.endpointUrl) {
      try {
        await fetch(WEDDING_CONFIG.rsvp.endpointUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(rsvpData)
        });
      } catch (err) {
        console.warn("Remote endpoint error, saved locally:", err);
      }
    }

    // Build WhatsApp message for one-tap sending
    const waText = encodeURIComponent(
      `*Wedding RSVP for Chika & Noble-Gold*\n` +
      `👤 *Name:* ${name}\n` +
      `💌 *Status:* ${attendanceText}\n` +
      `👥 *Guests:* ${rsvpData.guests}\n` +
      `⛪ *Events:* ${rsvpData.events}\n` +
      (phone ? `📞 *Phone:* ${phone}\n` : "") +
      (message ? `💬 *Message:* "${message}"\n` : "") +
      `\nSent from the Wedding Invitation Website`
    );

    const waLink = `https://wa.me/${WEDDING_CONFIG.rsvp.whatsappRecipient.replace(/[^0-9]/g, "")}?text=${waText}`;

    // Update Success Modal UI
    const modalName = document.getElementById("rsvp-modal-name");
    const modalStatus = document.getElementById("rsvp-modal-status");
    const waBtn = document.getElementById("rsvp-whatsapp-btn");

    if (modalName) modalName.textContent = name;
    if (modalStatus) {
      modalStatus.textContent = attendanceKey === "yes" 
        ? "We are thrilled to celebrate with you!" 
        : "Thank you for letting us know. You will be in our thoughts!";
    }
    if (waBtn) {
      waBtn.href = waLink;
      waBtn.style.display = "inline-flex";
    }

    // Trigger celebratory confetti effect
    this.launchConfetti();

    // Show modal
    if (this.modal) {
      this.modal.classList.add("active");
    }
  }

  launchConfetti() {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    container.innerHTML = "";
    const colors = ["#D4AF37", "#ECC880", "#F8C1A0", "#CC5500", "#7B287D", "#FFFFFF"];

    for (let i = 0; i < 40; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = Math.random() * 100 + "%";
      piece.style.top = "-10px";
      piece.style.width = (Math.random() * 8 + 6) + "px";
      piece.style.height = (Math.random() * 12 + 8) + "px";
      piece.style.animationDelay = (Math.random() * 1.5) + "s";
      piece.style.animationDuration = (Math.random() * 2 + 2) + "s";
      container.appendChild(piece);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const rsvp = new WeddingRSVPManager();
  rsvp.init();
});
