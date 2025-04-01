"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from 'next/image'

type Technology = {
    name: string;
    icon: string;
    category: "language" | "tool" | "framework" | "database";
};

export function TechStack() {
    const technologies: Technology[] = [
        { name: "TypeScript", icon: "typescript", category: "language" },
        { name: "JavaScript", icon: "javascript", category: "language" },
        { name: "Node.js", icon: "nodejs", category: "framework" },
        { name: "Discord.js", icon: "discordjs", category: "framework" },
        { name: "Python", icon: "python", category: "language" },
        { name: "Lua", icon: "lua", category: "language" },
        { name: "HTML", icon: "html", category: "language" },
        { name: "CSS", icon: "css", category: "language" },
        { name: "VS Code", icon: "vscode", category: "tool" },
        { name: "Figma", icon: "figma", category: "tool" },
        { name: "Replit", icon: "replit", category: "tool" },
        { name: "Git", icon: "git", category: "tool" },
        { name: "GitHub", icon: "github", category: "tool" },
        { name: "Discord", icon: "discord", category: "tool" },
        { name: "Firebase", icon: "firebase", category: "database" },
        { name: "MongoDB", icon: "mongodb", category: "database" },
        { name: "Supabase", icon: "supabase", category: "database" },
    ];

    const [filter, setFilter] = useState<string>("all");

    const filteredTech = filter === "all" ? technologies : technologies.filter((tech) => tech.category === filter);

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "all":
                return "Todos";
            case "language":
                return "Linguagens";
            case "framework":
                return "Frameworks";
            case "tool":
                return "Ferramentas";
            case "database":
                return "BD";
            default:
                return category;
        }
    };

    return (
        <section id="tech-stack" className="py-20 px-4 md:px-8 lg:px-16 bg-[#1a2235]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Linguagens e Ferramentas
                </h2>

                <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 px-1">
                    <div className="inline-flex bg-[#2C3953]/50 rounded-full p-1 min-w-full sm:min-w-0">
                        {[ "all", "language", "framework", "tool", "database", ].map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`cursor-pointer px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none ${
                                    filter === category
                                        ? "bg-blue-500 text-white"
                                        : "text-blue-200 hover:text-white"
                                }`}
                            >
                                <span className="block sm:hidden">
                                    {getCategoryLabel(category)}
                                </span>
                                <span className="hidden sm:block">
                                    {category === "all"
                                        ? "Todos"
                                        : category === "language"
                                        ? "Linguagens"
                                        : category === "framework"
                                        ? "Frameworks"
                                        : category === "tool"
                                        ? "Ferramentas"
                                        : "Bancos de Dados"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
                    {filteredTech.map((tech) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#2C3953]/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center hover:bg-[#2C3953] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center mb-2 sm:mb-3">
                                <Image
                                    src={`https://skillicons.dev/icons?i=${tech.icon}`}
                                    alt={tech.name}
                                    width={8}
                                    height={8}
                                    className="w-8 h-8 sm:w-12 sm:h-12"
                                />
                            </div>
                            <h3 className="text-center font-medium text-xs sm:text-sm">
                                {tech.name}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
