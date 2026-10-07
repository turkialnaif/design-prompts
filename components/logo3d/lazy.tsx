"use client";

import { useEffect, useState, type ComponentType } from "react";
import { detectWebGLAsync } from "./detect";

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/**
 * Three.js is heavy, so a mark never competes with first paint: the chunk is only requested once the
 * browser is idle (or after a short timeout), never on data-saver connections, and — when `minWidth`
 * is given — never on narrow screens that would not show it anyway. The home hero is the exception (`now`):
 * its mark is the first thing a visitor waits for, and the intro screen already covers the load, so it starts
 * straight away instead of waiting for an idle moment that, on a busy phone, can be seconds away.
 */
function afterIdle<P extends object>(load: () => Promise<{ default: ComponentType<P> }>, minWidth = 0, now = false) {
  // A plain import() in an effect (rather than next/dynamic) keeps the chunk out of the page's initial script list,
  // so it is downloaded only when this component actually decides to show the mark.
  return function AfterIdle(props: P) {
    const [Mod, setMod] = useState<ComponentType<P> | null>(null);
    useEffect(() => {
      const w = window as IdleWindow;
      const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (saver || w.innerWidth < minWidth) return;
      let dead = false;
      let cancel = () => {};
      const start = () => {
        load()
          .then((m) => {
            if (!dead) setMod(() => m.default);
          })
          .catch(() => {});
      };
      const go = () => {
        // ask first, download after: no mark means no three.js on the wire either
        detectWebGLAsync().then((ok) => {
          if (dead || !ok) return;
          if (now) return start();
          if (w.requestIdleCallback) {
            const id = w.requestIdleCallback(start, { timeout: 2500 });
            cancel = () => w.cancelIdleCallback?.(id);
          } else {
            const id = window.setTimeout(start, 600);
            cancel = () => window.clearTimeout(id);
          }
        });
      };
      go();
      return () => {
        dead = true;
        cancel();
      };
    }, []);
    return Mod ? <Mod {...props} /> : null;
  };
}

export const Logo3DHero = afterIdle(() => import("./Logo3DHero"), 0, true);
export const Logo3DMini = afterIdle(() => import("./Logo3DMini"), 768);
export const LogoShowcaseStage = afterIdle(() => import("./ShowcaseStage"));
export const Logo3DFollow = afterIdle(() => import("./Logo3DFollow"));
export const Logo3DReader = afterIdle(() => import("./Logo3DReader"), 768);
