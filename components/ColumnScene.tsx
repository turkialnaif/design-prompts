"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type PointerEvent } from "react";
import { ExtrudeGeometry, Shape, type Group } from "three";

// Geometry traced from the firm's real mark (public/brand/logo-mark.png):
// a wide top slab, a narrower slab beneath it, and three legs whose right
// edges sweep into a quill-like flourish while the left edge stays straight.
const DEPTH = 0.5;
const EXTRUDE_SETTINGS = {
  depth: DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.04,
  bevelSize: 0.03,
  bevelSegments: 8,
  curveSegments: 32,
};

function legShape(tlX: number, trX: number, topY: number, curveStartY: number, tipY: number) {
  const shape = new Shape();
  const tipX = tlX;
  const controlX = trX * 0.55 + tipX * 0.45;
  const controlY = curveStartY * 0.25 + tipY * 0.75;
  shape.moveTo(tlX, topY);
  shape.lineTo(trX, topY);
  shape.lineTo(trX, curveStartY);
  shape.quadraticCurveTo(controlX, controlY, tipX, tipY);
  shape.lineTo(tlX, topY);
  shape.closePath();
  return shape;
}

function Column({ pointer }: { pointer: { x: number; y: number } }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.06;
    group.current.position.y += (pointer.y * 0.15 - group.current.position.y) * 0.04;
  });

  const gold = { color: "#e0bb6e", metalness: 0.62, roughness: 0.26, emissive: "#3d2c0f", emissiveIntensity: 0.22 };

  // All three tiers share one consistent gap (~0.077 units, matching the real
  // mark's proportions) so the horizontal and vertical edges line up cleanly.
  const GAP = 0.077;
  const TOP_H = 0.457;
  const MID_H = 0.385;
  const TOP_BOTTOM = 0.897;
  const TOP_Y = TOP_BOTTOM + TOP_H / 2;
  const MID_TOP = TOP_BOTTOM - GAP;
  const MID_Y = MID_TOP - MID_H / 2;
  const LEGS_TOP = MID_Y - MID_H / 2 - GAP;

  const legGeometries = useMemo(() => {
    const legs = [
      // leg 1 — leftmost, tallest, deepest flourish
      { tlX: -0.824, trX: -0.316, curveStartY: LEGS_TOP - 1.147, tipY: LEGS_TOP - 1.717 },
      // leg 2 — middle
      { tlX: -0.213, trX: 0.247, curveStartY: LEGS_TOP - 0.865, tipY: LEGS_TOP - 1.134 },
      // leg 3 — rightmost, shortest
      { tlX: 0.36, trX: 0.78, curveStartY: LEGS_TOP - 0.711, tipY: LEGS_TOP - 0.795 },
    ];
    return legs.map(
      (l) => new ExtrudeGeometry(legShape(l.tlX, l.trX, LEGS_TOP, l.curveStartY, l.tipY), EXTRUDE_SETTINGS)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group ref={group} rotation={[0.18, 0.6, 0]} position={[0, -0.05, 0]}>
      {/* top slab */}
      <mesh position={[0, TOP_Y, 0]} castShadow>
        <boxGeometry args={[3.4, TOP_H, DEPTH]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      {/* second slab */}
      <mesh position={[0, MID_Y, 0]} castShadow>
        <boxGeometry args={[2.35, MID_H, DEPTH]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      {/* three legs, extruded from the real mark's outline, flush with the slabs */}
      {legGeometries.map((geometry, i) => (
        <mesh key={i} geometry={geometry} position={[0, 0, -DEPTH / 2]} castShadow>
          <meshStandardMaterial {...gold} />
        </mesh>
      ))}
    </group>
  );
}

export default function ColumnScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      className="absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 0.4, 9.4], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <pointLight position={[4, 5, 5]} intensity={95} color="#f3d9a4" />
        <pointLight position={[-5, -2, 3]} intensity={45} color="#d0a751" />
        <pointLight position={[0, 1, 6]} intensity={30} color="#fff3da" />
        <pointLight position={[-2, 4, -3]} intensity={20} color="#ffffff" />
        <Column pointer={pointer} />
      </Canvas>
    </div>
  );
}
