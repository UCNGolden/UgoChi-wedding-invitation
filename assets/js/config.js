/**
 * Wedding Configuration & Personalization Data
 * For Chika Agatha & Noble-Gold Chukwubuikem
 * 
 * NOTE FOR COUPLE / ORGANIZER:
 * Any settings such as contact phone numbers, RSVP form webhook URL,
 * or extra gallery photos can easily be adjusted here.
 */
const WEDDING_CONFIG = {
  couple: {
    bride: "Chika Agatha",
    groom: "Noble-Gold Chukwubuikem",
    combined: "Chika & Noble-Gold",
    monogram: "NC",
    brideParents: "Mr & Mrs Vincent Jideofor of Obelagu Umana, Ezeagu L.G.A, Enugu State",
    groomParents: "Late Mr Benjamin Azagba Ederogun & Ms Josephine Utoh Ugochukwu of Jakpa, Warri North L.G.A, Delta State",
    whatsappContact: "+2348000000000", // <-- REPLACE with actual WhatsApp contact if desired
    emailContact: "celebrate@chika-noblegold.com" // <-- REPLACE with contact email if desired
  },
  event: {
    dateFormatted: "Saturday, 21st November, 2026",
    targetDateIso: "2026-11-21T10:00:00+01:00", // 10:00 AM West Africa Time (WAT)
    theme: "Holy Matrimony / Traditional Marriage",
    church: {
      name: "Our Lady of Lourdes Parish",
      location: "Maryland, Enugu",
      time: "10:00 AM Prompt",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Lourdes+Parish+Maryland+Enugu"
    },
    reception: {
      name: "Jideofor's Family Compound",
      location: "Obelagu Umana, Ezeagu L.G.A., Enugu State",
      time: "Immediately after Church Service",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Obelagu+Umana+Ezeagu+Enugu+State"
    },
    toast: "Time bends, but never breaks. Space stretches, yet never tears. Matter changes shape, but never truly leaves and so it is with us - through every season, every shift, every unknown, one truth holds, unmoving, unshaken - Our Love. Our Love, to Infinity",
    colors: [
      { name: "Royal Gold", hex: "#D4AF37", border: "#B78628", desc: "Symbolizing timeless elegance, prosperity, and divine joy" },
      { name: "Soft Peach", hex: "#F8C1A0", border: "#E8A27A", desc: "Symbolizing warmth, sweet affection, and new beginnings" },
      { name: "Burnt Orange", hex: "#CC5500", border: "#A04000", desc: "Symbolizing passionate devotion, vibrancy, and rich heritage" },
      { name: "Regal Purple", hex: "#63276D", border: "#46144E", desc: "Symbolizing nobility, dignity, grace, and spiritual unity" }
    ]
  },
  timeline: [
    { time: "09:30 AM", title: "Arrival of Guests", desc: "Guests seated in quiet reflection & prayer at the parish", icon: "church" },
    { time: "10:00 AM", title: "Solemnization of Holy Matrimony", desc: "Procession, Exchange of Nuptial Vows, Mass & Nuptial Blessing", icon: "rings" },
    { time: "12:30 PM", title: "Traditional Marriage Rites", desc: "Cultural entrance, Wine-carrying ceremony (Igba Nkwu) & family blessings", icon: "calabash" },
    { time: "02:00 PM", title: "Nuptial Banquet & Feasting", desc: "Lavish dining, refreshments, and celebration at Jideofor's Family Compound", icon: "utensils" },
    { time: "03:30 PM", title: "Cutting of the Cake & First Dance", desc: "The couple's first magical dance and celebratory toasts", icon: "music" },
    { time: "04:30 PM", title: "Celebration & Dance Floor", desc: "Joyful celebration, photo sessions, and dancing into the evening", icon: "heart" }
  ],
  rsvp: {
    // Optional webhook/service URL (e.g., https://formspree.io/f/YOUR_ID or Google Apps Script URL)
    endpointUrl: "", // Leave blank to use client-side storage & instant WhatsApp confirmation
    whatsappRecipient: "+2348000000000" // Form can send response directly to this number via WhatsApp
  }
};
