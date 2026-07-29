import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Package, Sparkles, Users, Code2, Cpu } from "lucide-react";
import gsap from "gsap";

const communityProjects = [
  {
    title: "Hexagonizer",
    description: "CLI tool para generar proyectos con arquitectura hexagonal automaticamente. Crea entidades, casos de uso, repositorios y CRUD completo con un solo comando. Ideal para equipos que quieren adoptar DDD y arquitectura limpia sin esfuerzo repetitivo.",
    npm: "https://www.npmjs.com/package/hexagonizer",
    github: "https://github.com/FT-Key/hexagonizer",
    tags: ["Node.js", "CLI", "Hexagonal Architecture", "NPM", "Code Generator", "TypeScript"],
    color: "from-zinc-800 to-slate-900",
    icon: Cpu
  },
  {
    title: "Git-Accounts",
    description: "Utilidad CLI para gestionar multiples cuentas de Git desde un mismo equipo. Cambia entre cuentas personales, laborales o de proyecto con un solo comando, manteniendo configuraciones separadas de user.name, user.email y claves SSH.",
    npm: "https://www.npmjs.com/package/git-accounts",
    github: "https://github.com/FT-Key/ftkey-portfolio",
    tags: ["Node.js", "CLI", "Git", "NPM", "Developer Tools", "Productivity"],
    color: "from-orange-500 to-red-600",
    icon: Package
  },
  {
    title: "Ant Form Builder",
    description: "Constructor visual de formularios potenciado con IA. Genera formularios complejos de Ant Design mediante descripcion en lenguaje natural, con preview en tiempo real y exportacion de codigo limpio. Ideal para acelerar el desarrollo de dashboards y paneles administrativos.",
    npm: "https://ant-form-builder.vercel.app/",
    github: "https://github.com/FT-Key/ant-form-builder",
    tags: ["React", "Ant Design", "AI", "Forms", "Open Source", "TypeScript"],
    color: "from-indigo-500 to-purple-600",
    icon: Code2
  }
];

const CommunityProjects = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(badgeRef.current, { opacity: 0, scale: 0.5, duration: 0.8 })
      .from(titleRef.current, { opacity: 0, y: 60, duration: 0.8 }, "-=0.4")
      .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, {
              opacity: 0,
              y: 80,
              duration: 0.9,
              delay: i * 0.15,
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
    <section id="comunidad" className="relative py-32 px-6 bg-secondary overflow-hidden">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-accent font-bold">Comunidad</span>
          </div>

          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent">
              Proyectos Open Source
            </span>
          </h2>

          <p ref={subtitleRef} className="text-secondary text-lg max-w-3xl mx-auto">
            Herramientas gratuitas que cree para la comunidad de desarrolladores. Cada una resuelve problemas reales del dia a dia.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communityProjects.map((project, index) => {
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

                  <div className="relative h-48 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className="relative z-10 p-8 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 border border-border-primary/50 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-16 h-16 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <Package className="w-5 h-5 text-accent/60" />
                    </div>

                    <p className="text-secondary mb-4 flex-grow leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs bg-secondary border rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-3">
                      <a href={project.npm} target="_blank" rel="noopener noreferrer" className={`flex-1 flex justify-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-lg hover:scale-105 transition`}>
                        <ExternalLink className="w-4 h-4" /> {project.title.includes("Ant") ? "Demo" : "NPM"}
                      </a>

                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border rounded-lg hover:border-accent hover:text-accent transition">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className={`absolute -inset-1 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-2xl`} />
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary border border-border-primary rounded-2xl">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-secondary">Contribuciones open source para toda la comunidad</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CommunityProjects;
