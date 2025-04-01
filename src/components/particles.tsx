"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
    className?: string;
}

export const Particles = ({ className = "" }: ParticlesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const updateCanvasSize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        // Particle settings
        const particleCount = 100;
        const particleColor = "#ffffff";
        const lineColor = "rgba(255, 255, 255, 0.1)";
        const particleRadius = 2;
        const lineWidth = 1;
        const connectionDistance = 150;
        const moveSpeed = 0.5;

        // Particles array
        const particles: {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
        }[] = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: (Math.random() * canvas.width) / dpr,
                y: (Math.random() * canvas.height) / dpr,
                directionX: (Math.random() - 0.5) * moveSpeed,
                directionY: (Math.random() - 0.5) * moveSpeed,
            });
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Move particle
                particle.x += particle.directionX;
                particle.y += particle.directionY;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width / dpr) {
                    particle.directionX *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height / dpr) {
                    particle.directionY *= -1;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.globalAlpha = 0.7;
                ctx.fill();

                // Connect particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.globalAlpha = 1 - distance / connectionDistance;
                        ctx.lineWidth = lineWidth;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
        };

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 w-full h-full", className)}
        />
    );
};
