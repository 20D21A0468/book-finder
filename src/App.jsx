import { useState } from "react";
import BookCard from "./components/BookCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a book title.");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (!data.docs.length) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 12)); // top 12 results
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">📚 Book Finder</h1>

      {/* Search bar */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading + error */}
      {loading && (
  <p className="text-gray-600 animate-pulse">Fetching books...</p>
)}

{error && (
  <p className="bg-red-100 text-red-700 px-3 py-2 rounded">{error}</p>
)}


      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">

        {books.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  );
}
