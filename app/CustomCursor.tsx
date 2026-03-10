"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Добавляем стейт для отслеживания наведения на кликабельные элементы
  const [isPointer, setIsPointer] = useState(false);

  // Позиции
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const renderX = useRef(0);
  const renderY = useRef(0);

  // Углы
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const velocity = useRef(0);

  // Буфер последних углов для усреднения (убирает дребезг)
  const angleBuffer = useRef<number[]>([]);
  const BUFFER_SIZE = 6;

  const frameId = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Инициализация позиции
    renderX.current = window.innerWidth / 2;
    renderY.current = window.innerHeight / 2;
    mouseX.current = renderX.current;
    mouseY.current = renderY.current;

    function normalizeAngleDiff(diff: number): number {
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      return diff;
    }

    // Усреднение угла из буфера (circular mean)
    function averageAngles(angles: number[]): number {
      if (angles.length === 0) return 0;
      let sinSum = 0;
      let cosSum = 0;
      for (const a of angles) {
        const rad = (a * Math.PI) / 180;
        sinSum += Math.sin(rad);
        cosSum += Math.cos(rad);
      }
      return Math.atan2(sinSum / angles.length, cosSum / angles.length) * (180 / Math.PI);
    }

    let prevMoveX = mouseX.current;
    let prevMoveY = mouseY.current;

    function handleMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      const dx = e.clientX - prevMoveX;
      const dy = e.clientY - prevMoveY;
      const dist = Math.hypot(dx, dy);

      // Порог — игнорируем микро-движения
      if (dist > 6) {
        // Сырой угол направления
        // +90 потому что SVG курсор смотрит ВВЕРХ
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        // Добавляем в буфер
        angleBuffer.current.push(rawAngle);
        if (angleBuffer.current.length > BUFFER_SIZE) {
          angleBuffer.current.shift();
        }

        // Усреднённый угол — очень плавный
        targetAngle.current = averageAngles(angleBuffer.current);

        prevMoveX = e.clientX;
        prevMoveY = e.clientY;
      }
    }

    // --- ФУНКЦИЯ ДЛЯ СМЕНЫ КУРСОРА ---
    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Ищем ближайший родительский элемент, который является кликабельным
      // Сюда включены теги <a>, <button>, а также ваши кастомные классы
      const clickableElement = target.closest(
        'a, button, input, textarea, select, [role="button"], .gallery3d-item, .case-image, .scroll-progress-track'
      );

      // Отдельно проверяем подложку лайтбокса (она закрывает модалку при клике, но картинка внутри нее — нет)
      const isLightboxOverlay = target.classList.contains('lightbox-overlay');

      if (clickableElement || isLightboxOverlay) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    }

    function animate() {
      if (!cursor) return;

      // ---- Плавное следование позиции ----
      const posSmooth = 0.12;
      renderX.current += (mouseX.current - renderX.current) * posSmooth;
      renderY.current += (mouseY.current - renderY.current) * posSmooth;

      // ---- Пружинный поворот с инерцией ----
      const diff = normalizeAngleDiff(targetAngle.current - angle.current);

      const stiffness = 0.04;   // жёсткость
      const damping = 0.65;     // затухание

      velocity.current += diff * stiffness;
      velocity.current *= damping;
      angle.current += velocity.current;

      // Применяем
      cursor.style.left = `${renderX.current}px`;
      cursor.style.top = `${renderY.current}px`;
      cursor.style.transform = `translate(-50%, -50%) rotate(${angle.current}deg)`;

      frameId.current = requestAnimationFrame(animate);
    }

    function handleMouseEnter() {
      if (cursor) cursor.style.opacity = "1";
    }

    function handleMouseLeave() {
      if (cursor) cursor.style.opacity = "0";
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver); // Слушаем наведение
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    frameId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver); // Удаляем слушатель
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <img
        // В зависимости от стейта подгружаем нужную SVG иконку из папки public
        src={isPointer ? "/icons/pointer.svg" : "/icons/cursor.svg"}
        alt="cursor"
        className="custom-cursor-img"
        draggable={false}
      />
    </div>
  );
}