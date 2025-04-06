"use client";

import { ExternalLink, Github, LinkIcon, FileText, Instagram, Database, Newspaper, Youtube, Linkedin, Mail } from "lucide-react"
import { fetchProjects as fetchProjectsDb } from "@/utils/actions/project";
import { LoadingSkeleton, ErrorMessage } from "@/components/index";
import { Card, CardContent, Button } from "@/components/index"
import type { Project } from "@/utils/types/projects";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image'

const iconMap: Record<string, React.ReactNode> = {
    link: <LinkIcon size={14} />,
    github: <Github size={14} />,
    external: <ExternalLink size={14} />,
    docs: <FileText size={14} />,
    instagram: <Instagram size={14} />,
    drive: <Database size={14} />,
    news: <Newspaper size={14} />,
    youtube: <Youtube size={14} />,
    linkedin: <Linkedin size={14} />,
    email: <Mail size={14} />,
}

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const fetchProjects = async () => {
        try {
            setLoading(true)

            const data = await fetchProjectsDb()
            setProjects(data || [])
        } catch (err) {
            console.error("Erro ao buscar projetos:", err)
            setError("Não foi possível carregar os projetos.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-[#1a2235]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Projetos
                </h2>

                {loading ? (<LoadingSkeleton count={4} columns={2}/>) 
                : projects.length === 0 ? (
                    <ErrorMessage 
                        message="Ainda não há projetos cadastrados."
                        retryAction={fetchProjects} 
                        className="min-h-[200px] flex flex-col items-center justify-center" 
                    />
                ) 
                : error ? (
                <ErrorMessage 
                    message={error} 
                    retryAction={fetchProjects} 
                    className="min-h-[200px] flex flex-col items-center justify-center" 
                />
                ) 
                : ( 
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
                                            src={project.image_url ||"/placeholder.svg"}
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

                                        {project.links && project.links.length > 0 && (
                                            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                                                {project.links.map((link, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-1 sm:gap-2 text-xs sm:text-sm py-1 h-auto"
                                                        onClick={() => window.open(link.url, "_blank")}
                                                    >
                                                        {link.icon && iconMap[link.icon] ? iconMap[link.icon] : <LinkIcon size={14} />}
                                                        {link.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
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
