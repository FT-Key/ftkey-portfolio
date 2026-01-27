import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Sparkles, Code2, Zap, Layers } from "lucide-react";
import programmerImg from "../assets/images/programmer.webp";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef(null);

  // 🔹 Parallax refs
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const deco1Ref = useRef(null);
  const deco2Ref = useRef(null);

  const phrases = [
    "Desarrollador Frontend",
    "Especialista en React",
    "Creador de experiencias",
    "Arquitecto de código limpio",
    "Apasionado por el diseño"
  ];

  // ✍️ Máquina de escribir
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  // 🌌 Canvas partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
        this.opacity = Math.random() * 0.5;
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

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.1 * (1 - distance / 120)})`;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 🌄 PARALLAX SCROLL OPTIMIZADO
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      if (bgRef.current) bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      if (overlayRef.current) overlayRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      if (deco1Ref.current) deco1Ref.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      if (deco2Ref.current) deco2Ref.current.style.transform = `translateY(${scrollY * 0.2}px)`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: Code2, text: "Clean Code" },
    { icon: Zap, text: "Performance" },
    { icon: Layers, text: "Scalable" }
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Fondo PARALLAX */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            clipPath: "polygon(50% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)",
            background: `url(${programmerImg}) center/cover no-repeat`,
            filter: "grayscale(30%)"
          }}
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-transform bg-gradient-to-br from-primary via-primary/95 to-transparent"
        style={{
          clipPath: "polygon(50% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)"
        }}
      />

      {/* Decorativos PARALLAX */}
      <div ref={deco1Ref} className="absolute top-20 -right-40 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow will-change-transform" />
      <div ref={deco2Ref} className="absolute bottom-20 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow will-change-transform" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent tracking-wide">Disponible para proyectos</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            <span className="text-primary block">Franco Nicolás</span>
            <span className="text-accent block">Toledo</span>
          </h1>

          <div className="flex items-center gap-2 text-3xl md:text-5xl font-bold h-20 mb-8">
            <span className="text-secondary">&lt;</span>
            <span className="text-accent">{typedText}<span className="inline-block w-1 h-8 md:h-12 bg-accent ml-1 animate-blink" /></span>
            <span className="text-secondary">/&gt;</span>
          </div>

          <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-12 max-w-3xl">
            Transformo ideas en <span className="text-accent font-semibold">experiencias digitales</span> excepcionales.
          </p>

          <div className="flex flex-wrap gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3 px-5 py-3 bg-secondary/50 border rounded-xl">
                  <Icon className="w-5 h-5 text-accent" />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#proyectos" className="px-8 py-4 bg-accent text-white font-bold rounded-xl flex items-center gap-2">
              Ver proyectos <ArrowRight className="w-5 h-5" />
            </a>

            <a href="https://github.com/FT-Key" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 rounded-xl flex items-center gap-2">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
