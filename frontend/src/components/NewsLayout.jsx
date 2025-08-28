import NewsRow from "./NewsRow";

export default function NewsLayout({ data }) {
  const categorias = [...new Set(data.map((n) => n.categoria))];

  return (

    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-center my-6 text-red-700">NewScraping</h1>

      {categorias.map((cat) => (
        <NewsRow
          key={cat}
          categoria={cat}
          noticias={data.filter((n) => n.categoria === cat)}
        />
      ))}
    </div>
  );
}
