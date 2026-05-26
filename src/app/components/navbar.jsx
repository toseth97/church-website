"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarAdminClient from "./navbarAdminClient.jsx";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        // Deterministic initial HTML (mounted=false). Then enable interactive updates on mount.
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Sermon", path: "/sermon" },
        { name: "Blog", path: "/blog" },
        { name: "Live Stream", path: "/live" },
        { name: "Recordings", path: "/recordings" },
    ];

    if (!mounted) {
        // Render a deterministic version for the initial SSR/first client render.
        return (
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black/70 backdrop-blur border-b border-white/10">
                <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/images/HHGC_LOGO.jpeg"
                            alt="HHGC Logo"
                            width={80}
                            height={80}
                            className="rounded-xl object-contain transition-transform duration-300 group-hover:scale-110 select-none invert-[.15]"
                            priority
                        />
                    </Link>

                    {/* Keep structure stable to avoid hydration mismatches */}
                    <ul className="hidden md:flex items-center gap-8 text-sm uppercase text-white/80 tracking-widest">
                        {[
                            { name: "Home", path: "/" },
                            { name: "About Us", path: "/about" },
                            { name: "Sermon", path: "/sermon" },
                            { name: "Blog", path: "/blog" },
                            { name: "Live Stream", path: "/live" },
                            { name: "Recordings", path: "/recordings" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className="relative cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/contact"
                        className="hidden md:inline-flex bg-gradient-to-r from-[#F2C79B] to-[#d4a574] px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300 text-black"
                    >
                        Contact Us
                    </Link>

                    <button
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                        type="button"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </nav>
            </header>
        );
    }

    return (
        <header
            className={
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 " +
                (scrolled
                    ? "bg-black/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5"
                    : "bg-black/70 backdrop-blur border-b border-white/10")
            }
        >
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/images/HHGC_LOGO.jpeg"
                        alt="HHGC Logo"
                        width={80}
                        height={80}
                        className="rounded-xl object-contain transition-transform duration-300 group-hover:scale-110 select-none invert-[.15]"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex items-center gap-8 text-sm uppercase text-white/80 tracking-widest">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.path}
                                className="
                  relative cursor-pointer
                  after:absolute after:left-0 after:-bottom-2
                  after:h-[2px] after:w-0 after:bg-[#F2C79B]
                  after:transition-all after:duration-300
                  hover:after:w-full hover:text-white
                "
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {/* Admin link */}
                    <li className="uppercase">
                        <NavbarAdminClient />
                    </li>
                </ul>

                {/* Contact Button (Desktop) */}
                <Link
                    href="/contact"
                    className="hidden md:inline-flex bg-gradient-to-r from-[#F2C79B] to-[#d4a574] px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:shadow-lg hover:shadow-[#F2C79B]/25 transition-all duration-300 text-black"
                >
                    Contact Us
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white p-2"
                    aria-label="Toggle menu"
                    type="button"
                >
                    {mobileOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={
                    "md:hidden transition-all duration-300 overflow-hidden " +
                    (mobileOpen
                        ? "max-h-[400px] opacity-100"
                        : "max-h-0 opacity-0")
                }
            >
                <div className="bg-black/95 backdrop-blur-xl px-6 py-4 space-y-1 border-t border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setMobileOpen(false)}
                            className="block py-3 text-white/80 hover:text-[#F2C79B] transition-colors uppercase text-sm tracking-wider"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-[#F2C79B] font-semibold uppercase text-sm tracking-wider"
                    >
                        Contact Us
                    </Link>
                    <div className="pt-2">
                        <NavbarAdminClient />
                    </div>
                </div>
            </div>
        </header>
    );
}
