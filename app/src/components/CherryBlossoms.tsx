import { useEffect, useState, useMemo } from 'react';

/**
 * CherryBlossoms — Ambient falling sakura petal overlay.
 *
 * Design philosophy: editorial restraint. 18 petals max, varied in size,
 * opacity, speed, and horizontal drift. Each petal is an SVG path shaped
 * like a real cherry blossom petal (teardrop with notch), not a circle.
 *
 * Performance: CSS keyframe animations only (GPU-composited via transform).
 * No JS animation loop, no canvas, no requestAnimationFrame.
 * Respects prefers-reduced-motion.
 */

interface Petal {
  id: number;
  size: number;        // 8–22px
  startX: number;      // 0–100vw
  delay: number;       // 0–12s stagger
  duration: number;    // 8–18s fall time
  driftX: number;      // -80 to 80px horizontal sway
  rotation: number;    // 0–360 initial rotation
  rotationEnd: number; // additional rotation during fall
  opacity: number;     // 0.15–0.5
  hue: number;         // slight color variation
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 8 + Math.random() * 14,
    startX: Math.random() * 100,
    delay: Math.random() * 14,
    duration: 10 + Math.random() * 10,
    driftX: -80 + Math.random() * 160,
    rotation: Math.random() * 360,
    rotationEnd: 180 + Math.random() * 540,
    opacity: 0.12 + Math.random() * 0.35,
    hue: -8 + Math.random() * 16, // slight pink variation
  }));
}

/** SVG petal shape — teardrop with a subtle notch, like a real sakura petal */
function PetalSVG({ size, hue }: { size: number; hue: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C10 0 3 8 2 14C1 20 4.5 25 10 25C15.5 25 19 20 18 14C17 8 10 0 10 0Z"
        fill={`hsl(${340 + hue}, 70%, 82%)`}
      />
      <path
        d="M10 6C10 6 7 12 7 16C7 20 8.5 23 10 24C11.5 23 13 20 13 16C13 12 10 6 10 6Z"
        fill={`hsl(${340 + hue}, 60%, 88%)`}
        opacity="0.6"
      />
    </svg>
  );
}

export function CherryBlossoms() {
  const [isVisible, setIsVisible] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsVisible(!mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsVisible(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Generate petals once
  const petals = useMemo(() => generatePetals(18), []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute cherry-petal"
          style={{
            left: `${petal.startX}%`,
            top: '-30px',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            '--drift-x': `${petal.driftX}px`,
            '--rotation-start': `${petal.rotation}deg`,
            '--rotation-end': `${petal.rotation + petal.rotationEnd}deg`,
            opacity: petal.opacity,
          } as React.CSSProperties}
        >
          <PetalSVG size={petal.size} hue={petal.hue} />
        </div>
      ))}
    </div>
  );
}
