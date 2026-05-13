import Image from "next/image";
import Reveal from "./components/reveal/Reveal.jsx";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Church worship"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <Reveal delayMs={60}>
            <div className="max-w-xl text-white">
              <p className="uppercase text-sm tracking-widest mb-3 text-accent-light/90">
                Welcome to our church
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                BECOME A PART OF <br /> OUR COMMUNITY
              </h1>

              <button className="bg-[#F2C79B] text-black px-6 py-3 font-semibold rounded-md church-animate-float hover:opacity-90 transition">
                Learn More
              </button>

              <p className="text-sm text-white/70 mt-6 max-w-md">
                Where faith, love, and worship come together.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= RELEVANT CHURCH SECTION ================= */}
      <section className="bg-[#FAF7F3] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase text-xs tracking-widest text-gray-500 mb-3">
            Sub-headline
          </p>

          <h2 className="text-3xl font-bold mb-12">
            A CHURCH THAT&apos;S RELEVANT
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "ABOUT US", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
              { title: "GET INVOLVED", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
              { title: "GIVING BACK", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
            ].map((item, i) => (
              <div
                key={i}
                className="
  bg-[#FFF1E2] p-8 text-left border-b-4 border-[#F2C79B]
  transition-all duration-300
  hover:-translate-y-2 hover:shadow-lg
"
              >
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOVE & COMPASSION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase text-xs tracking-widest text-gray-500 mb-3">
            Sub-headline
          </p>

          <h2 className="text-3xl font-bold mb-4">
            LOVE AND COMPASSION
          </h2>

          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <button className="bg-[#F2C79B] text-black px-6 py-3 font-semibold rounded-md hover:bg-[#e6b985] transition mb-12">
            Read More
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            <Image src="/images/man2.jpg" alt="" width={400} height={300} className="rounded-xl object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
/>
            <Image src="/images/group22.jpg" alt="" width={400} height={300} className="rounded-xl object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
/>
            <Image src="/images/woman.jpg" alt="" width={400} height={300} className="rounded-xl object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
/>
          </div>
        </div>
      </section>

      {/* ================= CELEBRATE WITH US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="uppercase text-xs tracking-widest text-gray-500 mb-3">
            Our mission & vision
          </p>

          <h2 className="text-3xl font-bold mb-4">
            CELEBRATE WITH US
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <a href="#" className="text-sm font-semibold underline">
            Read More →
          </a>
        </div>
      </section>

    </main>
  );
}