import {
    Particles,
    AboutSection,
    TechStack,
    Experience,
    Projects,
    Hackathons,
    Footer,
    Navbar,
    Quote,
} from "@/components/index";
import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#1a2235] to-[#2C3953] text-white">
            <Navbar />

            {/* Hero Section with Particles */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <Particles className="absolute inset-0" />
                <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tighter">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                            DevJoseH
                        </span>
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light mt-2 text-blue-200">
                        José Hernanes
                    </h2>
                    <h2 className="text-base sm:text-lg md:text-xl font-light mt-1 text-blue-300/80">
                        Desenvolvedor Back-End
                    </h2>
                    <div className="mt-6 sm:mt-8">
                        <Link 
                            href="https://github.com/devjoseh" 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="bg-white text-[#2C3953] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Conheça meu trabalho
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white opacity-70"
                    >
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                    </svg>
                </div>
            </section>

            {/* About Section */}
            <AboutSection />

            {/* Tech Stack */}
            <TechStack />

            {/* Experience */}
            <Experience />

            {/* Projects */}
            <Projects />

            {/* Hackathons */}
            <Hackathons />

            {/* Quote */}
            <Quote />

            {/* Footer */}
            <Footer />
        </main>
    );
}
