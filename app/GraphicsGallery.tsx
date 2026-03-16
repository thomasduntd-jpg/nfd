"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const images = [
  { src: "/images/graphics-01.png", alt: "Графика 01" },
  { src: "/images/graphics-02.png", alt: "Графика 02" },
  { src: "/images/graphics-03.png", alt: "Графика 03" },
  { src: "/images/graphics-04.png", alt: "Графика 04" },
  { src: "/images/graphics-05.png", alt: "Графика 05" },
  { src: "/images/graphics-06.png", alt: "Графика 06" },
  { src: "/images/graphics-07.png", alt: "Графика 07" },
  { src: "/images/graphics-08.png", alt: "Графика 08" },
  { src: "/images/graphics-09.png", alt: "Графика 09" },
  { src: "/images/graphics-10.png", alt: "Графика 10" },
  { src: "/images/graphics-11.png", alt: "Графика 11" },
  { src: "/images/graphics-12.png", alt: "Графика 12" },
  { src: "/images/graphics-13.png", alt: "Графика 13" },
  { src: "/images/graphics-14.png", alt: "Графика 14" },
  // Добавляйте сколько нужно — сетка адаптируется автоматически
];

export default function GraphicsGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);

  // Определяем количество колонок по ширине
  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth;
      if (width <= 480) setColumns(2);
      else if (width <= 768) setColumns(2);
      else if (width <= 1024) setColumns(3);
      else setColumns(3);
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  // Распределяем изображения по колонкам (masonry-подход)
  const columnArrays: number[][] = Array.from({ length: columns }, () => []);
  images.forEach((_, i) => {
    columnArrays[i % columns].push(i);
  });

  return (
    <>
      <div ref={gridRef} className="graphics-grid">
        {columnArrays.map((col, colIndex) => (
          <div key={colIndex} className="graphics-column">
            {col.map((imgIndex) => (
              <div
                key={imgIndex}
                className="graphics-item"
                onClick={() => openLightbox(imgIndex)}
              >
                <Image
                  src={images[imgIndex].src}
                  alt={images[imgIndex].alt}
                  width={800}
                  height={1200}
                  className="graphics-img"
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onChangeIndex={setActiveIndex}
      />
    </>
  );
}