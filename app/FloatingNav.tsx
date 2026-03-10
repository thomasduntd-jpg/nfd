"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function FloatingNav() {
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const floatPhase = useRef(0);

  // Отслеживаем момент, когда nav-menu уходит за экран
  useEffect(() => {
    const checkScroll = () => {
      const placeholder = document.querySelector(".nav-menu-placeholder");
      if (!placeholder) return;

      const rect = placeholder.getBoundingClientRect();
      // Когда нижняя граница nav-menu уходит за верх экрана
      const shouldFloat = rect.bottom < 0;

      if (shouldFloat && !isFloating) {
        setIsFloating(true);
        // Небольшая задержка для плавного появления
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        });
      } else if (!shouldFloat && isFloating) {
        setIsVisible(false);
        // Ждём окончания анимации ухода
        setTimeout(() => {
          setIsFloating(false);
        }, 400);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isFloating]);

  // Анимация «плавания» без гравитации
  const animateFloat = useCallback(() => {
    const el = floatRef.current;
    if (!el) return;

    floatPhase.current += 0.008;

    const x = Math.sin(floatPhase.current * 1.3) * 3 + Math.sin(floatPhase.current * 0.7) * 2;
    const y = Math.cos(floatPhase.current * 1.1) * 4 + Math.sin(floatPhase.current * 0.5) * 3;
    const rotate = Math.sin(floatPhase.current * 0.9) * 1.5;

    el.style.setProperty("--float-x", `${x}px`);
    el.style.setProperty("--float-y", `${y}px`);
    el.style.setProperty("--float-rotate", `${rotate}deg`);

    animFrameRef.current = requestAnimationFrame(animateFloat);
  }, []);

  useEffect(() => {
    if (isFloating) {
      animFrameRef.current = requestAnimationFrame(animateFloat);
    }
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isFloating, animateFloat]);

  if (!isFloating) return null;

  return (
    <div
      ref={floatRef}
      className={`floating-nav ${isVisible ? "floating-nav--visible" : ""}`}
    >
      <nav className="floating-nav-menu">
        <a href="#logoteka" className="floating-nav-item">
          <span>логотека</span>
          <img src="/icons/arrow.svg" alt="" className="floating-nav-arrow" />
        </a>
        <a href="#identity" className="floating-nav-item">
          <span>айдентика</span>
          <img src="/icons/arrow.svg" alt="" className="floating-nav-arrow" />
        </a>
        <a href="#graphics" className="floating-nav-item">
          <span>графика</span>
          <img src="/icons/arrow.svg" alt="" className="floating-nav-arrow" />
        </a>
        <a href="#threed" className="floating-nav-item">
          <span>3D</span>
          <img src="/icons/arrow.svg" alt="" className="floating-nav-arrow" />
        </a>
        <a href="#animation" className="floating-nav-item">
          <span>анимация</span>
          <img src="/icons/arrow.svg" alt="" className="floating-nav-arrow" />
        </a>
      </nav>
    </div>
  );
}