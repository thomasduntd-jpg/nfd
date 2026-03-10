"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const PHRASES = [
  "загружаем джипеги",
  "играем со шрифтами",
  "двигаем пиксели",
  "подбираем референсы",
  "качаем плагины",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const shuffledPhrases = useRef<string[]>(PHRASES);

  const realProgress = useRef(0);
  const displayProgress = useRef(0);
  const animFrameId = useRef(0);

  useEffect(() => {
    shuffledPhrases.current = shuffleArray(PHRASES);
    setIsClient(true);
  }, []);

  const animateProgress = useCallback(() => {
    const target = realProgress.current;
    const current = displayProgress.current;

    if (current < target) {
      const diff = target - current;
      const step = Math.max(0.3, diff * 0.08);
      displayProgress.current = Math.min(current + step, target);
    }

    setProgress(Math.round(displayProgress.current));
    animFrameId.current = requestAnimationFrame(animateProgress);
  }, []);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [animateProgress]);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => {
        const next = prev + 1;
        if (next >= shuffledPhrases.current.length) {
          shuffledPhrases.current = shuffleArray(PHRASES);
          return 0;
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    let cancelled = false;

    async function waitForReady() {
      // ── Этап 1: Шрифты (0 → 40%) ──
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // ignore
      }
      if (cancelled) return;
      realProgress.current = 40;

      // ── Этап 2: Критичные изображения (40 → 90%) ──
      try {
        const criticalImages = document.querySelectorAll<HTMLImageElement>(
          ".photo-img, .case-img, .logo-image"
        );

        const total = criticalImages.length || 1;
        let loaded = 0;

        const imagePromises = Array.from(criticalImages).map((img) => {
          if (img.complete) {
            loaded++;
            realProgress.current = 40 + (loaded / total) * 50;
            return Promise.resolve();
          }
          return new Promise<void>((resolve) => {
            const done = () => {
              loaded++;
              if (!cancelled) {
                realProgress.current = 40 + (loaded / total) * 50;
              }
              resolve();
            };
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          });
        });

        await Promise.all(imagePromises);
      } catch {
        // ignore
      }
      if (cancelled) return;
      realProgress.current = 90;

      // ── Этап 3: Финальная пауза (90 → 100%) ──
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      realProgress.current = 100;

      await new Promise<void>((resolve) => {
        const check = () => {
          if (displayProgress.current >= 99.5) {
            resolve();
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });

      if (cancelled) return;

      setIsFadingOut(true);
      setTimeout(() => setIsVisible(false), 600);
    }

    waitForReady();

    const fallback = setTimeout(() => {
      if (!cancelled) {
        realProgress.current = 100;
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => setIsVisible(false), 600);
        }, 400);
      }
    }, 6000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  if (!isVisible) return null;

  const currentPhrase = isClient
    ? (shuffledPhrases.current[phraseIndex] || PHRASES[0])
    : PHRASES[0];

  return (
    <div className={`loading-screen ${isFadingOut ? "loading-screen--hidden" : ""}`}>
      <div className="loading-inner">
        <div className="loading-phrase-wrapper">
          <span key={isClient ? phraseIndex : "ssr"} className="loading-phrase">
            {currentPhrase}
          </span>
        </div>

        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}