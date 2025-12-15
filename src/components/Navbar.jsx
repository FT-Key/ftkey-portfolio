import { useState, useEffect, useRef } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const canvasRef = useRef(null);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#sobreMi" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = links.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas con efecto de partículas mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 40;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 1.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Conectar partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <nav 
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 px-4 ${
        scrolled 
          ? "py-3" 
          : "py-5"
      }`}
    >
      {/* Glassmorphism background */}
      <div 
        className={`absolute inset-0 bg-primary/70 backdrop-blur-xl border border-border-primary/50 transition-all duration-500 ${
          scrolled 
            ? "mx-4 my-2 rounded-2xl shadow-lg shadow-accent/5"
            : "mx-0 my-0 rounded-none border-b border-t-0 border-x-0"
        }`}
        style={{
          clipPath: scrolled 
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
        }}
      />
      
      {/* Canvas de fondo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* Gradient mesh decorativo */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl transition-all duration-1000 ${
          scrolled ? "scale-75 opacity-50" : "scale-100 opacity-100"
        }`} />
        <div className={`absolute top-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl transition-all duration-1000 delay-100 ${
          scrolled ? "scale-75 opacity-50" : "scale-100 opacity-100"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo con efecto */}
          <a 
            href="#inicio" 
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-accent to-accent-hover rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
            <div className="relative flex items-center gap-2">
              <div className={`transition-all duration-500 ${
                scrolled ? "text-2xl" : "text-3xl"
              } font-black tracking-tight`}>
                <span className="text-primary">FT</span>
                <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">Key</span>
              </div>
              <Sparkles className={`text-accent transition-all duration-500 ${
                scrolled ? "w-4 h-4" : "w-5 h-5"
              } animate-pulse`} />
            </div>
          </a>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "text-accent" 
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {/* Indicador activo */}
                    {isActive && (
                      <span className="absolute inset-0 bg-accent/10 rounded-lg animate-fade-in" />
                    )}
                    <span className="relative">{link.label}</span>
                    
                    {/* Underline animado */}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-accent to-accent-hover rounded-full transition-all duration-300 ${
                      isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                    }`} />
                  </a>
                </li>
              );
            })}
            
            {/* Botón CV con efecto especial */}
            <li>
              <a
                href="/CV_Toledo_Franco_Nicolas.pdf"
                download
                className="group relative ml-4 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  CV
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </li>
          </ul>

          {/* Mobile button con animación */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative p-2 text-primary hover:text-accent transition-colors duration-300"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`} 
              />
              <X 
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu con animación mejorada */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative bg-secondary/95 backdrop-blur-xl border-t border-border-primary/50">
          {/* Gradient decorativo */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          
          <ul className="relative px-6 py-6 space-y-2">
            {links.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li 
                  key={link.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-accent/10 text-accent border-l-4 border-accent"
                        : "text-secondary hover:text-primary hover:bg-primary/50 border-l-4 border-transparent"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <a
                href="/CV_Toledo_Franco_Nicolas.pdf"
                download
                className="flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Descargar CV
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;