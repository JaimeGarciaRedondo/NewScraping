import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center h-16 max-w-full">
        {/* Logo pegado a la izquierda */}
        <Link to="/" className="flex items-center space-x-2 px-4">
          <img
            src="img/icon_NS.png"
            alt="Logo"
            className="w-8 h-8"
          />
        </Link>

        {/* Links con color rojo y hover azul */}
        <div className="flex space-x-2 bg-white h-full items-center px-2">
          <Link
            to="/"
            className="text-white bg-red-700 hover:border-blue-600 hover:bg-red-400 hover:text-gray-200 font-medium px-4 py-2 rounded"
          >
            Inicio
          </Link>

          <Link
            to="/noticias"
            className="text-white bg-red-700 hover:border-blue-600 hover:bg-red-400 hover:text-gray-200 font-medium px-4 py-2 rounded"
          >
            Noticias
          </Link>

          <span className="flex-1"></span>
        </div>
      </div>
    </nav>
  );
}
