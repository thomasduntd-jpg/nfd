"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/images/image-3d01.jpg", alt: "3D работа 01" },
  { src: "/images/image-3d02.jpg", alt: "3D работа 02" },
  { src: "/images/image-3d03.jpg", alt: "3D работа 03" },
  { src: "/images/image-3d04.jpg", alt: "3D работа 04" },
  { src: "/images/image-3d05.jpg", alt: "3D работа 05" },
  { src: "/images/image-3d06.jpg", alt: "3D работа 06" },
  { src: "/images/image-3d07.jpg", alt: "3D работа 07" },
  { src: "/images/image-3d08.jpg", alt: "3D работа 08" },
  { src: "/images/image-3d09.jpg", alt: "3D работа 09" },
  { src: "/images/image-3d10.jpg", alt: "3D работа 10" },
];

export default function Gallery3D() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (activeIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox]);

  return (
    <>
      <div className="gallery3d-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={`gallery3d-item gallery3d-item--${i + 1}`}
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={800}
              className="gallery3d-img"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 8L24 24M24 8L8 24"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
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
      )}
    </>
  );
}