"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import Link from 'next/link'

export function AboutSection() {
    const socialLinks = [
        {
            name: "LinkedIn",
            icon: <Linkedin size={18} />,
            url: "https://www.linkedin.com/in/devjoseh/",
        },
        {
            name: "Instagram",
            icon: <Instagram size={18} />,
            url: "https://www.instagram.com/dev_joseh/",
        },
        {
            name: "YouTube",
            icon: <Youtube size={20} />,
            url: "https://youtube.com/@devjoseh",
            username: "@devjoseh",
        },
        {
            name: "GitHub",
            icon: <Github size={18} />,
            url: "https://github.com/devjoseh",
        },
    ];

    return (
        <section id="about" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Quem sou eu
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="flex flex-col items-center md:items-start">
                    {/* Profile Photo Area */}
                    <div className="relative mb-5 md:mb-8">
                        <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#2C3953] shadow-xl">
                            <Image
                                src="/pfp2.webp"
                                alt="José Hernanes"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 w-full">
                        {socialLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant="outline"
                                size="sm"
                                className="bg-[#2C3953]/70 border-[#2C3953] hover:bg-[#2C3953] text-white gap-2"
                                asChild
                            >
                                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>

                    {/* Bio Text */}
                    <div className="relative mt-6 md:mt-8 bg-[#2C3953] p-4 sm:p-6 rounded-lg shadow-xl w-full">
                        <p className="text-base sm:text-lg leading-relaxed">
                        Tenho 17 anos, estou cursando Análise e Desenvolvimento de Sistemas e iniciei na programação aos 12 criando e ensinando as pessoas a criarem bots para o discord no meu canal do YouTube.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed mt-4">
                        Sou fundador e idealizador do projeto EducaAvalia, um aplicativo de avaliações de escolas inclusivas e acessíveis para alunos com deficiência.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed mt-4">
                        Atualmente, atuo como desenvolvedor back-end, apaixonado por resolver desafios. Nas horas vagas, sou designer e rato de hackathons.
                        </p>
                        <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="personality" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="personality">
                                Personalidade
                            </TabsTrigger>
                            <TabsTrigger value="skills">
                                Soft Skills
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personality" className="space-y-4">
                            <Card className="border-0 py-6 bg-[#1a2235]/50 backdrop-blur-sm">
                                <CardContent className="pt-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                                            <Image src="/logo_16personalities.svg" alt="16Personalities website logo" width={50} height={50}/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                Comandante (ENTJ-T)
                                            </h3>
                                            <p className="text-blue-200 hover:text-blue-300 transition-colors">
                                                <Link 
                                                    href="https://www.16personalities.com/br/teste-de-personalidade"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    16Personalities
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                    Realizei o teste de personalidade 16Personalities e obtive o resultado  <Link href="https://www.16personalities.com/br/personalidade-entj" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors">ENTJ-T (Comandante)</Link>. Esse perfil destaca minha liderança, pensamento estratégico e foco em resultados, características que impulsionam meu desenvolvimento profissional.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="skills" className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: "Mente estratégica", icon: "🧠" },
                                    { name: "Líder nato", icon: "👑" },
                                    { name: "Comunicador direto", icon: "🗣️" },
                                    { name: "Especialista em eficiência", icon: "⚡", },
                                    { name: "Ambicioso", icon: "🚀" },
                                    { name: "Autoconfiante", icon: "💪" },
                                    { name: "Focado em objetivos", icon: "🎯" },
                                    { name: "Resolução de problemas lógicos", icon: "🔍",},
                                    { name: "Intelectualmente Estimulante", icon: "💡",},
                                ].map((skill) => (
                                    <Card key={skill.name} className="border-0 bg-[#1a2235]/50 backdrop-blur-sm hover:bg-[#2C3953] transition-all duration-300">
                                        <CardContent className="p-6 flex flex-col items-center text-center">
                                            <span className="text-3xl mb-2">
                                                {skill.icon}
                                            </span>
                                            <h3 className="font-medium">
                                                {skill.name}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
}