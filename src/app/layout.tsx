import type { Metadata } from "next";
import { Orbitron, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { AudioProvider } from "@/components/AudioProvider";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GLADIOLÍZATE 3.0 — Plataforma de Comunicación Interactiva",
  description:
    "Portal interactivo del CIFP Los Gladiolos: Brújula Profesional, Botiquín del Emprendedor, Alerta Reto y mucho más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${orbitron.variable} ${geistSans.variable} ${geistMono.variable} font-body antialiased bg-gladi-dark text-white overflow-x-hidden`}
      >
        {/* Cursor glow persistente */}
        <div id="cursor-glow-root" aria-hidden="true">
          {/* se inyecta desde Navigation para lazy load */}
        </div>
        <LenisProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
