/**
 * Romantic Golden Sparkles & Floating Petals Canvas
 * Optimized for 60FPS mobile & desktop rendering
 */
class ParticlesBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.animId = null;
    this.maxParticles = window.innerWidth < 768 ? 25 : 45;
  }

  init() {
    this.canvas = document.getElementById("particles-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Generate initial particles
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }

    // Tab visibility handling
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animId);
      } else {
        this.animate();
      }
    });

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle(randomY = false) {
    const isPetal = Math.random() > 0.65;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: isPetal ? (Math.random() * 6 + 4) : (Math.random() * 2.5 + 1),
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.04 + 0.01,
      isPetal: isPetal,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      // Gold sparkle or peach petal
      color: isPetal 
        ? (Math.random() > 0.5 ? "rgba(248, 193, 160, " : "rgba(224, 180, 235, ")
        : "rgba(212, 175, 55, "
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.y += p.speedY;
      p.x += p.speedX;
      p.pulse += p.pulseSpeed;
      p.rotation += p.rotationSpeed;

      const alpha = Math.max(0.1, p.opacity * (0.6 + 0.4 * Math.sin(p.pulse)));

      if (p.isPetal) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color + alpha + ")";
        this.ctx.beginPath();
        // Gentle petal shape
        this.ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      } else {
        // Gold dust sparkle with soft glow
        this.ctx.fillStyle = p.color + alpha + ")";
        this.ctx.shadowColor = "rgba(243, 229, 171, 0.8)";
        this.ctx.shadowBlur = p.size * 2;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }

      // Recycle off-screen particles
      if (p.y > this.height + 20 || p.x < -30 || p.x > this.width + 30) {
        this.particles[i] = this.createParticle(false);
      }
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const bg = new ParticlesBackground();
  bg.init();
});
