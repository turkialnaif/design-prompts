"use client";

import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { useMemo, useRef, type MutableRefObject } from "react";
import { Color, ExtrudeGeometry, MathUtils, Shape, type Group, type MeshPhysicalMaterial } from "three";

/**
 * The firm's mark (public/brand/logo-mark.png) rebuilt as real 3D gold: a wide top slab, a narrower
 * slab beneath it and three legs whose right edges sweep into a quill-like flourish. The same rig
 * drives the hero, the scroll-pinned showcase and the small mark on inner pages: callers only write
 * targets into a RigState and the rig eases towards them every frame.
 */
export type RigState = {
  /** Clock time (s) at which the pieces start flying in; Infinity = hold until set. */
  introAt: number;
  /** 0 = assembled, 1 = pieces drawn apart. */
  explode: number;
  /** Per group (top slab, second slab, legs): 1 = lit, lower = dimmed when `dim` > 0. */
  hl: [number, number, number];
  dim: number;
  yaw: number;
  pitch: number;
  spin: number;
  scale: number;
  x: number;
  y: number;
};

/** True when this browser can create a WebGL context. Client-only: call it from a lazy state initialiser. */
export function detectWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Schedules the fly-in `delay` seconds after clock time `now`. */
export function startIntro(rig: MutableRefObject<RigState>, now: number, delay: number) {
  rig.current.introAt = now + delay;
}

export const newRig = (): RigState => ({ introAt: Infinity, explode: 0, hl: [1, 1, 1], dim: 0, yaw: 0.5, pitch: 0.12, spin: 0.16, scale: 1, x: 0, y: 0 });

const D = 0.5;
const GAP = 0.077;
const TOP_H = 0.457;
const MID_H = 0.385;
const TOP_BOTTOM = 0.897;
const TOP_Y = TOP_BOTTOM + TOP_H / 2;
const MID_Y = TOP_BOTTOM - GAP - MID_H / 2;
const LEGS_TOP = MID_Y - MID_H / 2 - GAP;

const EXTRUDE = { depth: D, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 8, curveSegments: 32 };

function legShape(tlX: number, trX: number, topY: number, curveStartY: number, tipY: number) {
  const shape = new Shape();
  const controlX = trX * 0.55 + tlX * 0.45;
  const controlY = curveStartY * 0.25 + tipY * 0.75;
  shape.moveTo(tlX, topY);
  shape.lineTo(trX, topY);
  shape.lineTo(trX, curveStartY);
  shape.quadraticCurveTo(controlX, controlY, tlX, tipY);
  shape.lineTo(tlX, topY);
  shape.closePath();
  return shape;
}

type Part = {
  id: string;
  group: 0 | 1 | 2;
  rest: [number, number, number];
  explode: [number, number, number];
  from: [number, number, number];
  spinIn: number;
  delay: number;
  box?: [number, number, number];
  leg?: [number, number, number, number];
};

const PARTS: Part[] = [
  { id: "top", group: 0, rest: [0, TOP_Y, 0], explode: [0, 0.85, 0.3], from: [-5, 5, -4], spinIn: 2.4, delay: 0, box: [3.4, TOP_H, D] },
  { id: "mid", group: 1, rest: [0, MID_Y, 0], explode: [0, 0.3, 0.5], from: [5, 3.2, -5], spinIn: -2.1, delay: 0.1, box: [2.35, MID_H, D] },
  { id: "leg1", group: 2, rest: [0, 0, -D / 2], explode: [-0.6, -0.42, 0.4], from: [-6, -4, -3], spinIn: 1.9, delay: 0.2, leg: [-0.824, -0.316, LEGS_TOP - 1.147, LEGS_TOP - 1.717] },
  { id: "leg2", group: 2, rest: [0, 0, -D / 2], explode: [0, -0.5, 0.5], from: [0, -7, -4], spinIn: -1.6, delay: 0.28, leg: [-0.213, 0.247, LEGS_TOP - 0.865, LEGS_TOP - 1.134] },
  { id: "leg3", group: 2, rest: [0, 0, -D / 2], explode: [0.6, -0.42, 0.4], from: [6, -4, -3], spinIn: 2.2, delay: 0.36, leg: [0.36, 0.78, LEGS_TOP - 0.711, LEGS_TOP - 0.795] },
];

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const BASE = new Color("#e2b04a");

export function Mark({ rig }: { rig: MutableRefObject<RigState> }) {
  const root = useRef<Group>(null);
  const groups = useRef<(Group | null)[]>([]);
  const mats = useRef<(MeshPhysicalMaterial | null)[]>([]);
  const state = useRef({ explode: 0, hl: [1, 1, 1], spin: 0, scale: 1, x: 0, y: 0, pitch: 0.12 });
  const geoms = useMemo(() => PARTS.map((p) => (p.leg ? new ExtrudeGeometry(legShape(p.leg[0], p.leg[1], LEGS_TOP, p.leg[2], p.leg[3]), EXTRUDE) : null)), []);

  useFrame((st, dt) => {
    const r = rig.current;
    const c = state.current;
    const t = st.clock.elapsedTime;
    const ia = r.introAt === Infinity ? 0 : Math.min(1, Math.max(0, (t - r.introAt) / 2.6));

    c.explode = MathUtils.damp(c.explode, r.explode, 3.2, dt);
    c.scale = MathUtils.damp(c.scale, r.scale, 4, dt);
    c.x = MathUtils.damp(c.x, r.x, 3.5, dt);
    c.y = MathUtils.damp(c.y, r.y, 3.5, dt);
    c.pitch = MathUtils.damp(c.pitch, r.pitch, 5, dt);
    c.spin += dt * r.spin * ia;

    if (root.current) {
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, r.yaw + c.spin, 5, dt);
      root.current.rotation.x = c.pitch;
      root.current.position.set(c.x, c.y, 0);
      root.current.scale.setScalar(c.scale);
    }

    PARTS.forEach((p, i) => {
      const g = groups.current[i];
      if (!g) return;
      const e = easeOut(Math.min(1, Math.max(0, (ia - p.delay) / (1 - 0.36))));
      const k = 1 - e;
      g.position.set(
        p.rest[0] + p.explode[0] * c.explode + p.from[0] * k,
        p.rest[1] + p.explode[1] * c.explode + p.from[1] * k,
        p.rest[2] + p.explode[2] * c.explode + p.from[2] * k,
      );
      g.rotation.set(p.spinIn * k, p.spinIn * 0.6 * k, p.spinIn * 0.4 * k);
      g.scale.setScalar(0.25 + 0.75 * e);

      const m = mats.current[i];
      if (m) {
        c.hl[p.group] = MathUtils.damp(c.hl[p.group], r.hl[p.group], 5, dt);
        const lit = 1 - r.dim * (1 - c.hl[p.group]);
        m.color.copy(BASE).multiplyScalar(0.55 + 0.45 * lit);
        m.emissiveIntensity = 0.1 + (r.dim > 0 ? 0.85 * c.hl[p.group] * r.dim : 0);
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffe6b0" />
      <directionalLight position={[-4, -1, 3]} intensity={0.5} color="#a58cff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={7} position={[0, 6, -4]} scale={[9, 1.2, 1]} color="#fff3d6" />
        <Lightformer form="rect" intensity={5} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[1.6, 9, 1]} color="#ffc65c" />
        <Lightformer form="rect" intensity={4} position={[6, 0, 1]} rotation-y={-Math.PI / 2} scale={[1.4, 9, 1]} color="#ffb347" />
        <Lightformer form="rect" intensity={1.4} position={[5, -3, 4]} rotation-y={-Math.PI / 2} scale={[3, 3, 1]} color="#8f7cf0" />
        <Lightformer form="rect" intensity={3} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[8, 2, 1]} color="#ffd98a" />
      </Environment>
      <group ref={root}>
        {PARTS.map((p, i) => (
          <group key={p.id} ref={(el) => { groups.current[i] = el; }}>
            <mesh geometry={geoms[i] ?? undefined}>
              {p.box && <boxGeometry args={p.box} />}
              <meshPhysicalMaterial
                ref={(el) => { mats.current[i] = el; }}
                color="#e2b04a"
                metalness={1}
                roughness={0.26}
                clearcoat={0.4}
                clearcoatRoughness={0.2}
                envMapIntensity={1.15}
                emissive="#6b430a"
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>
      <Sparkles count={70} scale={[8, 5.5, 3.5]} size={3.2} speed={0.3} opacity={0.75} color="#f6e2b3" />
    </>
  );
}
