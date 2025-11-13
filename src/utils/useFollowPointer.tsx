import { frame, useSpring } from 'framer-motion';
import { useEffect, type RefObject } from 'react';

const spring = { damping: 12, stiffness: 40, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>, offsetAngle: number) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;
      const angle = offsetAngle;
      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2 + 100 * Math.cos(angle));
        y.set(clientY - element.offsetTop - element.offsetHeight / 2 + 100 * Math.sin(angle));
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [offsetAngle]);

  return { x, y };
}
