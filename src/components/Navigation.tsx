"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CursorGlow } from "@/components/CursorGlow";

const NAV_LINKS = [
  { label: "Pulso", href: "#pulso", id: "pulso" },
  { label: "Brújula", href: "#brujula", id: "brjula" },
  { label: "Botiquín", href: "#botiquin", id: "botiquin" },
  { label: "Reto", href: "#reto", id: "reto" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveId(pathname === "/" ? null : pathname.slice(1));
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !listRef.current) return;

    const onObserve = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setActiveId(visible.length ? visible[0].target.id : null);
    };

    const obs = new IntersectionObserver(onObserve, { rootMargin: "0px 0px -40% 0px" });
    const sections = listRef.current.querySelectorAll("section[id]");
    sections.forEach((s) => obs.observe(s));
    setObserver(obs);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <CursorGlow />

      <nav
        className="fixed top-0 left-0 w-full z-50 gladi-glass border-b border-[rgba(102,30,255,0.25)]"
        style={{
          backdropFilter: "blur(18px) saturate(180%)",
          animation: "slideDown 0.8s ease-out forwards",
        }}
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Ir al inicio">
              <span
                className="text-2xl font-display font-bold tracking-tight"
                style={{ color: "#fff", textShadow: "0 0 12px rgba(0,240,255,0.9)" }}
              >
                GLADIOLÍZATE
              </span>
              <span className="hidden sm:inline text-xs font-mono tracking-widest text-gladi-cyan border border-gladi-cyan/40 px-2 py-0.5 rounded-full">
                3.0
              </span>
            </Link>

            <ul ref={listRef} className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map((link) => {
                const active = activeId === link.id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative text-sm font-mono tracking-wider uppercase text-white/70 hover:text-gladi-cyan transition-colors group ${
                        active ? "text-gladi-cyan" : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-gladi-accent to-gladi-accent2 transition-all duration-300 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden overflow-hidden border-t border-[rgba(102,30,255,0.25)]"
            style={{ animation: "slideDown 0.3s ease-out forwards" }}
          >
            <ul className="flex flex-col px-5 py-5 gap-4 text-sm font-mono tracking-wider uppercase text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-gladi-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
