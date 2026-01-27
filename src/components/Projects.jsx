import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Code2, Zap, Database } from "lucide-react";
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
    color: "from-orange-500 to-red-600",
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

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
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

  // Canvas con efecto de código matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);
    const chars = "01";

    function draw() {
      ctx.fillStyle = "rgba(var(--color-bg-primary), 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="proyectos" 
      className="relative py-32 px-6 bg-secondary overflow-hidden"
    >
      {/* Canvas de fondo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      />

      {/* Gradientes decorativos */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Formas geométricas */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-accent/10 rounded-3xl rotate-12 animate-float" />
      <div className="absolute bottom-40 left-20 w-32 h-32 border border-accent/10 rotate-45 animate-float-delayed" style={{ borderRadius: "30%" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título */}
        <div className="text-center mb-20">
          <div 
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">
              Portfolio
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <h2 
            className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent animate-gradient-x">
              Proyectos destacados
            </span>
          </h2>
          
          <p 
            className={`text-secondary text-lg max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
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
                className={`group relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Card principal con altura fija y flex */}
                <div className="relative h-full flex flex-col bg-primary border border-border-primary rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/50 hover:-translate-y-2">
                  
                  {/* Imagen con overlay - altura fija */}
                  <div className="relative h-56 flex-shrink-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay con gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Icono flotante */}
                    <div className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-500 ${
                      hoveredProject === index ? "scale-100 rotate-0" : "scale-0 rotate-180"
                    }`}>
                      <Icon className={`w-6 h-6 bg-gradient-to-br ${project.color} bg-clip-text text-transparent`} />
                    </div>

                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Contenido - flex grow para ocupar espacio disponible */}
                  <div className="flex-1 flex flex-col p-6">
                    {/* Título - altura fija */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className={`w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} />
                    </div>

                    {/* Descripción - altura fija con line-clamp */}
                    <p className="text-secondary leading-relaxed mb-4 line-clamp-3 h-[4.5rem]">
                      {project.description}
                    </p>

                    {/* Tags - altura mínima fija */}
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[3.5rem]">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className={`px-3 py-1 text-xs font-medium bg-secondary border border-border-secondary text-tertiary rounded-full transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105 h-fit`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Spacer que empuja los botones al fondo */}
                    <div className="flex-1" />

                    {/* Divider */}
                    <div className="h-px bg-border-primary mb-4" />

                    {/* Botones de acción - siempre en el fondo */}
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
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
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
        <div 
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
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
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

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

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
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

export default Projects;