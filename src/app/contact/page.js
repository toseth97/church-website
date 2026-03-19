import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="relative w-full h-[70vh]">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Hero"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-start">
          <div className="px-20 pt-32 text-white">
            <p className="uppercase text-sm mb-3 font-bold tracking-widest">
              Contact
            </p>

            <h1 className="text-4xl md:text-5xl font-bold max-w-xl leading-tight">
              GET IN TOUCH WITH OUR CHURCH
            </h1>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 bg-[#f5f2ef]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">

          {/* LEFT FORM */}
          <div>

            <h3 className="font-bold mb-6">
              CONTACT FORM:
            </h3>

            <form className="space-y-4">

              <input
  type="text"
  placeholder="Your full Name"
  className="w-full p-4 rounded bg-white text-black  outline-none"
/>
              <input
  type="email"
  placeholder="Your Email"
  className="w-full p-4 rounded bg-white text-black  outline-none"
/>
              <input
  type="text"
  placeholder="Query Related"
  className="w-full p-4 rounded bg-white text-black outline-none"
/>
              <textarea
  placeholder="Message"
  rows="4"
  className="w-full p-4 rounded bg-white text-black outline-none"
/>
              <button className="w-full bg-[#f2c18d] py-4 rounded-md font-semibold hover:bg-[#e5b17a] transition">
  SEND MESSAGE
</button>

            </form>

          </div>

          {/* RIGHT INFO */}
          <div className="space-y-10">

            <div>
              <p className="text-sm mb-1 font-bold">Address</p>

              <h4 className="font-bold">
                NH 234 PUBLIC SQUARE <br />
                SAN FRANCISCO 65368
              </h4>
            </div>

            <div>
              <p className="text-sm mb-1 font-bold ">Contact Details</p>

              <h4 className="font-bold">
                (480) 555-0103 <br />
                FINSWEET@EXAMPLE.COM
              </h4>
            </div>

            <div>
              <p className="text-sm mb-3 font-bold">
                Find us here
              </p>

              <div className="flex gap-4 text-xl">

  <a href="#" className="hover:text-[#f2c18d] transition">
    <FaFacebook />
  </a>

  <a href="#" className="hover:text-[#f2c18d] transition">
    <FaTwitter />
  </a>

  <a href="#" className="hover:text-[#f2c18d] transition">
    <FaLinkedin />
  </a>

</div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}