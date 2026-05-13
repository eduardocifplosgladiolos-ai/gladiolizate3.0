import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gladiolízate 3.0",
  description: "Plataforma de Comunicación Interactiva del CIFP Los Gladiolos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <header className="app-header">
          <div className="app-logo">
            ⚡ GLADIOLÍZATE <span className="text-neon-magenta">3.0</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            <a href="#pulso" className="text-neon-cyan">Pulso</a>
            <a href="#brujula" className="text-neon-cyan">Brújula</a>
            <a href="#botiquin" className="text-neon-cyan">Botiquín</a>
            <a href="#reto" className="text-neon-magenta">Reto</a>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}