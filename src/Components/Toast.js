
import { useEffect } from "react";

export const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed right-5 top-5 z-[9999] w-80 overflow-hidden rounded-lg border bg-white shadow-lg ${
        isSuccess ? "border-green-200" : "border-red-200"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <span
          className={`font-medium ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </span>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {/* Timer */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className={`h-full w-full origin-left ${
            isSuccess ? "bg-green-600" : "bg-red-600"
          }`}
          style={{
            animation: "toastProgress 3s linear forwards",
          }}
        />
      </div>

      <style>
        {`
          @keyframes toastProgress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }
        `}
      </style>
    </div>
  );
};
