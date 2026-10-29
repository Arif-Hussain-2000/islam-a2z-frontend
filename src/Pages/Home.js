import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}

      <section className="flex min-h-[70vh] items-center justify-center px-6 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <div className="mb-6 inline-flex items-center rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            📚 Digital Library
          </div>

          {/* Heading */}

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Your Digital Gateway to
            <span className="block text-green-700">Islamic Knowledge</span>
          </h1>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
            Explore Hadith, Quran, Sunnah and Islamic teachings through a
            simple, organized and distraction-free digital learning experience.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-col sm:items-center items-stretch justify-center gap-3 sm:flex-row">
            <Link
              to="/books"
              className="rounded-lg bg-green-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
            >
              Explore  →
            </Link>

            <Link
              to="/about"
              className="rounded-lg border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quran Quote */}

      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="text-4xl font-serif text-green-700">“</div>

          <p className="mt-2 text-xl font-medium leading-9 text-gray-800 md:text-2xl">
            My Lord, increase me in knowledge.
          </p>

          <p className="mt-4 text-sm font-medium tracking-wide text-gray-500">
            — Quran 20:114
          </p>
        </div>
      </section>

      {/* Explore Section */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            All in One Place
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover carefully organized resources designed to make learning
            easier and more accessible.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Hadith */}

          <Link
            to="/books"
            className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-2xl transition group-hover:bg-green-700">
              📖
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-green-700">
              Hadith
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Explore authentic Hadith collections with translations and
              explanations.
            </p>

            <div className="mt-6 text-sm font-semibold text-green-700">
              Explore Hadith →
            </div>
          </Link>

          {/* Quran */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-2xl transition group-hover:bg-green-700">
              📜
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-green-700">
              Quran
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Read the Quran with translations and explore Tafsir from different
              scholars.
            </p>

            <div className="mt-6 text-sm font-semibold text-green-700">
              Coming Soon
            </div>
          </div>

          {/* Books */}

          <Link
            to="/books"
            className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-2xl transition group-hover:bg-green-700">
              📚
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-green-700">
              Books
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Discover organized Islamic books and study materials in one place.
            </p>

            <div className="mt-6 text-sm font-semibold text-green-700">
              Browse Books →
            </div>
          </Link>
        </div>
      </section>

      {/* Final CTA */}

      <section className="bg-green-800">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Begin Your Journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-100">
            Learn, explore and connect with authentic Islamic knowledge — all in
            one place.
          </p>

          <Link
            href="/books"
            className="mb-6 inline-flex items-center rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-green-700 sm:text-sm"
          >
            Explore Books →
          </Link>
        </div>
      </section>
    </main>
  );
};
