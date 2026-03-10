"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function FloatingControls() {
  const [isFloating, setIsFloating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navAnimFrame = useRef<number>(0);
  const btnAnimFrame = useRef<number>(0);
  const navPhase = useRef(0);
  const btnPhase = useRef(Math.PI); // Смещение фазы для разного ритма

  // Отслеживаем момент, когда nav-menu уходит за экран
  useEffect(() => {
    const checkScroll = () => {
      const placeholder = document.querySelector(".nav-menu");
      if (!placeholder) return;

      const rect = placeholder.getBoundingClientRect();
      const shouldFloat = rect.bottom < 0;

      if (shouldFloat && !isFloating) {
        setIsFloating(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        });
      } else if (!shouldFloat && isFloating) {
        setIsVisible(false);
        setTimeout(() => {
          setIsFloating(false);
        }, 400);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isFloating]);

  // Анимация «невесомости» для навигации
  const animateNav = useCallback(() => {
    const el = navRef.current;
    if (!el) return;

    navPhase.current += 0.008;

    const x = Math.sin(navPhase.current * 1.3) * 3 + Math.sin(navPhase.current * 0.7) * 2;
    const y = Math.cos(navPhase.current * 1.1) * 4 + Math.sin(navPhase.current * 0.5) * 3;
    const rotate = Math.sin(navPhase.current * 0.9) * 1.5;

    el.style.setProperty("--float-x", `${x}px`);
    el.style.setProperty("--float-y", `${y}px`);
    el.style.setProperty("--float-rotate", `${rotate}deg`);

    navAnimFrame.current = requestAnimationFrame(animateNav);
  }, []);

  // Анимация «невесомости» для кнопки наверх (с другим ритмом)
  const animateBtn = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;

    btnPhase.current += 0.009;

    const x = Math.cos(btnPhase.current * 1.1) * 2.5 + Math.sin(btnPhase.current * 0.6) * 1.5;
    const y = Math.sin(btnPhase.current * 1.3) * 3.5 + Math.cos(btnPhase.current * 0.4) * 2.5;
    const rotate = Math.cos(btnPhase.current * 0.8) * 2;

    el.style.setProperty("--float-x", `${x}px`);
    el.style.setProperty("--float-y", `${y}px`);
    el.style.setProperty("--float-rotate", `${rotate}deg`);

    btnAnimFrame.current = requestAnimationFrame(animateBtn);
  }, []);

  useEffect(() => {
    if (isFloating) {
      navAnimFrame.current = requestAnimationFrame(animateNav);
      btnAnimFrame.current = requestAnimationFrame(animateBtn);
    }
    return () => {
      cancelAnimationFrame(navAnimFrame.current);
      cancelAnimationFrame(btnAnimFrame.current);
    };
  }, [isFloating, animateNav, animateBtn]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isFloating) return null;

  return (
    <>
      {/* Навигация — слева (десктоп) / внизу слева (мобилка — через общий контейнер) */}
      <div
        ref={navRef}
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

      {/* Кнопка наверх — справа (десктоп) / внизу справа (мобилка — через общий контейнер) */}
      <button
        ref={btnRef}
        className={`floating-scroll-top ${isVisible ? "floating-scroll-top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Наверх"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 19V5M12 5L5 12M12 5L19 12"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Мобильный контейнер — объединяет оба элемента внизу */}
      <div className={`floating-mobile-bar ${isVisible ? "floating-mobile-bar--visible" : ""}`}>
        <nav className="floating-mobile-nav">
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
        <button
          className="floating-mobile-scroll-top"
          onClick={scrollToTop}
          aria-label="Наверх"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}