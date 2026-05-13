import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
<footer className="bg-dark/95 text-white mt-16 overflow-x-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">

        {/* About */}
        <div>
          <h2 className="font-bold text-2xl mb-2">Finsweet Church</h2>
          <p className="text-sm text-gray-300 break-words">
            Finsweet Church is a place of worship, love, and compassion. Join us for inspiring sermons, fellowship, and community outreach.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><Link href="/" className="hover:text-accent">Home</Link></li>
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="/sermons" className="hover:text-accent">Sermons</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Connect</h3>
          <div className="flex gap-4 text-2xl text-accent">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-bold text-xl md:text-2xl mb-2">
            SUBSCRIBE TO GET LATEST NEWS AND UPDATES
          </h3>

          <div className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-[150px] p-3 rounded-md text-white placeholder-gray-400 bg-dark focus:outline-none border border-gray-600"
            />
            <button className="bg-[#F2C79B] hover:bg-[#e6b985] text-white font-semibold px-6 py-3 rounded-md transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm break-words">
        &copy; {new Date().getFullYear()} Finsweet Church. All rights reserved.
      </div>
    </footer>
  );
}