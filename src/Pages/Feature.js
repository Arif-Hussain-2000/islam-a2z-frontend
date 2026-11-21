
const features = [
  {
    icon: "bi-search",
    title: "Search by Hadith Number",
    description:
      "Find any Hadith easily by entering its number and navigate directly to the content you want to read.",
  },
  {
    icon: "bi-stars",
    title: "Distraction Free Environment",
    description:
      "Enjoy a focused learning experience with simple navigation, a clean and minimal design, and an ad-free environment.",
  },
  {
    icon: "bi-book-half",
    title: "Detailed Content",
    description:
      "Explore Islamic content with translations, Hadith grading, and explanations to understand the meaning and context of each Hadith.",
  },
  {
    icon: "bi-translate",
    title: "Multiple Languages",
    description:
      "Access Hadith content in different languages, making Islamic knowledge easier to understand and explore.",
  },
  {
    icon: "bi-journals",
    title: "Chapter-wise Navigation",
    description:
      "Browse Islamic books through organized chapters and find relevant Hadith collections with ease.",
  },
  {
    icon: "bi-bookmark-check",
    title: "Authentic Hadith Collection",
    description:
      "Explore a structured collection of Hadith from recognized Islamic books in one accessible platform.",
  },
  {
    icon: "bi-award",
    title: "Hadith Grading",
    description:
      "Understand the authenticity and classification of Hadith through their respective grading information.",
  },
  {
    icon: "bi-card-text",
    title: "Hadith Explanation",
    description:
      "Gain a better understanding of Hadith through clear explanations that help explain their meaning and context.",
  },
  {
    icon: "bi-phone",
    title: "Responsive Experience",
    description:
      "Access Islam A2Z across desktops, tablets, and mobile devices with a comfortable reading experience.",
  },
];

export const Feature = () => {
  return (
    <div>
     <section className=" bg-[#385d50]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Features
          </h1>

          <p className="mx-auto py-4 mt-4 max-w-2xl text-base leading-7 font-semibold  text-white text-xxl md:text-2xl">
An online platform dedicated to making Islamic Content easily accessible to everyone.          </p>
        </div>
      </section>
    <section className="max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-20 mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

        {/* Feature Cards */}

        {features.map((feature, index) => (
          <div
            key={index}
            className="group rounded-xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 lg:p-8"
          >
            <div className="flex justify-center">
              <i
                className={`bi ${feature.icon} p-5 text-3xl text-black transition duration-300 group-hover:scale-110`}
              ></i>
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900 transition duration-300 group-hover:text-gray-700 sm:mt-6 sm:text-xl">
              {feature.title}
            </h3>

            <p className="mt-3 text-justify text-sm leading-7 text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
    </div>
  );
};