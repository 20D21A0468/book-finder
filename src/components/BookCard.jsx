export default function BookCard({ book }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const author = book.author_name ? book.author_name[0] : "Unknown Author";
  const year = book.first_publish_year || "N/A";

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      {cover ? (
        <img
          src={cover}
          alt={`Cover of ${book.title}`}
          className="w-32 h-48 object-cover mb-3 rounded"
        />
      ) : (
        <div className="w-32 h-48 bg-gray-200 mb-3 flex items-center justify-center rounded text-gray-600">
          No Cover
        </div>
      )}

      <h3 className="font-semibold text-center mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600 text-center">{author}</p>
      <p className="text-xs text-gray-500">{year}</p>

      <a
        href={`https://openlibrary.org${book.key}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        View on Open Library
      </a>
    </div>
  );
}
