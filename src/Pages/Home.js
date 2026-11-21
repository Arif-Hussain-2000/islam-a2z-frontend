import { Link } from "react-router-dom";
import HEROIMAGE from "../Assets/h-image.png";
export const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}

      <section className="mx-auto flex min-h-[80vh] flex-col-reverse justify-start bg-[#385D50] px-6 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center">
        {/* Text Section */}

        <div className="w-full max-w-4xl px-6 leading-tight  md:text-left sm:px-20 lg:w-2/3">
          {/* Heading */}

          <h1 className="text-3xl whitespace-nowrap font-bold leading-tight tracking-tight text-center md:text-left text-white sm:text-5xl md:text-6xl ">
            A Digital Home For
            <span className=" text-3xl block text-semibold text-center md:text-left text-white whitespace-nowrap sm:text-5xl md:text-6xl">
              Quran & Sunnah
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 mx-2 max-w-xl text-thin text-center md:text-left text-justify text-white md:text-lg text-md">
            Explore Hadith, Quran, Sunnah and Islamic teachings through a
            simple, organized and distraction-free digital learning experience.
          </p>

          {/* Buttons */}

          <div className="mt-12 mx-2 flex flex-col items-stretch justify-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/books"
              className="rounded-xl bg-[#F9BF29] px-7 py-3.5 text-md font-semibold text-black shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#F8ba19] hover:shadow-md"
            >
              Read now →
            </Link>

            <Link
              to="/feature"
              className="rounded-xl border border-white bg-[#385d50] px-7 py-3.5 text-md font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#385d50]"
            >
              Features
            </Link>
          </div>
        </div>

        {/* Image Section */}

        <div className="mb-12 flex w-full items-center justify-center px-6 lg:mb-0 lg:w-1/3 lg:px-0">
          <img
            src={HEROIMAGE}
            alt="Mosque"
            className="h-auto w-full max-w-sm object-contain sm:max-w-lg lg:max-w-full"
          />
        </div>
      </section>

      {/* Quran Quote */}

      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="text-4xl font-serif text-[#385d50]">“</div>

          <p className="mt-2 text-xl font-medium leading-9 text-gray-800 md:text-2xl">
            “Only those fear Allah, from among His servants, who have knowledge.
            Indeed, Allah is Exalted in Might and Forgiving.”
          </p>

          <p className="mt-4 text-sm font-medium tracking-wide text-gray-500">
            — Surah Fatir, 28
          </p>
        </div>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="text-4xl font-serif text-[#385d50]">“</div>

          <p className="mt-2 text-xl font-medium leading-9 text-gray-700 md:text-2xl">
            "Seeking knowledge is an obligation upon every Muslim"
          </p>

          <p className="mt-4 text-sm font-medium tracking-wide text-gray-500">
            — Sunan Ibne Majah, 224
          </p>
        </div>
      </section>

      {/* Explore Section */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        {/* Cards */}

        <div className="mx-20 mt-12 grid gap-6 md:grid-cols-4">
          {/* Hadith */}
          <div className=" md:grid-cols-4">
            <h3 className="text-2xl font-bold">Features.</h3>
            <p className="py-10 mb-5 text-justify">An online platform dedicated to making Islamic Content easily accessible to everyone.</p>
            <Link to="/about" className=" rounded-2xl border border-white bg-black px-7 py-3.5 text-md font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-gray-800" >Explore</Link>
          </div>
          <Link
            className="group rounded-xl  bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f5f5f5] hover:shadow-md"
          >
 <div className="flex justify-center">
            <i className="bi-search text-3xl p-5"></i>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-gray-700">
              Search by Hadith Number
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500 text-justify">
              Explore authentic Hadith collection with translations and
              explanations.
            </p>
           

          </Link>


            <Link
            className="group rounded-xl  bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f5f5f5] hover:shadow-md"
          >
             <div className="flex justify-center">
            <i className="bi-stars text-3xl p-5"></i>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-gray-700">
              Distraction Free Environment
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500 text-justify">
              Enjoy a distraction-free learning experience with simple navigation,clean and minimal design, and an ad-free environment. Every element is thoughtfully organized to make exploring Islamic Content easy, comfortable, and focused.
            </p>
           

          </Link>

          <Link
            className="group rounded-xl  bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f5f5f5] hover:shadow-md"
          >
 <div className="flex justify-center">
            <i className="bi-book-half text-3xl p-5"></i>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-gray-700">
              Detailed Content
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500 text-justify">
              Explore detailed Islamic content with translations in multiple languages,Hadith grading for understanding authenticity,explanation to understand the deeper meaning and context of each Hadith.
            </p>
           

          </Link>
        </div>
      </section>

      {/* Final CTA */}

      <section className="bg-[#385d50]">
  <div className="mx-auto max-w-6xl px-6 py-16 text-center">


    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">

      <div className="mx-auto flex h-36 w-36 items-center justify-center text-lg font-semibold text-[#Ffffff] transition duration-300 hover:scale-110">
       <div className="flex flex-col items-center justify-center gap-2">
  <p className="text-5xl">
    1200+
  </p>
  <i className="bi bi-people-fill text-3xl"></i>

  <h3 className="text-xl font-bold">
    Followers
  </h3>

</div>
      </div>

      <div className="mx-auto flex h-36 w-36 items-center justify-center text-lg font-semibold text-[#Ffffff] transition duration-300 hover:scale-110">
           <div className="flex flex-col items-center justify-center gap-2">
  <p className="text-5xl">
    10K+
  </p>
  <i className="bi bi-eye-fill text-3xl"></i>

  <h3 className="text-xl font-bold">
    Views
  </h3>

</div>
      </div>

      <div className="mx-auto flex h-36 w-36 items-center justify-center text-lg font-semibold text-[#Ffffff] transition duration-300 hover:scale-110">
           <div className="flex flex-col items-center justify-center gap-2">
  <p className="text-5xl">
    4.8
  </p>
  <i className="bi bi-star-half text-3xl"></i>

  <h3 className="text-xl font-bold">
    Reviews
  </h3>

</div>
      </div>

     

    </div>
  </div>
</section>
    </main>
  );
};
