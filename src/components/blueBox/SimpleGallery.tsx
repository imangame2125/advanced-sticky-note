import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';

interface Props {
  images: string[];
  onFinish: () => void;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
}

const SimpleGallery: FC<Props> = ({ images, onFinish }) => {
  const words = 'Now you can move mouse and enjoy it.'.split(' ');

  const [counter, setCounter] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [trail, setTrail] = useState<TrailItem[]>([]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  useEffect(() => {
    let moveCounter = 0;
    const handleMove = (e: MouseEvent) => {
      if (!isActive) return;
      const img = images[moveCounter % images.length];
      moveCounter++;
      const newItem = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        src: img,
      };
      setTrail((prev) => [...prev, newItem]);
      setTimeout(() => {
        setTrail((prev) => prev.filter((i) => i.id !== newItem.id));
      }, 1000);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [images, isActive]);

  return (
    <div className="flex gap-4 bg-black  overflow-hidden w-full justify-center items-center ">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            className="absolute w-30 h-30 object-cover rounded-lg"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      {!isActive && (
        <div className="w-full flex flex-col items-center">
          <AnimatePresence mode="sync">
            {/* <motion.h1
              className="text-white"
              initial={{ opacity: 1, y: 800, scale: 5 }}
              animate={{ opacity: [1, 1, 1], y: 0, scale: 20 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              {counter}
            </motion.h1> */}

            {counter === 0 && (
              <motion.div className="flex flex-col m-4 p-4 gap-6">
                {words.map((word, i) => (
                  <motion.h1
                    
                    key={i}
                    initial={{ opacity: 1, y: 800, scale: 10 }}
                    animate={{ opacity: [0, 1, 1], y: 40, scale: 2 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      duration: 1,
                      delay: i * 0.8,
                      ease: 'easeIn',
                      times: [0.8, 0.8, 1],
                    }}
                    className="text-green-400 font-Clash text-2xl font-extrabold"
                    onAnimationComplete={() => {
                      if (word === 'it.') setIsActive(true);
                    }}
                  >
                    {word}
                  </motion.h1>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <motion.button className="bg-green-600 px-6 fixed left-0 mt-14 py-2 rounded-xl" onClick={onFinish}>
        continue
      </motion.button>
    </div>
  );
};

export default SimpleGallery;
