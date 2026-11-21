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
          { signal: controller.signal },
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
            : "Unable to load books. Please check your connection and try again.",
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
    <div className="min-h-screen bg-white">
      <section className=" bg-[#385d50]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Books
          </h1>

          <p className="mx-auto py-4 mt-4 max-w-2xl text-base leading-7 font-semibold  text-white text-xxl md:text-2xl">
            Discover a collection of Hadith books. Explore chapters, read translations, and gain a deeper understanding of Islamic teachings through a simple and accessible reading experience.
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
          <div className="mx-2 md:mx-8 grid gap-6 grid-cols-2 md:grid-cols-3">
            {books.map((book, index) => (
 <Link
  to={`/books/${book._id}/chapters`}
  key={book._id}
  className="group mt-4 block cursor-pointer transition duration-300 hover:-translate-y-2"
>
  <div className="mx-auto w-full max-w-[320px] sm:max-w-[280px]">

    {/* Book */}
    <div className="relative my-4 flex aspect-[3/4] w-full rounded-r-lg bg-[#203B32] p-2 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:shadow-[12px_14px_20px_rgba(0,0,0,0.35)]">

      {/* Spine */}
      <div className="relative w-4 shrink-0 rounded-l-sm bg-gradient-to-r from-[#203B32] to-[#385D50] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.3)] sm:w-5"></div>

      {/* Front Cover */}
      <div className="relative flex min-w-0 flex-1 flex-col items-center justify-between overflow-hidden rounded-r-md border border-[#F9BF29] bg-gradient-to-br from-[#456F60] to-[#29483D] px-2 py-5 text-center shadow-[inset_2px_0_5px_rgba(255,255,255,0.12)] transition-all duration-300 group-hover:border-[#F9BF29]">

        <h3 className="my-auto w-full break-words text-base font-bold text-[#F9BF29] sm:text-2xl md:text-3xl">
          {book.title}
        </h3>

        <p className="mt-auto text-xs font-medium text-[#F9BF29] sm:text-base md:text-lg">
          {book.author}
        </p>

      </div>
    </div>
  </div>
</Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
