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
      <div className="mx-auto max-w-5xl px-5 md:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(`/books/${bookId}/chapters`)}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-green-100 bg-white px-4 py-2.5 text-sm font-medium text-green-800 shadow-sm transition duration-300 hover:-translate-x-1 hover:border-green-200 hover:bg-green-50"
        >
          <span className="text-lg">←</span>
          Back to Chapters
        </button>

        {/* Chapter Header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-900 via-green-800 to-green-700 px-6 py-10 text-center shadow-lg md:px-10">

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5"></div>
          <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white/5"></div>

          <div className="relative">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl text-white ring-1 ring-white/20">
              ✦
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-200">
              Chapter {chapter?.chapterNumber}
            </p>

            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {chapter?.title}
            </h1>

            <div className="mx-auto mt-5 h-px w-16 bg-green-300/60"></div>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-green-100 md:text-base">
              Read authentic Hadith with translation, narrator details and
              explanation.
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl border border-green-100 bg-white p-1.5 shadow-sm">
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage("urdu")}
                className={`urdu-text rounded-xl px-7 py-2.5 text-sm font-semibold transition duration-300 ${
                  language === "urdu"
                    ? "bg-green-700 text-white shadow-md"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                اردو
              </button>

              <button
                onClick={() => setLanguage("english")}
                className={`rounded-xl px-7 py-2.5 text-sm font-semibold transition duration-300 ${
                  language === "english"
                    ? "bg-green-700 text-white shadow-md"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Hadith */}
        <div>
          {currentHadith && (
            <article className="overflow-hidden rounded-3xl border border-green-50 bg-white shadow-[0_8px_35px_rgba(20,83,45,0.08)]">

              {/* Hadith Header */}
              <div className="flex items-center justify-between border-b border-green-50 bg-green-50 px-5 py-4 md:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                    {currentHadith.hadithNumber}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      Hadith no. {currentHadith.hadithNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-8">
                <div className="flex flex-col md:flex-row-reverse">

                  {/* Arabic */}
                  <div className="relative mb-8 overflow-hidden rounded-xl border px-5 py-8 md:px-10 md:py-10">
                    <p
                      dir="rtl"
                      className="arabic-text relative text-right text-xl leading-[2.4] text-green-900 md:text-3xl"
                    >
                      {currentHadith.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-100"></div>

                      <h2
                        className={`text-sm font-semibold text-gray-700 ${
                          language === "urdu" ? "urdu-text" : ""
                        }`}
                      >
                        {language === "urdu"
                          ? "اردو ترجمہ"
                          : "English Translation"}
                      </h2>

                      <div className="h-px flex-1 bg-gray-100"></div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-[#fcfcfa] px-5 py-6 md:px-7">
                      <p
                        dir={language === "urdu" ? "rtl" : "ltr"}
                        className={`${
                          language === "urdu" ? "urdu-text" : ""
                        } text-lg leading-9 text-gray-700 md:text-3xl ${
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
                <div className="flex flex-wrap gap-3 border-t border-green-50 pt-6">

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
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-green-200 bg-green-50/50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {openNarrator === currentHadith._id
                      ? "Hide Narrator"
                      : "Narrator / Raavi"}
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
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-green-200 bg-green-50/50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {openExplanation === currentHadith._id
                      ? "Hide Explanation"
                      : "Explanation"}
                  </button>
                </div>

                {/* Narrator */}
                {openNarrator === currentHadith._id && (
                  <div className="mt-5 rounded-2xl border border-green-100 bg-green-50/50 p-5 md:p-6">
                    <h3
                      className={`mb-3 font-semibold text-green-800 ${
                        language === "urdu" ? "urdu-text" : ""
                      }`}
                    >
                      {language === "urdu" ? "راوی" : "Narrator"}
                    </h3>

                    <p
                      dir={language === "urdu" ? "rtl" : "ltr"}
                      className={`${
                        language === "urdu" ? "urdu-text" : ""
                      } text-base leading-8 text-gray-700 ${
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
                  <div className="mt-5 rounded-2xl border border-green-100 bg-green-50/50 p-5 md:p-6">
                    <h3
                      className={`mb-3 font-semibold text-green-800 ${
                        language === "urdu" ? "urdu-text" : ""
                      }`}
                    >
                      {language === "urdu" ? "تشریح" : "Explanation"}
                    </h3>

                    <p
                      dir={language === "urdu" ? "rtl" : "ltr"}
                      className={`${
                        language === "urdu" ? "urdu-text" : ""
                      } text-base leading-8 text-gray-700 ${
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
          <div className="mt-7 flex items-center justify-between rounded-2xl border border-green-100 bg-white p-3 shadow-sm md:p-4">

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

            <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
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