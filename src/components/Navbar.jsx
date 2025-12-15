import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#sobreMi" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-gray-950/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#inicio" className="text-xl font-bold tracking-wide">
          FT<span className="text-indigo-500">Key</span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-sm">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-300 hover:text-white transition"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/CV_Toledo_Franco_Nicolas.pdf"
              download
              className="border border-gray-600 px-4 py-1 rounded-md hover:border-indigo-500 transition"
            >
              Descargar CV
            </a>
          </li>
        </ul>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-300 hover:text-white transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/CV_Toledo_Franco_Nicolas.pdf"
                download
                className="block text-gray-300 hover:text-white transition"
              >
                Descargar CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  