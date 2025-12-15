const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Franco Nicolás Toledo. Todos los derechos reservados.
        </p>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a
            href="https://linkedin.com"
            target="_blank"
            className="text-gray-400 hover:text-white transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/FT-Key"
            target="_blank"
            className="text-gray-400 hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="#contacto"
            className="text-gray-400 hover:text-white transition"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
