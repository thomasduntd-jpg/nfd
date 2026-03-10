"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const PHRASES = [
  "люблю метафоры",
  "системы — это круто",
  "ахахахахаах",
  "да да, тренды",
  "иногда я мечтаю о сыре",
  "сетка — мой друг",
  "главное чтобы было читаемо",
  "скорее всего я зумер...",
  "почему прозрачный фон в клеточку",
  "какой размер у конверта?",
  "жизнь игра — играй красиво",
];

const BUBBLE_INTERVAL = 4000;
const BUBBLE_LIFETIME = 4000;

interface Bubble {
  id: number;
  text: string;
  side: "left" | "right";
  offsetY: number;
}

let bubbleIdCounter = 0;

/** Перемешивание массива (Fisher–Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroPhoto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const removeTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const lastSideRef = useRef<"left" | "right">("right");

  // Перемешанная очередь фраз — когда заканчивается, перемешиваем заново
  const shuffledRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  /** Берём следующую фразу из перемешанного списка */
  const getNextPhrase = useCallback((): string => {
    // Если очередь пуста или дошли до конца — перемешиваем заново
    if (
      shuffledRef.current.length === 0 ||
      indexRef.current >= shuffledRef.current.length
    ) {
      shuffledRef.current = shuffle(PHRASES);
      indexRef.current = 0;
    }
    const phrase = shuffledRef.current[indexRef.current];
    indexRef.current += 1;
    return phrase;
  }, []);

  /* ===== 3D tilt ===== */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    const glare = glareRef.current;
    if (!el || !glare) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hw = rect.width / 2;
    const hh = rect.height / 2;

    const rotateY = ((x - hw) / hw) * 8;
    const rotateX = ((hh - y) / hh) * 8;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
    glare.style.opacity = "1";
  }, []);

  const resetTilt = useCallback(() => {
    const el = wrapperRef.current;
    const glare = glareRef.current;
    if (el) el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    if (glare) glare.style.opacity = "0";
  }, []);

  /* ===== Полная очистка ===== */
  const clearAll = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    removeTimersRef.current.forEach((t) => clearTimeout(t));
    removeTimersRef.current.clear();
    setBubbles([]);
  }, []);

  /* ===== Spawn бабла ===== */
  const spawnBubble = useCallback(() => {
    const text = getNextPhrase();

    const side: "left" | "right" =
      Math.random() < 0.3
        ? lastSideRef.current
        : lastSideRef.current === "left"
        ? "right"
        : "left";
    lastSideRef.current = side;

    const offsetY = Math.round(Math.random() * 60 - 30);
    const id = ++bubbleIdCounter;

    setBubbles([{ id, text, side, offsetY }]);

    removeTimersRef.current.forEach((t) => clearTimeout(t));
    removeTimersRef.current.clear();

    const removeTimer = setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      removeTimersRef.current.delete(removeTimer);
    }, BUBBLE_LIFETIME);

    removeTimersRef.current.add(removeTimer);
  }, [getNextPhrase]);

  /* ===== Mouse enter ===== */
  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    clearAll();

    timerRef.current = setTimeout(() => {
      if (!isHovering.current) return;
      spawnBubble();

      intervalRef.current = setInterval(() => {
        if (!isHovering.current) return;
        spawnBubble();
      }, BUBBLE_INTERVAL);
    }, 800);
  }, [clearAll, spawnBubble]);

  /* ===== Mouse leave ===== */
  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    clearAll();
    resetTilt();
  }, [clearAll, resetTilt]);

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, [clearAll]);

  return (
    <div className="hero-photo-container">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`speech-bubble speech-bubble--${b.side}`}
          style={{ "--bubble-offset-y": `${b.offsetY}px` } as React.CSSProperties}
        >
          <div className="speech-bubble-cloud speech-bubble-cloud--1" />
          <div className="speech-bubble-cloud speech-bubble-cloud--2" />
          <div className="speech-bubble-body">
            <span>{b.text}</span>
          </div>
        </div>
      ))}

      <div
        className="photo-tilt-wrapper"
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="/images/nf.jpg"
          alt="Николай Федосов"
          className="photo-img"
          draggable={false}
        />
        <div className="photo-glare" ref={glareRef} />
      </div>
    </div>
  );
}