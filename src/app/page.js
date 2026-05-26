import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/reveal/Reveal.jsx";
import HeroSection from "./components/HeroSection.jsx";
import TestimonyCarousel from "./components/TestimonyCarousel.jsx";

export const dynamic = "force-dynamic";

async function getTestimonies() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/testimonies?limit=10`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.testimonies : [];
  } catch {
    return [];
  }
}

async function getEvents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events?limit=4`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.events : [];
  } catch {
    return [];
  }
}

async function getSermons() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/sermons?limit=3`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.sermons : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const testimonies = await getTestimonies();
  const events = await getEvents();
  const sermons = await getSermons();

  return (
    <main className="w-full overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <HeroSection
        imageSrc="/images/hero.jpg"
        title="BECOME A PART OF OUR COMMUNITY"
        subtitle="Where faith, love, and worship come together. Join us in experiencing the presence of God."
        badge="Welcome to House of His Grace"
        height="90vh"
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black px-8 py-4 font-semibold rounded-xl church-animate-float hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300"
          >
            Learn More
          </Link>
          <Link
            href="/sermon"
            className="glass text-white px-8 py-4 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            Watch Sermons
          </Link>
        </div>
      </HeroSection>

      {/* ================= RELEVANT CHURCH SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal delayMs={60}>
            <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              A CHURCH THAT&apos;S RELEVANT
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ABOUT US",
                text: "We are a community of believers committed to sharing God's love. At House of His Grace, everyone is family, and every heart finds a home.",
                icon: "⛪",
              },
              {
                title: "GET INVOLVED",
                text: "Discover your purpose through our ministries. From worship to outreach, there's a place for you to serve and grow in faith.",
                icon: "🤝",
              },
              {
                title: "GIVING BACK",
                text: "We believe in the power of generosity. Through our charity programs, we extend hope and support to those in need in our community.",
                icon: "❤️",
              },
            ].map((item, i) => (
              <Reveal key={i} delayMs={100 + i * 100}>
                <div className="group bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-8 text-left border-b-4 border-[#F2C79B] rounded-xl card-hover">
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[#c9a27e] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOVE & COMPASSION ================= */}
      <section className="py-24 bg-[#FAF7F3]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal delayMs={60}>
            <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              LOVE AND COMPASSION
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              At House of His Grace, we are driven by the love of Christ to serve, uplift, and transform lives through compassion and community.
            </p>
          </Reveal>

          <Link
            href="/about"
            className="inline-block bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black px-8 py-4 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 mb-12"
          >
            Read More
          </Link>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/images/man2.jpg", alt: "Church community" },
              { src: "/images/group22.jpg", alt: "Fellowship together" },
              { src: "/images/woman.jpg", alt: "Serving with love" },
            ].map((img, i) => (
              <Reveal key={i} delayMs={100 + i * 80}>
                <div className="img-zoom rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-[280px]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      {events.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <div className="text-center mb-16">
                <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">What&apos;s Happening</p>
                <h2 className="text-3xl md:text-4xl font-bold">UPCOMING EVENTS</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.slice(0, 4).map((event, i) => (
                <Reveal key={event._id} delayMs={100 + i * 80}>
                  <div className="group bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-6 rounded-xl card-hover border border-[#F2C79B]/20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F2C79B]/20 text-[#c9a27e]">
                        {event.category}
                      </span>
                      {event.date && (
                        <div className="text-right">
                          <p className="text-2xl font-bold leading-none text-[#c9a27e]">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#c9a27e]">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </p>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#c9a27e] transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                    {event.time && (
                      <p className="text-xs text-gray-500">🕐 {event.time}</p>
                    )}
                    {event.location && (
                      <p className="text-xs text-gray-500">📍 {event.location}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/sermon"
                className="inline-block bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                View All Events →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= RECENT SERMONS ================= */}
      {sermons.length > 0 && (
        <section className="py-24 bg-[#FAF7F3]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <div className="text-center mb-16">
                <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">Be Inspired</p>
                <h2 className="text-3xl md:text-4xl font-bold">RECENT SERMONS</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {sermons.slice(0, 3).map((sermon, i) => (
                <Reveal key={sermon._id} delayMs={100 + i * 80}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm card-hover">
                    <div className="h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                      <span className="text-6xl">📖</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 capitalize">
                          {sermon.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {sermon.date ? new Date(sermon.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#c9a27e] transition-colors">{sermon.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{sermon.description}</p>
                      <p className="text-xs text-gray-500">By {sermon.speaker}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/sermon"
                className="inline-block bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                View All Sermons →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= TESTIMONIES CAROUSEL ================= */}
      {testimonies.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <div className="text-center mb-12">
                <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">Stories of Grace</p>
                <h2 className="text-3xl md:text-4xl font-bold">TESTIMONIES</h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Hear from our church family about how God has transformed their lives through faith and community.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <TestimonyCarousel testimonies={testimonies} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ================= CELEBRATE WITH US / CTA ================= */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-72 h-72 bg-[#F2C79B]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-[#d4a574]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal delayMs={60}>
            <p className="uppercase text-xs tracking-[0.2em] text-[#F2C79B] mb-3">
              Our mission & vision
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              CELEBRATE WITH US
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              We exist to glorify God by making disciples who love Him, love one another, and serve the world. Come and be part of what God is doing!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black px-8 py-4 font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300"
              >
                Visit Us
              </Link>
              <Link
                href="/live"
                className="glass text-white px-8 py-4 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Watch Live
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
