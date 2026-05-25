import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/reveal/Reveal.jsx";
import HeroSection from "../components/HeroSection.jsx";

export const dynamic = "force-dynamic";

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/events?limit=20`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.ok ? data.events : [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const events = await getEvents();
  const featuredEvent = events.find((e) => e.isFeatured) || events[0];

  return (
    <main className="w-full">

      {/* HERO SECTION */}
      <HeroSection
        imageSrc="/images/church.jpg"
        title="WE WANT TO SERVE THE WORLD AROUND US"
        subtitle="Stay connected with the latest events, stories, and updates from our church community."
        badge="Our Blog & Events"
        height="70vh"
      />

      {/* SHARE, INSPIRE, INNOVATE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delayMs={60}>
            <div className="text-center mb-16">
              <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3">Read Our Blog</p>
              <h2 className="text-4xl font-bold">SHARE, INSPIRE, INNOVATE</h2>
            </div>
          </Reveal>

          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.slice(0, 4).map((event, i) => (
                <Reveal key={event._id} delayMs={80 + i * 60}>
                  <div className="group bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-8 rounded-xl card-hover border border-[#F2C79B]/10">
                    <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3 capitalize">
                      {event.category}
                    </p>
                    <h3 className="font-bold text-lg mb-4 group-hover:text-[#c9a27e] transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">{event.description}</p>
                    <p className="text-sm font-medium text-gray-700">{event.location || "HHGC Church"}</p>
                    <p className="text-xs text-gray-500">
                      {event.date ? new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                    </p>
                    <div className="h-1 bg-gradient-to-r from-[#F2C79B] to-[#d4a574] mt-6 w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-[#fbf4ee] p-8 rounded-xl">
                  <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3">Coming Soon</p>
                  <h3 className="font-bold mb-4">STAY TUNED FOR UPDATES</h3>
                  <p className="text-sm text-gray-600">New events and blog posts are coming soon.</p>
                  <div className="h-1 bg-[#e5b887] mt-6 w-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredEvent && (
        <section className="py-24 bg-[#FAF7F3]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal delayMs={60}>
              <div className="text-center mb-12">
                <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3">Featured</p>
                <h2 className="text-3xl md:text-4xl font-bold">FEATURED EVENT</h2>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="bg-white p-10 rounded-2xl shadow-sm grid md:grid-cols-2 gap-10 items-center">
                <div className="relative w-full h-[320px] img-zoom rounded-xl overflow-hidden">
                  <Image src="/images/blog.jpg" alt="Featured" fill className="object-cover" />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-xs text-gray-500 mb-4">
                    <span>{featuredEvent.date ? new Date(featuredEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
                    <span className="capitalize">{featuredEvent.category}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredEvent.description}
                  </p>

                  {featuredEvent.time && <p className="text-sm text-gray-500 mb-2">🕐 {featuredEvent.time}</p>}
                  {featuredEvent.location && <p className="text-sm text-gray-500 mb-6">📍 {featuredEvent.location}</p>}

                  <button className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
                    LEARN MORE
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ALL EVENTS */}
      {events.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal delayMs={60}>
              <h2 className="text-center text-3xl font-bold mb-16">ALL EVENTS & POSTS</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((event, i) => (
                <Reveal key={event._id} delayMs={80 + i * 40}>
                  <div className="group bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E2] p-8 rounded-xl card-hover border border-[#F2C79B]/10">
                    <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#c9a27e] mb-3 capitalize">
                      {event.category}
                    </p>
                    <h3 className="font-bold mb-4 group-hover:text-[#c9a27e] transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">{event.description}</p>
                    <div className="text-xs text-gray-500">
                      {event.location && <p>{event.location}</p>}
                      <p>{event.date ? new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</p>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#F2C79B] to-[#d4a574] mt-6 w-0 group-hover:w-full transition-all duration-500" />
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
