import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const Hadith = () => {
  const [searchParams] = useSearchParams();
  const searchNumber = searchParams.get("hadithNumber");
  const { chapterId } = useParams();

  const [activeTab, setActiveTab] = useState(1);

  const [hadiths, setHadiths] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState("urdu");
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const [lightMode, setLightMode] = useState(false);

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
        setHadiths(hadithData.sort((a, b) => a.hadithNumber - b.hadithNumber));

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

  const readingBg = lightMode ? "bg-[#F5F5F5]" : "bg-[#ede6d3]";
  const cardBorder = lightMode ? "border-gray-200" : "border-black";
  const readingText = lightMode ? "text-gray-800" : "text-black";

  return (
    <main className="min-h-screen bg-[#385d50]">
      {/* Header */}
      <section className="bg-[#385d50]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Hadith
          </h1>

          <p className="mx-auto mt-4 max-w-2xl py-4 text-base font-semibold leading-7 text-white md:text-2xl">
            Total Number of Hadith in this Chapter: {hadiths.length}
          </p>

          <h2
            className={`text-2xl font-bold tracking-tight text-white md:text-3xl ${language === "urdu" ? "urdu-text" : ""}`}
          >
            {language === "urdu"
              ? chapter.title?.urdu
              : language === "english"
                ? chapter.title?.english
                : chapter.title?.roman}
          </h2>
        </div>

        {/* Language Selector */}
        <div className="mb-5 flex justify-center p-1.5">
          <div className="bg-[#385d50]">
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage("urdu")}
                className={`px-4 py-2 text-xs font-semibold transition duration-300 md:px-7 md:py-4 md:text-sm ${
                  language === "urdu"
                    ? "border-b-4 border-[#f9bf29] bg-[#385d50] font-bold text-[#f9bf29]"
                    : "bg-[#385d50] font-bold text-white"
                }`}
              >
                URD
              </button>

              <button
                onClick={() => setLanguage("english")}
                className={`px-4 py-2 text-xs font-semibold transition duration-300 md:px-7 md:py-4 md:text-sm ${
                  language === "english"
                    ? "border-b-4 border-[#f9bf29] bg-[#385d50] font-bold text-[#f9bf29]"
                    : "bg-[#385d50] font-bold text-white"
                }`}
              >
                ENG
              </button>

              <button
                onClick={() => setLanguage("arabic")}
                className={`px-4 py-2 text-xs font-semibold transition duration-300 md:px-7 md:py-4 md:text-sm ${
                  language === "arabic"
                    ? "border-b-4 border-[#f9bf29] bg-[#385d50] font-bold text-[#f9bf29]"
                    : "bg-[#385d50] font-bold text-white"
                }`}
              >
                ROMAN
              </button>
            </div>
          </div>
        </div>

        {/* Reading Mode Toggle */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setLightMode(!lightMode)}
            className="flex items-center gap-2 rounded-full border border-[#f9bf29] px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#f9bf29] hover:text-[#385d50]"
          >
            <i className={`bi ${lightMode ? "bi-moon-stars" : "bi-sun"}`}></i>

            {lightMode ? "Default Mode" : "Light Mode"}
          </button>
        </div>
      </section>

      <div
        className={`mx-auto max-w-5xl px-2 py-2 transition-colors duration-300 md:px-8 ${readingBg}`}
      >
        {/* Hadith Number Buttons */}
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap"
          dir="rtl"
        >
          {hadiths.map((hadith, index) => (
            <button
              key={hadith._id || index}
              className={`mb-4 shrink-0 rounded-lg border px-5 py-3 text-sm font-semibold transition duration-300 md:text-lg ${
                currentHadithIndex === index
                  ? "border-4 border-[#f9bf29] bg-[#385d50] font-extrabold text-[#f9bf29]"
                  : "bg-[#385d50] font-bold text-white hover:border-[#385d50]"
              }`}
              onClick={() => {
                setCurrentHadithIndex(index);
                setActiveTab(1);
              }}
            >
              {hadith.hadithNumber}
            </button>
          ))}
        </div>

        {/* Hadith Content */}
        <div>
          {currentHadith && (
            <article
              className={`overflow-hidden transition-colors duration-300 ${readingBg}`}
            >
              {/* Hadith Header */}
              <div className="flex items-center justify-center bg-[#385d50] px-5 py-4 md:px-7">
                <p className="text-center text-xl font-bold text-white urdu-text md:text-2xl">
                  {currentHadith.hadithTitle}
                </p>
              </div>

              <div className="p-5 md:p-8">
                {/* Arabic and Translation */}
                <div
                  className="grid items-start gap-4 md:grid-cols-2"
                  style={{ direction: "rtl" }}
                >
                  {/* Arabic */}
                  <div
                    className={`relative mb-2 w-full min-w-0 overflow-hidden rounded-xl border px-2 py-2 text-center transition-colors duration-300 md:px-4 md:py-10 ${cardBorder} ${readingBg}`}
                  >
                    <p
                      dir="rtl"
                      className={`relative text-right text-2xl font-normal leading-[2.2] arabic-text md:text-3xl ${readingText}`}
                    >
                      {currentHadith.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="mb-2">
                    <div
                      className={`w-full min-w-0 rounded-2xl border px-2 py-10 text-center transition-colors duration-300 md:px-10 ${cardBorder} ${readingBg}`}
                    >
                      <p
                        dir={language === "urdu" ? "rtl" : "ltr"}
                        className={`text-justify text-lg leading-9 transition-colors duration-300 md:text-xl ${
                          lightMode ? "text-gray-700" : "text-gray-900"
                        } ${
                          language === "urdu"
                            ? "urdu-text text-right"
                            : "text-left"
                        }`}
                      >
                        {language === "urdu"
                          ? currentHadith.urdu
                          : language === "english"
                            ? currentHadith.english
                            : currentHadith.roman}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grade & Explanation Tabs */}
                <div
                  className={`mx-auto mt-6 max-w-3xl transition-colors duration-300 ${readingBg}`}
                >
                  {/* Tab Buttons */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab(1)}
                      className={`w-1/2 p-4 font-semibold transition duration-300 urdu-text ${
                        activeTab === 1
                          ? "border-b-4 border-[#f9bf29] bg-[#385d50] text-[#f9bf29]"
                          : "bg-[#385d50] font-bold text-white"
                      }`}
                    >
                      {language === "urdu" ? "صحتِ حدیث" : "Grade"}
                    </button>

                    <button
                      onClick={() => setActiveTab(2)}
                      className={`w-1/2 p-4 font-semibold transition duration-300 urdu-text ${
                        activeTab === 2
                          ? "border-b-4 border-[#f9bf29] bg-[#385d50] text-[#f9bf29]"
                          : "bg-[#385d50] font-bold text-white"
                      }`}
                    >
                      {language === "urdu" ? "شرح حدیث" : "Explanation"}
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div
                    className={`min-h-[120px] rounded-b-xl border p-5 transition-colors duration-300 md:p-6 ${cardBorder} ${readingBg}`}
                  >
                    {/* Grade */}
                    {activeTab === 1 && (
                      <div>
                        <p
                          dir={language === "urdu" ? "rtl" : "ltr"}
                          className={`whitespace-pre-wrap text-justify text-lg font-normal leading-8 transition-colors duration-300 md:text-xl ${
                            language === "urdu"
                              ? "urdu-text text-right"
                              : "text-left"
                          } ${readingText}`}
                        >
                          {language === "urdu"
                            ? currentHadith.narrator?.urdu
                            : currentHadith.narrator?.english}
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    {activeTab === 2 && (
                      <div>
                        <p
                          dir={language === "urdu" ? "rtl" : "ltr"}
                          className={`whitespace-pre-wrap text-justify text-lg font-normal leading-8 transition-colors duration-300 md:text-xl ${
                            language === "urdu"
                              ? "urdu-text text-right"
                              : "text-left"
                          } ${readingText}`}
                        >
                          {language === "urdu"
                            ? currentHadith.explanation?.urdu
                            : language === "english"
                              ? currentHadith.explanation?.english
                              : currentHadith.explanation?.roman}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* No Hadith */}
        {hadiths.length === 0 && (
          <div
            className={`rounded-2xl border border-green-100 p-10 text-center shadow-sm ${readingBg}`}
          >
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
