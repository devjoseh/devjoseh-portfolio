"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

type ExperienceItem = {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
    icon: string;
};

export function Experience() {
    const experiences: ExperienceItem[] = [
        {
            id: 1,
            title: "Desenvolvedor de Back-End",
            company: "Instituto AmiGu",
            period: "2024 - Atualmente",
            description:
                "Desenvolvimento de bot para o discord usando typescript e supabase para gerenciamento de hackathons online de forma 100% automática e independente conectado a uma plataforma.",
            icon: "💻",
        },
        {
            id: 2,
            title: "19ª Edição Expolog",
            company: "Instituto AmiGu",
            period: "Nov 2024",
            description: "Trabalhei como desenvolvedor no EXPOLOG 2024, um dos mais importantes eventos de logística do país com projeção internacional. A primeira fase do evento foi realizada por meio da plataforma Discord nos dias 23 e 24 de novembro, onde ocorreram as mentorias, o networking e os anúncios. Foram 12 dias de desenvolvimento do bot, criado em TypeScript e utilizando o Firebase como banco de dados, que gerenciou todo o servidor, desde as identificações até as mentorias realizadas, além de outros sistemas.",
            icon: "🚀",
        },
        {
            id: 3,
            title: "NestStore",
            company: "Loja pessoal",
            period: "2021 - 2024",
            description: "Em outubro de 2021, criei uma loja em um servidor do Discord chamada NestStore, onde vendo, até os dias de hoje, os mais variados bots. Um dos maiores projetos vendidos foi um sistema de pagamento completo, utilizando o Mercado Pago, com sistemas de tickets, cupons, entrega automática e anti-fraude. Até o momento, a loja já vendeu mais de 50 projetos.",
            icon: "🛒",
        },
    ];

    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="experience" className="py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Experiência
                </h2>

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
                                    hoveredId === exp.id ? "bg-[#2C3953]" : "bg-[#1a2235]/70"
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
            </div>
        </section>
    );
}
