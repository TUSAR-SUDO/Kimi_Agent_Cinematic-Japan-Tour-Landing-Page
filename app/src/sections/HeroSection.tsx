import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PolaroidCard } from '@/components/PolaroidCard';
import { Instagram } from '@/components/icons/Instagram';
import { Facebook } from '@/components/icons/Facebook';
import { Telegram } from '@/components/icons/Telegram';
import { getLenis } from '@/hooks/useLenis';

const polaroidData = [
  { video: '/videos/card-pagoda.mp4', fallback: '/images/kyoto-pagoda.jpg', caption: '3 CITIES IN JAPAN', rotation: -2 },
  { video: '/videos/card-shrine.mp4', fallback: '/images/kyoto-shrine.jpg', caption: '10 DAYS', rotation: 1 },
  { video: '/videos/card-ramen.mp4', fallback: '/images/osaka-skyline.jpg', caption: 'GIGABYTES OF PHOTOS', rotation: -1 },
  { video: '/videos/card-neon.mp4', fallback: '/images/tokyo-neon.jpg', caption: 'EAT RAMEN', rotation: 2 },
  { video: '/videos/card-shrine.mp4', fallback: '/images/tokyo-street.jpg', caption: 'ENJOY THE VIBE', rotation: -3 },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Problem 2 — Scroll-linked parallax speeds
  // Mountain: 0.3x scroll speed (slowest — anchors the scene)
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // JAPAN typography: 0.5x scroll speed (mid-depth)
  const typographyY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  // Polaroid strip: 0.4x scroll speed, leftward
  const polaroidX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // Kimono figure: NO transform — stays fixed as visual anchor

  const handleBookClick = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -80 });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ============================================================
          LAYER 0 — Sky Background
          Solid gradient that matches the sky tone from hero-mountains.jpg.
          This sits behind everything so the JAPAN text reads cleanly
          against sky-colored space when the mountain mask reveals it.
          ============================================================ */}
      <div
        className="absolute inset-0 z-[0]"
        style={{
          background: 'linear-gradient(180deg, #e8dcc8 0%, #f0e4d0 20%, #d4c4a8 45%, #b8a888 70%, #8a7a68 100%)',
        }}
      />

      {/* ============================================================
          LAYER 1 — "JAPAN" Display Typography (BEHIND mountains)
          Positioned at z-1, below the masked mountain image.
          Only the upper 40-50% of letterforms show above the peaks.
          ============================================================ */}
      <motion.div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
        style={{ y: typographyY, willChange: 'transform' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="font-display text-stroke-hero text-center leading-none select-none"
          style={{
            fontSize: 'clamp(120px, 22vw, 360px)',
            WebkitTextStroke: '2px rgba(250, 250, 250, 0.85)',
            color: 'transparent',
            transform: 'translateY(28%)',
          }}
        >
          JAPAN
        </h1>
      </motion.div>

      {/* ============================================================
          LAYER 2 — Mountain Landscape (IN FRONT of typography)
          CSS mask fades out the sky portion (top ~40%), revealing
          the JAPAN text behind it through the transparent sky area.
          The mountain silhouette occludes the lower part of the text.
          ============================================================ */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ y: mountainY, willChange: 'transform' }}
      >
        <div className="relative w-full h-[120%]">
          <img
            src="/images/hero-mountains.jpg"
            alt="Misty Japanese mountains at dawn"
            className="w-full h-full object-cover"
            loading="eager"
            style={{
              maskImage: 'linear-gradient(to top, black 45%, transparent 72%)',
              WebkitMaskImage: 'linear-gradient(to top, black 45%, transparent 72%)',
            }}
          />
          {/* Subtle gradient overlay for depth */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-mist-black/30 via-transparent to-transparent"
            style={{
              maskImage: 'linear-gradient(to top, black 50%, black 60%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to top, black 50%, black 60%, transparent 85%)',
            }}
          />
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 3 — Cherry Blossom Branches
          ============================================================ */}
      <motion.div
        className="absolute right-0 top-[10%] z-[3] w-[200px] md:w-[280px] pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/cherry-branches.png"
          alt="Cherry blossoms"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </motion.div>

      {/* ============================================================
          LAYER 4 — Kimono Figure (visual anchor — NO scroll transform)
          ============================================================ */}
      <motion.div
        className="absolute right-[3%] md:right-[5%] bottom-0 z-[4] w-[35vw] max-w-[380px] md:max-w-[420px]"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/hero-kimono.png"
          alt="Woman in floral kimono gazing at the valley"
          className="w-full h-auto object-contain"
          style={{ maxHeight: '85vh' }}
          loading="eager"
        />
      </motion.div>

      {/* ============================================================
          LAYER 5 — Polaroid Card Strip (scroll-linked leftward)
          ============================================================ */}
      <motion.div
        className="absolute bottom-[8%] left-[3%] md:left-[5%] z-[5]"
        style={{ x: polaroidX, willChange: 'transform' }}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 max-w-[85vw] scrollbar-hide">
          {polaroidData.map((card, i) => (
            <PolaroidCard
              key={i}
              videoSrc={card.video}
              fallbackImage={card.fallback}
              caption={card.caption}
              index={i}
              rotation={card.rotation}
            />
          ))}
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 6 — Floating Book Button
          ============================================================ */}
      <motion.button
        className="absolute right-[8%] md:right-[12%] bottom-[18%] z-[6] bg-mountain-cream/90 backdrop-blur-lg text-mist-black font-body font-medium text-sm uppercase tracking-[0.1em] px-10 md:px-12 py-4 rounded-full shadow-lg cursor-hover overflow-hidden group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleBookClick}
        whileHover={{ y: -2 }}
      >
        <span className="relative z-10">Book</span>
        <span
          className="absolute inset-0 bg-gradient-to-t from-lime-accent to-mountain-cream opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </motion.button>

      {/* ============================================================
          Social Icons — Right Edge
          ============================================================ */}
      <motion.div
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[5] hidden md:flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white/60 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
          aria-label="Instagram"
        >
          <Instagram className="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white/60 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
          aria-label="Facebook"
        >
          <Facebook className="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white/60 hover:text-kimono-white transition-opacity duration-200 cursor-hover"
          aria-label="Telegram"
        >
          <Telegram className="w-[18px] h-[18px]" />
        </a>
      </motion.div>
    </section>
  );
}
