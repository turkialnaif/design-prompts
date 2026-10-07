import type { MutableRefObject } from "react";

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
  /** 0 = the mark sits dark and the stars are out, 1 = lit with its stars; eased every frame. */
  awake: number;
  /** Seconds the fly-in takes. */
  introDur: number;
  /** Where the star field is centred (world units). */
  sx: number;
  sy: number;
};

/** Schedules the fly-in `delay` seconds after clock time `now`. */
export function startIntro(rig: MutableRefObject<RigState>, now: number, delay: number) {
  rig.current.introAt = now + delay;
}

export const newRig = (): RigState => ({ introAt: Infinity, explode: 0, hl: [1, 1, 1], dim: 0, yaw: 0.5, pitch: 0.12, spin: 0.16, scale: 1, x: 0, y: 0, awake: 1, introDur: 2.6, sx: 0, sy: 0 });
