import { useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(lerpFactor = 0.12) {
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 });
  const currentRef = useRef<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerpFactor;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerpFactor;
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [lerpFactor]);

  return { current: currentRef, target: targetRef };
}
