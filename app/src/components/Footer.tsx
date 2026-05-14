import { Globe } from './icons/Globe';
import { Instagram } from './icons/Instagram';
import { Facebook } from './icons/Facebook';
import { Telegram } from './icons/Telegram';
import { getLenis } from '@/hooks/useLenis';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Included', href: '#included' },
  { label: 'Contacts', href: '#contact' },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    }
  };

  return (
    <footer className="w-full bg-mist-black border-t border-kimono-white/8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Wordmark */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2 cursor-hover"
          >
            <Globe className="w-5 h-5 text-kimono-white/70" />
            <span className="small-caps text-kimono-white/70 tracking-[0.15em]">
              JAPAN TOURS
            </span>
          </button>

          {/* Center: Nav Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="small-caps text-mouse-gray hover:text-kimono-white transition-colors duration-200 cursor-hover"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/50 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/50 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/50 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
              aria-label="Telegram"
            >
              <Telegram className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
