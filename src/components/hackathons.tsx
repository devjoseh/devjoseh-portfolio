"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type Hackathon = {
    id: number;
    title: string;
    banner: string;
    description: string;
    date: string;
    result?: string;
};

export function Hackathons() {
    const hackathons: Hackathon[] = [
        {
            id: 1,
            title: "Campeão The Schools Challenge",
            banner: "/banner_tsc.webp",
            description:
                "Fui campeão da 5ª Edição do The Schools Challenge, organizado por JPMorgan Chase e Ideias de Futuro. Primeiramente, quero agradecer, do fundo do meu coração, aos nossos mentores Caio Monteiro Prado, Matheus Apalosqui da Fé e Edgar Pires. Sem eles, não teríamos chegado onde chegamos. Eles foram, e continuarão sendo, os melhores mentores que já tive. Também agradecer toda a minha equipe pelo trabalho incrível que fizemos até chegar ao top 1. Foram meses pensando em melhorias, otimizações, desistimos de várias ideias e conseguimos criar um projeto realmente incrível. Ganhar a 5ª Edição do The Schools Challenge não é só uma conquista como também uma experiência pra vida. O projeto foi criado pensando em todos os adolescentes e adultos que desejam um futuro mais digno. Por isso, desenvolvemos o Retention, um aplicativo que utiliza inteligência artificial para automatizar revisões periódicas por meio de flashcards, exercícios e resumos, além de ser totalmente acessível para pessoas com deficiência física.",
            date: "Dezembro 2024",
            result: "1º Lugar",
        },
        {
            id: 2,
            title: "Discover Data with Oracle Education Foundation",
            banner: "/banner_oracle.webp",
            description:
                "Tive a experiência de como é ser um Analista de Dados por 24 horas na maior e melhor empresa de tecnologia do mundo, a Oracle. Durante esses dois dias, escolhemos o ODS 3 (Saúde e Bem-Estar), definimos um problema, analisamos os dados encontrados usando a ferramenta Oracle Analytics Cloud e criamos vários tipos de gráficos para apresentar. Nossos mentores Gabriela da Silva Miyazima, Fernando O. A. Nunes, e John Wesley, nos ajudaram em todo esse processo de elaboração do projeto e também a entender o funcionamento da plataforma. Os três foram incríveis, e com certeza irei lembrá-los durante toda a minha carreira. Além disso, conhecemos vários setores do prédio da Oracle em São Paulo, incluindo a sala do Presidente e até o Data Center que eles têm no prédio. Trabalhar na Oracle é o sonho de qualquer um, e agora é o meu também 😅",
            date: "Novembro 2024",
        },
        {
            id: 3,
            title: "15ª FETEPS Feira Tecnológica do Centro Paula Souza",
            banner: "/banner_feteps.webp",
            description:
                "Eu e Lara Rocha fomos expositores do EducaAvalia (nosso projeto pessoal) na 15ª FETEPS do Centro Paula Souza, junto com nossa orientadora, Stephany Martins Conceição. Após um longo processo de avaliação, fomos selecionados para apresentar nosso projeto na feira. Estávamos concorrendo com mais de 100 projetos nacionais e internacionais, disputando prêmios como notebooks, iPhones e vários outros. Foi uma experiência incrível. Conheci muitas pessoas diferentes e diversos projetos. Fizemos contato com várias pessoas importantes no ramo de empreendedorismo e hackathons. Também conheci um grupo do Chile que criou um fertilizante líquido utilizando ortiga, água e leite, o que chamou muito a minha atenção. Acabei fazendo amizade com eles, mesmo meu espanhol não sendo tão bom. 😅 Espero ter outras oportunidades como essa no futuro!",
            date: "Agosto 2024",
            result: "Expositor"
        },
        {
            id: 4,
            title: "Ideathon Aliança Cultural Brasil-Japão",
            banner: "/banner_abj.webp",
            description:
                "Foi incrível participar do Ideathon da Aliança Brasil-Japão, que tinha como objetivo desenvolver uma solução para o problema da perda de alunos e receita causada pela pandemia. Esse foi um dos hackathons mais difíceis da minha vida! Foram 6 horas intensas para estruturar todo o projeto e realizar a apresentação. O espaço da Aliança Cultural Brasil-Japão é incrível, e convido você, que deseja aprender o idioma japonês, a entrar em contato com eles. Tenho certeza de que será muito bem atendido e acolhido!",
            date: "Julho 2024",
        },
        {
            id: 5,
            title: "7º Hackathon Acadêmico do Centro Paula Souza",
            banner: "/banner_hackcps.webp",
            description:
                "Tive a honra de representar a nossa Etec na Oracle Academy Brasil Summit 2024, que aconteceu em São Paulo. Foi uma experiência única! Passamos várias e várias semanas trabalhando intensamente para aperfeiçoar o projeto, dedicando nosso tempo e esforço até chegarmos a um resultado que realmente nos agradasse e que representasse todo o potencial da nossa equipe. Foram dias de muito aprendizado e crescimento. Antes da apresentação oficial, tivemos uma imersão incrível com a Oracle Academy Summit, realizada na Universidade São Judas, no campus Mooca. Foi uma oportunidade incrível para conhecer mais sobre a tecnologia que utilizamos, interagir com especialistas da área e trocar ideias com outros participantes. Embora não tenhamos vencido, essa experiência foi extremamente marcante. Participar de um evento desse porte nos proporcionou aprendizados que levaremos para a vida !",
            date: "Julho 2024",
            result: "Finalista",
        },
        {
            id: 6,
            title: "Campeão EMpreende SIM!",
            banner: "/banner_emsim.webp",
            description:
                "Campeões do EMpreende SIM! 2024! Junto a minha equipe, apresentamos nosso projeto, o EducaAvalia e alcançamos o tão sonhado top 1! Foram alguns meses participando das mentorias realizadas por Júlia de Souza José e Julia Antunes, que foram extremamente atenciosas conosco e ensinaram o conteúdo muito bem. Elas são pessoas incríveis que, com certeza, irei lembrar e apreciar por muito tempo. O EmpreendeSim, além de ser uma competição incrível que pode abrir muitas portas, nos mostrou um pouco mais de como é a USP por dentro. Isso me deu ainda mais motivação para estudar muito e, quem sabe, também me tornar um mentor dessa competição incrível!",
            date: "Julho 2024",
            result: "1º Lugar",
        },
    ];

    const [selectedHackathon, setSelectedHackathon] =
        useState<Hackathon | null>(null);

    return (
        <section id="hackathons" className="py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Hackathons
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {hackathons.map((hackathon) => (
                        <motion.div
                            key={hackathon.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="cursor-pointer group"
                            onClick={() => setSelectedHackathon(hackathon)}
                        >
                            <div className="bg-[#1a2235]/70 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-[3/2] overflow-hidden">
                                    <Image
                                        src={
                                            hackathon.banner ||
                                            "/placeholder.svg"
                                        }
                                        width={600}
                                        height={400}
                                        alt={hackathon.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {hackathon.result && (
                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-500 text-white text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                            {hackathon.result}
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">
                                        {hackathon.title}
                                    </h3>
                                    <p className="text-blue-300 text-xs sm:text-sm">
                                        {hackathon.date}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Hackathon Modal */}
                <Dialog
                    open={!!selectedHackathon}
                    onOpenChange={(open) => !open && setSelectedHackathon(null)}
                >
                    <DialogContent className="sm:max-w-4xl bg-[#1a2235] border-[#2C3953] p-0 max-h-[90vh] sm:max-h-[85vh] w-[95vw] sm:w-auto overflow-y-auto">
                        <button
                            onClick={() => setSelectedHackathon(null)}
                            className="absolute right-2 top-2 z-50 rounded-full opacity-80 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 p-1.5"
                        >
                            <X className="h-4 w-4 text-white" />
                            <span className="sr-only">Close</span>
                        </button>

                        {/* Container do conteúdo (inclui banner e demais informações) */}
                        <div className="flex flex-col">
                            {/* Banner que agora fará parte do scroll */}
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={
                                        selectedHackathon?.banner ||
                                        "/placeholder.svg"
                                    }
                                    alt={selectedHackathon?.title || ""}
                                    fill
                                    className="object-cover"
                                />
                                {selectedHackathon?.result && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        {selectedHackathon.result}
                                    </div>
                                )}
                            </div>

                            {/* Conteúdo */}
                            <div className="p-4 sm:p-6">
                                <DialogHeader className="mb-2 sm:mb-4">
                                    <DialogTitle className="text-xl sm:text-2xl font-bold">
                                        {selectedHackathon?.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-blue-300 text-sm sm:text-base">
                                        {selectedHackathon?.date}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="mt-2 sm:mt-4">
                                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                        {selectedHackathon?.description}
                                    </p>
                                    {selectedHackathon?.result && (
                                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-500/20 rounded-lg">
                                            <p className="font-medium text-sm sm:text-base">
                                                Resultado:{" "}
                                                <span className="text-blue-300">
                                                    {selectedHackathon.result}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
