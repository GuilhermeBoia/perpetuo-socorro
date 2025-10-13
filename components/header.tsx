"use client";

import { useState } from "react";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="max-w-4xl mx-auto fixed top-4 left-4 right-4 z-50 bg-black/20 backdrop-blur-md rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Logo Paróquia Nossa Senhora do Perpétuo Socorro"
              width={40}
              height={40}
              className="opacity-90"
            />
          </Link>

          {/* Hamburger Menu Button - Animated */}
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-10 h-10 p-2 hover:opacity-70 transition-opacity relative"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`w-7 h-0.5 bg-white rounded-full absolute transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-white rounded-full absolute transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
