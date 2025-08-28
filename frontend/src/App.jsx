import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsLayout from "./components/NewsLayout";
import CategoryPage from "./components/CategoryPage";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/noticias`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Noticias recibidas:", data);
        setNoticias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando noticias...</p>;

  return (
    <>
      {/* Navbar fijo en todas las páginas */}
      <Navbar />

      {/* Padding superior para no tapar contenido */}
      <div className="pt-16">
        <Routes>
          {/* Página principal: layout con filas tipo Netflix */}
          <Route path="/" element={<NewsLayout data={noticias} />} />

          {/* Página de "Ver más" por categoría */}
          <Route
            path="/categoria/:categoria"
            element={<CategoryPage allNoticias={noticias} />}
          />
        </Routes>
      </div>
    </>
  );
}
