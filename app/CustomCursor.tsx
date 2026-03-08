"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Ховер на кликабельные элементы и изображения
    const onEnterPointer = () => setIsPointer(true);
    const onLeavePointer = () => setIsPointer(false);

    const SELECTOR = "a, button, input, textarea, select, img, video, [role='button'], .clickable";

    const addListeners = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.addEventListener("mouseenter", onEnterPointer);
        el.addEventListener("mouseleave", onLeavePointer);
      });
    };

    const removeListeners = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterPointer);
        el.removeEventListener("mouseleave", onLeavePointer);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    addListeners();

    // Следить за изменениями DOM
    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      removeListeners();
      observer.disconnect();
    };
  }, [visible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <img
        src="/icons/Cursor.svg"
        alt=""
        className="custom-cursor-img"
        style={{ display: isPointer ? "none" : "block" }}
      />
      <img
        src="/icons/Pointer.svg"
        alt=""
        className="custom-cursor-img"
        style={{ display: isPointer ? "block" : "none" }}
      />
    </div>
  );
}