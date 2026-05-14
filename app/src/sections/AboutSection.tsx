import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PhotoCluster } from '@/components/PhotoCluster';

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'OSAKA',
    images: ['/images/osaka-castle.jpg', '/images/osaka-skyline.jpg'] as [string, string],
    rotation: -2,
  },
  {
    days: 'Days 4–6',
    city: 'KYOTO',
    images: ['/images/kyoto-pagoda.jpg', '/images/kyoto-shrine.jpg'] as [string, string],
    rotation: 3,
  },
  {
    days: 'Days 7–10',
    city: 'TOKYO',
    images: ['/images/tokyo-neon.jpg', '/images/tokyo-street.jpg'] as [string, string],
    rotation: -1,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function AccentText({ text, highlight }: { text: string; highlight: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const parts = text.split(highlight);

  return (
    <span ref={ref}>
      {parts[0]}
      <motion.span
        className="transition-all duration-600"
        animate={{
          color: isInView ? '#D4F87A' : '#FAFAFA',
          textShadow: isInView ? '0 0 20px rgba(212, 248, 122, 0.3)' : '0 0 0px rgba(212, 248, 122, 0)',
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {highlight}
      </motion.span>
      {parts[1]}
    </span>
  );
}

export function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="bg-mist-black py-24 md:py-32">
      {/* Heading with Hairlines */}
      <div className="flex items-center gap-6 px-6 md:px-10">
        <div className="flex-1 h-px bg-kimono-white/20" />
        <motion.h2
          className="font-display text-kimono-white text-center whitespace-nowrap"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          ABOUT THE TOUR
        </motion.h2>
        <div className="flex-1 h-px bg-kimono-white/20" />
      </div>

      {/* Content Grid */}
      <div className="max-w-[1200px] mx-auto mt-16 md:mt-20 px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column — Editorial Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-kimono-white/90 text-base leading-relaxed">
              <AccentText
                text="We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three cities: Osaka, Kyoto, and Tokyo."
                highlight="Osaka, Kyoto, and Tokyo"
              />
            </p>
            <p className="text-kimono-white/90 text-base leading-relaxed">
              <AccentText
                text="No need to worry about routes, schedules, or finding places — everything is already organized. We'll show you where to go, what to see, and where to eat, so you can simply enjoy the journey."
                highlight="enjoy the journey"
              />
            </p>
          </motion.div>

          {/* Right Column — Timeline */}
          <motion.div
            ref={timelineRef}
            className="relative pl-8"
            variants={containerVariants}
            initial="hidden"
            animate={isTimelineInView ? 'visible' : 'hidden'}
          >
            {/* Vertical Hairline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-kimono-white/20" />

            {/* Timeline Nodes */}
            <div className="space-y-12">
              {timelineData.map((item) => (
                <motion.div
                  key={item.city}
                  className="relative"
                  variants={itemVariants}
                >
                  {/* Node Dot */}
                  <div className="absolute -left-8 top-1 w-3 h-3 bg-lime-accent rounded-full -translate-x-1/2" />

                  {/* Content */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Label */}
                    <div className="flex-shrink-0">
                      <p className="text-[11px] text-mouse-gray tracking-wider uppercase">
                        {item.days}
                      </p>
                      <h3 className="small-caps text-kimono-white text-sm tracking-[0.15em] mt-1">
                        {item.city}
                      </h3>
                    </div>

                    {/* Photo Cluster */}
                    <div className="flex-shrink-0">
                      <PhotoCluster images={item.images} rotation={item.rotation} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
