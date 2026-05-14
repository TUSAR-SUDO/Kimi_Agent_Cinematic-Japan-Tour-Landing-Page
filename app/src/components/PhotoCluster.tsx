import { motion } from 'framer-motion';

interface PhotoClusterProps {
  images: [string, string];
  rotation: number;
}

export function PhotoCluster({ images, rotation }: PhotoClusterProps) {
  return (
    <motion.div
      className="relative w-[140px] h-[110px]"
      style={{ transform: `rotate(${rotation}deg)` }}
      initial="rest"
      whileHover="hover"
    >
      {/* Photo 1 - positioned slightly left and up */}
      <motion.img
        src={images[0]}
        alt=""
        className="absolute top-0 left-0 w-[100px] h-[75px] object-cover border-[3px] border-mountain-cream rounded-[2px] shadow-md"
        variants={{
          rest: { x: 0, rotate: 0 },
          hover: { x: -8, rotate: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
        }}
        loading="lazy"
      />
      {/* Photo 2 - positioned slightly right and down */}
      <motion.img
        src={images[1]}
        alt=""
        className="absolute top-4 left-8 w-[100px] h-[75px] object-cover border-[3px] border-mountain-cream rounded-[2px] shadow-md"
        variants={{
          rest: { x: 0, rotate: 0 },
          hover: { x: 8, rotate: 6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
        }}
        loading="lazy"
      />
    </motion.div>
  );
}
