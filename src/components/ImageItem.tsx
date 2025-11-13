import { motion, useScroll } from 'framer-motion';
import { useRef, type FC } from 'react';
import { useParallax } from '../utils/useParallax';

interface Props {
  src: string;
  index: number;
}

const ImageItem: FC<Props> = ({ src, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

  return (
    <section className="img-container">
      <motion.div className="rounded-3xl shadow-3xl" ref={ref}>
        <motion.img
          initial={{ opacity: 0, y: 400,scale:1 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 360 ,scale:3}}
          transition={{ duration: 0.9, delay: index * 0.1 }}
          src={src}
          alt={`Image ${index}`}
          className="rounded-3xl object-cover "
        />
      </motion.div>
      <motion.h2
        className="mx-auto"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        style={{ y }}
      >{`${index + 1}`}</motion.h2>
    </section>
  );
};

export default ImageItem;
