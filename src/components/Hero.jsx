import { useEffect, useRef } from "react";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import programmerImg from "../assets/images/programmer.webp";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

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

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center px-6 overflow-hidden bg-primary">
      {/* Canvas de fondo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      {/* Gradiente decorativo */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Texto */}
        <div className="text-center md:text-left space-y-8">
          {/* Badge animado */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-primary rounded-full text-accent animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Frontend Developer</span>
          </div>

          {/* Título con efecto gradiente */}
          <div 
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-text-primary via-accent to-accent bg-clip-text text-transparent">
                Franco Toledo
              </span>
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent rounded-full" />
          </div>

          {/* Descripción */}
          <p 
            className="text-lg md:text-xl text-secondary max-w-xl leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Desarrollo interfaces modernas con{" "}
            <span className="text-accent font-semibold">React</span>, foco en arquitectura limpia,
            rendimiento y experiencia de usuario.
          </p>

          {/* Botones con efectos */}
          <div 
            className="flex gap-4 justify-center md:justify-start animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#proyectos"
              className="group relative px-6 py-3 bg-accent text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver proyectos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://github.com/FT-Key"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Estadísticas */}
          <div 
            className="flex gap-8 justify-center md:justify-start pt-8 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-accent">3+</div>
              <div className="text-sm text-tertiary">Proyectos</div>
            </div>
            <div className="w-px bg-border-primary" />
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-accent">2+</div>
              <div className="text-sm text-tertiary">Años</div>
            </div>
            <div className="w-px bg-border-primary" />
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-accent">6+</div>
              <div className="text-sm text-tertiary">Tecnologías</div>
            </div>
          </div>
        </div>

        {/* Imagen con efectos */}
        <div 
          className="hidden md:flex justify-center relative animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl animate-pulse-slow" />
          
          {/* Contenedor de imagen con efecto de brillo */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-hover rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative">
              <img
                src={programmerImg}
                alt="Franco Toledo - Frontend Developer"
                className="relative max-w-md w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Overlay decorativo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Elementos flotantes decorativos */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-accent/30 rounded-lg animate-float" />
          <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-accent/30 rounded-full animate-float-delayed" />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-border-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-scroll" />
        </div>
      </div>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 0.5s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;