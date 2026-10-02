"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

/** A headline that turns into a mouse-reactive gold-foil shimmer on hover/touch. */
export default function InteractiveHeadline({
  children,
  className = "",
  style,
  as: Tag = "h1",
}: {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [active, setActive] = useState(false);

  function handleMove(e: PointerEvent<HTMLHeadingElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={className}
      style={{
        ...style,
        backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #f6e2b3 0%, #9b88d7 38%, #012696 75%)`,
        backgroundSize: "180% 180%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: active ? "transparent" : undefined,
        WebkitTextFillColor: active ? "transparent" : undefined,
        transition: "color 350ms ease, -webkit-text-fill-color 350ms ease",
        cursor: "default",
      }}
    >
      {children}
    </Tag>
  );
}
