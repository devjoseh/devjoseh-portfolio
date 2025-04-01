export function Quote() {
    return (
        <section className="py-16 sm:py-20 px-4 md:px-8 lg:px-16 bg-[#1a2235]">
            <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
                <div className="relative">
                    <div className="absolute -top-6 sm:-top-12 left-0 text-5xl sm:text-8xl text-blue-500/20 font-serif">
                        &quot;
                    </div>
                    <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl italic font-light leading-relaxed text-gray-200 mb-4 sm:mb-6 px-6 sm:px-0">
                        Se a educação sozinha não transforma a sociedade, sem
                        ela tampouco a sociedade muda.
                    </blockquote>
                    <div className="absolute -bottom-6 sm:-bottom-12 right-0 text-5xl sm:text-8xl text-blue-500/20 font-serif">
                        &quot;
                    </div>
                </div>
                <cite className="text-blue-300 not-italic text-sm sm:text-base">
                    - Paulo Freire
                </cite>
            </div>
        </section>
    );
}
