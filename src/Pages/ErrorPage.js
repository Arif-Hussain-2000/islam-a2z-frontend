import { NavLink, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F5] px-6 text-center">

      {/* Error Number */}
      <h1 className="text-8xl font-extrabold tracking-tight text-[#385D50] sm:text-9xl">
        404
      </h1>

      {/* Yellow Divider */}
      <div className="mt-2 h-1.5 w-20 rounded-full bg-[#F9BF29]"></div>

      {/* Error Message */}
      <h2 className="mt-8 text-2xl font-bold text-[#385D50] sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
        Sorry, the page you're looking for doesn't exist or may have been moved.
        Let's get you back to exploring Islamic knowledge.
      </p>

      {/* Error Details */}
      {error && (
        <p className="mt-3 text-xs text-gray-400">
          {error.statusText || error.message}
        </p>
      )}

      {/* Go Home Button */}
      <NavLink
        to="/"
        className="mt-8 rounded-lg bg-[#385D50] px-8 py-3 font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#29483D] hover:shadow-md"
      >
        <i className="bi bi-house-door mr-2"></i>
        Back to Home
      </NavLink>

    </div>
  );
};