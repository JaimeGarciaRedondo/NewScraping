import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";

export default function NewsRow({ categoria, noticias }) {
  const navigate = useNavigate();

  // Fuentes únicas
  const fuentes = [...new Set(noticias.map((n) => n.fuente))];

  // Agrupar noticias en bloques de 5 por fuente
  const bloquesNoticias = fuentes.map((fuente) =>
    noticias.filter((n) => n.fuente === fuente).slice(0, 5)
  );

  const [currentFuenteIndex, setCurrentFuenteIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentFuenteIndex((prev) =>
      prev === 0 ? bloquesNoticias.length - 1 : prev - 1
    );
  };

  const scrollRight = () => {
    setCurrentFuenteIndex((prev) =>
      prev === bloquesNoticias.length - 1 ? 0 : prev + 1
    );
  };

  const noticiasVisibles = bloquesNoticias[currentFuenteIndex] || [];

  return (
    <div className="mb-10 relative group">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3 px-2">
        <h2 className="text-xl font-bold">{categoria}</h2>
        <button
          onClick={() => navigate(`/categoria/${categoria}`)}
          className="text-blue-500 hover:underline"
        >
          Ver más
        </button>
      </div>

      {/* Contenedor de noticias */}
      <div className="relative px-2">
        <div
          className="grid grid-cols-5 gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: "translateX(0)",
          }}
        >
          {noticiasVisibles.map((noticia, i) => (
            <div
              key={i}
              className="hover:scale-105 transition-transform duration-300"
            >
              <NewsCard {...noticia} />
            </div>
          ))}
        </div>

        {/* Botón izquierda */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 
                    flex items-center justify-center
                    w-12 h-12 rounded-full 
                    bg-black/30 backdrop-blur-md 
                    text-white text-xl
                    opacity-0 group-hover:opacity-100 
                    transition-all shadow-lg border-none outline-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          ◀
        </button>

        {/* Botón derecha */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                    flex items-center justify-center
                    w-12 h-12 rounded-full 
                    bg-black/30 backdrop-blur-md 
                    text-white text-xl
                    opacity-0 group-hover:opacity-100 
                    transition-all shadow-lg border-none outline-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
