import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Heart, ArrowUp, Sparkles, Code2 } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Canvas con olas animadas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    function drawWave(y, amplitude, frequency, phase, opacity) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x++) {
        const waveY = y + Math.sin((x * frequency) + phase + time) * amplitude;
        ctx.lineTo(x, waveY);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
      gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawWave(canvas.height * 0.5, 20, 0.01, 0, 0.1);
      drawWave(canvas.height * 0.6, 15, 0.012, 1, 0.08);
      drawWave(canvas.height * 0.7, 25, 0.008, 2, 0.06);

      time += 0.02;
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: Github,
      href: "https://github.com/FT-Key",
      label: "GitHub",
      color: "from-gray-600 to-gray-400"
    },
    {
      icon: Mail,
      href: "#contacto",
      label: "Contacto",
      color: "from-purple-600 to-purple-400"
    }
  ];

  const quickLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#sobreMi" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyectos", href: "#proyectos" },
  ];

  return (
    <footer 
      ref={sectionRef}
      className="relative bg-primary border-t border-border-primary overflow-hidden"
    >
      {/* Canvas de fondo con olas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Gradientes decorativos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      {/* Grid decorativo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgb(var(--color-accent)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-accent)) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Columna 1: Brand */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl font-black">
                <span className="text-primary">FT</span>
                <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">Key</span>
              </div>
              <Code2 className="w-6 h-6 text-accent" />
            </div>
            <p className="text-secondary leading-relaxed mb-6">
              Desarrollando experiencias web modernas con React y las últimas tecnologías.
            </p>
            
            {/* Social links con efectos */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative p-3 bg-secondary border border-border-primary rounded-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-br ${social.color} rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`} />
                    <Icon className="relative w-5 h-5 text-secondary group-hover:text-accent transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna 2: Quick Links */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Navegación rápida
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-border-primary group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contact info */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-lg font-bold text-primary mb-6">
              Hablemos
            </h3>
            <div className="space-y-4">
              <a
                href="#contacto"
                className="group block p-4 bg-secondary border border-border-primary rounded-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-tertiary">Email</div>
                    <div className="text-primary font-medium">Enviar mensaje</div>
                  </div>
                </div>
              </a>

              <a
                href="/CV_Toledo_Franco_Nicolas.pdf"
                download
                className="group block p-4 bg-gradient-to-br from-accent to-accent-hover text-white rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Descargar CV</span>
                  <ArrowUp className="w-5 h-5 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider con efecto */}
        <div className="relative h-px bg-border-primary mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            className={`text-secondary text-sm transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            © {new Date().getFullYear()} Franco Nicolás Toledo. Hecho con{" "}
            <Heart className="inline w-4 h-4 text-red-500 animate-pulse" />{" "}
            y React
          </p>

          {/* Tags decorativos */}
          <div 
            className={`flex gap-2 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {["React", "Tailwind", "Canvas"].map((tech, index) => (
              <span 
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-secondary border border-border-primary text-tertiary rounded-full hover:border-accent hover:text-accent transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-accent text-white rounded-full shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-110 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
        
        {/* Anillo decorativo */}
        <div className="absolute -inset-1 border-2 border-accent rounded-full animate-ping opacity-50" />
      </button>
    </footer>
  );
};

export default Footer;