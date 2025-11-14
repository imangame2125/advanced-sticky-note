import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type FC } from 'react';
import { useParallax } from '../../utils/useParallax';

interface Props {
  src: string;
  index: number;
  onFinish: () => void;
}

const ImageItem: FC<Props> = ({ src, index, onFinish }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y = useParallax(scrollYProgress, 800);
  const x = useParallax(scrollYProgress, -400);

  const btnY = useTransform(scrollYProgress, [0, 1, 3], [-300, 0, 300]);

  const btnScale = useTransform(scrollYProgress, [0, 1, 2], [1, 2, 1]);

  const smoothScale = useSpring(btnScale, {
    stiffness: 10,
  });
  const smoothY = useSpring(btnY, {
    stiffness: 20,
  });

  return (
    <section className="img-container ">
      <motion.div className="rounded-3xl shadow-3xl " ref={ref}>
        <motion.img
          initial={{ opacity: 0, y: 400, scale: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.9, delay: index * 0.1 }}
          src={src}
          alt={`Image ${index}`}
          className="rounded-3xl object-cover "
        />
      </motion.div>

      <motion.button
        onClick={onFinish}
        whileHover={{ scale: 3 }}
        style={{
          y: smoothY,
          scale: smoothScale,
        }}
        className="px-6 rounded-xl cursor-pointer py-2  bg-green-400 font-extrabold text-sm text-white"
      >
        Continue
      </motion.button>

      <motion.h2
        className="mx-auto"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        style={{ y, x }}
      >
        {`${index + 1}`}
      </motion.h2>
    </section>
  );
};

export default ImageItem;
