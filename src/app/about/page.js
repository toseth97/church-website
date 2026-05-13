import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Reveal from "../components/reveal/Reveal.jsx";

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/about1.avif"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 text-white">
          <p className="uppercase tracking-widest font-bold text-sm mb-2">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">
            SERVING THE WORLD AROUND US
          </h1>
        </div>
      </section>

      {/* LOVE AND COMPASSION */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Animations */}

        <Reveal delayMs={60}>
          <p className="uppercase text-xs font-bold tracking-widest mb-3">
            Welcome to our church
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            LOVE AND COMPASSION
          </h2>
        </Reveal>
        <p className="max-w-3xl mx-auto text-gray-600 mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        {/* IMAGES */}
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <Image
            src="/images/love-1.jpg"
            alt=""
            width={350}
            height={450}
            className="rounded-2xl"
          />
          <Image
            src="/images/love-21.jpg"
            alt=""
            width={350}
            height={500}
            className="rounded-2xl"
          />
          <Image
            src="/images/love-31.jpg"
            alt=""
            width={350}
            height={450}
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16">
        <div>
          <p className="uppercase text-xs font-bold tracking-widest mb-2">
            Our mission & vision
          </p>
          <h3 className="text-2xl font-bold mb-4">
            STRIVING FOR A BETTER TOMORROW
          </h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div>
          <p className="uppercase text-xs font-bold tracking-widest mb-2">What we do</p>
          <h3 className="text-2xl font-bold mb-4">
            BRINGING PEACE AND JOY TO THE WORLD
          </h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="uppercase text-xs font-bold tracking-widest text-center mb-3">
          Benefits
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
          THE BENEFITS OF JOINING OUR CHURCH
        </h2>

        <div className="space-y-24">

          {/* ITEM 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">
                FIND FULFILLMENT AND JOY
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <Image
              src="/images/benefit-1.jpg"
              alt=""
              width={500}
              height={350}
              className="rounded-xl"
            />
          </div>

          {/* ITEM 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Image
              src="/images/benefit-2.jpg"
              alt=""
              width={500}
              height={350}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-xl font-bold mb-4">SHARED VALUES</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">CHARITY EVENTS</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <Image
              src="/images/benefit.jpg"
              alt=""
              width={500}
              height={350}
              className="rounded-xl"
            />
          </div>

          {/* ITEM 4 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Image
              src="/images/benefit-4.jpg"
              alt=""
              width={500}
              height={350}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-xl font-bold mb-4">ALL ARE WELCOME</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="uppercase text-xs font-bold tracking-widest text-center mb-3">
            Church members
          </p>
          <h2 className="text-3xl font-bold text-center mb-12">
  MEET OUR INSPIRATIONAL TEAM
</h2>

<div className="grid md:grid-cols-4 gap-10">
  {[
    "Kim Bowen",
    "Danielle Watkins",
    "Naomi Craig",
    "Santos Payne",
  ].map((name, i) => (
    <div
      key={i}
      className="bg-[#f5f3f0] rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105"
    >
      {/* Image */}
      <div className="w-[140px] h-[140px] mx-auto mb-4 overflow-hidden rounded-full relative">
        <Image
          src={`/images/team-${i + 1}.jpg`}
          alt={name}
          width={140}
          height={140}
          className="object-cover rounded-full"
        />
      </div>

      {/* Name and role */}
      <h4 className="font-bold">{name}</h4>
      <p className="text-sm text-gray-500 mb-3">Pastor, Church</p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 text-lg text-accent">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

    </main>
  );
}