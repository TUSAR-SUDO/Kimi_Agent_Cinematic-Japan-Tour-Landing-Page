import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PolaroidCardProps {
  videoSrc: string;
  fallbackImage: string;
  caption: string;
  index: number;
  rotation: number;
}

export function PolaroidCard({ videoSrc, fallbackImage, caption, index, rotation }: PolaroidCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // IntersectionObserver for video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (isHovered) {
      video.play().catch(() => {});
    } else if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered, isInView, videoError]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <motion.div
      className="flex-shrink-0 w-[140px] bg-mountain-cream rounded-[4px] p-2 pb-8 shadow-polaroid cursor-hover"
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotate: 0,
        boxShadow: '0 20px 40px rgba(255, 184, 197, 0.2)',
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="w-full h-[100px] rounded-[2px] overflow-hidden bg-mist-black/10">
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onError={handleVideoError}
          />
        ) : (
          <img
            src={fallbackImage}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <p className="small-caps text-[9px] text-mist-black/60 mt-2 ml-1 leading-tight">
        {caption}
      </p>
    </motion.div>
  );
}
