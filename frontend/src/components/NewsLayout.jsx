import NewsRow from "./NewsRow";

export default function NewsLayout({ data }) {
  const categorias = [...new Set(data.map((n) => n.categoria))];

  return (
    <div className="space-y-10">
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
