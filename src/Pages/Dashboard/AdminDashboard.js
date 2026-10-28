import { useState } from "react";
import { BookDashboaard } from "./BookDashboard";
import { ChapterDashboard } from "./ChapterDashboard";
import { HadithDashboard } from "./HadithDashboard";
import { Toast } from "../../Components/Toast";

export const AdminDashboard = () => {
  const [toast, setToast] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");

    setToast({
      message: "Logged out successfully",
      type: "success",
    });

    setTimeout(() => {
      window.location.href = "/admin";
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex flex-col gap-5 border-b border-green-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-green-700">
              Islam A2Z
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
          >
            Logout
          </button>

        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <BookDashboaard />

        <ChapterDashboard />

        <HadithDashboard />

      </div>
    </div>
  );
};