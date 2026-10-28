export const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero */}

            <section className="bg-white">

                <div className="mx-auto max-w-5xl px-6 py-20 text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-700">
                        About Islam A2Z
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                        Discover Our Purpose
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        Islam A2Z is an online platform dedicated to making
                        Islamic knowledge easily accessible to everyone.
                        Our goal is to provide a simple, distraction-free
                        reading experience where users can explore and read
                        Hadith and Quran from anywhere.
                    </p>

                </div>

            </section>


            {/* What We Offer */}

            <section className="border-t border-gray-100">

                <div className="mx-auto max-w-6xl px-6 py-16">

                    <div className="mb-12 text-center">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
                            Our Platform
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            What We Offer
                        </h2>

                    </div>


                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {/* Card 1 */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                📚
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Essential Islamic Knowledge
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                A comprehensive platform bringing together
                                essential Islamic knowledge in one place.
                            </p>

                        </div>


                        {/* Card 2 */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                📖
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Hadith Collection
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Access Hadith along with translations and
                                principles needed to understand them.
                            </p>

                        </div>


                        {/* Card 3 */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                📜
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Quran & Tafsir
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Read the Quran with translations and Tafsirs
                                from different scholars and authors.
                            </p>

                        </div>


                        {/* Card 4 */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                🌿
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Distraction-Free Reading
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                A clean and peaceful interface designed to
                                keep your focus on learning.
                            </p>

                        </div>


                        {/* Card 5 */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:col-span-2 lg:col-span-2">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                🗂️
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Detailed & Organized Content
                            </h3>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                                Islamic content is structured and organized
                                to make searching, reading and learning
                                easier for everyone.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};