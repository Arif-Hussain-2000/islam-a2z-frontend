
export const Courses = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5] px-5 py-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white px-6 py-14 text-center shadow-sm md:px-12">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[#385D50]/10">
          <i className="bi bi-mortarboard text-4xl text-[#385D50]"></i>
        </div>

        {/* Heading */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#385D50]">
          Something New Is Coming
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-[#385D50] md:text-5xl">
          Courses
        </h1>

        <div className="mx-auto my-6 h-1 w-16 rounded-full bg-[#F9BF29]"></div>

        {/* Description */}
        <p className="mx-auto max-w-lg text-base leading-8 text-gray-500 md:text-lg">
          We're working on something meaningful. New Islamic courses are
          currently in development to help you learn, grow, and deepen
          your understanding of Islam.
        </p>

        {/* Coming Soon Badge */}
        <div className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#385D50] px-6 py-3 text-sm font-semibold text-[#F9BF29]">
          <i className="bi bi-clock"></i>
          Coming Soon
        </div>

      </div>
    </main>
  );
};
