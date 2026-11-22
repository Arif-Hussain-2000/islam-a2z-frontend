import { useEffect, useState } from "react";

export const ChapterDashboard = () => {
  // Data
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);

  // Chapter fields
  const [selectedBook, setSelectedBook] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState({
    urdu: "",
    english: "",
    roman: "",
  });

  // Add Chapter
  const [showChapterForm, setShowChapterForm] = useState(false);

  // Update Chapter
  const [showUpdateChapterForm, setShowUpdateChapterForm] = useState(false);
  const [selectedUpdateChapter, setSelectedUpdateChapter] = useState("");

  // Empty title object
  const emptyTitle = {
    urdu: "",
    english: "",
    roman: "",
  };

  // =========================
  // FETCH BOOKS
  // =========================

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books`
      );

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

  // =========================
  // FETCH CHAPTERS BY BOOK
  // =========================

  const fetchChapters = async (bookId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chapters?bookId=${bookId}`
      );

      const data = await response.json();

      if (response.ok) {
        setChapters(data);
      }
    } catch (error) {
      console.log("Error fetching chapters:", error);
    }
  };

  // =========================
  // ADD CHAPTER
  // =========================

  const handleAddChapter = async () => {
    if (!selectedBook) {
      alert("Please select a book");
      return;
    }

    if (
      !chapterNumber ||
      !chapterTitle.urdu.trim() ||
      !chapterTitle.english.trim() ||
      !chapterTitle.roman.trim()
    ) {
      alert("Please enter chapter number and all three titles");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chapters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: selectedBook,
            chapterNumber: Number(chapterNumber),
            title: {
              urdu: chapterTitle.urdu.trim(),
              english: chapterTitle.english.trim(),
              roman: chapterTitle.roman.trim(),
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add chapter");
        return;
      }

      alert("Chapter added successfully");

      setSelectedBook("");
      setChapterNumber("");
      setChapterTitle({ ...emptyTitle });
      setShowChapterForm(false);
    } catch (error) {
      console.log("Error adding chapter:", error);
      alert("Server error");
    }
  };

  // =========================
  // SELECT CHAPTER FOR UPDATE
  // =========================

  const handleSelectUpdateChapter = (chapterId) => {
    setSelectedUpdateChapter(chapterId);

    const selectedChapter = chapters.find(
      (chapter) => chapter._id === chapterId
    );

    if (selectedChapter) {
      setChapterNumber(selectedChapter.chapterNumber);

      setChapterTitle({
        urdu: selectedChapter.title?.urdu || "",
        english: selectedChapter.title?.english || "",
        roman: selectedChapter.title?.roman || "",
      });
    } else {
      setChapterNumber("");
      setChapterTitle({ ...emptyTitle });
    }
  };

  // =========================
  // CANCEL ADD
  // =========================

  const handleCancelChapterForm = () => {
    setShowChapterForm(false);
    setSelectedBook("");
    setChapterNumber("");
    setChapterTitle({ ...emptyTitle });
    setChapters([]);
  };

  // =========================
  // CANCEL UPDATE
  // =========================

  const handleCancelUpdateChapterForm = () => {
    setShowUpdateChapterForm(false);
    setSelectedBook("");
    setSelectedUpdateChapter("");
    setChapterNumber("");
    setChapterTitle({ ...emptyTitle });
    setChapters([]);
  };

  // =========================
  // UPDATE CHAPTER
  // =========================

  const handleUpdateChapter = async () => {
    if (!selectedBook) {
      alert("Please select a book");
      return;
    }

    if (!selectedUpdateChapter) {
      alert("Please select a chapter");
      return;
    }

    if (
      !chapterNumber ||
      !chapterTitle.urdu.trim() ||
      !chapterTitle.english.trim() ||
      !chapterTitle.roman.trim()
    ) {
      alert("Please enter chapter number and all three titles");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chapters/${selectedUpdateChapter}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: selectedBook,
            chapterNumber: Number(chapterNumber),
            title: {
              urdu: chapterTitle.urdu.trim(),
              english: chapterTitle.english.trim(),
              roman: chapterTitle.roman.trim(),
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update chapter");
        return;
      }

      alert("Chapter updated successfully");

      setSelectedBook("");
      setSelectedUpdateChapter("");
      setChapterNumber("");
      setChapterTitle({ ...emptyTitle });
      setChapters([]);
      setShowUpdateChapterForm(false);
    } catch (error) {
      console.log("Error updating chapter:", error);
      alert("Server error");
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-green-100 bg-white p-6 shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chapters</h2>
        </div>

        <div className="flex gap-3">

          {/* ADD BUTTON */}

          <button
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            onClick={() => {
              setSelectedBook("");
              setChapterNumber("");
              setChapterTitle({ ...emptyTitle });
              setChapters([]);

              setShowUpdateChapterForm(false);
              setShowChapterForm(true);
            }}
          >
            + Add
          </button>

          {/* UPDATE BUTTON */}

          <button
            className="rounded-lg border border-green-200 px-5 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
            onClick={() => {
              setSelectedBook("");
              setSelectedUpdateChapter("");
              setChapterNumber("");
              setChapterTitle({ ...emptyTitle });
              setChapters([]);

              setShowChapterForm(false);
              setShowUpdateChapterForm(true);
            }}
          >
            Update
          </button>
        </div>
      </div>

      {/* ==================================================
          ADD CHAPTER FORM
      ================================================== */}

      {showChapterForm && (
        <div className="mt-6 rounded-xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Chapter
            </h3>

            <button
              onClick={handleCancelChapterForm}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              x
            </button>
          </div>

          {/* SELECT BOOK */}

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>

          {/* CHAPTER NUMBER */}

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Chapter Number
            </label>

            <input
              type="number"
              min="1"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              placeholder="Enter chapter number"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* THREE LANGUAGE TITLES */}

          <div className="mt-4 grid gap-4 md:grid-cols-3">

            {/* URDU */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Title (Urdu)
              </label>

              <input
                type="text"
                dir="rtl"
                value={chapterTitle.urdu}
                onChange={(e) =>
                  setChapterTitle((prev) => ({
                    ...prev,
                    urdu: e.target.value,
                  }))
                }
                placeholder="اردو عنوان"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* ENGLISH */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Title (English)
              </label>

              <input
                type="text"
                value={chapterTitle.english}
                onChange={(e) =>
                  setChapterTitle((prev) => ({
                    ...prev,
                    english: e.target.value,
                  }))
                }
                placeholder="Enter English title"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* ROMAN */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Title (Roman)
              </label>

              <input
                type="text"
                value={chapterTitle.roman}
                onChange={(e) =>
                  setChapterTitle((prev) => ({
                    ...prev,
                    roman: e.target.value,
                  }))
                }
                placeholder="Enter Roman title"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

          </div>

          {/* BUTTONS */}

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCancelChapterForm}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAddChapter}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Add Chapter
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          UPDATE CHAPTER FORM
      ================================================== */}

      {showUpdateChapterForm && (
        <div className="mt-6 rounded-xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Existing Chapter
            </h3>

            <button
              onClick={handleCancelUpdateChapterForm}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              x
            </button>
          </div>

          {/* SELECT BOOK */}

          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedBook}
            onChange={(e) => {
              const bookId = e.target.value;

              setSelectedBook(bookId);
              setSelectedUpdateChapter("");
              setChapterNumber("");
              setChapterTitle({ ...emptyTitle });
              setChapters([]);

              if (bookId) {
                fetchChapters(bookId);
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
            value={selectedUpdateChapter}
            onChange={(e) => handleSelectUpdateChapter(e.target.value)}
            disabled={!selectedBook}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
          >
            <option value="">Select a chapter</option>

            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                Chapter {chapter.chapterNumber} - {chapter.title?.english}
              </option>
            ))}
          </select>

          {/* EDIT FIELDS */}

          <div className="mt-5">

            {/* CHAPTER NUMBER */}

            <label className="block text-sm font-medium text-gray-700">
              Chapter Number
            </label>

            <input
              type="number"
              min="1"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              disabled={!selectedUpdateChapter}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
            />

            {/* THREE LANGUAGE TITLES */}

            <div className="mt-4 grid gap-4 md:grid-cols-3">

              {/* URDU */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Updated Title (Urdu)
                </label>

                <input
                  type="text"
                  dir="rtl"
                  value={chapterTitle.urdu}
                  onChange={(e) =>
                    setChapterTitle((prev) => ({
                      ...prev,
                      urdu: e.target.value,
                    }))
                  }
                  disabled={!selectedUpdateChapter}
                  placeholder="اردو عنوان"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
                />
              </div>

              {/* ENGLISH */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Updated Title (English)
                </label>

                <input
                  type="text"
                  value={chapterTitle.english}
                  onChange={(e) =>
                    setChapterTitle((prev) => ({
                      ...prev,
                      english: e.target.value,
                    }))
                  }
                  disabled={!selectedUpdateChapter}
                  placeholder="Enter English title"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
                />
              </div>

              {/* ROMAN */}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Updated Title (Roman)
                </label>

                <input
                  type="text"
                  value={chapterTitle.roman}
                  onChange={(e) =>
                    setChapterTitle((prev) => ({
                      ...prev,
                      roman: e.target.value,
                    }))
                  }
                  disabled={!selectedUpdateChapter}
                  placeholder="Enter Roman title"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
                />
              </div>

            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCancelUpdateChapterForm}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateChapter}
              disabled={!selectedUpdateChapter}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Update Chapter
            </button>
          </div>

        </div>
      )}
    </div>
  );
};