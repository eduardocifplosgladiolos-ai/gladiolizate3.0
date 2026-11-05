"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 140;

function buildParticleGeometry(): THREE.BufferGeometry {
  const g = new THREE.CircleGeometry(0.06, 6);
  g.rotateX(-Math.PI / 2.4);
  return g;
}

const PARTICLE_GEO = buildParticleGeometry();

const COLORS = [
  new THREE.Color("#ff00aa"),
  new THREE.Color("#a855f7"),
  new THREE.Color("#ffd166"),
  new THREE.Color("#ffffff"),
];

export function PetalParticles() {
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

    const pMeta: Array<{
      center: THREE.Vector3;
      radius: number;
      heightAmp: number;
      speed: number;
      phase: number;
      color: THREE.Color;
    }> = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ci = (i * 7) % COLORS.length;
      pMeta.push({
        center: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 5 + 1.2,
          (Math.random() - 0.5) * 14 - 6,
        ),
        radius: 0.5 + Math.random() * 1.4,
        heightAmp: 0.2 + Math.random() * 0.4,
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[ci].clone(),
      });
    }
    const pInst = new THREE.InstancedMesh(PARTICLE_GEO, new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.0, transparent: true, opacity: 0.85 }), PARTICLE_COUNT);
    pInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const pDummy = new THREE.Object3D();
    for (let i = 0; i < pMeta.length; i++) {
      const item = pMeta[i];
      const a = item.phase;
      pDummy.position.set(
        item.center.x + Math.cos(a) * item.radius,
        item.center.y + Math.sin(a) * item.heightAmp,
        item.center.z + Math.sin(a * 0.9 + item.phase) * item.radius * 0.7,
      );
      pDummy.rotation.set(a * 0.5, a * 0.5, a * 0.3);
      pDummy.rotation.x = -Math.PI / 2.4;
      pDummy.scale.setScalar(0.7);
      pDummy.updateMatrix();
      pInst.setMatrixAt(i, pDummy.matrix);
      pInst.setColorAt(i, item.color);
    }
    pInst.instanceMatrix.needsUpdate = true;
    if (pInst.instanceColor) pInst.instanceColor.needsUpdate = true;
    scene.add(pInst);

    let running = true;
    const frame = (time: number) => {
      if (!running) return;
      const t = time / 1000;
      const pd = new THREE.Object3D();
      for (let i = 0; i < pMeta.length; i++) {
        const item = pMeta[i];
        const a = t * item.speed + item.phase;
        pd.position.set(
          item.center.x + Math.cos(a) * item.radius,
          item.center.y + Math.sin(t * item.speed * 1.2 + item.phase) * item.heightAmp,
          item.center.z + Math.sin(a * 0.9 + item.phase) * item.radius * 0.7,
        );
        pd.rotation.set(a * 0.5, t * 0.5 + item.phase, a * 0.3);
        pd.rotation.x = -Math.PI / 2.4 + Math.sin(t * 0.7 + i) * 0.2;
        pd.scale.setScalar(0.7 + Math.sin(t * 1.5 + i) * 0.3);
        pd.updateMatrix();
        pInst.setMatrixAt(i, pd.matrix);
      }
      pInst.instanceMatrix.needsUpdate = true;
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
