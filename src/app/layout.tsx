import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter } from "next/font/google";

import type { Metadata } from "next";
import type React from "react";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DevJoseH | José Hernanes - Portfolio",
    description:
        "Portfolio pessoal de José Hernanes, desenvolvedor back-end e entusiasta de tecnologia.",
    keywords: [
        "devjoseh",
        "josé hernanes",
        "José Hernanes",
        "DevJoseH",
        "desenvolvedor back-end",
        "back-end",
        "backend",
        "desenvolvedor",
        "programador",
        "programação",
        "hackathon",
        "front-end",
        "discord",
        "discordjs",
    ],
    metadataBase: new URL("https://devjoseh.com.br"),
    openGraph: {
        title: "DevJoseH",
        description:
            "Portfolio pessoal de José Hernanes, desenvolvedor back-end e entusiasta de tecnologia.",
        url: "https://devjoseh.com.br",
        siteName: "DevJoseH",
        images: [
            {
                url: "/banner.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DevJoseH",
        description:
            "Portfolio pessoal de José Hernanes, desenvolvedor back-end e entusiasta de tecnologia.",
        images: ["https://devjoseh.com.br/banner.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
