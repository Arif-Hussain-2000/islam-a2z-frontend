import { useEffect, useState } from "react";

export const ChapterDashboard = () => {
  // Data
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);

  // Chapter fields
  const [selectedBook, setSelectedBook] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");

  // Add Chapter
  const [showChapterForm, setShowChapterForm] = useState(false);

  // Update Chapter
  const [showUpdateChapterForm, setShowUpdateChapterForm] = useState(false);
  const [selectedUpdateChapter, setSelectedUpdateChapter] = useState("");

  // =========================
  // FETCH BOOKS
  // =========================
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

  // =========================
  // FETCH CHAPTERS BY BOOK
  // =========================
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

  // =========================
  // ADD CHAPTER
  // =========================
  const handleAddChapter = async () => {
    if (!selectedBook) {
      alert("Please select a book");
      return;
    }

    if (!chapterNumber || !chapterTitle.trim()) {
      alert("Please enter chapter number and title");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: selectedBook,
          chapterNumber: Number(chapterNumber),
          title: chapterTitle.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add chapter");
        return;
      }

      setSelectedBook("");
      setChapterNumber("");
      setChapterTitle("");
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
      (chapter) => chapter._id === chapterId,
    );

    if (selectedChapter) {
      setChapterNumber(selectedChapter.chapterNumber);
      setChapterTitle(selectedChapter.title);
    } else {
      setChapterNumber("");
      setChapterTitle("");
    }
  };

  // =========================
  // CANCEL ADD
  // =========================
  const handleCancelChapterForm = () => {
    setShowChapterForm(false);
    setSelectedBook("");
    setChapterNumber("");
    setChapterTitle("");
    setChapters([]);
  };
    const handleCancelUpdateChapterForm = () => {
    setShowUpdateChapterForm(false);
    setSelectedBook("");
    setChapterNumber("");
    setChapterTitle("");
    setChapters([]);
  };

  // =========================
  // CANCEL UPDATE
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

  if (!chapterNumber || !chapterTitle.trim()) {
    alert("Please enter chapter number and title");
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
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: selectedBook,
          chapterNumber: Number(chapterNumber),
          title: chapterTitle.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update chapter");
      return;
    }

    setSelectedBook("");
    setSelectedUpdateChapter("");
    setChapterNumber("");
    setChapterTitle("");
    setChapters([]);
    setShowUpdateChapterForm(false);

  } catch (error) {
    console.log("Error updating chapter:", error);
    alert("Server error");
  }
};


  return (
    <div className="mt-8 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chapters</h2>
        </div>

        <div className="flex gap-3">
          {/* Add Chapter Button */}
          <button
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            onClick={() => {
              setSelectedBook("");
              setChapterNumber("");
              setChapterTitle("");
              setChapters([]);

              setShowUpdateChapterForm(false);
              setShowChapterForm(true);
            }}
          >
            + Add
          </button>

          {/* Update Chapter Button */}
          <button
            className="rounded-lg border border-green-200 px-5 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
            onClick={() => {
              setSelectedBook("");
              setSelectedUpdateChapter("");
              setChapterNumber("");
              setChapterTitle("");
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
          {/* Form Header */}
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

          {/* Select Book */}
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedBook}
            onChange={(e) => {
              const bookId = e.target.value;

              setSelectedBook(bookId);
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

          {/* Number + Title */}
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {/* Chapter Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Number
              </label>

              <input
                type="number"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                placeholder="1"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* Chapter Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Chapter Title
              </label>

              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Enter chapter title"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Buttons */}
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
          {/* Form Header */}
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

          {/* ================= SELECT BOOK ================= */}

          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedBook}
            onChange={(e) => {
              const bookId = e.target.value;

              setSelectedBook(bookId);

              // Reset previous chapter
              setSelectedUpdateChapter("");
              setChapterNumber("");
              setChapterTitle("");
              setChapters([]);

              // Fetch chapters belonging to selected book
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

          {/* ================= SELECT CHAPTER ================= */}

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
                Chapter {chapter.chapterNumber} - {chapter.title}
              </option>
            ))}
          </select>

          {/* ================= EDIT FIELDS ================= */}

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {/* Chapter Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chapter Number
              </label>

              <input
                type="number"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                disabled={!selectedUpdateChapter}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
              />
            </div>

            {/* Chapter Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Updated Chapter Title
              </label>

              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                disabled={!selectedUpdateChapter}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:bg-gray-100"
              />
               <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCancelUpdateChapterForm}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateChapter}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Update Chapter
            </button>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
