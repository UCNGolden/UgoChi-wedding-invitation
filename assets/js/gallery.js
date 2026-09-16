/**
 * Interactive Gallery & Lightbox for Chika & Noble-Gold's Wedding
 */
const GALLERY_ITEMS = [
  {
    src: "assets/images/couple-kiss.jpg",
    title: "Sealed With a Loving Kiss",
    caption: "Chika Agatha & Noble-Gold Chukwubuikem — A journey of eternal love and divine togetherness."
  },
  {
    src: "assets/images/couple-standing.jpg",
    title: "Regal Elegance & Harmony",
    caption: "Radiant in cultural splendor and modern grace as they prepare to unite as one."
  },
  {
    src: "assets/images/card-cover.jpg",
    title: "The Royal Wedding Emblem",
    caption: "Official Monogram 'NC' and invitation cover in regal purple and gold."
  },
  {
    src: "assets/images/card-details.jpg",
    title: "Solemnization & Family Proclamation",
    caption: "The sacred announcement from the Jideofor & Ederogun/Ugochukwu families."
  }
];

class WeddingGallery {
  constructor() {
    this.currentIndex = 0;
    this.lightbox = null;
    this.imgEl = null;
    this.titleEl = null;
    this.captionEl = null;
    this.counterEl = null;
    this.touchStartX = 0;
  }

  init() {
    this.lightbox = document.getElementById("gallery-lightbox");
    this.imgEl = document.getElementById("lightbox-img");
    this.titleEl = document.getElementById("lightbox-title");
    this.captionEl = document.getElementById("lightbox-caption");
    this.counterEl = document.getElementById("lightbox-counter");

    // Attach click events to gallery items
    const cards = document.querySelectorAll(".gallery-item");
    cards.forEach((card, idx) => {
      card.addEventListener("click", () => this.open(idx));
    });

    // Close button
    const closeBtn = document.getElementById("lightbox-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Prev / Next buttons
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    if (prevBtn) prevBtn.addEventListener("click", () => this.prev());
    if (nextBtn) nextBtn.addEventListener("click", () => this.next());

    // Backdrop click
    if (this.lightbox) {
      this.lightbox.addEventListener("click", (e) => {
        if (e.target === this.lightbox) this.close();
      });
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains("active")) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Touch swipe support
    if (this.lightbox) {
      this.lightbox.addEventListener("touchstart", (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.lightbox.addEventListener("touchend", (e) => {
        const diffX = e.changedTouches[0].screenX - this.touchStartX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) this.prev();
          else this.next();
        }
      }, { passive: true });
    }
  }

  open(index) {
    this.currentIndex = index;
    this.updateContent();
    this.lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    this.updateContent();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % GALLERY_ITEMS.length;
    this.updateContent();
  }

  updateContent() {
    const item = GALLERY_ITEMS[this.currentIndex];
    if (!item) return;

    this.imgEl.src = item.src;
    this.imgEl.alt = item.title;
    this.titleEl.textContent = item.title;
    this.captionEl.textContent = item.caption;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${GALLERY_ITEMS.length}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const gallery = new WeddingGallery();
  gallery.init();
});
