export default function NewsCard({ titulo, url, imagen, fuente, categoria }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {imagen ? (
        <img
          src={imagen}
          alt={titulo}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
          📄 Sin imagen
        </div>
      )}

      <div className="p-3">
        <h2 className="text-sm font-semibold line-clamp-2 mb-1">{titulo}</h2>
        <p className="text-xs text-gray-600 mb-1">{categoria}</p>
        <span className="text-xs text-blue-500 font-medium">{fuente}</span>
      </div>
    </a>
  );
}
