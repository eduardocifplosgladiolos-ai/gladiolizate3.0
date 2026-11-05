"use client";

import { ArrowRight, Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-20 mt-24 border-t border-[rgba(102,30,255,0.2)]">
      <div className="footer-divider" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Col 1: identidad */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: "#fff", textShadow: "0 0 8px rgba(0,240,255,0.7)" }}
              >
                GLADIOLÍZATE 3.0
              </span>
              <span className="text-[10px] font-mono tracking-widest text-gladi-cyan border border-gladi-cyan/40 px-2 py-0.5 rounded-full">
                3.0
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Plataforma de comunicación interactiva del CIFP Los Gladiolos. Publicación
              mensual diseñada para dinamizar la comunidad del centro entre enero y mayo.
            </p>
          </div>

          {/* Col 2: secciones rápidas */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-gladi-cyan mb-4">
              Explorar
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="flex items-center gap-2 hover:text-gladi-cyan transition-colors"
                    onClick={(e) => {
                      if (!l.href.startsWith("http")) {
                        e.preventDefault();
                        const el = document.querySelector<HTMLElement>(`[id="${l.href.slice(1)}"]`);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <ArrowRight size={14} className="stroke-[2]" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: contacto */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-gladi-cyan mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="mailto:gladiolizate@gladiolos.edu"
                  className="flex items-center gap-2 hover:text-gladi-cyan transition-colors"
                >
                  <Mail size={14} className="stroke-[2]" />
                  gladiolizate@gladiolos.edu
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-gladi-cyan transition-colors">
                <Github size={14} className="stroke-[2]" />
                github / gladiolizate-3-0
              </li>
            </ul>
          </div>
        </div>

        {/* Colofón */}
        <div className="mt-12 pt-8 border-t border-[rgba(102,30,255,0.15)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono tracking-wider text-white/30 uppercase">
          <span>© CIFP Los Gladiolos — Gladiolízate 3.0</span>
          <span>Diseño interactivo / Next.js + Three.js + R3F</span>
        </div>
      </div>
    </footer>
  );
}

const LINKS = [
  { label: "Brújula Profesional", href: "#brjula" },
  { label: "Botiquín del Emprendedor", href: "#botiquin" },
  { label: "Alerta Reto", href: "#reto" },
  { label: "Magma / Gofio Cultural", href: "#magma" },
];
