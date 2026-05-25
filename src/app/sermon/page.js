import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/reveal/Reveal.jsx";
import HeroSection from "../components/HeroSection.jsx";

export const dynamic = "force-dynamic";

async function getSermons() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/sermons?limit=50`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.sermons : [];
  } catch {
    return [];
  }
}

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/events?limit=10`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.events : [];
  } catch {
    return [];
  }
}

export default async function SermonPage() {
  const sermons = await getSermons();
  const events = await getEvents();

  const featuredSermon = sermons.find((s) => s.isFeatured) || sermons[0];
  const upcomingEvent = events.find((e) => new Date(e.date) > new Date()) || events[0];

  return (
    <main className="w-full">

      {/* ================= HERO SECTION ================= */}
      <HeroSection
        imageSrc="/images/sermon-hero.avif"
        title="TAKE PART IN OUR SERMON"
        subtitle="Be inspired and transformed through the power of God's Word. Join us as we dive deep into biblical truths."
        badge="Sermon"
        height="70vh"
      />

      {/* ================= UPCOMING EVENT ================= */}
      {upcomingEvent && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              {/* Left: Text part */}
              <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-10 md:w-1/2 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4 w-full">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C19A6B] font-bold">
                    Upcoming Event
                  </p>
                  {upcomingEvent.date && (
                    <div className="text-right">
                      <p className="text-2xl font-bold leading-none text-[#c9a27e]">
                        {new Date(upcomingEvent.date).getDate()}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#c9a27e]">
                        {new Date(upcomingEvent.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {upcomingEvent.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {upcomingEvent.description}
                </p>

                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  {upcomingEvent.time && <li>🕐 {upcomingEvent.time}</li>}
                  {upcomingEvent.location && <li>📍 {upcomingEvent.location}</li>}
                </ul>

                <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-max font-semibold">
                  REGISTER
                </button>
              </div>

              {/* Right: Image part */}
              <div className="md:w-1/2 h-[400px] img-zoom">
                <Image
                  src="/images/sermon1-main.jpg"
                  alt="Sermon"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= FEATURED SERMON ================= */}
      {featuredSermon && (
        <section className="py-24 bg-[#FAF7F3]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <div className="text-center mb-16">
                <p className="uppercase text-xs tracking-[0.2em] text-[#c9a27e] mb-3">Featured Sermon</p>
                <h2 className="text-3xl md:text-4xl font-bold">THIS WEEK&apos;S MESSAGE</h2>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2 gap-0">
                <div className="h-[300px] md:h-auto bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                  <span className="text-8xl">📖</span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 w-fit capitalize mb-4">
                    {featuredSermon.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{featuredSermon.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{featuredSermon.description}</p>
                  <p className="text-sm text-[#c9a27e] font-semibold mb-2">By {featuredSermon.speaker}</p>
                  <p className="text-xs text-gray-500">
                    {featuredSermon.date ? new Date(featuredSermon.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                  </p>
                  {featuredSermon.tags && featuredSermon.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {featuredSermon.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#FFF8F0] text-[#c9a27e] text-xs font-medium rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ================= ALL EVENTS ================= */}
      {events.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
                VIEW ALL EVENTS
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.slice(0, 8).map((event, i) => (
                <Reveal key={event._id} delayMs={80 + i * 60}>
                  <div className="group bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-8 rounded-xl cursor-pointer card-hover border border-[#F2C79B]/10">
                    <div className="flex justify-between items-start mb-4 w-full">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#C19A6B] font-bold">
                        Upcoming
                      </p>
                      {event.date && (
                        <div className="text-right">
                          <p className="text-2xl font-bold leading-none text-[#c9a27e]">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs uppercase font-bold tracking-wider text-[#c9a27e]">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </p>
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold mb-4 group-hover:text-[#c9a27e] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                      {event.description}
                    </p>

                    <ul className="text-xs text-gray-500 space-y-2">
                      {event.time && <li>🕐 {event.time}</li>}
                      {event.location && <li>📍 {event.location}</li>}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= ALL SERMONS ================= */}
      {sermons.length > 0 && (
        <section className="py-24 bg-[#FAF7F3]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal delayMs={60}>
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
                ALL SERMONS
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon, i) => (
                <Reveal key={sermon._id} delayMs={80 + i * 60}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm card-hover">
                    <div className="h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center relative">
                      <span className="text-5xl">📖</span>
                      <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 capitalize">
                        {sermon.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#c9a27e] transition-colors">{sermon.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{sermon.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{sermon.speaker}</span>
                        <span>{sermon.date ? new Date(sermon.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
                      </div>
                      {sermon.tags && sermon.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {sermon.tags.slice(0, 3).map((tag, j) => (
                            <span key={j} className="px-2 py-0.5 bg-[#FFF8F0] text-[#c9a27e] text-xs rounded-full">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
