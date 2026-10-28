import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Chapter = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hadithNumber, setHadithNumber] = useState("");
  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/chapters?bookId=${bookId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }

        const data = await response.json();

        setChapters(data);

const sortedChapters = data.sort(
  (a, b) => a.chapterNumber - b.chapterNumber
);

setChapters(sortedChapters);
      } catch (error) {
        console.log("Error fetching chapters:", error);
        setError("Failed to load Chapters");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [bookId]);

  const searchHadith = async (e) => {
    e.preventDefault();

    if (!hadithNumber.trim()) {
      setSearchError("");
      return;
    }

    setSearchError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/hadiths?bookId=${bookId}&hadithNumber=${hadithNumber}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hadith");
      }

      const data = await response.json();

      if (!data) {
        setSearchError("Hadith not found");
        return;
      }

      navigate(
        `/books/${data.bookId}/chapters/${data.chapterId}/hadiths?hadithNumber=${data.hadithNumber}`,
      );
    } catch (error) {
      console.log("Error fetching hadith:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">Loading chapters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <form
            onSubmit={searchHadith}
            className="mx-auto mb-5 flex w-full max-w-md"
          >
            <input
              type="number"
              value={hadithNumber}
              onChange={(e) => {
                setHadithNumber(e.target.value);
              }}
              placeholder="Search By Hadith No."
              className="w-full rounded-l-lg border px-4 py-2 pr-10"
            />

            <button className="rounded-r-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800">
              Search
            </button>
          </form>

          {searchError && (
            <p className="mt-2 text-sm text-red-600">
              {searchError}
            </p>
          )}

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Chapters
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Explore the chapters and continue reading authentic Islamic
            knowledge.
          </p>
        </div>

        {/* Chapter List */}
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter._id}
              to={`/books/${bookId}/chapters/${chapter._id}/hadiths`}
              className="group block rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md md:p-6"
            >
              <div className="flex items-center gap-5">

                {/* Chapter Number */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg font-bold text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                  {chapter.chapterNumber}
                </div>

                {/* Chapter Information */}
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-green-600">
                    Chapter {chapter.chapterNumber}
                  </p>

                  <h2 className="text-lg font-semibold text-gray-900 transition group-hover:text-green-700 md:text-xl">
                    {chapter.title}
                  </h2>
                </div>

                {/* Arrow */}
                <div className="text-xl text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-green-700">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Chapters */}
        {chapters.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No chapters found for this book.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};