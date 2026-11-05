"use client";

import { useState } from "react";
import { ArrowRight, Clock, Compass, Syringe, Flame, BookOpen, Brain, RefreshCw } from "lucide-react";
import { SoftSkillFicha } from "@/components/SoftSkillFicha";

export function SeccionesPortal() {
  const [retoAceptado, setRetoAceptado] = useState(false);
  const [recomendacion, setRecomendacion] = useState("");
  const [recomendaciones, setRecomendaciones] = useState<{ autor: string; texto: string; tiza: string }[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("gladi-recomendaciones");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const guardarRecomendacion = () => {
    if (!recomendacion.trim()) return;
    const autor = localStorage.getItem("gladi-usuario-recomendacion") ?? "estudiante";
    const datos = [{ autor, texto: recomendacion.trim(), tiza: "#0f1220" }];
    setRecomendaciones((prev) => [...datos, ...prev]);
    localStorage.setItem("gladi-recomendaciones", JSON.stringify([...datos, ...recomendaciones]));
    setRecomendacion("");
  };

  const COLOR_MAP = {
    cyan: { border: "border-gladi-cyan/40", text: "text-gladi-cyan", hover: "hover:bg-gladi-cyan hover:text-black" },
    accent: { border: "border-gladi-accent/40", text: "text-gladi-accent", hover: "hover:bg-gladi-accent hover:text-white" },
    accent2: { border: "border-gladi-accent2/40", text: "text-gladi-accent2", hover: "hover:bg-gladi-accent2 hover:text-white" },
    purple: { border: "border-gladi-glow/40", text: "text-gladi-glow", hover: "hover:bg-gladi-glow hover:text-black" },
  } as const;

  type Color = keyof typeof COLOR_MAP;

  const [color, setColor] = useState<Color>("cyan");

  const seccionClases = (clases: string) => `${clases} gladi-glass rounded-xl p-5 border border-[rgba(102,30,255,0.25)] max-w-xl`;

  return (
    <section className="relative z-20" aria-label="Secciones del portal">
      {/* Sección 1: Brújula Profesional */}
      <Seccion id="brjula" numero="01" titulo="Brújula Profesional" icon={Compass}>
        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
          Un espacio de orientación real con entrevistas exclusivas a ex alumnos y
          expertos del sector. Encuentra referentes cercanos, consejos de trayectoria y
          recomendaciones para tu futuro profesional.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl">
          <TarjetaSeccion icon={Clock} titulo="Tips de Experto" color="cyan" />
          <TarjetaSeccion icon={RefreshCw} titulo="Cantera Gladiolos" color="accent" />
          <TarjetaSeccion icon={ArrowRight} titulo="Ruta Erasmus" color="accent2" />
          <TarjetaSeccion icon={Flame} titulo="Entrevistas" color="purple" />
        </div>

        <div className={seccionClases("")}>
          <h4 className="text-xs font-mono tracking-widest text-gladi-cyan uppercase mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-gladi-cyan animate-pulse mr-2" />
            Vota al protagonista del mes
          </h4>
          <p className="text-white/70 text-sm mb-4">
            Elige quién será el experto protagonista de la próxima edición.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { label: "Ana López", color: "cyan" },
              { label: "Carlos Ruiz", color: "accent" },
              { label: "Marta Vega", color: "accent2" },
              { label: "Javier Díaz", color: "purple" },
            ].map((opcion) => (
              <button
                key={opcion.label}
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono tracking-wider uppercase transition-all duration-300 ${COLOR_MAP[opcion.color].border} ${COLOR_MAP[opcion.color].text} hover:scale-[1.04]`}
                onClick={() => setColor(opcion.color as Color)}
              >
                <Compass size={14} className="animate-spin-slow" style={{ animationDuration: "4s" }} />
                {opcion.label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-white/50 text-xs font-mono">
            Votación: {color} — {["Ana López", "Carlos Ruiz", "Marta Vega", "Javier Díaz"].find((_, i) => i === ["cyan", "accent", "accent2", "purple"].indexOf(color)) ?? ""}
          </p>
        </div>
      </Seccion>

      <div className="container mx-auto px-5 mt-24 mb-2 flex items-center gap-4 text-white/30" aria-hidden="true">
        <Divider />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">02</span>
        <Divider className="w-24" />
      </div>

      {/* Sección 2: Botiquín del Emprendedor */}
      <Seccion id="botiquin" numero="02" titulo="El Botiquín del Emprendedor" icon={Syringe}>
        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
          Tu recurso definitivo para la inserción laboral y el autoempleo: plantillas de
          modelos de negocio, consejos legales, píldoras de vídeo y herramientas para
          montar tu proyecto.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl">
          <TarjetaSeccion icon={Flame} titulo="Dosis de éxito" color="accent2" />
          <TarjetaSeccion icon={Brain} titulo="Fórmula maestra" color="accent" />
          <TarjetaSeccion icon={Syringe} titulo="Inyección de Talento" color="purple" />
        </div>

        <SoftSkillFicha />
      </Seccion>

      <div className="container mx-auto px-5 mt-24 mb-2 flex items-center gap-4 text-white/30" aria-hidden="true">
        <Divider />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">03</span>
        <Divider className="w-24" />
      </div>

      {/* Sección 3: Alerta Reto */}
      <Seccion id="reto" numero="03" titulo="Alerta Reto" icon={Flame}>
        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
          El motor de gamificación del portal. Cada mes se plantea un enigma técnico, un
          caso clínico o un desafío de integración social para escalar en el ranking.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 max-w-2xl">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-red-400/60 text-sm font-mono tracking-widest uppercase text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300 pulse-glow"
            onClick={() => setRetoAceptado(true)}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse mr-2" />
            {retoAceptado ? "Reto aceptado ✓" : "Aceptar desafío"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm font-mono tracking-widest uppercase text-white/80 hover:border-gladi-cyan hover:text-gladi-cyan transition-all duration-300"
            onClick={() => document.getElementById("ranking")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver ranking
          </button>
        </div>

        {retoAceptado && (
          <div className="mt-4 gladi-glass rounded-xl border border-rust-400/30 px-4 py-3 text-sm text-rust-200 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-rust-400 animate-pulse mr-2" />
            Reto aceptado. Envía tu solución antes del viernes para aparecer en el ranking.
          </div>
        )}

        <p className="mt-4 text-xs text-white/40 font-mono">
          Reto del mes: "Crypto fisica (fase 1)" — envía tu solución antes del viernes.
          Los mejores se publican en "Re-Bobina".
        </p>

        <div className="mt-6" id="ranking">
          <h4 className="text-xs font-mono tracking-widest text-gladi-cyan uppercase mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-gladi-cyan animate-pulse mr-2" />
            Ranking de retos
          </h4>
          <ol className="list-decimal list-inside text-white/70 text-sm font-mono space-y-2">
            <li>1. Axoloti - Midea Team</li>
            <li>2. Async Hashed - Navigate On</li>
            <li>3. Migration Types - Gladiolizate</li>
            <li>4. Phoenix / React Error - Discord Zombie</li>
            <li>5. Supergladiolizate - Gladiolizate</li>
          </ol>
        </div>
      </Seccion>

      <div className="container mx-auto px-5 mt-24 mb-2 flex items-center gap-4 text-white/30" aria-hidden="true">
        <Divider />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">04</span>
        <Divider className="w-24" />
      </div>

      {/* Sección 4: Magma / Gofio Cultural */}
      <Seccion id="magma" numero="04" titulo="Magma / Gofio Cultural" icon={BookOpen}>
        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
          El espacio donde el alumnado publica recomendaciones de libros, películas y
          manifestaciones culturales. Co-creación y pensamiento crítico en la web del centro.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-gladi-cyan/40 text-xs font-mono tracking-widest text-gladi-cyan hover:bg-gladi-cyan hover:text-black transition-all duration-300"
            onClick={() => setRecomendacion("")}
          >
            Publicar recomendación
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-white/10 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-gladi-cyan transition-all duration-300"
            onClick={() => document.getElementById("muro")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver muro del talento
          </button>
        </div>

        <div className="mt-6">
          <form
            className="gladi-glass rounded-xl p-5 border border-gladi-cyan/20"
            onSubmit={(e) => {
              e.preventDefault();
              guardarRecomendacion();
            }}
          >
            <label htmlFor="recomendacion-texto" className="text-xs font-mono tracking-widest uppercase text-white/60 mb-2 block">
              ¿Qué recomienda?
            </label>
            <div className="flex gap-2">
              <input
                id="recomendacion-texto"
                className="flex-1 min-w-0 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white/90 placeholder-white/30 focus:border-gladi-cyan focus:outline-none"
                placeholder="Tiza tu recomendación…"
                value={recomendacion}
                onChange={(e) => setRecomendacion(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-gladi-cyan/40 text-xs font-mono tracking-widest text-gladi-cyan hover:bg-gladi-cyan hover:text-black transition-all duration-300"
              >
                Tiznar
              </button>
            </div>
          </form>

          <div className="mt-5" id="muro">
            <h4 className="text-xs font-mono tracking-widest text-gladi-cyan uppercase mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-gladi-cyan animate-pulse mr-2" />
              Muro del talento
            </h4>
            {recomendaciones.length === 0 ? (
              <p className="text-xs text-white/40 font-mono">Aún no hay recomendaciones publicadas.</p>
            ) : (
              <ul className="space-y-3">
                {recomendaciones.map((rec, i) => (
                  <li
                    key={i}
                    className="gladi-glass rounded-xl border p-4 border-white/10 text-sm font-mono"
                    style={{ borderColor: `${rec.tiza}33`, color: rec.tiza }}
                  >
                    <p className="text-white/60 text-[10px] font-mono">— {rec.autor}</p>
                    <p className="mt-1 text-white/80">{rec.texto}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Seccion>
    </section>
  );
}

const Divider = (props: React.HTMLAttributes<HTMLDivElement> = {}) => (
  <div
    {...props}
    className={`h-px bg-gradient-to-r from-transparent via-gladi-accent/60 to-transparent ${props.className ?? ""}`}
    aria-hidden="true"
  />
);

const SECCION_TOP_OFFSET = 120;

function Seccion({
  id,
  titulo,
  numero,
  children,
  icon: Icon,
}: {
  id: string;
  titulo: string;
  numero: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="container mx-auto px-5 py-24 scroll-mt-20"
      aria-labelledby={`titulo-${id}`}
      style={{ scrollMarginTop: SECCION_TOP_OFFSET }}
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-gladi-cyan">
            {numero}
          </span>
          <h2
            id={`titulo-${id}`}
            className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4 leading-tight"
            style={{ color: "#ffffff", textShadow: "0 0 10px rgba(0,240,255,0.5)" }}
          >
            {titulo}
          </h2>
          {children}
        </div>
        <div>
          <IconWrapper icon={Icon} />
        </div>
      </div>
    </section>
  );
}

function IconWrapper({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div
      className="w-48 h-48 rounded-full bg-gladi-panel/60 border border-[rgba(0,240,255,0.25)] flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.15)] backdrop-blur"
      style={{ animation: "floatIcon 6s ease-in-out infinite" }}
    >
      <Icon size={64} className="text-gladi-cyan" strokeWidth={1.25} />
    </div>
  );
}

const COLOR_MAP = {
  cyan: { border: "border-gladi-cyan/40", text: "text-gladi-cyan", hover: "hover:bg-gladi-cyan hover:text-black" },
  accent: { border: "border-gladi-accent/40", text: "text-gladi-accent", hover: "hover:bg-gladi-accent hover:text-white" },
  accent2: { border: "border-gladi-accent2/40", text: "text-gladi-accent2", hover: "hover:bg-gladi-accent2 hover:text-white" },
  purple: { border: "border-gladi-glow/40", text: "text-gladi-glow", hover: "hover:bg-gladi-glow hover:text-black" },
} as const;

type Color = keyof typeof COLOR_MAP;

function TarjetaSeccion({
  titulo,
  icon: Icon,
  color,
}: {
  titulo: string;
  icon: React.ElementType;
  color: Color;
}) {
  const theme = COLOR_MAP[color];

  return (
    <div className={`gladi-glass rounded-xl p-5 border ${theme.border} transition-all hover:-translate-y-1 hover:scale-[1.02]`}>
      <Icon size={24} className={theme.text} strokeWidth={2} />
      <h4 className="text-sm font-mono tracking-widest uppercase mt-3 text-white/90">
        {titulo}
      </h4>
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors"
        onClick={() => alert(`Abrir “${titulo}” (enlace en producción)`)}
      >
        Explorar <ArrowRight size={12} className="stroke-[2.5]" />
      </button>
    </div>
  );
}
