import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const canvasRef = useRef(null);

  const links = useMemo(() => [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#sobreMi" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ], []);

  // 🔹 Scroll optimizado
  useEffect(() => {
    let ticking = false;

    const updateOnScroll = () => {
      setScrolled(window.scrollY > 50);

      let currentSection = null;
      for (const link of links) {
        const section = link.href.substring(1);
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection) setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  // 🔹 Canvas optimizado
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let running = true;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 32;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.2;
        this.opacity = Math.random() * 0.25 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const maxDist = 90;
    const maxDistSq = maxDist * maxDist;

    let lastTime = 0;
    const fps = 40;
    const interval = 1000 / fps;

    const animate = (time) => {
      if (!running) return;
      if (time - lastTime < interval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - distSq / maxDistSq)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) animationId = requestAnimationFrame(animate);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <nav className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 px-4 ${scrolled ? "py-5" : "py-8"}`}>
      <div className={`absolute inset-0 bg-primary/70 backdrop-blur-xl border border-border-primary/50 transition-all duration-500 ${
        scrolled ? "mx-auto max-w-[1400px] my-2 rounded-2xl shadow-lg shadow-accent/5" : "mx-0 my-0 rounded-none border-b border-t-0 border-x-0"
      }`} />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl transition-all duration-1000 ${scrolled ? "scale-75 opacity-50" : "scale-100 opacity-100"}`} />
        <div className={`absolute top-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl transition-all duration-1000 delay-100 ${scrolled ? "scale-75 opacity-50" : "scale-100 opacity-100"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center">
          <a href="#inicio" className="relative group">
            <div className="relative flex items-center gap-2">
              <div className={`transition-all duration-500 ${scrolled ? "text-2xl" : "text-3xl"} font-black tracking-tight`}>
                <span className="text-primary">FT</span>
                <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-accent">Key</span>
              </div>
              <Sparkles className={`text-accent transition-all duration-500 ${scrolled ? "w-4 h-4" : "w-5 h-5"} animate-pulse`} />
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a href={link.href} className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive ? "text-accent" : "text-secondary hover:text-primary"}`}>
                    {isActive && <span className="absolute inset-0 bg-accent/10 rounded-lg animate-fade-in" />}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a href="/CV_Toledo_Franco_Nicolas.pdf" download className="ml-4 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                CV
              </a>
            </li>
          </ul>

          <button onClick={() => setOpen(!open)} className="md:hidden relative p-2 text-primary">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
