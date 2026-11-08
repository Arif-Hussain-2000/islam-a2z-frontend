import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const Hadith = () => {
  const [searchParams] = useSearchParams();
  const searchNumber = searchParams.get("hadithNumber");
  const { chapterId, bookId } = useParams();
  const navigate = useNavigate();

  const [hadiths, setHadiths] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState("urdu");

  const [openNarrator, setOpenNarrator] = useState(null);
  const [openExplanation, setOpenExplanation] = useState(null);

  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hadithResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/hadiths?chapterId=${chapterId}`,
        );

        if (!hadithResponse.ok) {
          throw new Error("Failed to fetch hadiths");
        }

        const hadithData = await hadithResponse.json();
        setHadiths(hadithData);

        if (searchNumber) {
          const foundIndex = hadithData.findIndex(
            (hadith) => hadith.hadithNumber === Number(searchNumber),
          );

          if (foundIndex !== -1) {
            setCurrentHadithIndex(foundIndex);
          }
        }

        const chapterResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/chapters/${chapterId}`,
        );

        if (!chapterResponse.ok) {
          throw new Error("Failed to fetch chapter");
        }

        const chapterData = await chapterResponse.json();

        setChapter(chapterData);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to load Hadith.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId, searchNumber]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f2]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-700"></div>
          <p className="text-sm text-gray-500">Loading Hadiths...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f2]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const currentHadith = hadiths[currentHadithIndex];

  return (
    <main className="min-h-screen bg-white py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-2 md:px-8">
        <div className="mb-5 flex justify-between">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/books/${bookId}/chapters`)}
            className="mb-8 inline-flex  items-center gap-2 rounded-xl  bg-green-800 px-7 py-4  text-xsm font-medium text-white shadow-sm transition duration-300  hover:bg-green-900 md:text-sm"
          >
            <span className="text-sm md:text-xl">←</span>
            Back
          </button>
          {/* Language Selector */}
          <div className="mb-5 flex justify-center p-1.5">
            <div className="rounded-2xl  bg-white shadow-sm">
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage("urdu")}
                  className={`urdu-text rounded-xl px-4 py-2 md:px-7 md:py-4 text-xsm md:text-sm font-semibold transition duration-300 ${
                    language === "urdu"
                      ? "bg-green-800 text-white shadow-md"
                      : "text-gray-900 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  اردو
                </button>

                <button
                  onClick={() => setLanguage("english")}
                  className={`rounded-xl px-4 py-2 md:px-7 md:py-4 text-xsm md:text-sm font-semibold transition duration-300 ${
                    language === "english"
                      ? "bg-green-800 text-white shadow-md"
                      : "text-gray-900 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-900 via-green-800 to-green-700 px-6 py-10 text-center shadow-lg md:px-10">
          <div className="relative">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-200">
              Chapter {chapter?.chapterNumber}
            </p>

            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {chapter?.title}
            </h1>
          </div>
        </div>

        {/* Hadith */}
        <div>
          {currentHadith && (
            <article className="overflow-hidden rounded-xl   bg-white ">
              {/* Hadith Header */}
              <div className="flex items-center justify-between border-b border-green-50 bg-green-800 px-5 py-4 md:px-7">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xl font-bold text-white">
                      Hadith no. {currentHadith.hadithNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-8">
                <div className="flex flex-col md:flex-row-reverse gap-4">
                  {/* Arabic */}
                  <div className="relative mb-2 overflow-hidden rounded-xl border border-gray-100 px-2 py-2 text-center md:px-4 md:py-10">
                    <p
                      dir="rtl"
                      className="arabic-text relative text-right text-2xl leading-[2] text-gray-900 font-semibold md:text-3xl"
                    >
                      {currentHadith.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="mb-2">
                    <div className="rounded-2xl border text-center border-gray-100  bg-white px-2 py-10 md:px-10">
                      <p
                        dir={language === "urdu" ? "rtl" : "ltr"}
                        className={`${
                          language === "urdu" ? "urdu-text" : ""
                        } text-2xl leading-9 text-gray-900  md:text-3xl ${
                          language === "urdu" ? "text-right" : "text-left"
                        }`}
                      >
                        {language === "urdu"
                          ? currentHadith.urdu
                          : currentHadith.english}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6">
                  <button
                    onClick={() =>
                      setOpenNarrator(
                        openNarrator === currentHadith._id
                          ? null
                          : currentHadith._id,
                      )
                    }
                    className={`urdu-text rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                      openNarrator === currentHadith._id
                        ? "border-green-800 bg-green-800 text-white"
                        : "border-green-800 bg-green-800 text-white hover:bg-green-900"
                    }`}
                  >
                    {openNarrator === currentHadith._id
                      ? "Hide Grade"
                      : "Show Grade"}
                  </button>

                  <button
                    onClick={() =>
                      setOpenExplanation(
                        openExplanation === currentHadith._id
                          ? null
                          : currentHadith._id,
                      )
                    }
                    className={`urdu-text rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                      openExplanation === currentHadith._id
                        ? "border-green-800 bg-green-800 text-white"
                        : "border-green-800 bg-green-800 text-white hover:bg-green-900"
                    }`}
                  >
                    {openExplanation === currentHadith._id
                      ? "Hide Explanation"
                      : "Explanation"}
                  </button>
                </div>

                {/* Narrator */}
                {openNarrator === currentHadith._id && (
                  <div className="mt-5 rounded-2xl border border-gray-100 whitespace-pre-wrap bg-white p-5 md:p-6">
                    <div
                      className={`mb-3 font-semibold text-green-800 ${
                        language === "urdu" ? "urdu-text" : ""
                      }`}
                    ></div>

                    <p
                      dir={language === "urdu" ? "rtl" : "ltr"}
                      className={`${
                        language === "urdu" ? "urdu-text" : ""
                      } text-base leading-8 text-gray-900 ${
                        language === "urdu" ? "text-right" : "text-left"
                      }`}
                    >
                      {language === "urdu"
                        ? currentHadith.narrator?.urdu
                        : currentHadith.narrator?.english}
                    </p>
                  </div>
                )}

                {/* Explanation */}
                {openExplanation === currentHadith._id && (
                  <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
                    <div
                      className={`mb-3 font-semibold whitespace-pre-wrap text-gray-900 ${
                        language === "urdu" ? "urdu-text" : ""
                      }`}
                    ></div>

                    <p
                      dir={language === "urdu" ? "rtl" : "ltr"}
                      className={`${
                        language === "urdu" ? "urdu-text" : ""
                      } text-base whitespace-pre-wrap leading-8 text-gray-900 ${
                        language === "urdu" ? "text-right" : "text-left"
                      }`}
                    >
                      {language === "urdu"
                        ? currentHadith.explanation?.urdu
                        : currentHadith.explanation?.english}
                    </p>
                  </div>
                )}
              </div>
            </article>
          )}
        </div>

        {/* Previous / Next */}
        {hadiths.length > 0 && (
          <div className="mt-7 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3  md:p-4">
            <button
              onClick={() => {
                setCurrentHadithIndex((prev) => prev - 1);
                setOpenNarrator(null);
                setOpenExplanation(null);
              }}
              disabled={currentHadithIndex === 0}
              className="rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-30 md:px-5"
            >
              ← <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="rounded-full bg-green-800 px-4 py-2 text-sm font-semibold text-white">
              {currentHadithIndex + 1} / {hadiths.length}
            </div>

            <button
              onClick={() => {
                setCurrentHadithIndex((prev) => prev + 1);
                setOpenNarrator(null);
                setOpenExplanation(null);
              }}
              disabled={currentHadithIndex === hadiths.length - 1}
              className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-30 md:px-5"
            >
              <span className="hidden sm:inline">Next</span> →
            </button>
          </div>
        )}

        {/* No Hadith */}
        {hadiths.length === 0 && (
          <div className="rounded-2xl border border-green-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-700">
              📖
            </div>

            <p className="font-medium text-gray-700">
              No Hadiths found for this chapter.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Please check back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
