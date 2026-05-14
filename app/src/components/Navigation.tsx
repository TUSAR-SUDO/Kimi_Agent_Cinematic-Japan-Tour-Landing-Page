import { useState, useEffect } from 'react';
import { Globe } from './icons/Globe';
import { getLenis } from '@/hooks/useLenis';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Included', href: '#included' },
  { label: 'Contacts', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-mist-black/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        {/* Left: Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-2 group cursor-hover"
        >
          <Globe className="w-5 h-5 text-kimono-white/90" />
          <span className="small-caps text-kimono-white/90 tracking-[0.15em]">
            JAPAN TOURS
          </span>
        </button>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative small-caps text-kimono-white/80 hover:text-kimono-white transition-colors duration-200 cursor-hover group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-px bg-kimono-white w-0 group-hover:w-full transition-all duration-300 origin-left" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </button>
          ))}
        </div>

        {/* Right: Book Button */}
        <button
          onClick={() => handleNavClick('#contact')}
          className="border border-kimono-white/80 rounded-full px-6 py-2 small-caps text-kimono-white/80 hover:bg-mountain-cream/15 transition-all duration-300 cursor-hover"
        >
          Book
        </button>
      </div>
    </nav>
  );
}
