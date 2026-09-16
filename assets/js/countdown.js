/**
 * Live Countdown Timer to Saturday, 21st November 2026, 10:00 AM WAT
 */
function initWeddingCountdown() {
  const targetTime = new Date(WEDDING_CONFIG.event.targetDateIso).getTime();

  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const bannerEl = document.getElementById("countdown-status");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (bannerEl) {
        bannerEl.textContent = "Today We Celebrate! Chika & Noble-Gold's Holy Matrimony";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format with leading zero
    daysEl.textContent = days < 10 ? "0" + days : days;
    hoursEl.textContent = hours < 10 ? "0" + hours : hours;
    minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", initWeddingCountdown);
