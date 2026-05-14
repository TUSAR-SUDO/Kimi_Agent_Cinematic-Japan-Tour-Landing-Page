import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function GlassCard({ icon, title, description }: GlassCardProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-8 min-h-[220px] flex flex-col cursor-hover"
      whileHover={{
        y: -4,
        borderColor: 'rgba(212, 248, 122, 0.4)',
        boxShadow: '0 8px 32px rgba(212, 248, 122, 0.08)',
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <motion.div
        className="text-lime-accent w-7 h-7"
        whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      >
        {icon}
      </motion.div>
      <h3 className="small-caps text-kimono-white mt-5 tracking-[0.15em]">{title}</h3>
      <p className="text-sm text-kimono-white/70 mt-3 leading-relaxed">{description}</p>
    </motion.div>
  );
}
