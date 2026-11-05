import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { NavLinks } from "@/components/NavLinks";
import { Pulso } from "@/components/Pulso";
import { SeccionesPortal } from "@/components/SeccionesPortal";
import { OxigenoActivo } from "@/components/OxigenoActivo";
import { ConsultorioFOL } from "@/components/ConsultorioFOL";
import { Footer } from "@/components/Footer";
import { Canvas } from "@/components/Canvas";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <NavLinks />
      <Pulso />
      <SeccionesPortal />
      <OxigenoActivo />
      <ConsultorioFOL />
      <Footer />
      <Canvas />
    </>
  );
}
