import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/reveal/Reveal.jsx";

export default function BlogPage() {
  return (
    <main className="bg-[#f5f2ef]">

        {/* SERVE THE WORLD */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <Image src="/images/church.jpg" alt="Church" fill className="object-cover" priority />
          <div className="absolute" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <Link href="/blog/how-to-show-compassion">
            <div className="bg-white p-12 md:p-16 max-w-xl shadow-lg cursor-pointer hover:shadow-2xl transition">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                WE WANT TO <br /> SERVE THE WORLD <br /> AROUND US
              </h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
              <button className="bg-[#F2C79B] text-black font-bold px-8 py-3 rounded-md hover:opacity-90 transition">
                VISIT
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* SHARE, INSPIRE, INNOVATE */}
      <section className="py-24 bg-[#f5f2ef]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center uppercase text-xs font-bold tracking-widest text-[#c9a27e] mb-3">Read Our Blog</p>
          <h2 className="text-center text-4xl font-bold mb-16">SHARE, INSPIRE, INNOVATE</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Link key={item} href="/blog/how-to-show-compassion">
                <div className="bg-[#fbf4ee] p-8 rounded hover:-translate-y-2 hover:shadow-lg transition duration-300">
                  <p className="uppercase text-xs font-bold  tracking-widest text-[#c9a27e] mb-3">Relationship</p>
                  <h3 className="font-bold mb-4">WATCH AND LISTEN <br /> TO OUR SERMONS</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </p>
                  <p className="text-sm font-medium">By Mathew Johnson</p>
                  <p className="text-xs text-gray-500">Tuesday 13 May, 2021</p>
                  <div className="h-1 bg-[#e5b887] mt-6 w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        </section>


      {/* HEADER */}
      <section className="py-20 text-center">
        <p className="uppercase text-xs font-bold tracking-widest  mb-3">Our Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold">MOST RECENT POST</h1>
      </section>

      {/* FEATURED POST */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-[320px]">
            <Image src="/images/blog.jpg" alt="Blog" fill className="object-cover rounded" />
          </div>

          <div>
            <div className="flex justify-between font-bold text-xs text-gray-500 mb-4">
              <span>Tuesday 13 May, 2022</span>
              <span>By John Mathew Doe</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CHURCH WAS DOING WHAT HE OFTEN DID WHEN DROPPED AN ORACLE
            </h2>

            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Link href="/blog/how-to-show-compassion" className="bg-[#F2C79B] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#d6a46f] transition">
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* ALL BLOG POSTS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-16">ALL BLOG POSTS</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "THE BEST WAY TO INSPIRE PEOPLE",
              "HOW TO SHOW COMPASSION",
              "THE BIBLICAL PURPOSE OF MONEY",
              "THE BEST WAY TO INSPIRE PEOPLE",
              "WHAT IT MEANS TO BE A DISCIPLE",
              "WHAT IT MEANS TO BELIEVE",
              "THE MODERN CHURCH IN 2022",
            ].map((title, i) => (
              <Link key={i} href="/blog/how-to-show-compassion" className="group bg-white p-8 rounded-lg hover:shadow-lg transition">
                <p className="text-xs uppercase font-bold tracking-widest text-[#c9a27e] mb-3">Relationship</p>
                <h3 className="font-bold mb-4 group-hover:text-[#c9a27e] transition">{title}</h3>
                <p className="text-sm text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="text-xs text-gray-500">
                  <p>By Mathew Johnson</p>
                  <p>Tuesday 13 May, 2021</p>
                </div>
                <div className="h-1 bg-[#e5b887] mt-6 w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

     

    </main>
  );
}