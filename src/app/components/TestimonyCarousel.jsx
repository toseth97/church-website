"use client";

import { useEffect, useState, useRef } from "react";

export default function TestimonyCarousel({ testimonies = [] }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || testimonies.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonies.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, testimonies.length]);

  function goTo(index) {
    setCurrent(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }

  function next() {
    goTo((current + 1) % testimonies.length);
  }

  function prev() {
    goTo((current - 1 + testimonies.length) % testimonies.length);
  }

  if (testimonies.length === 0) return null;

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonies.map((t, i) => (
            <div key={t._id || i} className="w-full flex-shrink-0">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8 md:p-12 min-h-[350px] flex flex-col justify-between">
                {/* Quote */}
                <div>
                  <div className="text-[#F2C79B] text-5xl font-serif mb-4">&ldquo;</div>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl">
                    {t.testimony}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                    {t.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-white/50 text-sm">{t.role} • {t.title}</p>
                  </div>
                  {/* Rating */}
                  <div className="ml-auto flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < (t.rating || 5) ? "text-amber-400" : "text-white/20"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {testimonies.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Previous testimony"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Next testimony"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {testimonies.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonies.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (i === current ? "w-8 bg-[#F2C79B]" : "w-2 bg-gray-300 hover:bg-gray-400")
              }
              aria-label={`Go to testimony ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
