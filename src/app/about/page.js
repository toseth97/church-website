import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Reveal from "../components/reveal/Reveal.jsx";
import HeroSection from "../components/HeroSection.jsx";

export default function AboutPage() {
  return (
    <main className="w-full">

      {/* HERO SECTION */}
      <HeroSection
        imageSrc="/images/about1.avif"
        title="SERVING THE WORLD AROUND US"
        subtitle="We are a community of believers dedicated to sharing God's love and transforming lives through faith, fellowship, and service."
        badge="About Us"
        height="70vh"
      />

      {/* LOVE AND COMPASSION */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <Reveal delayMs={60}>
          <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3">
            Welcome to our church
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            LOVE AND COMPASSION
          </h2>
        </Reveal>
        <p className="max-w-3xl mx-auto text-gray-600 mb-16 leading-relaxed">
          At House of His Grace, we believe that love and compassion are at the heart of the Gospel. We are committed to creating a welcoming space where everyone can experience the transformative power of God&apos;s love through genuine community, heartfelt worship, and selfless service to others.
        </p>

        <div className="grid md:grid-cols-3 gap-10 items-center">
          {[
            { src: "/images/love-1.jpg", alt: "Love in action" },
            { src: "/images/love-21.jpg", alt: "Community together" },
            { src: "/images/love-31.jpg", alt: "Serving with joy" },
          ].map((img, i) => (
            <Reveal key={i} delayMs={100 + i * 80}>
              <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                <Image src={img.src} alt={img.alt} width={350} height={450} className="object-cover w-full h-[400px]" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-[#FAF7F3] py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <Reveal delayMs={60}>
            <div>
              <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-2">
                Our mission & vision
              </p>
              <h3 className="text-2xl font-bold mb-4">
                STRIVING FOR A BETTER TOMORROW
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit. We envision a community where every person discovers their God-given purpose and walks in the fullness of His grace.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div>
              <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-2">What we do</p>
              <h3 className="text-2xl font-bold mb-4">
                BRINGING PEACE AND JOY TO THE WORLD
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Through worship, prayer, teaching, and outreach, we bring the peace and joy of Christ to our community and beyond. Our programs are designed to nurture spiritual growth and foster meaningful connections.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal delayMs={60}>
          <p className="uppercase text-xs font-bold tracking-[0.2em] text-center text-[#c9a27e] mb-3">
            Benefits
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            THE BENEFITS OF JOINING OUR CHURCH
          </h2>
        </Reveal>

        <div className="space-y-24">
          {[
            { title: "FIND FULFILLMENT AND JOY", desc: "Experience the joy of belonging to a community that genuinely cares. At HHGC, you'll find purpose, peace, and fulfillment through a personal relationship with Christ.", img: "/images/benefit-1.jpg", reverse: false },
            { title: "SHARED VALUES", desc: "Connect with like-minded believers who share your faith and values. Our community provides a strong foundation for spiritual growth and mutual support.", img: "/images/benefit-2.jpg", reverse: true },
            { title: "CHARITY EVENTS", desc: "Make a difference through our charity and outreach programs. We believe in being the hands and feet of Jesus, serving those in need with love and compassion.", img: "/images/benefit.jpg", reverse: false },
            { title: "ALL ARE WELCOME", desc: "Regardless of your background, age, or story, you are welcome here. HHGC is a place where diversity is celebrated and every person is valued.", img: "/images/benefit-4.jpg", reverse: true },
          ].map((item, i) => (
            <Reveal key={i} delayMs={80}>
              <div className={`grid md:grid-cols-2 gap-16 items-center ${item.reverse ? "md:direction-rtl" : ""}`}>
                <div className={item.reverse ? "md:order-2" : ""}>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className={`img-zoom rounded-xl overflow-hidden shadow-lg ${item.reverse ? "md:order-1" : ""}`}>
                  <Image src={item.img} alt={item.title} width={500} height={350} className="object-cover w-full h-[300px]" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#FAF7F3] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delayMs={60}>
            <p className="uppercase text-xs font-bold tracking-[0.2em] text-center text-[#c9a27e] mb-3">
              Church members
            </p>
            <h2 className="text-3xl font-bold text-center mb-12">
              MEET OUR INSPIRATIONAL TEAM
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { name: "Kim Bowen", role: "Senior Pastor" },
              { name: "Danielle Watkins", role: "Associate Pastor" },
              { name: "Naomi Craig", role: "Youth Pastor" },
              { name: "Santos Payne", role: "Worship Leader" },
            ].map((member, i) => (
              <Reveal key={i} delayMs={100 + i * 80}>
                <div className="bg-white rounded-xl p-6 text-center card-hover shadow-sm">
                  <div className="w-[140px] h-[140px] mx-auto mb-4 overflow-hidden rounded-full relative img-zoom">
                    <Image
                      src={`/images/team-${i + 1}.jpg`}
                      alt={member.name}
                      width={140}
                      height={140}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-lg">{member.name}</h4>
                  <p className="text-sm text-[#c9a27e] mb-3">{member.role}</p>
                  <div className="flex justify-center gap-4 text-lg text-gray-400">
                    <a href="#" className="hover:text-[#c9a27e] transition-colors"><FaFacebook /></a>
                    <a href="#" className="hover:text-[#c9a27e] transition-colors"><FaTwitter /></a>
                    <a href="#" className="hover:text-[#c9a27e] transition-colors"><FaLinkedinIn /></a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
