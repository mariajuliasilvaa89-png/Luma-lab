"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/capa-03.png",
    alt: "Banner Luma Lab para encomendas personalizadas em impressao 3D."
  },
  {
    src: "/images/capa-05.png",
    alt: "Banner Luma Lab sobre projetos em impressao 3D feitos com cuidado."
  }
];

const AUTOPLAY_DELAY = 5000;
const DRAG_THRESHOLD_RATIO = 0.15;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isInteracting) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isInteracting]);

  const resetDrag = () => {
    pointerStart.current = null;
    setIsDragging(false);
    setDragOffset(0);
    setIsInteracting(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    setIsDragging(true);
    setIsInteracting(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStart.current === null) return;

    setDragOffset(event.clientX - pointerStart.current);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    const containerWidth = containerRef.current?.offsetWidth ?? 0;
    const threshold = containerWidth * DRAG_THRESHOLD_RATIO;

    event.currentTarget.releasePointerCapture(event.pointerId);
    resetDrag();

    if (Math.abs(distance) < threshold) return;
    if (distance < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  return (
    <section className="pt-5 sm:pt-6" aria-label="Destaques da Luma Lab">
      <div
        ref={containerRef}
        className="group relative mx-auto w-[calc(100vw-24px)] max-w-[1250px] overflow-hidden rounded-[16px] bg-white shadow-[0_20px_58px_rgba(21,21,21,0.075)] ring-1 ring-black/[0.04] md:w-[calc(100vw-32px)] lg:w-[calc(100vw-48px)] lg:rounded-[22px] xl:w-[calc(100vw-64px)]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetDrag}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={resetDrag}
      >
        <div
          className={`flex aspect-[1717/916] ${
            isDragging ? "transition-none" : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }`}
          style={{ transform: `translateX(calc(-${activeIndex * 100}% + ${isDragging ? dragOffset : 0}px))` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.src} className="relative min-w-full select-none">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 48px), 1250px"
                className="object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="focus-luma absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-graphite opacity-0 shadow-[0_10px_24px_rgba(21,21,21,0.11)] ring-1 ring-black/[0.04] transition hover:scale-105 group-hover:opacity-100 lg:grid"
          aria-label="Ver banner anterior"
          onClick={goToPrevious}
        >
          <ChevronLeft size={19} />
        </button>
        <button
          type="button"
          className="focus-luma absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-graphite opacity-0 shadow-[0_10px_24px_rgba(21,21,21,0.11)] ring-1 ring-black/[0.04] transition hover:scale-105 group-hover:opacity-100 lg:grid"
          aria-label="Ver proximo banner"
          onClick={goToNext}
        >
          <ChevronRight size={19} />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/70 px-2.5 py-2 shadow-[0_8px_24px_rgba(21,21,21,0.08)] backdrop-blur sm:bottom-5">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-7 bg-luma-pink" : "w-2 bg-line"
              }`}
              aria-label={`Ver banner ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
