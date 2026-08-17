"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "image";
};

const transforms = {
  up: "translateY(24px)",
  left: "translateX(-35px)",
  right: "translateX(35px)",
  image: "translateY(30px) scale(0.97)"
};

const ENTER_THRESHOLD = 0.14;

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= ENTER_THRESHOLD) {
          setVisible(true);
          return;
        }

        if (!entry.isIntersecting) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, ENTER_THRESHOLD, 0.2] }
    );

    const frame = window.requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight * 0.92);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const isInitiallyVisible = visibleHeight / Math.max(rect.height, 1) >= ENTER_THRESHOLD;
      if (isInitiallyVisible) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      observer.observe(element);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0) scale(1)" : transforms[direction],
        transition: "opacity 760ms cubic-bezier(0.22, 1, 0.36, 1), transform 820ms cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
