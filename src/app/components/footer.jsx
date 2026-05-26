import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bg-[#0a0e1a] text-white overflow-hidden">
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-16 fill-[#0a0e1a]"
                >
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
                </svg>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-[#F2C79B]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#F2C79B]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative pt-20 pb-8">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link
                                href="/"
                                className="flex items-center gap-3 group mb-6"
                            >
                                <div>
                                    <Image
                                        src="/images/HHGC_LOGO.png"
                                        alt="HHGC Logo"
                                        width={200}
                                        height={200}
                                        className="rounded-xl object-contain transition-transform duration-300 group-hover:scale-110 select-none"
                                        priority
                                    />
                                </div>
                            </Link>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                A church of faith, hope, and love. Join us in
                                worship and community as we grow together in the
                                grace of God.
                            </p>
                            <div className="flex space-x-3">
                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#F2C79B] hover:text-black hover:border-[#F2C79B] transition-all duration-300 hover:scale-110"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 320 512"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#F2C79B] hover:text-black hover:border-[#F2C79B] transition-all duration-300 hover:scale-110"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7 2.6 132.1-9c19.6-7.8 34.7-22.9 42.6-42.6 11.7-29.5 9-99.5 9-132.1s2.7-102.7-9-132.1z" />
                                    </svg>
                                </a>
                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/2341234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#F2C79B] hover:text-black hover:border-[#F2C79B] transition-all duration-300 hover:scale-110"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                    </svg>
                                </a>
                                {/* TikTok */}
                                <a
                                    href="https://www.tiktok.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#F2C79B] hover:text-black hover:border-[#F2C79B] transition-all duration-300 hover:scale-110"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C79B] to-transparent" />
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "Home", path: "/" },
                                    { name: "About Us", path: "/about" },
                                    { name: "Sermons", path: "/sermon" },
                                    { name: "Events", path: "/blog" },
                                    { name: "Live Stream", path: "/live" },
                                    { name: "Contact", path: "/contact" },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.path}
                                            className="text-white/50 hover:text-[#F2C79B] transition-all duration-300 text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-[1px] bg-[#F2C79B] transition-all duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Service Times */}
                        <div>
                            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C79B] to-transparent" />
                                Service Times
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    {
                                        day: "Sunday",
                                        time: "8:00 AM & 10:30 AM",
                                    },
                                    { day: "Wednesday", time: "6:30 PM" },
                                    { day: "Friday", time: "7:00 PM" },
                                ].map((service) => (
                                    <li
                                        key={service.day}
                                        className="flex flex-col"
                                    >
                                        <span className="text-white/90 font-medium text-sm">
                                            {service.day}
                                        </span>
                                        <span className="text-white/50 text-sm">
                                            {service.time}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C79B] to-transparent" />
                                Get In Touch
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#F2C79B] mt-0.5 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-white/50 text-sm">
                                        No 5, Salawu Street, Oshodi Lagos,
                                        Nigeria
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#F2C79B] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:info@hhgc.org"
                                        className="text-white/50 hover:text-[#F2C79B] text-sm transition-colors"
                                    >
                                        info@hhgc.org
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#F2C79B] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+2341234567890"
                                        className="text-white/50 hover:text-[#F2C79B] text-sm transition-colors"
                                    >
                                        +234 123 456 7890
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter / CTA Section */}
                    <div className="border-t border-white/5 pt-10 pb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h5 className="text-white font-semibold text-lg mb-1">
                                    Stay Connected
                                </h5>
                                <p className="text-white/40 text-sm">
                                    Join our mailing list for weekly devotionals
                                    and event updates.
                                </p>
                            </div>
                            <div className="flex w-full md:w-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-l-xl px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C79B]/50 transition-colors w-full md:w-72"
                                />
                                <button className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] px-6 py-3 rounded-r-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300 whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-white/30 text-sm">
                                © {new Date().getFullYear()}{" "}
                                <span className="text-white/50 font-medium">
                                    House of His Grace
                                </span>
                                . All rights reserved.
                            </p>
                            <div className="flex items-center gap-6 text-sm text-white/30">
                                <Link
                                    href="/about"
                                    className="hover:text-[#F2C79B] transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/about"
                                    className="hover:text-[#F2C79B] transition-colors"
                                >
                                    Terms of Use
                                </Link>
                                <span className="flex items-center gap-1">
                                    Made with
                                    <svg
                                        className="w-4 h-4 text-red-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
