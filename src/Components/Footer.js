export const Footer = () => {
  return (
    <footer className="border-t  bg-[#F5F5F5] text-[#385d50]">
      <div className="mx-20 max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-wide text-[#385d50]">
              ISLAM A2Z
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#385d50]">
              A digital platform dedicated to making authentic sources easier to
              access, explore and understand.
            </p>
            <div className="mt-5 flex items-center gap-5">
            <a
              href="https://www.instagram.com/theislama2z/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer p-2 text-[#385d50]  transition duration-500 hover:text-[#Ffffff] hover:-translate-y-0.5 hover:bg-[#385d50] rounded-lg"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
             <a
              href="https://www.theislama2z.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer p-2 text-[#385d50]  transition duration-500 hover:text-[#ffffff] hover:-translate-y-0.5 hover:bg-[#385d50] rounded-lg"
            >
              <i className="bi bi-globe text-2xl "></i>
            </a>
            </div>
          </div>

          {/* Navigation */}

          <div className="mt-5">

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="/" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold ">
                Home
              </a>

              <a href="/about" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold ">
                About
              </a>

              <a href="/books" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold ">
                Books
              </a>

              <a href="/connect" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold ">
                Courses
              </a>
            </div>
          </div>

          {/* Resources */}

          <div className="mt-5">
           

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="/books" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold" >
                Features
              </a>

              <a href="/books" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold">
                Team
              </a>

              <a href="/books" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold">
                Privacy Policy
              </a>
              <a href="/books" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold">
                Contact us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-10 flex flex-col gap-3 border-t border-[#385d50] pt-6 text-sm text-[#385d50] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Islam A2Z. All rights reserved.Designed by <a href="https://www.instagram.com/aaqeeb_visuals?avpt=bzl6M2l0NndqZnB1">aaqeeb_visuals</a></p>

          <a href="/" className="transition text-[#385d50] hover:text-[#385d50] hover:font-bold">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
