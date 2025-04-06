"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const navItems = [
        { name: "Início", href: "#" },
        { name: "Sobre", href: "#about" },
        { name: "Tech Stack", href: "#tech-stack" },
        { name: "Experiência", href: "#experience" },
        { name: "Projetos", href: "#projects" },
        { name: "Hackathons", href: "#hackathons" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-[#1a2235]/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        DevJoseH
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name} 
                                href={item.href} 
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white">
                            Contato
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(true)} aria-label="Abrir menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-[100] bg-[#1a2235] flex flex-col">
                    {/* Close button */}
                    <div className="flex justify-end p-4">
                        <button onClick={closeMenu} className="text-gray-300 hover:text-white p-2 bg-[#2C3953]/50 rounded-full" aria-label="Fechar menu">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation items */}
                    <div className="px-6 py-6 space-y-6 flex flex-col flex-1 bg-[#1D263A]">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-lg text-gray-200 hover:text-white transition-colors py-3 border-b border-[#2C3953]/30 bg-[#2C3953]/20 px-4 rounded-md"
                                onClick={closeMenu} 
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4 py-6 text-lg" onClick={closeMenu}>
                            Contato
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
