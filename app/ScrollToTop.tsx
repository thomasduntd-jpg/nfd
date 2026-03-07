"use client";

export default function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className="scroll-top-btn" onClick={handleClick} aria-label="Наверх">
      <img src="/icons/up.svg" alt="" className="scroll-top-icon" />
    </button>
  );
}