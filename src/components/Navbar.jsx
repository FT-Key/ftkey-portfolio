import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const canvasRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  const links = useMemo(
    () => [
      { label: "Inicio", href: "#inicio" },
      { label: "Sobre mí", href: "#sobreMi" },
      { label: "Habilidades", href: "#habilidades" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Contacto", href: "#contacto" },
    ],
    []
  );

  /* ================= NAV HEIGHT ================= */
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [scrolled]);

  /* ================= SCROLL ================= */
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

  /* ================= BODY LOCK + ESC ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ================= CANVAS ================= */
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

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 px-4 ${
          scrolled ? "py-5" : "py-8"
        }`}
      >
        <div className={`absolute inset-0 bg-primary/70 backdrop-blur-xl border border-border-primary/50 transition-all duration-500 pointer-events-none ${
          scrolled
            ? "mx-auto max-w-[1400px] my-2 rounded-2xl shadow-lg shadow-accent/5"
            : "mx-0 my-0 rounded-none border-b border-t-0 border-x-0"
        }`} />

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center">
            <a href="#inicio" className="flex items-center gap-2">
              <div className={`font-black tracking-tight ${scrolled ? "text-2xl" : "text-3xl"}`}>
                <span className="text-primary">FT</span>
                <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-accent">Key</span>
              </div>
              <Sparkles className="text-accent w-5 h-5 animate-pulse" />
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {links.map(link => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href}>
                    <a href={link.href} className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                      isActive ? "text-accent" : "text-secondary hover:text-primary"
                    }`}>
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="/CV_Toledo_Franco_Nicolas.pdf" download className="ml-4 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg flex items-center gap-2">
                  <Download className="w-4 h-4" /> CV
                </a>
              </li>
            </ul>

            <button onClick={() => setOpen(!open)} className="md:hidden relative z-50 p-2 text-primary" aria-label="Abrir menú">
              {open ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`} />

      {/* Mobile menu */}
      <div
        ref={menuRef}
        style={{ top: navHeight }}
        className={`md:hidden fixed left-0 w-full px-4 transition-all duration-500 ease-out z-50 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl backdrop-blur-xl bg-primary/95 border border-border-primary/50 shadow-2xl overflow-hidden">
          <ul className="flex flex-col items-center text-center p-6 gap-6 text-lg font-semibold">
            {links.map(link => (
              <li key={link.href} className="w-full">
                <a href={link.href} onClick={() => setOpen(false)} className="block py-3 rounded-xl hover:bg-accent/10 transition">
                  {link.label}
                </a>
              </li>
            ))}
            <li className="w-full pt-4 border-t border-border-primary/40">
              <a href="/CV_Toledo_Franco_Nicolas.pdf" download onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl text-lg font-semibold">
                <Download className="w-5 h-5" /> Descargar CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
