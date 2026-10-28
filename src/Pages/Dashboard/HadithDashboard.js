import { useState, useEffect } from "react";
import { Toast } from "../../Components/Toast";
export const HadithDashboard = () => {
  const [showHadithForm, setShowHadithForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedHadithBook, setSelectedHadithBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedHadithChapter, setSelectedHadithChapter] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [arabic, setArabic] = useState("");
  const [urdu, setUrdu] = useState("");
  const [english, setEnglish] = useState("");
  const [narratorUrdu, setNarratorUrdu] = useState("");
  const [narratorEnglish, setNarratorEnglish] = useState("");
  const [explanationUrdu, setExplanationUrdu] = useState("");
  const [explanationEnglish, setExplanationEnglish] = useState("");
  const [showUpdateHadithForm, setShowUpdateHadithForm] = useState(false);
  const [hadiths, setHadiths] = useState([]);
  const [selectedUpdateHadith, setSelectedUpdateHadith] = useState("");
  const [toast,setToast]=useState(null);
  // Fetch Books
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books`);

      const data = await response.json();

      if (response.ok) {
        setBooks(data);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  // Fetch Chapters
  const fetchChapters = async (bookId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chapters?bookId=${bookId}`,
      );

      const data = await response.json();

      if (response.ok) {
        setChapters(data);
      }
    } catch (error) {
      console.log("Error fetching chapters:", error);
    }
  };
  const resetHadithForm = () => {
    setSelectedHadithBook("");
    setSelectedHadithChapter("");
    setSelectedUpdateHadith("");

    setChapters([]);
    setHadiths([]);

    setHadithNumber("");
    setArabic("");
    setUrdu("");
    setEnglish("");

    setNarratorUrdu("");
    setNarratorEnglish("");

    setExplanationUrdu("");
    setExplanationEnglish("");
  };

  const handleAddHadith = async () => {
    if (!selectedHadithBook) {
      setToast({ message: "Please select a book", type: "error", });
      return;
    }

    if (!selectedHadithChapter) {
      setToast({ message: "Please select a chapter", type: "error", });
      return;
    }

    if (!hadithNumber) {
      setToast({ message: "Please Enter Hadith no.", type: "error", });
      return;
    }

    if (!arabic.trim()) {
      alert("Please enter Arabic Hadith");
      return;
    }

    if (!urdu.trim()) {
      alert("Please enter Urdu translation");
      return;
    }

    if (!english.trim()) {
      alert("Please enter English translation");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hadiths`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: selectedHadithBook,
          chapterId: selectedHadithChapter,
          hadithNumber: Number(hadithNumber),
          arabic,
          urdu,
          english,

          narrator: {
            urdu: narratorUrdu,
            english: narratorEnglish,
          },

          explanation: {
            urdu: explanationUrdu,
            english: explanationEnglish,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add Hadith");
        return;
      }

      setHadithNumber("");
      setArabic("");
      setUrdu("");
      setEnglish("");

      setNarratorUrdu("");
      setNarratorEnglish("");

      setExplanationUrdu("");
      setExplanationEnglish("");

      setSelectedHadithBook("");
      setSelectedHadithChapter("");
      setChapters([]);

      setShowHadithForm(false);
    } catch (error) {
      console.log("Error adding Hadith:", error);
      alert("Server error");
    }
  };
  const handleSelectUpdateHadith = (hadithId) => {
    setSelectedUpdateHadith(hadithId);

    const selectedHadith = hadiths.find((hadith) => hadith._id === hadithId);

    if (!selectedHadith) {
      return;
    }

    setHadithNumber(selectedHadith.hadithNumber);
    setArabic(selectedHadith.arabic);
    setUrdu(selectedHadith.urdu);
    setEnglish(selectedHadith.english);

    setNarratorUrdu(selectedHadith.narrator?.urdu || "");

    setNarratorEnglish(selectedHadith.narrator?.english || "");

    setExplanationUrdu(selectedHadith.explanation?.urdu || "");

    setExplanationEnglish(selectedHadith.explanation?.english || "");
  };

  // Update Hadith
  const handleUpdateHadith = async () => {
    if (!selectedUpdateHadith) {
      alert("Please select a Hadith");
      return;
    }

    if (!selectedHadithBook) {
      alert("Please select a book");
      return;
    }

    if (!selectedHadithChapter) {
      alert("Please select a chapter");
      return;
    }

    if (!hadithNumber) {
      alert("Please enter hadith number");
      return;
    }

    if (!arabic.trim()) {
      alert("Please enter Arabic Hadith");
      return;
    }

    if (!urdu.trim()) {
      alert("Please enter Urdu translation");
      return;
    }

    if (!english.trim()) {
      alert("Please enter English translation");
      return;
    }

    try {
      const token=sessionStorage.getItem("adminToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/hadiths/${selectedUpdateHadith}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({
            bookId: selectedHadithBook,
            chapterId: selectedHadithChapter,
            hadithNumber: Number(hadithNumber),
            arabic,
            urdu,
            english,

            narrator: {
              urdu: narratorUrdu,
              english: narratorEnglish,
            },

            explanation: {
              urdu: explanationUrdu,
              english: explanationEnglish,
            },
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update Hadith");
        return;
      }

      setSelectedUpdateHadith("");
      setSelectedHadithBook("");
      setSelectedHadithChapter("");
      setHadiths([]);
      setChapters([]);

      setHadithNumber("");
      setArabic("");
      setUrdu("");
      setEnglish("");

      setNarratorUrdu("");
      setNarratorEnglish("");

      setExplanationUrdu("");
      setExplanationEnglish("");

      setShowUpdateHadithForm(false);
    } catch (error) {
      console.log("Error updating Hadith:", error);
      alert("Server error");
    }
  };
  const fetchHadiths = async (chapterId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/hadiths?chapterId=${chapterId}`,
      );

      const data = await response.json();

      if (response.ok) {
        setHadiths(data);
      }
    } catch (error) {
      console.log("Error fetching Hadiths:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="mt-8 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        {/* TOAST */} {toast && ( <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hadiths</h2>
        </div>
        <div className="flex gap-3">
          {/* ADD HADITH */}

          <button
            onClick={() => {
              setShowUpdateHadithForm(false);
              resetHadithForm();
              setShowHadithForm(true);
            }}
            className="w-fit rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
          >
            + Add
          </button>

          {/* UPDATE HADITH */}

          <button
            onClick={() => {
              setShowHadithForm(false);
              resetHadithForm();
              setShowUpdateHadithForm(true);
            }}
            className="w-fit rounded-lg border border-green-200 px-5 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            Update
          </button>
        </div>
      </div>
      {showHadithForm && (
        <div className="mt-6 border-t border-green-100 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Hadith
            </h3>

            <button
              onClick={() => {
                setShowHadithForm(false);
                resetHadithForm();
              }}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedHadithBook}
            onChange={(e) => {
              const bookId = e.target.value;

              setSelectedHadithBook(bookId);
              setSelectedHadithChapter("");

              if (bookId) {
                fetchChapters(bookId);
              } else {
                setChapters([]);
              }
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Chapter
          </label>

          <select
            value={selectedHadithChapter}
            onChange={(e) => setSelectedHadithChapter(e.target.value)}
            disabled={!selectedHadithBook}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
          >
            <option value="">
              {selectedHadithBook ? "Select a chapter" : "Select a book first"}
            </option>

            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                Chapter {chapter.chapterNumber} - {chapter.title}
              </option>
            ))}
          </select>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Hadith Number
            </label>

            <input
              type="number"
              value={hadithNumber}
              disabled={!selectedHadithChapter}
              onChange={(e) => setHadithNumber(e.target.value)}
              placeholder="Enter hadith number"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Arabic
            </label>

            <textarea
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              rows="5"
              dir="rtl"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Urdu Translation
            </label>

            <textarea
              value={urdu}
              onChange={(e) => setUrdu(e.target.value)}
              rows="5"
              dir="rtl"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              English Translation
            </label>

            <textarea
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              rows="5"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Raavi / Narrator
            </h3>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Urdu
              </label>

              <textarea
                value={narratorUrdu}
                onChange={(e) => setNarratorUrdu(e.target.value)}
                rows="4"
                dir="rtl"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                English
              </label>

              <textarea
                value={narratorEnglish}
                onChange={(e) => setNarratorEnglish(e.target.value)}
                rows="4"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Explanation</h3>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Urdu
              </label>

              <textarea
                value={explanationUrdu}
                onChange={(e) => setExplanationUrdu(e.target.value)}
                rows="5"
                dir="rtl"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                English
              </label>

              <textarea
                value={explanationEnglish}
                onChange={(e) => setExplanationEnglish(e.target.value)}
                rows="5"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowHadithForm(false);
                resetHadithForm();
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAddHadith}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {showUpdateHadithForm && (
        <div className="mt-6 border-t border-green-100 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Existing Hadith
            </h3>
            <button
              onClick={() => {
                setShowUpdateHadithForm(false);
                resetHadithForm();
              }}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedHadithBook}
            onChange={(e) => {
              const bookId = e.target.value;

              setSelectedHadithBook(bookId);
              setSelectedHadithChapter("");
              setSelectedUpdateHadith("");
              setHadiths([]);

              if (bookId) {
                fetchChapters(bookId);
              } else {
                setChapters([]);
              }
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>

          {/* SELECT CHAPTER */}

          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Chapter
          </label>

          <select
            value={selectedHadithChapter}
            onChange={(e) => {
              const chapterId = e.target.value;

              setSelectedHadithChapter(chapterId);
              setSelectedUpdateHadith("");
              setHadiths([]);

              if (chapterId) {
                fetchHadiths(chapterId);
              }
            }}
            disabled={!selectedHadithBook}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
          >
            <option value="">
              {selectedHadithBook ? "Select a chapter" : "Select a book first"}
            </option>

            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                Chapter {chapter.chapterNumber} - {chapter.title}
              </option>
            ))}
          </select>

          {/* SELECT HADITH */}

          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Hadith
          </label>

          <select
            value={selectedUpdateHadith}
            onChange={(e) => handleSelectUpdateHadith(e.target.value)}
            disabled={!selectedHadithChapter}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
          >
            <option value="">
              {selectedHadithChapter
                ? "Select a Hadith"
                : "Select a chapter first"}
            </option>

            {hadiths.map((hadith) => (
              <option key={hadith._id} value={hadith._id}>
                Hadith No. {hadith.hadithNumber}
              </option>
            ))}
          </select>

          {/* HADITH NUMBER */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Hadith Number
            </label>

            <input
              type="number"
              value={hadithNumber}
              onChange={(e) => setHadithNumber(e.target.value)}
              placeholder="Enter hadith number"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* ARABIC */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Arabic
            </label>

            <textarea
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              placeholder="Enter Arabic Hadith"
              rows="5"
              dir="rtl"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* URDU */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Urdu Translation
            </label>

            <textarea
              value={urdu}
              onChange={(e) => setUrdu(e.target.value)}
              placeholder="اردو ترجمہ درج کریں"
              rows="5"
              dir="rtl"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* ENGLISH */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              English Translation
            </label>

            <textarea
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Enter English translation"
              rows="5"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* NARRATOR */}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Raavi / Narrator
            </h3>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Urdu
              </label>

              <textarea
                value={narratorUrdu}
                onChange={(e) => setNarratorUrdu(e.target.value)}
                placeholder="راوی کی تفصیل درج کریں"
                rows="4"
                dir="rtl"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                English
              </label>

              <textarea
                value={narratorEnglish}
                onChange={(e) => setNarratorEnglish(e.target.value)}
                placeholder="Enter narrator details"
                rows="4"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
          </div>

          {/* EXPLANATION */}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Explanation</h3>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Urdu
              </label>

              <textarea
                value={explanationUrdu}
                onChange={(e) => setExplanationUrdu(e.target.value)}
                placeholder="تشریح درج کریں"
                rows="5"
                dir="rtl"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                English
              </label>

              <textarea
                value={explanationEnglish}
                onChange={(e) => setExplanationEnglish(e.target.value)}
                placeholder="Enter explanation"
                rows="5"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowUpdateHadithForm(false);
                resetHadithForm();
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateHadith}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Update Hadith
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
