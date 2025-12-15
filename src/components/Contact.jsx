const Contact = () => {
  return (
    <section id="contacto" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Contacto
      </h2>

      <p className="text-center text-gray-400 mb-8">
        ¿Tenés un proyecto o propuesta? Hablemos.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="mailto:franco@email.com"
          className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          Enviar email
        </a>
        <a
          href="/CV_Toledo_Franco_Nicolas.pdf"
          download
          className="px-6 py-3 border border-gray-600 rounded-lg hover:border-indigo-500 transition"
        >
          Descargar CV
        </a>
      </div>
    </section>
  );
};

export default Contact;
