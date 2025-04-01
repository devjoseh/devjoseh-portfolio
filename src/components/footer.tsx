import { Instagram, Linkedin, Mail, Github, Youtube } from "lucide-react";
import Link from 'next/link'

export function Footer() {
    const socialLinks = [
        {
            name: "Instagram",
            icon: <Instagram size={20} />,
            url: "https://instagram.com/dev_joseh",
            username: "@devjoseh",
        },
        {
            name: "YouTube",
            icon: <Youtube size={20} />,
            url: "https://youtube.com/@devjoseh",
            username: "@devjoseh",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={20} />,
            url: "https://www.linkedin.com/in/devjoseh/",
            username: "José Hernanes",
        },
        {
            name: "GitHub",
            icon: <Github size={20} />,
            url: "https://github.com/devjoseh",
            username: "DevJoseH",
        },
        {
            name: "Email",
            icon: <Mail size={20} />,
            url: "mailto:contato@devjoseh.com.br",
            username: "contato@devjoseh.com.br",
        },
    ];

    return (
        <footer className="bg-[#1a2235] py-12 px-4 md:px-8 lg:px-16 border-t border-[#2C3953]/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            DevJoseH
                        </h2>
                        <p className="text-blue-300 mt-1 text-sm sm:text-base">
                            José Hernanes
                        </p>
                    </div>

                    <div className="flex space-x-3 sm:space-x-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2C3953] flex items-center justify-center text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact Links with Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center sm:text-left">
                    {socialLinks.map((link) => (
                        <div key={link.name} className="flex flex-col items-center sm:items-start">
                            <h3 className="text-white font-medium mb-1">
                                {link.name}
                            </h3>
                            <Link
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                            >
                                {link.icon}
                                <span>{link.username}</span>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#2C3953]/50 text-center text-xs sm:text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} DevJoseH. Todos os direitos  reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
