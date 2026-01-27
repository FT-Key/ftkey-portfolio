import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Sparkles, Code2, Zap, Layers } from "lucide-react";
import programmerImg from "../assets/images/programmer.webp";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const phrases = [
    "Desarrollador Frontend",
    "Especialista en React",
    "Creador de experiencias",
    "Arquitecto de código limpio",
    "Apasionado por el diseño"
  ];

  // Efecto de máquina de escribir
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        } else {
          // Pausa antes de borrar
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Borrando
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

  // Canvas con partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.reset();
      }

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

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Conectar partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
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

  const features = [
    { icon: Code2, text: "Clean Code" },
    { icon: Zap, text: "Performance" },
    { icon: Layers, text: "Scalable" }
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Canvas de fondo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Imagen de fondo con clip-path */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            clipPath: "polygon(50% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)",
            background: `url(${programmerImg}) center/cover no-repeat`,
            filter: "grayscale(30%)"
          }}
        />
        
        {/* Overlay con gradiente */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-transparent"
          style={{
            clipPath: "polygon(50% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)"
          }}
        />
      </div>

      {/* Gradientes decorativos */}
      <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      {/* Formas geométricas decorativas */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-accent/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 border border-accent/10 rotate-45 animate-float" style={{ borderRadius: "30%" }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl">
          
          {/* Badge superior */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-full mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent tracking-wide">Disponible para proyectos</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>

          {/* Título principal */}
          <div className="mb-8 space-y-4">
            <h1 
              className="text-6xl md:text-8xl font-black leading-none animate-fade-in relative z-20"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-primary block mb-2">Franco Nicolás</span>
              <span className="text-accent block">
                Toledo
              </span>
            </h1>
            
            {/* Línea decorativa */}
            <div 
              className="flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-accent/50 to-transparent rounded-full" />
            </div>
          </div>

          {/* Máquina de escribir */}
          <div 
            className="mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 text-3xl md:text-5xl font-bold h-20">
              <span className="text-secondary">&lt;</span>
              <span className="text-accent min-w-0">
                {typedText}
                <span className="inline-block w-1 h-8 md:h-12 bg-accent ml-1 animate-blink" />
              </span>
              <span className="text-secondary">/&gt;</span>
            </div>
          </div>

          {/* Descripción */}
          <p 
            className="text-xl md:text-2xl text-secondary leading-relaxed mb-12 max-w-3xl animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            Transformo ideas en <span className="text-accent font-semibold">experiencias digitales</span> excepcionales.
            Especializado en React y arquitectura moderna.
          </p>

          {/* Features inline */}
          <div 
            className="flex flex-wrap gap-6 mb-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-secondary/50 backdrop-blur-sm border border-border-primary rounded-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-primary font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Botones de acción */}
          <div 
            className="flex flex-wrap gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href="#proyectos"
              className="group relative px-8 py-4 bg-accent text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver proyectos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://github.com/FT-Key"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-secondary/80 backdrop-blur-sm border-2 border-border-primary text-primary font-bold rounded-xl hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>

          {/* Estadísticas */}
          <div 
            className="flex flex-wrap gap-8 animate-fade-in relative z-20"
            style={{ animationDelay: "0.8s" }}
          >
            {[
              { number: "12+", label: "Proyectos" },
              { number: "20+", label: "Tecnologías" },
              { number: "7+", label: "Años" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-accent relative">
                    {stat.number}
                  </span>
                  <span className="text-sm text-tertiary uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <div className="h-1 bg-gradient-to-r from-accent to-transparent rounded-full w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll mejorado */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-tertiary uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 border-2 border-border-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-scroll" />
        </div>
      </div>

      {/* Líneas decorativas laterales */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      <div className="absolute right-0 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;