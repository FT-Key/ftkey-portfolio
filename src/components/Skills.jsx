const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Git",
];

const Skills = () => {
  return (
    <section id="habilidades" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Habilidades técnicas
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-900 border border-gray-700 rounded-lg py-6 text-center hover:border-indigo-500 transition"
          >
            <p className="font-medium">{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
