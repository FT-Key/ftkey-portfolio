const features = [
  {
    title: "Estructurado",
    text: "Desarrollo sistemas organizados y escalables aplicando buenas prácticas y arquitectura limpia.",
  },
  {
    title: "Reactivo",
    text: "Construyo interfaces dinámicas y responsivas con React, priorizando rendimiento y UX.",
  },
  {
    title: "Código limpio",
    text: "Escribo código mantenible, claro y reutilizable con foco en sostenibilidad a largo plazo.",
  },
];

const About = () => {
  return (
    <section id="sobreMi" className="py-20 px-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12">
        Sobre mí
      </h2>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((item) => (
          <div
            key={item.title}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
