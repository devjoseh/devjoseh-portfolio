"use client";

import { fetchExperiences as fetchExperiencesDb } from "@/utils/actions/experience";
import { Card, CardContent, ErrorMessage, LoadingSkeleton } from "@/components";
import type { Experience } from "@/utils/types/experiences";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchExperiencesDb();
            setExperiences(data || []);
        } catch (err) {
            console.error("Erro ao buscar experiências:", err);
            setError(
                "Não foi possível carregar as experiências. Verifique sua conexão e tente novamente."
            );
        } finally {
            setLoading(false);
        }
    };

    if(experiences.length === 0 && !loading && !error) {
        const experiences: Experience[] = [
            {
                id: 1,
                title: "Desenvolvedor de Back-End",
                company: "Instituto AmiGu",
                period: "2024 - Atualmente",
                description: "Desenvolvimento de bot para o discord usando typescript e supabase para gerenciamento de hackathons online de forma 100% automática e independente conectado a uma plataforma.",
                icon: "💻",
                order_index: 0,
                created_at: new Date().toISOString(),
                updated_at: null,
            },
        ];

        setExperiences(experiences)
    }

    return (
        <section id="experience" className="py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Experiência
                </h2>

                {loading ? (<LoadingSkeleton count={3} columns={1}/>
                ) : error ? (
                <ErrorMessage 
                    message={error} 
                    retryAction={fetchExperiences} 
                    className="min-h-[200px] flex flex-col items-center justify-center" 
                />
                ) : (
                <div className="space-y-8">
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => setHoveredId(exp.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Card
                                className={`border-0 overflow-hidden transition-all duration-300 ${
                                    hoveredId === exp.id
                                        ? "bg-[#2C3953]"
                                        : "bg-[#1a2235]/70"
                                }`}
                            >
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr]">
                                        <div className="bg-[#2C3953] p-4 sm:p-6 flex items-center justify-center">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl sm:text-4xl">
                                                {exp.icon}
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <h3 className="text-lg sm:text-xl font-semibold">
                                                    {exp.title}
                                                </h3>
                                                <span className="text-blue-300 text-xs sm:text-sm mt-1 md:mt-0">
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className="text-blue-200 mb-3 sm:mb-4">
                                                {exp.company}
                                            </p>
                                            <p className="text-gray-300 text-sm sm:text-base">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                )}
            </div>
        </section>
    );
}
