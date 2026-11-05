"use client";

import { useState } from "react";
import { Play, CheckCircle, AlertCircle } from "lucide-react";

const STORAGE_KEY = "gladi:test:fakeFillByC";

const FAKE_FICHA = [
  { k: "Vía de administración", v: "Cerebro" },
  { k: "Indicaciones", v: "Mayor empleabilidad, menos dramas en el trabajo" },
  { k: "Composición", v: "Comunicación asertiva + escucha activa (30 UI)" },
  { k: "Posología", v: "1 dosis diaria con feedback inmediato" },
  { k: "Efectos secundarios", v: "Posible aumento de productividad y reducción de conflictos" },
];

function syncTestAnswersToStorage(answers: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {}
}

function loadTestAnswersFromStorage(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) ?? {};
  } catch {}
  return {};
}

export function SoftSkillFicha() {
  const [testAnswers, setTestAnswers] = useState<Record<string, boolean>>(loadTestAnswersFromStorage);
  const [vialHover, setVialHover] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioEl = typeof window !== "undefined" ? new Audio("/gladi-audio.mp3") : null;

  if (audioEl && typeof window !== "undefined") {
    audioEl.preload = "none";
    audioEl.addEventListener("ended", () => setAudioPlaying(false));
    audioEl.addEventListener("error", () => {
      setAudioPlaying(false);
      setAudioError(true);
    });
  }

  function toggleAnswer(key: string) {
    setTestAnswers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      syncTestAnswersToStorage(next);
      return next;
    });
  }

  function toggleAudio() {
    if (audioPlaying) {
      setAudioPlaying(false);
      return;
    }
    if (audioEl) {
      try {
        audioEl.currentTime = 0;
        audioEl.play();
        setAudioPlaying(true);
        setAudioError(false);
      } catch {
        setAudioPlaying(false);
        setAudioError(true);
      }
    }
  }

  return (
    <div className="mt-8 grid md:grid-cols-5 gap-6 items-start">
      <div className="md:col-span-3">
        <div className="cantana-card rounded-xl p-5 gladi-glass border border-[rgba(255,0,170,0.3)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-gladi-accent2">
              Inyección de Talento — Dosis mensual
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
              Prospecto
            </span>
          </div>

          <ul className="space-y-3 text-sm text-white/80">
            {FAKE_FICHA.map((row) => (
              <li key={row.k} className="grid grid-cols-[130px_1fr] gap-2 items-start">
                <span className="text-xs font-mono tracking-wider text-gladi-cyan/80">{row.k}</span>
                <span className="text-white/90 leading-relaxed">{row.v}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-[rgba(0,240,255,0.2)] pt-4">
            <p className="text-xs font-mono tracking-widest text-white/50 mb-3">
              TEST DE ALERGENCIA
              <span className="block text-[10px] text-white/30 mt-1">¿Eres alérgica a esta soft skill? Compruébalo en 10 segundos.</span>
            </p>

            <div className="space-y-2">
              {["a", "b", "c"].map((option) => {
                const selected = !!testAnswers[option];
                const ok = option === "c";
                const result = selected ? (ok ? "Correcto" : "Necesitas otra dosis") : null;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg border text-sm transition-all ${
                      selected
                        ? "border-gladi-cyan bg-gladi-cyan/10 text-gladi-cyan"
                        : "border-white/10 text-white/70 hover:border-gladi-cyan/40"
                    }`}
                    onClick={() => toggleAnswer(option)}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                        selected ? "border-gladi-cyan bg-gladi-cyan text-black" : "border-white/20"
                      }`}
                    >
                      {option.toUpperCase()}
                    </span>
                    <span className="font-mono tracking-wider uppercase text-xs shrink-0">
                      Opción {option.toUpperCase()}
                    </span>
                    {selected && (
                      <span className="ml-auto text-[10px] font-mono tracking-wider uppercase shrink-0">
                        {result && (
                          result === "Correcto" ? (
                            <CheckCircle size={12} className="text-gladi-cyan inline mr-1" />
                          ) : (
                            <AlertCircle size={12} className="text-gladi-accent2 inline mr-1" />
                          )
                        )}
                        {result}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] font-mono tracking-widest text-white/40">
              Respuesta c: meter jerga sanitaria — al pulsar la opción c verás el resultado inmediato.
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 flex items-center justify-center">
        <div
          className={`relative cursor-pointer w-44 h-72 rounded-full border-2 flex items-center justify-center transition-all ${
            vialHover
              ? "border-gladi-cyan/80 shadow-[0_0_40px_rgba(0,240,255,0.5)]"
              : "border-white/20 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
          }`}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, rgba(0,240,255,0.08) 40%, rgba(102,30,255,0.15) 70%, transparent 100%)",
          }}
          onMouseEnter={() => setVialHover(true)}
          onMouseLeave={() => setVialHover(false)}
          onClick={toggleAudio}
          role="button"
          tabIndex={0}
          aria-label="Vial de cristal con audio de ejemplo de soft skill"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleAudio();
            }
          }}
        >
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,240,255,0.25), rgba(168,85,247,0.35) 60%, rgba(255,0,170,0.25))",
              backdropFilter: "blur(4px)",
            }}
          />

          <div
            className="absolute inset-10 rounded-full border border-white/20 flex items-center justify-center bg-gladi-dark/40 backdrop-blur"
            style={{ animation: "floatIcon 3s ease-in-out infinite" }}
          >
            <span className="text-[8px] font-mono tracking-[0.4em] text-gladi-cyan uppercase">
              Soft Skill
            </span>
          </div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-3 rounded-b-xl border-2 border-white/20 bg-gladi-dark/60 backdrop-blur flex items-center justify-center">
            <span className="text-[8px] font-mono tracking-widest text-white/40">INJE</span>
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono tracking-widest text-white/40">Toca para audio</span>
            <button
              type="button"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                audioPlaying
                  ? "bg-gladi-accent2 text-black"
                  : "bg-gladi-panel border border-gladi-cyan/40 text-gladi-cyan"
              }`}
              aria-label={audioPlaying ? "Detener audio" : "Reproducir audio ejemplo"}
              onClick={(e) => {
                e.stopPropagation();
                toggleAudio();
              }}
            >
              <Play size={14} fill={audioPlaying ? "currentColor" : "none"} />
            </button>
          </div>

          {audioPlaying && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-gladi-cyan text-[9px] font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gladi-cyan animate-pulse" />
              Audio activo
            </div>
          )}

          {audioError && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-gladi-accent2 text-[9px] font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gladi-accent2 animate-pulse" />
              Audio no disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
