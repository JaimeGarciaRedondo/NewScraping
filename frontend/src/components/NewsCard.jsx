export default function NewsCard({ titulo, url, imagen, fuente, categoria }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-72 w-full"
    >
      {imagen ? (
        <img
          src={imagen}
          alt={titulo}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-red-700 text-xs">
          📄 Sin imagen
        </div>
      )}

      <div className="p-3">
        <h2 className="text-sm text-red-700 font-semibold line-clamp-2 mb-1">{titulo}</h2>
        <p className="text-xs text-gray-700 mb-1">{categoria}</p>
        <span className="text-xs text-gray-700 font-medium">{fuente}</span>
      </div>
    </a>
  );
}
