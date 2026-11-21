import { useEffect, useState } from "react";
import { Toast } from "../../Components/Toast";

export const BookDashboaard = () => {
  const [books, setBooks] = useState([]);

  // Form visibility
  const [showBookForm, setShowBookForm] = useState(false);
  const [showUpdateBookForm, setShowUpdateBookForm] = useState(false);

  // Book fields
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [aboutBook, setAboutBook] = useState("");
  const [aboutAuthor, setAboutAuthor] = useState("");

  // Update states
  const [selectedUpdateBook, setSelectedUpdateBook] = useState("");

  const [toast, setToast] = useState(null);

  // Reset Form
  const resetForm = () => {
    setBookTitle("");
    setAuthor("");
    setAboutBook("");
    setAboutAuthor("");
  };

  // Fetch Books
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

  // Add Book
  const handleAddBook = async () => {
    if (!bookTitle.trim()) {
      alert("Please enter book title");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: bookTitle.trim(),
            author: author.trim(),
            aboutBook: aboutBook.trim(),
            aboutAuthor: aboutAuthor.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add book");
        return;
      }

      resetForm();
      setShowBookForm(false);
      fetchBooks();

      setToast({
        message: "Book added successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error adding book:", error);
      alert("Server error");
    }
  };

  // Cancel Add Book
  const handleCancelBookForm = () => {
    setShowBookForm(false);
    resetForm();
  };

  // Select Book for Update
  const handleSelectUpdateBook = (bookId) => {
    setSelectedUpdateBook(bookId);

    const selectedBook = books.find((book) => book._id === bookId);

    if (selectedBook) {
      setBookTitle(selectedBook.title || "");
      setAuthor(selectedBook.author || "");
      setAboutBook(selectedBook.aboutBook || "");
      setAboutAuthor(selectedBook.aboutAuthor || "");
    } else {
      resetForm();
    }
  };

  // Update Book
  const handleUpdateBook = async () => {
    if (!selectedUpdateBook) {
      alert("Please select a book");
      return;
    }

    if (!bookTitle.trim()) {
      alert("Please enter book title");
      return;
    }

    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/${selectedUpdateBook}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: bookTitle.trim(),
            author: author.trim(),
            aboutBook: aboutBook.trim(),
            aboutAuthor: aboutAuthor.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update book");
        return;
      }

      resetForm();
      setSelectedUpdateBook("");
      setShowUpdateBookForm(false);

      fetchBooks();

      setToast({
        message: "Book updated successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Error updating book:", error);
      alert("Server error");
    }
  };

  // Cancel Update Book
  const handleCancelUpdateBook = () => {
    setShowUpdateBookForm(false);
    setSelectedUpdateBook("");
    resetForm();
  };

  return (
    <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Books</h2>
        </div>

        <div className="flex gap-3">

          {/* ADD */}
          <button
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            onClick={() => {
              resetForm();
              setShowBookForm(true);
              setShowUpdateBookForm(false);
            }}
          >
            +Add
          </button>

          {/* UPDATE */}
          <button
            className="rounded-lg border border-green-200 px-5 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
            onClick={() => {
              resetForm();
              setShowBookForm(false);
              setSelectedUpdateBook("");
              setShowUpdateBookForm(true);
            }}
          >
            Update
          </button>

        </div>
      </div>

      {/* ADD FORM */}
      {showBookForm && (
        <div className="mt-6 rounded-xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Book
            </h3>

            <button
              onClick={handleCancelBookForm}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Book Title */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Book Title
          </label>

          <input
            type="text"
            placeholder="e.g. Sahih Bukhari"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* Author */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Author
          </label>

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* About Book */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            About Book
          </label>

          <input
            type="text"
            placeholder="Enter about book"
            value={aboutBook}
            onChange={(e) => setAboutBook(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* About Author */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            About Author
          </label>

          <input
            type="text"
            placeholder="Enter about author"
            value={aboutAuthor}
            onChange={(e) => setAboutAuthor(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCancelBookForm}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAddBook}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Submit
            </button>
          </div>

        </div>
      )}

      {/* UPDATE FORM */}
      {showUpdateBookForm && (
        <div className="mt-6 rounded-xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Existing Book
            </h3>

            <button
              onClick={handleCancelUpdateBook}
              className="text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Select Book */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Select Book
          </label>

          <select
            value={selectedUpdateBook}
            onChange={(e) => handleSelectUpdateBook(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>

          {/* Book Title */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Book Title
          </label>

          <input
            type="text"
            placeholder="Enter updated book title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* Author */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Author
          </label>

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* About Book */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            About Book
          </label>

          <input
            type="text"
            placeholder="Enter about book"
            value={aboutBook}
            onChange={(e) => setAboutBook(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* About Author */}
          <label className="mt-5 block text-sm font-medium text-gray-700">
            About Author
          </label>

          <input
            type="text"
            placeholder="Enter about author"
            value={aboutAuthor}
            onChange={(e) => setAboutAuthor(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCancelUpdateBook}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateBook}
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Update Book
            </button>
          </div>

        </div>
      )}

    </div>
  );
};