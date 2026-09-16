/**
 * Main Controller for Chika Agatha & Noble-Gold Chukwubuikem's Wedding
 * Features:
 * - Envelope Opening Entrance Experience
 * - Calendar Integration (.ics & Google Calendar)
 * - Share Modal & Web Share API
 * - Mobile Navigation & Smooth Scroll
 * - Intersection Observer Reveal Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  initEnvelopeExperience();
  initNavigation();
  initCalendarIntegrations();
  initShareFeatures();
  initScrollAnimations();
});

/* ----------------------------------------------------
   1. ENVELOPE / WELCOME ENTRANCE EXPERIENCE
---------------------------------------------------- */
function initEnvelopeExperience() {
  const envelopeOverlay = document.getElementById("envelope-entrance-screen");
  const openBtn = document.getElementById("open-invitation-btn");

  if (!envelopeOverlay || !openBtn) return;

  openBtn.addEventListener("click", () => {
    // Trigger opening sound/music
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // Animate envelope unfold & fade
    envelopeOverlay.classList.add("envelope-opening");

    setTimeout(() => {
      envelopeOverlay.classList.add("envelope-hidden");
      document.body.classList.remove("envelope-locked");
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  });
}

/* ----------------------------------------------------
   2. MOBILE NAVIGATION & SMOOTH SCROLL
---------------------------------------------------- */
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("main-navbar");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      navMenu.classList.toggle("is-open", !expanded);
      navToggle.classList.toggle("is-active", !expanded);
    });

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          navMenu.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.classList.remove("is-active");

          const target = document.querySelector(href);
          if (target) {
            const navHeight = navbar ? navbar.offsetHeight : 70;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
              top: targetPos,
              behavior: "smooth"
            });
          }
        }
      });
    });
  }

  // Sticky header background on scroll
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 80) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    }
  }, { passive: true });
}

/* ----------------------------------------------------
   3. CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
---------------------------------------------------- */
function initCalendarIntegrations() {
  const googleCalBtns = document.querySelectorAll(".btn-google-calendar");
  const icsBtns = document.querySelectorAll(".btn-ics-calendar");

  const eventTitle = "Wedding: Chika Agatha & Noble-Gold Chukwubuikem";
  const eventDetails = "Holy Matrimony & Traditional Marriage\nChurch: Our Lady of Lourdes Parish, Maryland, Enugu (10:00 AM WAT)\nReception & Traditional: Jideofor's Family Compound, Obelagu Umana, Ezeagu L.G.A, Enugu State.\nTheme: Holy Matrimony / Traditional Marriage\nColours: Gold, Peach, Burnt Orange and Purple";
  const eventLocation = "Our Lady of Lourdes Parish, Maryland, Enugu, Nigeria";

  // Google Calendar URL (UTC: 2026-11-21 09:00:00 to 18:00:00)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=20261121T090000Z/20261121T180000Z&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

  googleCalBtns.forEach(btn => {
    btn.href = gcalUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // ICS file download generator
  icsBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadIcsFile(eventTitle, eventDetails, eventLocation);
    });
  });
}

function downloadIcsFile(title, description, location) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chika and Noble-Gold//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-chika-noblegold-2026@invitation.com",
    "DTSTAMP:20260915T120000Z",
    "DTSTART:20261121T090000Z",
    "DTEND:20261121T180000Z",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.download = "Chika-and-Noble-Gold-Wedding.ics";
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  URL.revokeObjectURL(url);
}

/* ----------------------------------------------------
   4. SHARE FEATURES & MODAL
---------------------------------------------------- */
function initShareFeatures() {
  const shareTriggerBtns = document.querySelectorAll(".btn-share-invitation");
  const shareModal = document.getElementById("share-modal");
  const shareCloseBtn = document.getElementById("share-modal-close");
  const copyBtn = document.getElementById("share-copy-link-btn");
  const copyNotice = document.getElementById("share-copy-status");
  const whatsappShareBtn = document.getElementById("share-whatsapp-btn");

  const shareTitle = "Wedding Invitation: Chika & Noble-Gold";
  const shareText = "You are cordially invited to the Solemnization of Holy Matrimony & Traditional Marriage of Chika Agatha & Noble-Gold Chukwubuikem on Saturday, 21st November 2026 in Enugu.";
  const shareUrl = window.location.href;

  if (whatsappShareBtn) {
    whatsappShareBtn.href = `https://wa.me/?text=${encodeURIComponent(shareTitle + "\n" + shareText + "\n\n" + shareUrl)}`;
  }

  shareTriggerBtns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
          });
          return;
        } catch (err) {
          // Fallback to modal
        }
      }

      if (shareModal) {
        shareModal.classList.add("active");
      }
    });
  });

  if (shareCloseBtn && shareModal) {
    shareCloseBtn.addEventListener("click", () => {
      shareModal.classList.remove("active");
    });
  }

  if (shareModal) {
    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) {
        shareModal.classList.remove("active");
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (copyNotice) {
          copyNotice.style.display = "block";
          setTimeout(() => {
            copyNotice.style.display = "none";
          }, 3000);
        }
      }).catch(() => {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = shareUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        if (copyNotice) copyNotice.style.display = "block";
      });
    });
  }
}

/* ----------------------------------------------------
   5. INTERSECTION OBSERVER SCROLL ANIMATIONS
---------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}
