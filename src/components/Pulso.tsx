"use client";

import { useState } from "react";

const ITEMS = [
  {
    title: "Taller del Tiempo: De barberos a cirujanos",
    body: "¿Sabías que en la Edad Media los barberos no solo cortaban el pelo, sino que también hacían extracciones dentales y sangrías? El famoso poste rojo y blanco de las barberías representaba los vendajes manchados de sangre.",
  },
  {
    title: "Mito: El azúcar y las caries",
    body: "No es solo el azúcar el que pica los dientes, sino el tiempo que los ácidos de las bacterias pasan en contacto con el esmalte. ¡La frecuencia es más peligrosa que la cantidad!",
  },
];

export function Pulso() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="pulso" className="scroll-mt-20 py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="section-title" style={{ display: "flex", marginBottom: "1.5rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-scroll-text text-neon-cyan"
            aria-hidden="true"
          >
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
          </svg>
          <h2>Pulso Histórico</h2>
        </div>

        <div className="grid-cards">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`card ${active === i ? "card-active" : ""}`}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setActive(i); }}
              style={{ cursor: "pointer", transform: active === i ? "scale(1.03)" : "none" }}
            >
              <div style={{ display: "flex", gap: "10px", marginBottom: "1rem", alignItems: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hourglass text-neon-yellow" aria-hidden="true">
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                </svg>
                <h3>{item.title}</h3>
              </div>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
