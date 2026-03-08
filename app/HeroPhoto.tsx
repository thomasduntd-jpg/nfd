"use client";

import { useRef, useCallback, useState } from "react";

export default function HeroPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 60%)",
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Нормализуем от -1 до 1
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    // Углы наклона (максимум ±12 градусов)
    const maxTilt = 12;
    const rotateY = normalizedX * maxTilt;
    const rotateX = -normalizedY * maxTilt;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    );

    // Позиция блика — следует за курсором
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setGlareStyle({
      opacity: 0.5,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 35%, transparent 65%)`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  }, []);

  return (
    <div className="hero-photo">
      <div
        ref={containerRef}
        className="photo-tilt-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
      >
        <img
          src="/images/nf.jpg"
          alt="Федосов Николай"
          className="photo-img"
        />
        <div className="photo-glare" style={glareStyle} />
      </div>
    </div>
  );
}