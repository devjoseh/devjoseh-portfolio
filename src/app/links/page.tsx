"use client";

import { fetchLinks as fetchLinksDb } from "@/utils/actions/links";
import type { Link as LinkType } from "@/utils/types/links";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function LinksPage() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [links, setLinks] = useState<LinkType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(savedTheme as "dark" | "light");
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        const fetchLinks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchLinksDb();
                setLinks(data || []);
            } catch (err: any) {
                console.error("Error fetching links:", err);
                setError("Não foi possível carregar os links. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<{ className?: string }>;

        return IconComponent 
        ? (<IconComponent className="h-5 w-5 mr-3" />) 
        : (<LucideIcons.Link className="h-5 w-5 mr-3" />);
    };

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
        <main className={`min-h-screen ${ theme === "dark"
                ? "bg-gradient-to-b from-[#1a2235] to-[#1a2235] text-white"
                : "bg-gradient-to-b from-gray-100 to-white text-gray-900"}`}>
            <div className="container max-w-md mx-auto px-4 py-12">
                <motion.div
                    className="flex flex-col items-center justify-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Back to home link */}
                    <motion.div className="self-start mb-6" variants={item}>
                        <Link href="/" className="flex items-center text-white hover:text-blue-400 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o site
                        </Link>
                    </motion.div>

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
                        <Button
                            onClick={toggleTheme}
                            className="absolute -right-4 -bottom-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {theme === "dark" 
                            ? (<Sun className="h-5 w-5" />) 
                            : (<Moon className="h-5 w-5" />)}
                        </Button>
                    </motion.div>

                    <motion.h1 className="text-2xl font-bold mb-1" variants={item}>
                        @devjoseh
                    </motion.h1>

                    <motion.p
                        className={`mb-8 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                        variants={item}
                    >
                        Desenvolvedor Back-End, designer e rato de hackatons
                    </motion.p>

                    {/* Links Section */}
                    <div className="w-full space-y-4">
                        {isLoading ? (
                            // Loading skeleton
                            Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <motion.div
                                        key={`skeleton-${index}`}
                                        className={`w-full p-4 rounded-xl ${theme === "dark"
                                            ? "bg-[#2C3953]/70 border border-[#2C3953]"
                                            : "bg-white border border-gray-200 shadow-sm"} animate-pulse`}
                                        variants={item}
                                    >
                                        <div className="flex items-center justify-center h-5">
                                            <div className="w-36 h-4 bg-gray-500/20 rounded"></div>
                                        </div>
                                    </motion.div>
                                ))
                        ) : error ? (
                            // Error message
                            <motion.div
                                className={`w-full p-4 rounded-xl ${theme === "dark"
                                    ? "bg-red-900/20 border border-red-900/30 text-red-200"
                                    : "bg-red-50 border border-red-200 text-red-800"}`}
                                variants={item}
                            >
                                <p className="text-center">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className={`mt-2 mx-auto block px-4 py-2 rounded-md ${theme === "dark"
                                        ? "bg-red-900/30 hover:bg-red-900/50"
                                        : "bg-red-100 hover:bg-red-200"}`}
                                >
                                    Tentar novamente
                                </button>
                            </motion.div>
                        ) : links.length === 0 ? (
                            // No links message
                            <motion.div
                                className={`w-full p-4 rounded-xl text-center ${theme === "dark"
                                    ? "bg-[#2C3953]/70 border border-[#2C3953]"
                                    : "bg-white border border-gray-200 shadow-sm"}`}
                                variants={item}
                            >
                                Nenhum link disponível no momento.
                            </motion.div>
                        ) : (
                            // Links list
                            links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target={link.url.startsWith("http") ? "_blank" : "_self"}
                                    rel={link.url.startsWith("http") ? "noopener noreferrer" : ""}
                                    className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-center text-center ${
                                        theme === "dark"
                                            ? "bg-[#2C3953]/70 hover:bg-[#2C3953] text-white border border-[#2C3953]"
                                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 shadow-sm"
                                            } hover:scale-105 hover:shadow-lg`}
                                    variants={item}
                                    custom={index}
                                >
                                    {renderIcon(link.icon)}
                                    {link.title}
                                </motion.a>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <motion.div
                        className={`mt-12 text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
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
