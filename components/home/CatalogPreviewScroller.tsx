"use client";

import { type ReactNode, useEffect, useRef } from "react";

type CatalogPreviewScrollerProps = {
  children: ReactNode;
};

const GESTURE_THRESHOLD = 6;

export function CatalogPreviewScroller({ children }: CatalogPreviewScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let startX = 0;
    let startY = 0;
    let direction: "horizontal" | "vertical" | null = null;
    let previousBodyOverflowY = "";
    let previousHtmlOverflowY = "";
    let locked = false;

    const lockVerticalScroll = () => {
      if (locked) return;
      previousBodyOverflowY = document.body.style.overflowY;
      previousHtmlOverflowY = document.documentElement.style.overflowY;
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      locked = true;
    };

    const unlockVerticalScroll = () => {
      if (!locked) return;
      document.body.style.overflowY = previousBodyOverflowY;
      document.documentElement.style.overflowY = previousHtmlOverflowY;
      locked = false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      direction = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      const deltaX = event.touches[0].clientX - startX;
      const deltaY = event.touches[0].clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (!direction && Math.max(absX, absY) > GESTURE_THRESHOLD) {
        direction = absX > absY ? "horizontal" : "vertical";
      }

      if (direction === "horizontal") {
        lockVerticalScroll();
      }
    };

    const handleTouchEnd = () => {
      direction = null;
      unlockVerticalScroll();
    };

    scroller.addEventListener("touchstart", handleTouchStart, { passive: true });
    scroller.addEventListener("touchmove", handleTouchMove, { passive: true });
    scroller.addEventListener("touchend", handleTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      scroller.removeEventListener("touchstart", handleTouchStart);
      scroller.removeEventListener("touchmove", handleTouchMove);
      scroller.removeEventListener("touchend", handleTouchEnd);
      scroller.removeEventListener("touchcancel", handleTouchEnd);
      unlockVerticalScroll();
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 pr-4 touch-pan-x [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:overscroll-auto md:pr-0 md:pb-0 md:touch-auto [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}
