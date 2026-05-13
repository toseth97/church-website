"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper.
 * - Uses IntersectionObserver
 * - Respects prefers-reduced-motion
 */
import "./reveal.css";

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  as: Component = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();

    // Safari fallback
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <Component
      ref={ref}
      className={
        "reveal-item " +
        (visible ? "reveal-item--visible " : "") +
        className
      }
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Component>
  );
}

