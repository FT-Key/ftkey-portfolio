import { useEffect, useRef, useState } from "react";

const skills = [
  { 
    name: "HTML", 
    level: 95,
    icon: "html",
    color: "from-orange-500 to-red-500"
  },
  { 
    name: "CSS", 
    level: 90,
    icon: "css",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    name: "JavaScript", 
    level: 88,
    icon: "js",
    color: "from-yellow-400 to-yellow-600"
  },
  { 
    name: "React", 
    level: 85,
    icon: "react",
    color: "from-cyan-400 to-blue-500"
  },
  { 
    name: "Node.js", 
    level: 80,
    icon: "node",
    color: "from-green-500 to-emerald-600"
  },
  { 
    name: "Git", 
    level: 85,
    icon: "git",
    color: "from-orange-600 to-red-600"
  },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animación de fondo con canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const particleCount = 30;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="habilidades" 
      className="relative py-32 px-6 bg-primary overflow-hidden"
    >
      {/* Canvas de fondo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Gradientes decorativos */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Título */}
        <div className="text-center mb-20">
          <div 
            className={`inline-block mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-sm uppercase tracking-widest text-accent font-semibold">
              Stack Tecnológico
            </span>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Habilidades técnicas
          </h2>
          
          <div 
            className={`w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="group relative">
                {/* Fondo con efecto de brillo */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
                
                {/* Card principal */}
                <div className="relative bg-secondary border border-border-primary rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  
                  {/* Header con nombre y nivel */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Icono decorativo */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-lg">
                          {skill.icon === "html" && "H"}
                          {skill.icon === "css" && "C"}
                          {skill.icon === "js" && "JS"}
                          {skill.icon === "react" && "R"}
                          {skill.icon === "node" && "N"}
                          {skill.icon === "git" && "G"}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-primary">
                          {skill.name}
                        </h3>
                        <span className="text-sm text-tertiary">
                          {skill.level}% dominio
                        </span>
                      </div>
                    </div>

                    {/* Porcentaje grande */}
                    <div className={`text-3xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent transition-all duration-300 ${
                      hoveredSkill === skill.name ? "scale-125" : "scale-100"
                    }`}>
                      {skill.level}
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="relative h-3 bg-tertiary/10 rounded-full overflow-hidden">
                    {/* Fondo animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    
                    {/* Barra de progreso con gradiente */}
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                        isVisible ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ 
                        width: `${skill.level}%`,
                        transformOrigin: "left",
                        transitionDelay: `${index * 0.1 + 0.3}s`
                      }}
                    >
                      {/* Efecto de brillo en la barra */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide" />
                    </div>
                  </div>

                  {/* Puntos decorativos */}
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < Math.ceil(skill.level / 20) 
                            ? `bg-gradient-to-r ${skill.color}` 
                            : "bg-border-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-secondary text-lg mb-6">
            Siempre aprendiendo y mejorando mis habilidades
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-accent/50 rounded-full text-accent font-medium hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105">
            <span>En constante evolución</span>
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-slide {
          animation: slide 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;