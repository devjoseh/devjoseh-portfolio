"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchHackathons as fetchHackathonsDb } from '@/utils/actions/hackathon'
import { LoadingSkeleton, ErrorMessage } from "@/components/index";
import type { Hackathon } from "@/utils/types/hackathons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export function Hackathons() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)

    const fetchHackathons = async () => {
        try {
            setLoading(true)
            
            const data = await fetchHackathonsDb()
            setHackathons(data || [])
        } catch (err) {
            console.error("Erro ao buscar hackathons:", err)
            setError("Não foi possível carregar os hackathons.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHackathons()
    }, [])

    return (
        <section id="hackathons" className="py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Hackathons
                </h2>

                {loading ? (<LoadingSkeleton count={6} columns={3}/>) 
                : hackathons.length === 0 ? (
                    <ErrorMessage 
                        message="Ainda não há hackathons cadastrados."
                        retryAction={fetchHackathons} 
                        className="min-h-[200px] flex flex-col items-center justify-center" 
                    />
                ) 
                : error ? (
                    <ErrorMessage 
                        message={error} 
                        retryAction={fetchHackathons} 
                        className="min-h-[200px] flex flex-col items-center justify-center" 
                    />
                ) : (
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
                                            src={hackathon.banner_url || "/placeholder.svg"}
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
                )}
            

                {/* Hackathon Modal */}
                <Dialog open={!!selectedHackathon} onOpenChange={(open) => !open && setSelectedHackathon(null)}>
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
                                    src={selectedHackathon?.banner_url || "/placeholder.svg"}
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
