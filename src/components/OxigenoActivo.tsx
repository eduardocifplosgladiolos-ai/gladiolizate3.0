"use client";

import { useState } from "react";

export function OxigenoActivo() {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showSos, setShowSos] = useState(false);

  return (
    <section className="scroll-mt-20 py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="section-title" style={{ display: "flex", marginBottom: "1.5rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones text-neon-cyan" aria-hidden="true">
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
          </svg>
          <h2>Oxígeno Activo</h2>
        </div>

        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Banda sonora del centro y pausas activas para el bienestar integral.
        </p>

        <div className="grid-cards">
          <div className="card">
            <button
              type="button"
              className="btn-neon"
              onClick={() => setShowSpotify(true)}
              style={{ fontSize: "0.8rem" }}
            >
              Spotify Colaborativo
            </button>
            {showSpotify && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" role="dialog" aria-modal="true" onClick={() => setShowSpotify(false)}>
                <div className="gladi-glass rounded-2xl p-8 max-w-lg w-full mx-4 border border-gladi-cyan/30" onClick={(e) => e.stopPropagation()}>
                  <h3 className="section-title" style={{ marginBottom: "1rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones text-neon-cyan" style={{ marginRight: "0.75rem" }} />
                    Spotify Colaborativo
                  </h3>
                  <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                    Reproduciendo: "Banda sonora del centro". Toca el botón para activar el modo colaborativo.
                  </p>
                  <button
                    type="button"
                    className="btn-neon"
                    style={{ borderColor: "var(--neon-magenta)", color: "var(--neon-magenta)" }}
                    onClick={() => setShowSpotify(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <button
              type="button"
              className="btn-neon"
              style={{ borderColor: "var(--neon-magenta)", color: "var(--neon-magenta)" }}
              onClick={() => setShowSos(true)}
            >
              SOS Exámenes
            </button>
            {showSos && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" role="dialog" aria-modal="true" onClick={() => setShowSos(false)}>
                <div className="gladi-glass rounded-2xl p-8 max-w-lg w-full mx-4 border border-gladi-cyan/30" onClick={(e) => e.stopPropagation()}>
                  <h3 className="section-title" style={{ marginBottom: "1rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag text-neon-magenta" style={{ marginRight: "0.75rem" }} />
                    SOS Exámenes
                  </h3>
                  <ul style={{ color: "var(--text-muted)", marginBottom: "1.5rem", paddingLeft: "1.25rem" }}>
                    <li>📌 Distribuye el tiempo: 50 min estudio + 10 min descanso.</li>
                    <li>📝 Revisa siempre tus errores antes del examen.</li>
                    <li>🧠 Haz un resumen con tus propias palabras.</li>
                    <li>💧 Bebe agua y respira profundo antes de empezar.</li>
                  </ul>
                  <button
                    type="button"
                    className="btn-neon"
                    style={{ borderColor: "var(--neon-magenta)", color: "var(--neon-magenta)" }}
                    onClick={() => setShowSos(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
