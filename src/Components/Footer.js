export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div className="lg:col-span-2">

                        <h2 className="text-2xl font-bold tracking-wide text-white">
                            ISLAM A2Z
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                            A digital platform dedicated to making authentic
                            Islamic knowledge easier to access, explore and
                            understand.
                        </p>

                    </div>


                    {/* Navigation */}

                    <div>

                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Explore
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">

                            <a
                                href="/"
                                className="transition hover:text-white"
                            >
                                Home
                            </a>

                            <a
                                href="/about"
                                className="transition hover:text-white"
                            >
                                About
                            </a>

                            <a
                                href="/books"
                                className="transition hover:text-white"
                            >
                                Islamic Books
                            </a>

                            <a
                                href="/connect"
                                className="transition hover:text-white"
                            >
                                Connect
                            </a>

                        </div>

                    </div>


                    {/* Resources */}

                    <div>

                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Resources
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">

                            <a
                                href="/books"
                                className="transition hover:text-white"
                            >
                                Hadith
                            </a>

                            <a
                                href="/books"
                                className="transition hover:text-white"
                            >
                                Quran
                            </a>

                            <a
                                href="/about"
                                className="transition hover:text-white"
                            >
                                About Islam A2Z
                            </a>

                        </div>

                    </div>

                </div>


                {/* Bottom */}

                <div className="mt-10 flex flex-col gap-3 border-t border-gray-800 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

                    <p>
                        © {new Date().getFullYear()} Islam A2Z. All rights reserved.
                    </p>

                    <p>
                        Built for learning and understanding Islamic knowledge.
                    </p>

                </div>

            </div>

        </footer>
    );
};