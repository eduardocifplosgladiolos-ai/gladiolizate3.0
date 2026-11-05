"use client";

import Link from "next/link";
import { ArrowRight, Zap, Users, Award } from "lucide-react";

export function Hero() {
  const handleRetoClick = () => {
    const el = document.getElementById("reto");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-20 pb-10 overflow-hidden gladi-grid-bg"
      aria-label="Presentación del portal"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(102,30,255,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gladi-cyan/40 bg-gladi-panel/60 backdrop-blur"
            >
              <span className="w-2 h-2 rounded-full bg-gladi-cyan animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-gladi-cyan uppercase">
                Portal Interactivo • Enero–Mayo
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight"
              style={{
                color: "#ffffff",
                textShadow: "0 0 14px rgba(0,240,255,0.7)",
                animation: "fadeUp 0.7s ease-out forwards",
                opacity: 0,
              }}
            >
              GLADIOLÍZATE
              <br />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gladi-accent via-gladi-accent2 to-gladi-cyan">
                3.0
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-white/80 max-w-lg leading-relaxed"
              style={{ animation: "fadeUp 0.7s ease-out 0.1s forwards", opacity: 0 }}
            >
              Conectando el CIFP Los Gladiolos con la realidad profesional.
              Contenido interactivo hecho por y para el alumnado.
            </p>

            <div
              className="flex flex-wrap gap-4 pt-2"
              style={{ animation: "fadeUp 0.6s ease-out 0.2s forwards", opacity: 0 }}
            >
              <button
                type="button"
                className="btn-neon"
                style={{
                  borderColor: "var(--neon-magenta)",
                  color: "var(--neon-magenta)",
                }}
              >
                Aceptar Reto del Mes
              </button>
              <Link href="#pulso" className="btn-neon">
                Explorar Secciones
              </Link>
            </div>
          </div>

          <div
            className="relative flex flex-col justify-center"
            style={{ animation: "fadeUp 0.8s ease-out 0.1s forwards", opacity: 0 }}
          >
            <div className="gladi-glass rounded-2xl p-6 md:p-8 border border-[rgba(102,30,255,0.25)] float">
              <h3
                className="text-xs font-mono tracking-widest text-gladi-cyan uppercase mb-6"
              >
                Portal en cifras
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-display font-bold text-white">
                      {s.value}
                    </div>
                    <div className="text-xs font-mono tracking-wider text-white/70 uppercase">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-6 border-t border-[rgba(102,30,255,0.25)]" />
              <div className="flex gap-4 text-white/80 text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-gladi-cyan" />
                  Comunidad
                </span>
                <span className="flex items-center gap-2">
                  <Award size={14} className="text-gladi-accent2" />
                  Retos mensuales
                </span>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border border-gladi-cyan/30 flex items-center justify-center text-[10px] font-mono tracking-widest text-gladi-cyan uppercase opacity-60 bg-gladi-panel/40 backdrop-blur"
            >
              Interactivo
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          aria-hidden="true"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">
            Desliza
          </span>
          <div
            className="w-[1px] h-8 bg-gradient-to-b from-gladi-cyan to-transparent"
            style={{ animation: "scrollPulse 1.4s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "7", label: "Secciones activas" },
  { value: "5", label: "Mes publicación" },
  { value: "CIFP", label: "Los Gladiolos" },
];
