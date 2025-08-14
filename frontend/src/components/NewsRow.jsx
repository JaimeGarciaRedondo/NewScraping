// NewsRow.js
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";

export default function NewsRow({ categoria, noticias }) {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  // Agrupar noticias por fuente
  const fuentes = [...new Set(noticias.map((n) => n.fuente))];
  const noticiasPorFuente = fuentes.flatMap((f) =>
    noticias.filter((n) => n.fuente === f).slice(0, 5)
  );

  const scrollLeft = () => {
    const container = rowRef.current;
    if (container) {
      container.scrollBy({ left: -container.offsetWidth / 2, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = rowRef.current;
    if (container) {
      container.scrollBy({ left: container.offsetWidth / 2, behavior: "smooth" });
    }
  };

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

      {/* Contenedor horizontal */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2 relative"
      >
        {noticiasPorFuente.map((noticia, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 sm:w-60 md:w-64 lg:w-[220px] hover:scale-105 transition-transform duration-300"
          >
            <NewsCard {...noticia} />
          </div>
        ))}

                {/* Botón izquierda */}
        <button
        onClick={scrollLeft}
        className="absolute left-0 top-0 h-full w-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
        >
        <span className="text-white text-3xl select-none">◀</span>
        </button>

        {/* Botón derecha */}
        <button
        onClick={scrollRight}
        className="absolute right-0 top-0 h-full w-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
        >
        <span className="text-white text-3xl select-none">▶</span>
        </button>

      </div>
    </div>
  );
}
