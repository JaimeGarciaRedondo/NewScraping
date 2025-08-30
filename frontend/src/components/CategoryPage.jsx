import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

export default function CategoryPage({ allNoticias }) {
  const { categoria } = useParams();  
  const noticiasFiltradas = allNoticias.filter(
    (n) => n.categoria === categoria
  );

  return (
    <div>
      {/* Bloque superior de categoría */}
      <div className="w-full bg-red-700 py-3 shadow-md">
        <h1 className="text-2xl font-bold text-white text-center">
          {categoria}
        </h1>
      </div>

      {/* Contenido con padding */}
      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticiasFiltradas.map((n) => (
            <NewsCard key={n.id} {...n} />
          ))}
        </div>
      </div>
    </div>
  );
}
