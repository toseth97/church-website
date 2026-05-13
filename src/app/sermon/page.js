import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/reveal/Reveal.jsx";

export default function SermonPage() {
  return (
    <main className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[70vh]">
        <Image
          src="/images/sermon-hero.avif"
          alt="Sermon Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-6 text-black pt-32">
            <Reveal delayMs={60}>
              <p className="uppercase text-sm font-bold tracking-widest mb-3">
                Sermon
              </p>
              <h1 className="text-4xl md:text-4xl font-bold max-w-xl">
                TAKE PART IN OUR SERMON
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

     {/* ================= UPCOMING SERMON ================= */}
<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer">

      {/* Left: Text part */}
      <div className="bg-[#fbf4ee] p-10 md:w-1/2 flex flex-col justify-between">
        {/* Top: Date & Upcoming Event */}
        <div className="flex justify-between items-start mb-4 w-full">
          <p className="text-xs uppercase tracking-widest text-[#C19A6B]">
            Upcoming Event
          </p>
          <div className="text-right">
            <p className="text-2xl font-bold leading-none">20</p>
            <p className="text-xs font-bold uppercase tracking-widest">July</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4">
          WATCH AND LISTEN <br /> TO OUR SERMONS
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore.
        </p>

        {/* List */}
        <ul className="text-sm text-gray-700 space-y-2 mb-6">
          <li>📅 Friday 23:39 IST</li>
          <li>⏰ Saturday 11:20 ISD</li>
          <li>📍 No 233 Main St. New York, United States</li>
        </ul>

        {/* Button */}
        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-max">
          REGISTER
        </button>
      </div>

      {/* Right: Image part */}
      <div className="md:w-1/2 h-[100%]">
        <Image
          src="/images/sermon1-main.jpg"
          alt="Sermon"
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

    </div>
    <div className="text-right mt-10">
  <Link
    href="/sermon"
    className="text-sm font-bold hover:underline"
  >
    View all Sermons →
  </Link>
</div>
  </div>
</section>

      {/* ================= EVENTS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-3xl font-bold mb-16">
            VIEW ALL EVENTS
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              "100 RANDOM ACTS OF KINDNESS",
              "FAITH IS A PROCESS, NOT A DESTINATION",
              "THERE IS NOTHING IMPOSSIBLE",
              "WATCH AND LISTEN TO OUR SERMONS",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-[#fbf4ee] p-8 rounded-xl cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4 w-full">
  {/* Left: Upcoming Event */}
  <p className="text-xs uppercase tracking-widest text-[#C19A6B]">
    Upcoming Event
  </p>

  {/* Right: Date */}
  <div className="text-right">
    <p className="text-2xl font-bold leading-none">20</p>
    <p className="text-xs uppercase font-bold tracking-widest">July</p>
  </div>
</div>

                <h3 className="font-bold mb-4">
                    
                  {title}
                </h3>

                <p className="text-sm text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <ul className="text-xs text-gray-700 space-y-2">
                  <li>📅 Friday 23:39 IST</li>
                  <li>⏰ Saturday 11:20 ISD</li>
                  <li>📍 No 233 Main St. New York, United States</li>
                </ul>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}