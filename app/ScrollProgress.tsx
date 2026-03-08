"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Обновление прогресса при скролле
  useEffect(() => {
    const onScroll = () => {
      if (isDragging) return; // не обновлять во время перетаскивания
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isDragging]);

  // Скролл к позиции по Y-координате на треке
  const scrollToPosition = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickY = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const percent = clickY / rect.height;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({ top: percent * docHeight });
    setProgress(percent * 100);
  }, []);

  // Клик по треку
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollToPosition(e.clientY);
  };

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    scrollToPosition(e.clientY);
  };

  // Перетаскивание и отпускание
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      scrollToPosition(e.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, scrollToPosition]);

  const isActive = isHovered || isDragging;

  return (
    <div
      ref={trackRef}
      className={`scroll-progress-track ${isActive ? "scroll-active" : ""}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="scroll-progress-fill"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}