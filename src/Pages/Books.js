import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let timedOut = false;

    const fetchBooks = async () => {
      setLoading(true);
      setError("");

      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, 60000);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        if (error.name === "AbortError" && !timedOut) {
          return;
        }

        console.log("Error fetching books:", error);

        setError(
          timedOut
            ? "Server is taking too long to respond. Please try again."
            : "Unable to load books. Please check your connection and try again."
        );
      } finally {
        clearTimeout(timeout);

        if (!controller.signal.aborted || timedOut) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-gray-600">Loading books...</p>
        <p className="mt-2 text-sm text-gray-400">
          Please wait while the server responds.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-red-600">{error}</p>

        <button
          onClick={handleRetry}
          className="mt-5 rounded-lg bg-green-700 px-6 py-2 text-white transition hover:bg-green-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Islamic Books
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Explore Islamic books and increase your knowledge through
            reliable sources.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {books.length === 0 ? (
          <div className="rounded-2xl border border-green-100 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No books available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Books will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <Link
                to={`/books/${book._id}/chapters`}
                key={book._id}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-2xl transition group-hover:bg-green-700">
                  <span className="transition group-hover:grayscale group-hover:brightness-0 group-hover:invert">
                    📖
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Book {index + 1}
                </p>

                <h2 className="mt-2 text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                  {book.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Read chapters and explore authentic Islamic knowledge.
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-medium text-gray-500">
                    Explore book
                  </span>

                  <span className="text-lg text-green-700 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};