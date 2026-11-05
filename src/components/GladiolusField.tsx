"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FLOWER_COUNT = 70;

const PALETTE = [
  new THREE.Color("#ff00aa"),
  new THREE.Color("#661aff"),
  new THREE.Color("#a855f7"),
  new THREE.Color("#ffffff"),
  new THREE.Color("#ffd166"),
];

function buildFlowerGeometry(): THREE.BufferGeometry {
  const stem = new THREE.CylinderGeometry(0.04, 0.05, 1.4, 6);
  stem.translate(0, 0.7, 0);
  const petals: THREE.BufferGeometry[] = [];
  const count = 7;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const pg = new THREE.CircleGeometry(0.18, 8);
    pg.rotateX(-Math.PI / 2);
    pg.rotateZ(a);
    pg.translate(0, 1.32, 0);
    petals.push(pg);
  }
  const center = new THREE.CircleGeometry(0.09, 8);
  center.rotateX(-Math.PI / 2);
  center.translate(0, 1.34, 0);
  return mergeGeometries([stem, ...petals, center]);
}

const FLOWER_GEO = buildFlowerGeometry();

function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  let offset = 0;

  for (const g of geos) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const uv = g.getAttribute("uv");
    const idx = g.getIndex();
    if (p) {
      const arr = p.array as unknown as number[];
      for (let i = 0; i < arr.length; i++) positions.push(arr[i]);
    }
    if (n) {
      const arr = n.array as unknown as number[];
      for (let i = 0; i < arr.length; i++) normals.push(arr[i]);
    }
    if (uv) {
      const arr = uv.array as unknown as number[];
      for (let i = 0; i < arr.length; i++) uvs.push(arr[i]);
    }
    const vertCount = Math.floor((p?.array?.length ?? 0) / 3);
    if (idx) {
      const arr = idx.array as unknown as number[];
      for (let i = 0; i < arr.length; i++) indices.push(arr[i] + offset);
    } else {
      for (let i = 0; i < vertCount; i++) indices.push(i + offset);
    }
    offset += vertCount;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  if (normals.length) geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  if (uvs.length) geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function GladiolusField() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    if (!containerRef.current) return;
    const container = containerRef.current;

    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const p1 = new THREE.PointLight(0x661aff, 1.0, 30);
    p1.position.set(6, 10, 8);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xff00aa, 0.5, 30);
    p2.position.set(-10, -5, 8);
    scene.add(p2);
    const dir = new THREE.DirectionalLight(0xffffff, 0.55);
    dir.position.set(4, 10, 4);
    dir.castShadow = true;
    dir.shadow.camera.left = -10;
    dir.shadow.camera.right = 10;
    dir.shadow.camera.top = 10;
    dir.shadow.camera.bottom = -10;
    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 30;
    dir.shadow.bias = -0.0005;
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    const inst = new THREE.InstancedMesh(FLOWER_GEO, new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05 }), FLOWER_COUNT);
    inst.castShadow = true;
    inst.receiveShadow = true;
    inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const x = ((i % 8) - 3.5) * 2.3 + Math.sin(i * 1.7) * 0.5;
      const z = (Math.floor(i / 8) - 2.5) * 2.4 + Math.cos(i * 2.1) * 0.5;
      const y = Math.sin(i * 0.9) * 0.15;
      const s = 0.7 + ((i * 13) % 5) * 0.25;
      dummy.position.set(x, y, z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(
        Math.sin(i * 0.6) * 0.08,
        i * 0.4,
        Math.cos(i * 0.7) * 0.08,
      );
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      inst.setColorAt(i, PALETTE[(i * 3) % PALETTE.length].clone());
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    group.add(inst);

    let running = true;
    const frame = (time: number) => {
      if (!running) return;
      const t = time / 1000;
      group.rotation.z = Math.sin(t * 0.4) * 0.012;
      group.rotation.x = Math.cos(t * 0.5) * 0.008;
      const d2 = new THREE.Object3D();
      for (let i = 0; i < FLOWER_COUNT; i++) {
        const x = ((i % 8) - 3.5) * 2.3 + Math.sin(i * 1.7) * 0.5;
        const z = (Math.floor(i / 8) - 2.5) * 2.4 + Math.cos(i * 2.1) * 0.5;
        const y = Math.sin(i * 0.9) * 0.15;
        const s = 0.7 + ((i * 13) % 5) * 0.25;
        d2.position.set(x, y, z);
        d2.scale.set(s, s, s);
        d2.rotation.set(
          Math.sin(i * 0.6) * 0.08,
          i * 0.4,
          Math.cos(i * 0.7) * 0.08,
        );
        d2.updateMatrix();
        inst.setMatrixAt(i, d2.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

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
        if (mountedRef.current && container.contains(canvas)) container.removeChild(canvas);
      };
    }

    return () => {
      running = false;
      renderer.dispose();
      if (mountedRef.current && container.contains(canvas)) container.removeChild(canvas);
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
