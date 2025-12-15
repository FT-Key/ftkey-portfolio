import programmerImg from "../assets/images/programmer.webp";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Texto */}
        <div className="text-center md:text-left">
          <span className="inline-block mb-4 text-sm uppercase tracking-widest text-indigo-400">
            Frontend Developer
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Franco Toledo
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Desarrollo interfaces modernas con React, foco en arquitectura limpia,
            rendimiento y experiencia de usuario.
          </p>

          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <a
              href="#proyectos"
              className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-500 transition"
            >
              Ver proyectos
            </a>

            <a
              href="https://github.com/FT-Key"
              target="_blank"
              className="px-6 py-3 border border-gray-600 rounded-lg hover:border-indigo-500 transition"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="hidden md:flex justify-center">
          <img
            src={programmerImg}
            alt="Programmer illustration"
            className="max-w-md w-full rounded-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
