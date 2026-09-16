# Wedding Invitation Website: Chika Agatha & Noble-Gold Chukwubuikem (UgoChi)

An interactive, responsive digital wedding invitation website celebrating the **Solemnization of Holy Matrimony & Traditional Marriage** of **Chika Agatha** and **Noble-Gold Chukwubuikem** in Enugu, Nigeria.

Designed with inspiration from the couple's official royal invitation card and digital wedding media.

---

## 💍 Event Summary
- **Bride:** Chika Agatha
- **Groom:** Noble-Gold Chukwubuikem
- **Date:** Saturday, 21st November 2026
- **Holy Matrimony (Church):** 10:00 AM Prompt @ *Our Lady of Lourdes Parish, Maryland, Enugu*
- **Reception & Traditional Marriage:** Immediately after service @ *Jideofor's Family Compound, Obelagu Umana, Ezeagu L.G.A., Enugu State*
- **Colours of the Day:** Gold, Peach, Burnt Orange, and Purple
- **Love Quote:** *"Time bends, but never breaks. Space stretches, yet never tears. Matter changes shape, but never truly leaves and so it is with us - through every season, every shift, every unknown, one truth holds, unmoving, unshaken - Our Love. Our Love, to Infinity"*

---

## ✨ Features & Highlights
1. **Envelope Entrance Experience:**
   - Animated welcome card featuring the official couple monogram (`NC`), wedding date, and an *"Open Invitation"* button.
   - Smooth entrance unfold animation into the main invitation.

2. **Ambient Romantic Music Player:**
   - Autonomous procedural ambient harp and piano arpeggios using the **Web Audio API** (zero latency, offline capable, no external audio downloads required).
   - Support for custom `.mp3` audio files placed in `assets/audio/wedding-melody.mp3`.
   - Floating gold audio controller badge with animated equalizer sound-wave bars.

3. **Live Countdown Timer:**
   - Real-time days, hours, minutes, and seconds remaining until Saturday, 21st November 2026, 10:00 AM WAT.

4. **Our Wedding Section with Photo Backdrop:**
   - Atmospheric full-width backdrop featuring portrait **image 9133** behind a frosted glassmorphic proclamation card.
   - Proclamation honoring the parents of the bride and groom.

5. **Event Details & Direct Actions:**
   - Dedicated cards for Holy Matrimony and Reception/Traditional Marriage.
   - One-tap **Google Maps** directions.
   - **Google Calendar** direct event link + downloadable `.ics` iCalendar file for Apple Calendar, Outlook, and Android.

6. **Colours of the Day Showcase:**
   - Color chips for Gold, Peach, Burnt Orange, and Purple with cultural symbolism and hex codes.

7. **Interactive Memories & Gallery Lightbox:**
   - Curated 8-photo responsive gallery featuring the couple's pre-wedding & engagement portraits and royal monogram art.
   - Fullscreen lightbox modal with keyboard navigation (Esc, Left, Right) and mobile touch-swipe support.

8. **Share & Guest Actions:**
   - Mobile Web Share API integration with automatic fallback share modal (WhatsApp direct share & Copy link).
   - Direct WhatsApp message link to contact the couple.

---

## ⚙️ Configuration & Customization
All customizable details are centralized in [`assets/js/config.js`](assets/js/config.js):

- **Couple Details:** Names, parentage, phone numbers, contact email.
- **Venues & Coordinates:** Google Maps links, event timings.
- **WhatsApp Recipient:** Set `WEDDING_CONFIG.couple.whatsappContact` to the desired Nigerian or international phone number (e.g., `+2348030000000`).

---

## 🚀 Local Preview
Open `index.html` directly in any modern web browser, or run a local static server:
```bash
# Using Node.js http-server or npx serve
npx serve .
# Or Python
python -m http.server 8080
```
Then visit `http://localhost:8080` (or `http://localhost:3000`).

---

## 🌐 Deployment
Hosted on **GitHub Pages**:
- **Repository:** https://github.com/UCNGolden/UgoChi-wedding-invitation
- **Live Website:** https://ucngolden.github.io/UgoChi-wedding-invitation/
