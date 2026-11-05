"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ICON_COUNT = 6;

function buildIconGeometry(): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  const pts: number[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    pts.push(Math.cos(a) * 0.1, Math.sin(a) * 0.1, 0);
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  g.computeVertexNormals();
  return g;
}

const ICON_GEO = buildIconGeometry();

const PALETTE = [
  new THREE.Color("#00f0ff"),
  new THREE.Color("#ff00aa"),
  new THREE.Color("#a855f7"),
  new THREE.Color("#ffd166"),
];

interface IconMeta {
  center: THREE.Vector3;
  radius: number;
  offsetY: number;
  speed: number;
  phase: number;
  color: THREE.Color;
  rotSpeed: number;
  scaleAmp: number;
}

export function FloatingIcons3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const icons: IconMeta[] = [];
    for (let i = 0; i < ICON_COUNT; i++) {
      icons.push({
        center: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 4 + 1.2,
          (Math.random() - 0.5) * 12 - 6,
        ),
        radius: 0.6 + Math.random() * 1.2,
        offsetY: 0.2 + Math.random() * 0.6,
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        color: PALETTE[i % PALETTE.length].clone(),
        rotSpeed: 0.3 + Math.random() * 0.4,
        scaleAmp: 0.1 + Math.random() * 0.15,
      });
    }

    const inst = new THREE.InstancedMesh(ICON_GEO, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.4, side: THREE.DoubleSide }), ICON_COUNT);
    inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < icons.length; i++) {
      const m = icons[i];
      dummy.position.set(
        m.center.x + Math.cos(m.phase) * m.radius,
        m.center.y + Math.sin(m.phase) * m.offsetY,
        m.center.z + Math.sin(m.phase * 0.9) * m.radius * 0.7,
      );
      dummy.rotation.set(-Math.PI / 2.2, 0, m.phase * 0.5);
      dummy.scale.setScalar(0.8);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      inst.setColorAt(i, m.color);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    scene.add(inst);

    let running = true;
    const frame = (time: number) => {
      if (!running) return;
      const t = time / 1000;
      const pd = new THREE.Object3D();
      for (let i = 0; i < icons.length; i++) {
        const m = icons[i];
        const a = t * m.speed + m.phase;
        pd.position.set(
          m.center.x + Math.cos(a) * m.radius,
          m.center.y + Math.sin(t * m.speed * 1.2 + m.phase) * m.offsetY,
          m.center.z + Math.sin(a * 0.9 + m.phase) * m.radius * 0.7,
        );
        pd.rotation.set(-Math.PI / 2.2 + Math.sin(t * 0.7 + i) * 0.2, 0, a * 0.5 + t * m.rotSpeed);
        pd.scale.setScalar(0.8 + Math.sin(t * 1.5 + i) * m.scaleAmp);
        pd.updateMatrix();
        inst.setMatrixAt(i, pd.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    setReady(true);

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        const rect = canvas.getBoundingClientRect();
        const w = rect.width || 1;
        const h = rect.height || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(container);
      return () => {
        running = false;
        resizeObserver.disconnect();
        renderer.dispose();
        if (container.contains(canvas)) container.removeChild(canvas);
      };
    }

    return () => {
      running = false;
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.5,
        transform: "scale(1.04)",
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    />
  );
}
