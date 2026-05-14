import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { GuidesIcon } from '@/components/icons/GuidesIcon';
import { FlightsIcon } from '@/components/icons/FlightsIcon';
import { TransfersIcon } from '@/components/icons/TransfersIcon';
import { HotelsIcon } from '@/components/icons/HotelsIcon';

const includedData = [
  {
    icon: <GuidesIcon className="w-7 h-7" />,
    title: 'GUIDES',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: <FlightsIcon className="w-7 h-7" />,
    title: 'FLIGHTS',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: <TransfersIcon className="w-7 h-7" />,
    title: 'TRANSFERS',
    description: 'From the airport to the hotels',
  },
  {
    icon: <HotelsIcon className="w-7 h-7" />,
    title: 'HOTELS',
    description: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function IncludedSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section id="included" className="bg-mist-black py-24 md:py-32">
      {/* Heading with Hairline */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display text-kimono-white whitespace-nowrap"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            WHAT'S INCLUDED
          </h2>
          <div className="flex-1 h-px bg-kimono-white/20" />
        </motion.div>
      </div>

      {/* Bento Grid */}
      <motion.div
        ref={gridRef}
        className="max-w-[1200px] mx-auto mt-12 md:mt-16 px-6 md:px-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {includedData.map((item) => (
            <motion.div key={item.title} variants={cardVariants}>
              <GlassCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
