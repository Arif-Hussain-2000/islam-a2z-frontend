import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Image from "../Assets/logo.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold tracking-wide text-[#2b726e]"
        >
          <img
            src={Image}
            alt="Islam A2Z"
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span className="text-lg sm:text-xl">ISLAM A2Z</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/connect"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            Connect
          </NavLink>

          <NavLink
            to="/books"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            Admin
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-2 text-gray-700 transition hover:bg-gray-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}

      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white px-6 pb-4 md:hidden shadow-sm">
          <div className="flex flex-col gap-1 pt-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-700 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-700 hover:text-white"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/connect"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-700 hover:text-white"
                }`
              }
            >
              Connect
            </NavLink>

            <NavLink
              to="/books"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-700 hover:text-white"
                }`
              }
            >
              Books
            </NavLink>

            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-700 hover:text-white"
                }`
              }
            >
              Admin
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};
