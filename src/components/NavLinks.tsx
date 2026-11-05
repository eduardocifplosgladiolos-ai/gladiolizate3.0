"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Pulso", href: "#pulso", id: "pulso" },
  { label: "Brújula", href: "#brujula", id: "brjula" },
  { label: "Botiquín", href: "#botiquin", id: "botiquin" },
  { label: "Reto", href: "#reto", id: "reto" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div
      className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wider uppercase text-white/70"
      style={{ marginTop: "1.5rem" }}
    >
      {NAV_LINKS.map((link) => {
        const active = pathname === "/" ? false : pathname === link.id;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative text-sm font-mono tracking-wider uppercase text-white/70 hover:text-gladi-cyan transition-colors group
              ${active ? "text-gladi-cyan" : ""}
            `}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
            <span
              className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-gladi-accent to-gladi-accent2 transition-all duration-300 group-hover:w-full"
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </div>
  );
}
