"use client";

import { useState, useEffect } from "react";

interface FolEntry {
  id: string;
  autor: string;
  texto: string;
  hora: string;
}

function loadEntries(): FolEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("gladi-consultorio-fol");
    return raw ? (JSON.parse(raw) as FolEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: FolEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("gladi-consultorio-fol", JSON.stringify(entries));
  } catch {}
}

export function ConsultorioFOL() {
  const [entries, setEntries] = useState<FolEntry[]>(loadEntries);
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !texto.trim()) return;
    setEnviando(true);
    const entry: FolEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `fol-${Date.now()}`,
      autor: autor.trim(),
      texto: texto.trim(),
      hora: new Date().toLocaleString("es-ES", { hour12: false }),
    };
    setEntries((prev) => [entry, ...prev]);
    setAutor("");
    setTexto("");
    setTimeout(() => setEnviando(false), 600);
  };

  return (
    <section id="fol" className="scroll-mt-20 py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="section-title" style={{ display: "flex", marginBottom: "1.5rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-neon-cyan" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a2 2 0 0 1-2 1.8h1.99" />
            <path d="m22 11-8.97 5.7a2 2 0 0 1-2 1.8H5.22" />
          </svg>
          <h2>Consultorio FOL</h2>
        </div>

        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Buzón anónimo para dudas sobre el mundo laboral. ¡Te respondemos en el próximo número!
        </p>

        <div className="grid-cards">
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fol-autor" className="text-[0.65rem] font-mono tracking-widest uppercase text-white/50 block mb-1">
                  Alias
                </label>
                <input
                  id="fol-autor"
                  className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white/90 placeholder-white/30 focus:border-gladi-cyan focus:outline-none"
                  placeholder="Tu nombre o alias"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="fol-texto" className="text-[0.65rem] font-mono tracking-widest uppercase text-white/50 block mb-1">
                  Duda
                </label>
                <textarea
                  id="fol-texto"
                  className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white/90 placeholder-white/30 focus:border-gladi-cyan focus:outline-none resize-none"
                  rows={4}
                  placeholder="¿Qué te gustaría saber sobre el mundo laboral, la formación o el emprendimiento?"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-neon"
                style={{ fontWeight: "600" }}
                disabled={enviando}
              >
                {enviando ? "ENVIANDO…" : "Enviar duda"}
              </button>
              {entries.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <h4 className="text-[0.65rem] font-mono tracking-widest uppercase text-gladi-cyan mb-2">Recibidos</h4>
                  <ul className="space-y-2 text-xs font-mono text-white/70">
                    {entries.slice(0, 5).map((entry) => (
                      <li key={entry.id}>
                        <span style={{ color: "var(--neon-magenta)" }}>{entry.autor}</span> — {entry.texto.slice(0, 60)}…
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
