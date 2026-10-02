"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/**
 * Three.js is heavy, so a mark never competes with first paint: the chunk is only requested once the
 * browser is idle (or after a short timeout), never on data-saver connections, and — when `minWidth`
 * is given — never on narrow screens that would not show it anyway.
 */
function afterIdle<P extends object>(load: () => Promise<{ default: ComponentType<P> }>, minWidth = 0) {
  const Lazy = dynamic(load, { ssr: false });
  return function AfterIdle(props: P) {
    const [go, setGo] = useState(false);
    useEffect(() => {
      const w = window as IdleWindow;
      const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (saver || w.innerWidth < minWidth) return;
      const start = () => setGo(true);
      if (w.requestIdleCallback) {
        const id = w.requestIdleCallback(start, { timeout: 2500 });
        return () => w.cancelIdleCallback?.(id);
      }
      const id = window.setTimeout(start, 1200);
      return () => window.clearTimeout(id);
    }, []);
    return go ? <Lazy {...props} /> : null;
  };
}

export const Logo3DHero = afterIdle(() => import("./Logo3DHero"));
export const Logo3DMini = afterIdle(() => import("./Logo3DMini"), 768);
export const LogoShowcaseStage = afterIdle(() => import("./ShowcaseStage"));
