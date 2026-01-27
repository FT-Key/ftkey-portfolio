import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Code2, Zap, Database } from "lucide-react";
import gsap from "gsap";

/* imágenes import iguales */
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
import akarumiYume from "../assets/images/projects/AkarumiYume.webp";

/* DATA IGUAL — RECORTADO AQUÍ PARA BREVEDAD */
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
    image: akarumiYume,
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

/* 🖼 LazyImage optimizado sin precarga masiva */
const LazyImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
);

const Projects = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsRef = useRef([]);

  /* 🎬 Animación inicial header (GSAP liviano) */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, { opacity: 0, scale: 0.5, duration: 0.8 })
      .from(titleRef.current, { opacity: 0, y: 60, duration: 0.8 }, "-=0.4")
      .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
  }, []);

  /* 🎴 Entrada de cards optimizada */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, {
              opacity: 0,
              y: 80,
              duration: 0.9,
              delay: (i % 3) * 0.1,
              ease: "power3.out"
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );

    cardsRef.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos" className="relative py-32 px-6 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">Portfolio</span>
          </div>

          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent">
              Proyectos destacados
            </span>
          </h2>

          <p ref={subtitleRef} className="text-secondary text-lg max-w-2xl mx-auto">
            Soluciones innovadoras construidas con tecnologías modernas
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <article
                key={project.title}
                ref={el => (cardsRef.current[index] = el)}
                className="group relative will-change-transform"
              >
                <div className="relative h-full flex flex-col bg-primary border border-border-primary rounded-2xl overflow-hidden
                  transition-transform duration-500 ease-out
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20">

                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <LazyImage src={project.image} alt={project.title} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-secondary mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs bg-secondary border rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-3">
                      <a href={project.demo} target="_blank" className={`flex-1 flex justify-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-lg hover:scale-105 transition`}>
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>

                      {project.github && (
                        <a href={project.github} target="_blank" className="px-4 py-2 border rounded-lg hover:border-accent hover:text-accent transition">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Glow externo GPU friendly */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-2xl`} />
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a href="#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl hover:scale-105 hover:shadow-lg transition">
            Hablemos de tu proyecto <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
