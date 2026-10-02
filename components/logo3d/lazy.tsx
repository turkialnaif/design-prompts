"use client";

import dynamic from "next/dynamic";

// Three.js is only fetched where a mark is actually shown, and never during server rendering.
export const Logo3DHero = dynamic(() => import("./Logo3DHero"), { ssr: false });
export const Logo3DMini = dynamic(() => import("./Logo3DMini"), { ssr: false });
export const LogoShowcaseStage = dynamic(() => import("./ShowcaseStage"), { ssr: false });
