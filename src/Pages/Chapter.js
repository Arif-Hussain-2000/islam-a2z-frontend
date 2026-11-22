import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Chapter = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [language, setLanguage] = useState("urdu");
  const [activeTab, setActiveTab] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hadithNumber, setHadithNumber] = useState("");
  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Book
        const bookResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books`,
        );

        if (!bookResponse.ok) {
          throw new Error("Failed to fetch book");
        }

        const booksData = await bookResponse.json();

        const selectedBook = booksData.find((item) => item._id === bookId);

        if (!selectedBook) {
          throw new Error("Book not found");
        }

        setBook(selectedBook);

        // Fetch Chapters
        const chapterResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/chapters?bookId=${bookId}`,
        );

        if (!chapterResponse.ok) {
          throw new Error("Failed to fetch chapters");
        }

        const chaptersData = await chapterResponse.json();

        const sortedChapters = chaptersData.sort(
          (a, b) => a.chapterNumber - b.chapterNumber,
        );

        setChapters(sortedChapters);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <main className="min-h-screen">
      <section className=" bg-[#385d50]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Book Description
          </h1>
        </div>
      </section>
      <section className="bg-gradient-to-t from-[#f5f5f5] from-50% to-[#ffffff] to-50%">
        <div className=" mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mx-auto w-full max-w-[220px] sm:max-w-[280px]">
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
        </div>
      </section>
      <div className="py-4 px-2">
        <div className="mx-auto max-w-3xl p-5 ">
          {/* Tab Buttons */}
          <div className="flex border-b bg-[#385d50]">
            <button
              onClick={() => setActiveTab(1)}
              className={`w-1/3 p-4 ${
                activeTab === 1
                  ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold"
                  : "text-black font-bold bg-white "
              }`}
            >
              <h2>About</h2>
            </button>

            <button
              onClick={() => setActiveTab(2)}
              className={`w-1/3 p-4 ${
                activeTab === 2
                  ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold"
                  : "text-black font-bold bg-white "
              }`}
            >
              Chapters
            </button>

            <button
              onClick={() => setActiveTab(3)}
              className={`w-1/3 p-4 ${
                activeTab === 3
                  ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold"
                  : "text-black font-bold bg-white"
              }`}
            >
              Search
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 urdu-text" dir="rtl">
            {activeTab === 1 && <p>{book.aboutBook}</p>}
            {activeTab === 2 && (
              <div>
                {/* Language Selector */}
                <div className="mb-5 flex justify-center p-1.5">
                  <div className="rounded-2xl bg-white shadow-sm">
                    <div className="flex gap-1">
                      {/* Urdu */}
                      <button
                        onClick={() => setLanguage("urdu")}
                        className={` px-4 py-2 md:px-7 md:py-4 text-xs md:text-sm font-semibold transition duration-300 ${
                          language === "urdu"
                            ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold bg-[#385d50]"
                            : "text-black font-bold"
                        }`}
                      >
                        URD
                      </button>

                      {/* English */}
                      <button
                        onClick={() => setLanguage("english")}
                        className={` px-4 py-2 md:px-7 md:py-4 text-xs md:text-sm font-semibold transition duration-300 ${
                          language === "english"
                            ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold bg-[#385d50]"
                            : "text-black font-bold"
                        }`}
                      >
                        ENG
                      </button>

                      {/* Arabic */}
                      <button
                        onClick={() => setLanguage("arabic")}
                        className={`px-4 py-2 md:px-7 md:py-4 text-xs md:text-sm font-semibold transition duration-300 ${
                          language === "arabic"
                            ? "border-b-4 border-[#f9bf29] text-[#f9bf29] font-bold bg-[#385d50]"
                            : "text-black font-extrabold bg-white"
                        }`}
                      >
                        ROMAN
                      </button>
                    </div>
                  </div>
                </div>
                {/* Chapter List */}
                <div className="space-y-4">
                  {chapters.map((chapter) => (
                    <Link
                      dir={language === "urdu" ? "rtl" : "ltr"}
                      key={chapter._id}
                      to={`/books/${bookId}/chapters/${chapter._id}/hadiths`}
                      className="group block rounded-lg  bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 group-hover:border-[#f9bf29] hover:shadow-md md:p-6 "
                    >
                      <div className="flex items-center gap-5">
                        {/* Chapter Number */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#385d50] text-sm md:text-md font-medium text-white transition group-hover:bg-[#385d50] group-hover:text-[#ffffff]">
                          {chapter.chapterNumber}
                        </div>

                        {/* Chapter Information */}
                        <div className="min-w-0 flex-1">
                          <h2 className="text-md urdu-text font-semibold text-[#385d50] transition   md:text-lg ">
                            {language === "urdu"
                              ? chapter.title?.urdu
                              : language === "english"
                                ? chapter.title?.english
                                : chapter.title?.roman}
                          </h2>
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
            )}
            {activeTab === 3 && (
              <div>
                {/* Page Heading */}
                <div className="mb-10 text-center" dir="ltr">
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
                      placeholder="Enter Hadith No."
                      className="w-full rounded-l-lg border px-4 py-2 pr-10"
                    />

                    <button className="rounded-r-lg bg-[#385d50] px-5 py-2 text-white ">
                      <i className="bi-search font-extrabold"></i>
                    </button>
                  </form>

                  {searchError && (
                    <p className="mt-2 text-sm text-red-600">{searchError}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
