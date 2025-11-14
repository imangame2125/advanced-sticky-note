import { MotionValue, useSpring, useTransform } from 'framer-motion';

export function useCascade(value: MotionValue<number>, distance: number) {
  const transformed = useTransform(value, [0, 1], [-distance, 0], {
    clamp: false,
  });

  const spring = useSpring(transformed, {
    damping: 12,
    stiffness: 60,
    mass: 0.4,
  });

  return spring;
}
