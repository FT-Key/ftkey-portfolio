import { useEffect, useRef, useState } from "react";
import { Layers, Zap, Code2, Sparkles } from "lucide-react";
import gsap from "gsap";

const features = [
  {
    icon: Layers,
    title: "Estructurado",
    text: "Desarrollo sistemas organizados y escalables aplicando buenas prácticas y arquitectura limpia.",
    color: "from-blue-500 to-cyan-500",
    delay: "0.1s",
    particles: 15
  },
  {
    icon: Zap,
    title: "Reactivo",
    text: "Construyo interfaces dinámicas y responsivas con React, priorizando rendimiento y UX.",
    color: "from-purple-500 to-pink-500",
    delay: "0.2s",
    particles: 12
  },
  {
    icon: Code2,
    title: "Código limpio",
    text: "Escribo código mantenible, claro y reutilizable con foco en sostenibilidad a largo plazo.",
    color: "from-orange-500 to-red-500",
    delay: "0.3s",
    particles: 18
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const canvasRefs = useRef([]);
  const featureCardsRef = useRef([]);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          setIsVisible(true);
          animatedRef.current = true;

          // Animar título
          gsap.from(".about-label", {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.out"
          });

          gsap.from(".about-title", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.1,
            ease: "back.out(1.7)"
          });

          gsap.from(".about-subtitle", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            delay: 0.2,
            ease: "power2.out"
          });

          gsap.from(".about-divider", {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "back.out(1.7)"
          });

          // Animar feature cards con stagger
          const cards = featureCardsRef.current;
          if (cards.length > 0) {
            gsap.from(cards, {
              opacity: 0,
              y: 50,
              rotationX: -15,
              duration: 0.9,
              stagger: {
                amount: 0.4,
                ease: "power2.inOut"
              },
              ease: "back.out(1.7)",
              transformPerspective: 1200,
              delay: 0.4
            });
          }

          // Animar stats section
          gsap.from(".about-stats", {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.8,
            delay: 1,
            ease: "back.out(1.7)"
          });

          // Animar el círculo de progreso
          const circles = document.querySelectorAll(".progress-circle");
          circles.forEach((circle) => {
            const totalLength = circle.getTotalLength ? circle.getTotalLength() : 0;
            if (totalLength > 0) {
              gsap.from(circle, {
                strokeDashoffset: totalLength,
                duration: 2,
                delay: 1.2,
                ease: "power4.out"
              });
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animación de partículas para cada card - OPTIMIZADO
  useEffect(() => {
    const animations = canvasRefs.current.map((canvas, idx) => {
      if (!canvas) return null;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return null;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const particles = [];
      const particleCount = features[idx].particles;

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.2;
          this.vy = (Math.random() - 0.5) * 0.2;
          this.radius = Math.random() * 1.5 + 0.3;
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
          
          // Color según el feature
          if (idx === 0) ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
          if (idx === 1) ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
          if (idx === 2) ctx.fillStyle = `rgba(249, 115, 22, ${this.opacity})`;
          
          ctx.fill();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      let frameCount = 0;
      let animationId;
      function animate() {
        frameCount++;
        
        // Actualizar partículas cada 2 frames para mejor performance
        if (frameCount % 2 === 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            particle.update();
            particle.draw();
          });

          // Conectar partículas cercanas - optimizado
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distSq = dx * dx + dy * dy;
              const maxDist = 80;

              if (distSq < maxDist * maxDist) {
                const distance = Math.sqrt(distSq);
                ctx.beginPath();
                
                if (idx === 0) ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / maxDist)})`;
                if (idx === 1) ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / maxDist)})`;
                if (idx === 2) ctx.strokeStyle = `rgba(249, 115, 22, ${0.1 * (1 - distance / maxDist)})`;
                
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
        }

        animationId = requestAnimationFrame(animate);
      }

      animate();

      return () => cancelAnimationFrame(animationId);
    });

    return () => {
      animations.forEach(cleanup => cleanup && cleanup());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="sobreMi" 
      className="relative py-32 px-6 bg-secondary overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      {/* Líneas decorativas SVG animadas */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent"/>
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "currentColor", stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: "currentColor", stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: "currentColor", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" mask="url(#fadeGradient)" />
      </svg>

      {/* Formas geométricas flotantes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent/10 rounded-full animate-float" />
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-accent/10 rotate-45 animate-float-delayed" style={{ borderRadius: "20%" }} />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-accent/10 animate-spin-slow" style={{ borderRadius: "30%" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título con efectos mejorados */}
        <div className="text-center mb-24">
          <div className="about-label inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">
              Sobre mí
            </span>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          
          <h2 className="about-title text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent animate-gradient-x">
              Mi enfoque de desarrollo
            </span>
          </h2>
          
          <p className="about-subtitle text-secondary text-lg max-w-2xl mx-auto mb-8">
            Combino creatividad y código para construir experiencias web excepcionales
          </p>
          
          <div className="about-divider flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </div>

        {/* Grid de características con diseño único */}
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={el => featureCardsRef.current[index] = el}
                className="group relative will-change-transform"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card con forma orgánica */}
                <div className="relative h-full overflow-hidden">
                  {/* Canvas de fondo para partículas */}
                  <canvas 
                    ref={el => canvasRefs.current[index] = el}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />

                  {/* Background con clip-path único */}
                  <div 
                    className="absolute inset-0 bg-primary border border-border-primary transition-all duration-500 group-hover:border-accent/50 will-change-transform"
                    style={{
                      clipPath: activeCard === index 
                        ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
                      transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s"
                    }}
                  />
                  
                  {/* Efecto de luz dinámica */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    style={{
                      clipPath: activeCard === index 
                        ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
                      transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s"
                    }}
                  />
                  
                  {/* Contenido */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icono con animación avanzada */}
                    <div className="mb-8 relative">
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 will-change-transform`}>
                        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      
                      {/* Anillos decorativos */}
                      <div className={`absolute -top-2 -right-2 w-16 h-16 rounded-full border-2 border-dashed opacity-0 group-hover:opacity-30 transition-all duration-500 animate-spin-slow`}
                        style={{
                          borderColor: index === 0 ? "#3b82f6" : index === 1 ? "#a855f7" : "#f97316"
                        }}
                      />
                      <div className={`absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-xl group-hover:scale-150 transition-transform duration-500`} />
                    </div>

                    {/* Título con subrayado animado */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className={`h-1 bg-gradient-to-r ${item.color} rounded-full w-0 group-hover:w-full transition-all duration-500`} />
                    </div>

                    {/* Descripción */}
                    <p className="text-secondary leading-relaxed flex-grow mb-6">
                      {item.text}
                    </p>

                    {/* Indicador numérico decorativo */}
                    <div className="flex items-center justify-between">
                      <span className={`text-6xl font-black bg-gradient-to-br ${item.color} bg-clip-text text-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
                        0{index + 1}
                      </span>
                      
                      {/* Línea de progreso decorativa */}
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 bg-gradient-to-b ${item.color}`}
                            style={{ 
                              height: `${(i + 1) * 8}px`,
                              opacity: activeCard === index ? 1 : 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Esquina cortada con acento */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-transparent transition-all duration-500 ${
                      activeCard === index ? "border-r-accent/30" : "border-r-transparent"
                    }`} />
                  </div>
                </div>

                {/* Sombra externa dinámica */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 -z-10 rounded-3xl`} />
              </div>
            );
          })}
        </div>

        {/* Estadística final con diseño mejorado */}
        <div className="about-stats relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-primary to-secondary border border-border-primary rounded-3xl p-12 overflow-hidden">
              {/* Patrón de fondo */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle, rgb(var(--color-accent)) 1px, transparent 1px)",
                  backgroundSize: "30px 30px"
                }} />
              </div>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="text-7xl md:text-8xl font-black mb-4">
                    <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent animate-gradient-x">
                      100%
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-primary mb-2">
                    Comprometido con la calidad
                  </p>
                  <p className="text-secondary">
                    Cada proyecto merece la máxima dedicación
                  </p>
                </div>

                {/* Visualización circular */}
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90 will-change-transform">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgb(var(--color-border-primary))"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={2 * Math.PI * 70}
                      className="progress-circle"
                      style={{
                        transition: "stroke-dashoffset 2s ease-out"
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                        <stop offset="100%" stopColor="rgb(129, 140, 248)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-accent" />
                  </div>
                </div>
              </div>

              {/* Decoración de esquinas */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-accent/20 rounded-br-3xl" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-10deg);
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

        @keyframes draw-circle {
          from {
            stroke-dashoffset: ${2 * Math.PI * 70};
          }
          to {
            stroke-dashoffset: 0;
          }
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

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-draw-circle {
          animation: draw-circle 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;