"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function Lightbox({ images, activeIndex, onClose, onChangeIndex }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const isSingle = images.length <= 1;

  const goPrev = useCallback(() => {
    if (activeIndex !== null && !isSingle) {
      onChangeIndex((activeIndex - 1 + images.length) % images.length);
    }
  }, [activeIndex, images.length, onChangeIndex, isSingle]);

  const goNext = useCallback(() => {
    if (activeIndex !== null && !isSingle) {
      onChangeIndex((activeIndex + 1) % images.length);
    }
  }, [activeIndex, images.length, onChangeIndex, isSingle]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    if (activeIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (activeIndex === null) return null;

  return (
    <div
      className={`lightbox-overlay${isSingle ? " lightbox-single" : ""}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Закрыть">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 8L24 24M24 8L8 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        className="lightbox-nav lightbox-nav--prev"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Предыдущая"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M18 4L8 14L18 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className="lightbox-nav lightbox-nav--next"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Следующая"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M10 4L20 14L10 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="lightbox-counter">
        {activeIndex + 1} / {images.length}
      </div>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          width={1600}
          height={1600}
          className="lightbox-img"
          priority
        />
      </div>
    </div>
  );
}