import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import HeroSection from "../components/HeroSection.jsx";
import Reveal from "../components/reveal/Reveal.jsx";

export default function ContactPage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <HeroSection
        imageSrc="/images/contact-hero.jpg"
        title="GET IN TOUCH WITH OUR CHURCH"
        subtitle="We'd love to hear from you. Whether you have a question, need prayer, or want to visit us, don't hesitate to reach out."
        badge="Contact"
        height="70vh"
      />

      {/* CONTACT FORM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">

          {/* LEFT FORM */}
          <Reveal delayMs={60}>
            <div>
              <p className="uppercase text-xs font-bold tracking-[0.2em] text-[#c9a27e] mb-3">Get in touch</p>
              <h3 className="text-2xl font-bold mb-6">
                SEND US A MESSAGE
              </h3>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your full Name"
                  className="w-full p-4 rounded-xl bg-[#FAF7F3] text-black outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl bg-[#FAF7F3] text-black outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
                <input
                  type="text"
                  placeholder="Query Related"
                  className="w-full p-4 rounded-xl bg-[#FAF7F3] text-black outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full p-4 rounded-xl bg-[#FAF7F3] text-black outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
                <button className="w-full bg-gradient-to-r from-[#F2C79B] to-[#d4a574] py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-black">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </Reveal>

          {/* RIGHT INFO */}
          <Reveal delayMs={120}>
            <div className="space-y-10">
              <div>
                <p className="text-sm mb-1 font-bold text-[#c9a27e] uppercase tracking-wider">Address</p>
                <h4 className="font-bold text-lg">
                  No 5, Salawu Street, <br />
                  Oshodi Lagos, Nigeria
                </h4>
              </div>

              <div>
                <p className="text-sm mb-1 font-bold text-[#c9a27e] uppercase tracking-wider">Contact Details</p>
                <h4 className="font-bold text-lg">
                  +234 123 456 7890 <br />
                  INFO@HHGC.ORG
                </h4>
              </div>

              <div>
                <p className="text-sm mb-3 font-bold text-[#c9a27e] uppercase tracking-wider">
                  Service Times
                </p>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium">Sunday Service: 9:00 AM - 12:00 PM</p>
                  <p className="font-medium">Wednesday Bible Study: 6:00 PM - 8:00 PM</p>
                  <p className="font-medium">Friday Prayer Meeting: 7:00 PM - 9:00 PM</p>
                </div>
              </div>

              <div>
                <p className="text-sm mb-3 font-bold text-[#c9a27e] uppercase tracking-wider">
                  Find us here
                </p>

                <div className="flex gap-4 text-xl">
                  <a href="#" className="w-12 h-12 rounded-full bg-[#FAF7F3] flex items-center justify-center hover:bg-[#F2C79B] hover:text-black transition-all duration-300 text-gray-600">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-[#FAF7F3] flex items-center justify-center hover:bg-[#F2C79B] hover:text-black transition-all duration-300 text-gray-600">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-[#FAF7F3] flex items-center justify-center hover:bg-[#F2C79B] hover:text-black transition-all duration-300 text-gray-600">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-[#FAF7F3] flex items-center justify-center hover:bg-[#F2C79B] hover:text-black transition-all duration-300 text-gray-600">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
