import tetrisImg from "../assets/images/projects/project1-tetris.webp";
import rollingVetImg from "../assets/images/projects/project2-rollingvet.webp";
import keyAiImg from "../assets/images/projects/project3-KeyAI.webp";

const projects = [
  {
    title: "Tetris Game",
    description: "Juego interactivo creado con JavaScript y Canvas.",
    image: tetrisImg,
    github: "https://github.com/FT-Key/TetrisCanvas",
    demo: "https://tetriscanvas.netlify.app/",
  },
  {
    title: "RollingVet",
    description: "Web app de veterinaria con React, Node y MongoDB.",
    image: rollingVetImg,
    github: "https://github.com/FT-Key/RollingVet",
    demo: "https://rollingvet104i.netlify.app/",
  },
  {
    title: "KeyAI",
    description: "Chat con IA usando APIs y modelo DeepSeek.",
    image: keyAiImg,
    github: "https://github.com/FT-Key/KeyAI",
    demo: "https://keyai.netlify.app/",
  },
];

const Projects = () => {
  return (
    <section id="proyectos" className="py-24 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Proyectos destacados
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-indigo-500 hover:-translate-y-1 transition-all"
            >
              {/* Imagen */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    className="text-sm font-medium text-indigo-400 hover:underline"
                  >
                    Ver demo →
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-indigo-400 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
