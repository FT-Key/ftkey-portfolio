import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Code2, Zap, Database } from "lucide-react";
import gsap from "gsap";
import rollingCodeSchoolImg from "../assets/images/projects/RollingCodeSchool.webp";
import rollingCodeStudioImg from "../assets/images/projects/RollingCodeStudio.webp";
import hexagonizerImg from "../assets/images/projects/Hexagonizer.webp";
import antFormBuilderImg from "../assets/images/projects/AntFormBuilder.webp";
import ravelloImg from "../assets/images/projects/RavelloTurismo.webp";
import centerGymImg from "../assets/images/projects/CenterGym.webp";
import techSolutionsImg from "../assets/images/projects/TechSolutions.webp";
import rollingVetImg from "../assets/images/projects/Rollingvet.webp";
import zabanaImg from "../assets/images/projects/Obsidian-Zabina.webp";
import keyAiImg from "../assets/images/projects/KeyAI.webp";
import tetrisImg from "../assets/images/projects/Tetris.webp";

const projects = [
  {
    title: "RollingCode School (Universe)",
    description: "Sistema de gestión académica para plataforma educativa de programación con administración de usuarios y cursos.",
    image: rollingCodeSchoolImg,
    github: "",
    demo: "https://universe.rollingcodeschool.com/",
    tags: ["React", "Ant Design", "Management System", "Education", "Enterprise"],
    color: "from-indigo-600 to-indigo-800",
    icon: Database
  },
  {
    title: "RollingCode Studio",
    description: "Landing page corporativa para agencia de desarrollo de software con diseño moderno y responsive.",
    image: rollingCodeStudioImg,
    github: "",
    demo: "https://rollingcodestudio.com/",
    tags: ["NextJS", "TailwindCSS", "Landing Page", "Enterprise", "SEO"],
    color: "from-slate-700 to-indigo-600",
    icon: Code2
  },
  {
    title: "Hexagonizer",
    description: "CLI tool para generar proyectos con arquitectura hexagonal, entidades y CRUD automático.",
    image: hexagonizerImg,
    github: "",
    demo: "https://www.npmjs.com/package/hexagonizer",
    tags: ["Node.js", "CLI", "Hexagonal Architecture", "NPM", "Code Generator", "TypeScript"],
    color: "from-zinc-800 to-slate-900",
    icon: Zap
  },
  {
    title: "Ant Form Builder",
    description: "Herramienta para creación dinámica de formularios personalizados con IA y preview en tiempo real.",
    image: antFormBuilderImg,
    github: "https://github.com/FT-Key/ant-form-builder",
    demo: "https://ant-form-builder.vercel.app/",
    tags: ["React", "Ant Design", "AI", "Forms", "Development Tools", "TypeScript"],
    color: "from-indigo-500 to-purple-600",
    icon: Code2
  },
  {
    title: "Ravello Turismo",
    description: "E-commerce de paquetes turísticos con integración de MercadoPago y gestión de reservas.",
    image: ravelloImg,
    github: "https://github.com/FT-Key/Ravello-web",
    demo: "https://ravello.netlify.app/",
    tags: ["NextJS", "Firebase", "TailwindCSS", "eCommerce", "MercadoPago", "Business"],
    color: "from-emerald-500 to-teal-600",
    icon: Database
  },
  {
    title: "Center Gym",
    description: "Plataforma completa de gestión para centro fitness con Firebase Storage y panel administrativo.",
    image: centerGymImg,
    github: "https://github.com/FT-Key/center-gym",
    demo: "https://center-gym.vercel.app/",
    tags: ["NextJS", "React", "Firebase", "TailwindCSS", "Vercel", "Management"],
    color: "from-orange-500 to-red-600",
    icon: Zap
  },
  {
    title: "Tech Solutions",
    description: "Landing page para empresa de soluciones tecnológicas con diseño moderno y responsive.",
    image: techSolutionsImg,
    github: "https://github.com/FT-Key/TechSolutions",
    demo: "https://center-gym.vercel.app/",
    tags: ["NextJS", "React", "Firebase", "TailwindCSS", "Vercel", "Management"],
    color: "from-blue-500 to-cyan-600",
    icon: Zap
  },
  {
    title: "RollingVet",
    description: "Aplicación web full-stack para gestión veterinaria con autenticación y CRUD completo.",
    image: rollingVetImg,
    github: "https://github.com/FT-Key/RollingVet",
    demo: "https://rollingvet104i.netlify.app/",
    tags: ["React", "Node.js", "MongoDB", "Express", "Full-Stack", "REST API"],
    color: "from-green-600 to-emerald-700",
    icon: Database
  },
  {
    title: "Obsidian/Zabina",
    description: "E-commerce de moda y servicios de manicura con carrito de compras y gestión de inventario.",
    image: zabanaImg,
    github: "https://github.com/FT-Key/obsidian",
    demo: "https://obsidian-murex.vercel.app/",
    tags: ["NextJS", "Firebase", "TailwindCSS", "eCommerce", "Vercel", "Fashion"],
    color: "from-pink-600 to-rose-700",
    icon: Database
  },
  {
    title: "KeyAI",
    description: "Chat interactivo con inteligencia artificial usando modelo DeepSeek y gestión de conversaciones.",
    image: keyAiImg,
    github: "https://github.com/FT-Key/KeyAI",
    demo: "https://keyai.netlify.app/",
    tags: ["React", "AI", "API Integration", "DeepSeek", "Chat", "JavaScript"],
    color: "from-purple-600 to-fuchsia-700",
    icon: Zap
  },
  {
    title: "Akarumi Yume",
    description: "Landing page para e-commerce de productos anime con catálogo y diseño temático japonés.",
    image: keyAiImg,
    github: "https://github.com/FT-Key/Akarumi-Yume",
    demo: "https://akarumi-yume.vercel.app/",
    tags: ["React", "NextJS", "TailwindCSS", "Landing Page", "eCommerce", "Design"],
    color: "from-violet-600 to-indigo-700",
    icon: Code2
  },
  {
    title: "Tetris Game",
    description: "Juego clásico de Tetris con controles fluidos y sistema de puntuación usando Canvas API.",
    image: tetrisImg,
    github: "https://github.com/FT-Key/TetrisCanvas",
    demo: "https://tetriscanvas.netlify.app/",
    tags: ["JavaScript", "Canvas API", "Game Development", "Vanilla JS", "DOM"],
    color: "from-amber-500 to-orange-600",
    icon: Code2
  }
];

// Componente de imagen lazy optimizado - MEJORADO
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Crear una imagen para precargar
    const preloadImg = new Image();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imageSrc) {
            // Precargar la imagen
            preloadImg.onload = () => {
              setImageSrc(src);
              setIsInView(true);
            };
            preloadImg.onerror = () => {
              setImageSrc(src); // Mostrar aunque falle
              setIsInView(true);
            };
            preloadImg.src = src;
            observer.unobserve(img);
          }
        });
      },
      { 
        rootMargin: "200px", // Precargar 200px antes de entrar en viewport
        threshold: 0
      }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src, imageSrc]);

  return (
    <div ref={imgRef} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 animate-pulse" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsRef = useRef([]);
  const canvasRef = useRef(null);

  // Precargar imágenes
  useEffect(() => {
    const imagesToPreload = [
      rollingCodeSchoolImg,
      rollingCodeStudioImg,
      hexagonizerImg,
      antFormBuilderImg,
      ravelloImg,
      centerGymImg,
      techSolutionsImg,
      rollingVetImg,
      zabanaImg,
      keyAiImg,
      tetrisImg
    ];

    imagesToPreload.forEach((imgSrc) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imgSrc;
      document.head.appendChild(link);
    });
  }, []);

  // Animación inicial del header
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Badge con efecto elástico
    tl.from(badgeRef.current, {
      opacity: 0,
      scale: 0,
      rotation: -180,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    });

    // Título con efecto de elevación
    tl.from(titleRef.current, {
      opacity: 0,
      y: 80,
      rotationX: -45,
      transformOrigin: "50% 50%",
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=0.6");

    // Subtítulo con fade suave
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, "-=0.4");
  }, []);

  // Animaciones de las cards con Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const index = cardsRef.current.indexOf(card);
            // Animación de entrada
            gsap.from(card, {
              opacity: 0,
              y: 100,
              rotationY: 45,
              scale: 0.8,
              duration: 1.2,
              delay: (index % 3) * 0.15,
              ease: "power4.out",
            });
            observer.unobserve(card);
          }
        });
      },
      { rootMargin: "100px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Efecto parallax 3D en hover
  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 25;
        const rotateY = (x - centerX) / 25;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      });
    };

    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Canvas con sistema de partículas mejorado - OPTIMIZADO
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    let animationFrameId;
    let frameCount = 0;
    
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
    };
    
    setCanvasSize();

    const particles = [];
    const particleCount = Math.min(35, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 20000)); // Reducido para mejor performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5, // Reducida velocidad
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5, // Partículas más pequeñas
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    function animate() {
      frameCount++;
      
      // Actualizar solo cada 2 frames para mejor performance
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

          ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Conectar partículas cercanas - optimizado
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            const maxDist = 100;

            if (distSq < maxDist * maxDist) {
              const distance = Math.sqrt(distSq);
              const opacity = 0.2 * (1 - distance / maxDist);
              ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animación del CTA con Intersection Observer
  useEffect(() => {
    const ctaSection = document.querySelector(".cta-section");
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, {
              opacity: 0,
              scale: 0.9,
              y: 50,
              duration: 1,
              ease: "back.out(1.7)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="proyectos" 
      className="relative py-32 px-6 bg-secondary overflow-hidden"
    >
      {/* Canvas de fondo optimizado */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Gradientes decorativos animados */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-slow-delayed" />

      {/* Formas geométricas decorativas */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-accent/10 rounded-3xl rotate-12 animate-float" />
      <div className="absolute bottom-40 left-20 w-32 h-32 border border-accent/10 rotate-45 animate-float-delayed" style={{ borderRadius: "30%" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header animado */}
        <div className="text-center mb-20">
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">
              Portfolio
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6" style={{ perspective: '1000px' }}>
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent inline-block">
              Proyectos destacados
            </span>
          </h2>
          
          <p ref={subtitleRef} className="text-secondary text-lg max-w-2xl mx-auto mb-8">
            Soluciones innovadoras construidas con las últimas tecnologías
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Card principal */}
                <div className="relative h-full flex flex-col bg-primary border border-border-primary rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl">
                  
                  {/* Imagen con lazy loading */}
                  <div className="relative h-56 flex-shrink-0 overflow-hidden">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay con gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Icono flotante animado */}
                    <div className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-500 ${
                      hoveredProject === index ? "scale-100 rotate-0" : "scale-0 rotate-180"
                    }`}>
                      <Icon className={`w-6 h-6 bg-gradient-to-br ${project.color} bg-clip-text text-transparent`} />
                    </div>

                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className={`w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
                    </div>

                    <p className="text-secondary leading-relaxed mb-4 line-clamp-3 h-[4.5rem]">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 min-h-[3.5rem]">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-secondary border border-border-secondary text-tertiary rounded-full transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105 h-fit"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex-1" />

                    <div className="h-px bg-border-primary mb-4" />

                    <div className="flex gap-3">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${project.color} text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-border-primary text-secondary hover:border-accent hover:text-accent font-medium rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Efecto de esquina */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                    <div className={`absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] border-t-transparent transition-all duration-500 ${
                      hoveredProject === index ? "border-r-accent/20" : "border-r-transparent"
                    }`} />
                  </div>
                </div>

                {/* Sombra externa dinámica */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10 rounded-2xl`} />

                {/* Número decorativo */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-black text-lg shadow-lg transition-all duration-500 ${
                  hoveredProject === index ? "scale-110 rotate-12" : "scale-100 rotate-0"
                }`}>
                  {index + 1}
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="cta-section mt-20 text-center">
          <p className="text-secondary text-lg mb-6">
            ¿Interesado en trabajar juntos?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-medium rounded-xl hover:bg-accent-hover transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
          >
            <span>Hablemos de tu proyecto</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
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

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes float-slow-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 25s ease-in-out infinite 3s;
        }
      `}</style>
    </section>
  );
};

export default Projects;