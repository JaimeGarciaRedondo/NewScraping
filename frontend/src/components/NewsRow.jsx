import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";

export default function NewsRow({ categoria, noticias }) {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  // Ajuste responsive
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 5);
      setCurrentStartIndex(0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Limitar 5 noticias por fuente y concatenar todas
  const fuentes = [...new Set(noticias.map(n => n.fuente))];
  const noticiasLimitadas = fuentes.flatMap(fuente =>
    noticias.filter(n => n.fuente === fuente).slice(0, 5)
  );

  const totalNoticias = noticiasLimitadas.length;

  const scrollRight = () => {
    setCurrentStartIndex((prev) => (prev + itemsPerPage) % totalNoticias);
  };

  const scrollLeft = () => {
    setCurrentStartIndex((prev) =>
      (prev - itemsPerPage + totalNoticias) % totalNoticias
    );
  };

  // Noticias visibles según startIndex y itemsPerPage
  const noticiasVisibles = [];
  for (let i = 0; i < itemsPerPage; i++) {
    noticiasVisibles.push(noticiasLimitadas[(currentStartIndex + i) % totalNoticias]);
  }

  return (
    <div className="mb-10 relative group">
      <div className="flex justify-between items-center h-10 mb-3 px-2 bg-red-700">
        <h2 className="text-xl font-bold text-white">{categoria}</h2>
        <button
          onClick={() => navigate(`/categoria/${categoria}`)}
          className="text-white h-7 hover:underline flex items-center"
        >
          Ver más
        </button>
      </div>

      <div className="relative px-2 flex items-center">
        {/* Botón izquierda */}
        <button
          onClick={scrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 
                    flex items-center justify-center
                    w-12 h-12 rounded-full 
                    bg-black/30 backdrop-blur-md 
                    text-white text-xl
                    opacity-0 group-hover:opacity-100 
                    transition-all shadow-lg border-none outline-none z-10"
        >
          ◀
        </button>

        {/* Noticias */}
        <div className="flex w-full gap-4">
          {noticiasVisibles.map((noticia, i) => (
            <div
              key={i}
              className="hover:scale-105 transition-transform duration-300"
              style={{
                flex: `0 0 calc(${100 / itemsPerPage}% - ${
                  ((itemsPerPage - 1) * 16) / itemsPerPage
                }px)`,
              }}
            >
              <NewsCard {...noticia} />
            </div>
          ))}
        </div>

        {/* Botón derecha */}
        <button
          onClick={scrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 
                    flex items-center justify-center
                    w-12 h-12 rounded-full 
                    bg-black/30 backdrop-blur-md 
                    text-white text-xl
                    opacity-0 group-hover:opacity-100 
                    transition-all shadow-lg border-none outline-none z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
