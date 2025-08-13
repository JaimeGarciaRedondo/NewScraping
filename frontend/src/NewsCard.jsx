export default function NewsCard({ titulo, url, imagen, fuente, categoria }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {imagen && (
        <img src={imagen} alt={titulo} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
        <p className="text-gray-600 mb-2">{categoria}</p>
        <span className="text-sm text-blue-500 font-medium">{fuente}</span>
      </div>
    </a>
  );
}
