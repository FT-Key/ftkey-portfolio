import { useEffect, useRef, useState } from "react";
import { Mail, Send, Download, MapPin, Clock, Sparkles, MessageCircle, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Seguimiento del mouse para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas con efecto de constelación
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = [];
    const starCount = 100;

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();

        // Efecto de brillo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity * 0.2})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Conectar estrellas cercanas
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "fr4nc0t2@gmail.com",
      description: "Respuesta en 24-48 horas",
      color: "from-blue-500 to-cyan-500",
      action: "mailto:fr4nc0t2@gmail.com"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "FT-Key",
      description: "Revisa mi código",
      color: "from-gray-600 to-gray-800",
      action: "https://github.com/FT-Key"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Franco Toledo",
      description: "Conectemos profesionalmente",
      color: "from-blue-600 to-blue-800",
      action: "https://www.linkedin.com/in/ftkey/"
    }
  ];

  const info = [
    {
      icon: MapPin,
      text: "San Miguel de Tucumán, Argentina",
      color: "text-green-500"
    },
    {
      icon: Clock,
      text: "Disponible para proyectos",
      color: "text-blue-500"
    },
    {
      icon: MessageCircle,
      text: "Respuesta rápida garantizada",
      color: "text-purple-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="relative py-32 px-6 bg-primary overflow-hidden"
    >
      {/* Canvas de fondo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Efecto de mouse spotlight */}
      <div 
        className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Gradientes decorativos */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      {/* Formas geométricas flotantes */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-accent/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent/10 rotate-45 animate-float-delayed" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Título */}
        <div className="text-center mb-20">
          <div 
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">
              Contacto
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <h2 
            className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent animate-gradient-x">
              Trabajemos juntos
            </span>
          </h2>
          
          <p 
            className={`text-secondary text-xl max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            ¿Tenés un proyecto o propuesta? Estoy disponible para colaborar en tu próxima gran idea.
          </p>
        </div>

        {/* Grid de contenido */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          
          {/* Columna izquierda - Métodos de contacto */}
          <div className="space-y-6">
            <h3 
              className={`text-2xl font-bold text-primary mb-8 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              Elegí tu método preferido
            </h3>

            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : undefined}
                  rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group block transition-all duration-700 delay-${400 + index * 100} ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                >
                  <div className="relative p-6 bg-secondary border border-border-primary rounded-2xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      {/* Icono */}
                      <div className={`p-4 bg-gradient-to-br ${method.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                          {method.title}
                        </h4>
                        <p className="text-accent font-medium mb-1">
                          {method.value}
                        </p>
                        <p className="text-sm text-tertiary">
                          {method.description}
                        </p>
                      </div>

                      {/* Flecha */}
                      <Send className="w-5 h-5 text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Sombra decorativa */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10 rounded-2xl`} />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Columna derecha - Info y CTA */}
          <div className="space-y-8">
            {/* Card de información */}
            <div 
              className={`p-8 bg-secondary border border-border-primary rounded-2xl transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-bold text-primary mb-6">
                Información adicional
              </h3>

              <div className="space-y-4">
                {info.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/50 transition-colors duration-300"
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <span className="text-secondary">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-border-primary" />

              {/* Horario */}
              <div className="text-center p-4 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-accent font-semibold mb-1">
                  Horario de respuesta
                </p>
                <p className="text-sm text-secondary">
                  Lunes a Viernes: 9:00 - 18:00 (GMT-3)
                </p>
              </div>
            </div>

            {/* CTA grande */}
            <div 
              className={`relative p-8 bg-gradient-to-br from-accent to-accent-hover rounded-2xl overflow-hidden transition-all duration-700 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              {/* Patrón de fondo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Listo para empezar?
                </h3>
                <p className="text-white/90 mb-6">
                  Descargá mi CV o enviame un email directamente.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:fr4nc0t2@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-accent font-medium rounded-lg hover:scale-105 transition-transform duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Enviar email
                  </a>

                  <a
                    href="/CV_Toledo_Franco_Nicolas.pdf"
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-medium rounded-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Descargar CV
                  </a>
                </div>
              </div>

              {/* Decoración de esquinas */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/30 rounded-br-2xl" />
            </div>
          </div>
        </div>

        {/* Mensaje final */}
        <div 
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block p-6 bg-secondary border border-border-primary rounded-2xl">
            <p className="text-secondary flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>
                Respondo todos los mensajes en menos de 48 horas
              </span>
              <Sparkles className="w-5 h-5 text-accent" />
            </p>
          </div>
        </div>
      </div>

      <style>{`
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-15px) rotate(45deg);
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
      `}</style>
    </section>
  );
};

export default Contact;