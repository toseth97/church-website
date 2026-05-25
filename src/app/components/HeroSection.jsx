import Image from "next/image";

export default function HeroSection({
  imageSrc,
  title,
  subtitle,
  badge,
  height = "70vh",
  overlayOpacity = 0.55,
  children,
}) {
  return (
    <section
      className="hero-section relative w-full"
      style={{ minHeight: height }}
    >
      {/* Background Image with Parallax-like animation */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover animate-heroParallax"
        priority
        quality={90}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,${overlayOpacity + 0.1}) 0%, rgba(0,0,0,${overlayOpacity - 0.1}) 50%, rgba(0,0,0,${overlayOpacity + 0.05}) 100%)`,
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F2C79B]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#d4a574]/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="hero-content absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fadeInUp">
              <span className="w-2 h-2 rounded-full bg-[#F2C79B]"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl animate-fadeInUp"
            style={{ animationDelay: "0.15s" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              {subtitle}
            </p>
          )}

          {/* Extra content (buttons, etc.) */}
          {children && (
            <div
              className="mt-8 animate-fadeInUp"
              style={{ animationDelay: "0.45s" }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-[2]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
