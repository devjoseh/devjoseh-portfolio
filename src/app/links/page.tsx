"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Linkedin, Github, Instagram, Youtube, Globe, Accessibility } from "lucide-react";
import Image from "next/image";

export default function LinksPage() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    // Check for saved theme preference on component mount
    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        setTheme(savedTheme as "dark" | "light");
    }, []);

    // Update theme in localStorage and apply classes when theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const links = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/devjoseh/",
            icon: <Linkedin className="h-5 w-5 mr-3" />,
        },
        {
            name: "GitHub",
            url: "https://github.com/devjoseh",
            icon: <Github className="h-5 w-5 mr-3" />,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/dev_joseh/",
            icon: <Instagram className="h-5 w-5 mr-3" />,
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/@devjoseh",
            icon: <Youtube className="h-5 w-5 mr-3" />,
        },
        {
            name: "Portfólio",
            url: "/",
            icon: <Globe className="h-5 w-5 mr-3" />,
        },
        {
            name: "EducaAvalia",
            url: "https://www.instagram.com/educaavalia",
            icon: <Accessibility className="h-5 w-5 mr-3"/>
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <main
            className={`min-h-screen ${
                theme === "dark"
                    ? "bg-gradient-to-b from-[#1a2235] to-[#1a2235] text-white"
                    : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
            }`}
        >
            <div className="container max-w-md mx-auto px-4 py-12">
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Profile Section */}
                    <motion.div className="relative mb-8 group" variants={item}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
                            <Image
                                src="/pfp1.webp"
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="absolute -right-4 -bottom-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                            aria-label={
                                theme === "dark"
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                    </motion.div>

                    <motion.h1
                        className="text-2xl font-bold mb-1"
                        variants={item}
                    >
                        @devjoseh
                    </motion.h1>

                    <motion.p
                        className={`mb-8 text-center ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                        variants={item}
                    >
                        Desenvolvedor Back-End, designer e rato de hackatons
                    </motion.p>

                    {/* Links Section */}
                    <div className="w-full space-y-4">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target={
                                    link.url.startsWith("http")
                                        ? "_blank"
                                        : "_self"
                                }
                                rel={
                                    link.url.startsWith("http")
                                        ? "noopener noreferrer"
                                        : ""
                                }
                                className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-center text-center
                  ${
                      theme === "dark"
                          ? "bg-[#2C3953]/70 hover:bg-[#2C3953] text-white border border-[#2C3953]"
                          : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 shadow-sm"
                  } hover:scale-105 hover:shadow-lg`}
                                variants={item}
                                custom={index}
                            >
                                {link.icon}
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Footer */}
                    <motion.div
                        className={`mt-12 text-center text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                        variants={item}
                    >
                        <p className="flex items-center justify-center">
                            © {new Date().getFullYear()} • José Hernanes
                            (DevJoseH)
                            <span className="text-red-500 mx-1">❤</span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
