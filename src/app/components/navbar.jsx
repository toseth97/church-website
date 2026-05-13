import Link from "next/link";
import NavbarAdminClient from "./navbarAdminClient.jsx";

export default function Navbar() {
  return (
<header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="text-white font-bold text-xl tracking-wide cursor-pointer">
          {"{Finsweet}"}
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm uppercase text-white tracking-widest">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Sermon", path: "/sermon" },
            { name: "Blog", path: "/blog" },
            { name: "Live Stream", path: "/live" },
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="
                  relative cursor-pointer
                  after:absolute after:left-0 after:-bottom-2
                  after:h-[2px] after:w-0 after:bg-[#F2C79B]
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Admin link (only if authenticated) */}
          <li className="uppercase">
            {/* Client component handles visibility */}
            <NavbarAdminClient />
          </li>

        </ul>


        {/* Contact Button */}
        <Link
          href="/contact"
          
            className="bg-[#F2C79B]  px-6 py-2 rounded
            text-sm font-semibold cursor-pointer
            hover:opacity-90 transition"
        >
          Contact Us
        </Link>

      </nav>
    </header>
  );
}