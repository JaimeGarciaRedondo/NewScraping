import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fuente, setFuente] = useState("todas"); // estado de filtro

  const fetchNoticias = (fuente = "todas") => {
    setLoading(true);

    const url =
      fuente === "todas"
        ? `${import.meta.env.VITE_API_URL}/noticias`
        : `${import.meta.env.VITE_API_URL}/noticias/${fuente}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener noticias:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNoticias(fuente);
  }, [fuente]);

  if (loading) {
    return <p className="text-center mt-10">Cargando noticias...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📰 Noticias del Backend
      </h1>

      {/* Botones para filtrar */}
      <div className="flex justify-center gap-4 mb-6">
        {["todas", "Marca", "As"].map((f) => (
          <button
            key={f}
            onClick={() => setFuente(f)}
            className={`px-4 py-2 rounded ${
              fuente === f ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid de noticias */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((n) => (
          <NewsCard key={n.id} {...n} />
        ))}
      </div>
    </div>
  );
}
