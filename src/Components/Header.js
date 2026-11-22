import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Assets/logo.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `relative px-4 py-2 text-md font-medium text-white
    after:absolute after:bottom-0 after:left-4 after:right-4
    after:h-[4px] after:bg-[#F9BF29] after:transition-transform
    ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header className="bg-[#385D50] ">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Desktop Navigation */}

        <nav className="hidden h-[72px] w-full grid-cols-[1fr_auto_1fr] items-center px-20 md:grid">
          {/* Logo */}
          <Link
            to="/"
            className="justify-self-start text-xl font-bold tracking-wide text-white"
          >
              <img src={logo} alt="Islam A2Z Logo" className="h-16 w-30 object-contain" />

          </Link>

          {/* Center Navigation */}
          <div className="flex items-center justify-center gap-2">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/feature" className={navClass}>
              Features
            </NavLink>

            <NavLink to="/course" className={navClass}>
              Courses
            </NavLink>

            <NavLink to="/books" className={navClass}>
              Books
            </NavLink>
          </div>

          {/* Admin */}
          <div className="justify-self-end">
            <Link
              to="/admin"
              className="ml-4 text-white hover:text-[#F9BF29]"
            >
              <i className="bi bi-person text-xl"></i>
            </Link>
          </div>
        </nav>

        {/* Mobile Header */}

        <div className="flex h-[72px] items-center justify-between md:hidden px-10">
          <Link to="/" className="text-xl font-bold tracking-wide text-white">
              <img src={logo} alt="Islam A2Z Logo" className="h-12 w-auto object-contain" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-2 text-white transition hover:bg-[#456F60]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      {menuOpen && (
        <nav className="bg-[#385D50] px-6 pb-4  md:hidden ">
          <div className="flex flex-col gap-1 pt-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/feature"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Features
            </NavLink>

            <NavLink
              to="/connect"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Courses
            </NavLink>

            <NavLink
              to="/books"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Books
            </NavLink>
             <Link
              to="/admin"
              className="ml-4 text-white hover:text-[#F9BF29]"
            >
              <i className="bi bi-person text-xl"></i>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
