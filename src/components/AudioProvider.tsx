"use client";

import { ReactNode } from "react";

export function AudioProvider({ children }: { children: ReactNode }) {
  // Proveedor de contexto de audio futuro. Por ahora solo pasa children
  // para evitar errores de prerender por useEffect/state no deseados.
  return <>{children}</>;
}

export const useAudioReady = () => true;
