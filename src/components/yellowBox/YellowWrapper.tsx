import { motion, useScroll, useSpring } from 'framer-motion';
import type { FC } from 'react';
import ImageItem from './ImageItem';
import StyleSheet from './StyleSheet';
interface Props {
  images: string[];
  onFinish: () => void;
}

const YellowWrapper: FC<Props> = ({ images,onFinish }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="example" className="relative h-svh w-full">
      {images.map((img, i) => (
        <ImageItem onFinish={onFinish}  key={i} src={img} index={i} />
      ))}

      <motion.div className="progress" style={{ scaleX }} />

      <StyleSheet />
    </div>
  );
};

export default YellowWrapper;
