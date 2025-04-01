"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    liveName?: string;
    githubUrl?: string;
};

export function Projects() {
    const projects: Project[] = [
        {
            id: 1,
            title: "EducaAvalia",
            description: "Um aplicativo de avaliações de escolas inclusivas e acessíveis para pessoas com deficiência física.",
            image: "/proj_educaavalia.svg",
            tags: [ "React Native", "TypeScript", "Tailwind CSS", "Supabase" ],
            liveUrl: "https://www.figma.com/proto/ruZ0jXdF0mGWtSZ2ScXdDL?node-id=0-1&t=lTd0aouf0piv1bAk-6",
            liveName: "Protótipo V2"
        },
        {
            id: 2,
            title: "Retention",
            description: "Um aplicativo que utiliza inteligência artificial para automatizar revisões periódicas por meio de Flashcards, exercícios e resumos além de ser totalmente acessível para pessoas com deficiência física.",
            image: "/proj_retention.svg",
            tags: [ "React Native", "TypeScript", "Tailwind CSS", "Supabase" ],
            liveUrl: "https://www.figma.com/proto/fZavZnIU6969N9pe6ec4hc?node-id=0-1&t=lTd0aouf0piv1bAk-6",
            liveName: "Protótipo"
        },
        {
            id: 3,
            title: "Venda automática via Discord",
            description: "Um bot criado para automatizar vendas de produtos via servidores do Discord. Geração de pagamentos PIX via Mercado Pago e todo o gerenciamento do servidor, como auditoria, criação de produtos, adição de estoque, entre outros.",
            image: "/proj_vendas.svg",
            tags: [ "TypeScript", "MercadoPago", "FirebaseDb", "Discord.js" ],
        },
        {
            id: 4,
            title: "Bate Ponto automático via Discord",
            description: "Um bot criado para automatizar o bate-ponto dos funcionários de um servidor de roleplay do FiveM. Ao entrar em um canal de voz configurado, o ponto do usuário é iniciado, e, ao sair do canal de voz, o ponto é encerrado. Geração de logs, e os administradores podem monitorar os registros de todos os usuários, gerando planilhas, por exemplo.",
            image: "/proj_bateponto.svg",
            tags: [ "TypeScript", "Discord.js" ],
        },
        {
            id: 5,
            title: "Fecarte - Rádio e Inteligência Artificial",
            description: "O objetivo do projeto era mostrar como a inteligência artificial junto com a rádio podem criar algo inovador.",
            image: "/proj_fecarte.svg",
            tags: [ "Inteligência Artificial", "Rádio", "Plazmapunk" ],
            liveUrl: "https://tecmusic.vercel.app/",
            liveName: "Website",
            githubUrl: "https://github.com/devjoseh/TecMusic",
        },
    ];

    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-[#1a2235]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Projetos
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Card className="border-0 overflow-hidden h-full bg-[#2C3953]/30 hover:bg-[#2C3953]/60 transition-all duration-300">
                                <CardContent className="p-0 h-full">
                                    <div className="relative overflow-hidden aspect-video">
                                        <Image
                                            src={project.image ||"/placeholder.svg"}
                                            width={600}
                                            height={400}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                                            style={{ transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)" }}
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 sm:py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                                            {project.liveUrl && project.liveName && (
                                                <Link 
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button  variant="outline" size="sm"  className="cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm py-1 h-auto">
                                                        <ExternalLink size={14} />
                                                        {project.liveName}
                                                    </Button>
                                                </Link>
                                            )}
                                            {project.githubUrl && (
                                                <Link 
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button variant="outline" size="sm" className="cursor-pointer gap-1 sm:gap-2 text-xs sm:text-sm py-1 h-auto">
                                                        <Github size={14} />
                                                        Código
                                                    </Button>
                                                </Link>
                                            )}
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
