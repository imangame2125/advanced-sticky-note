import { motion } from 'framer-motion';
import { useState, type FC } from 'react';


type Directions = 'top' | 'bottom' | 'left' | 'right';
type DirectionColor = 'bg-blue-800' | 'bg-amber-400' | 'bg-red-800' | 'bg-green-800';
type textImages = '1' | '2' | '3' | '4';

interface Props {
  onContinue: () => void;
  directions: Directions[];
  directionColor: DirectionColor[];
  textImages: textImages[];
}

const IntroZoom: FC<Props> = ({ onContinue, directions, directionColor, textImages }) => {
  const [showText, setShowText] = useState<boolean>(false);

  const lines = [
    'Hi, I’m Iman Majdabadi Farahani building Sticky Note Advance',
    'The idea and demo are entirely my own thoughts and vision.',
    'I tried to express them through code.',
    'Along the way, I learned a lot and had to do plenty of research.',
    'I truly love working on creative things.',
  ];

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center text-white">
      {directions.map((dir, i) => (
        <motion.div
          key={`${dir}-${i}`}
          className={`absolute ${directionColor[i]} w-24 h-24 md:w-28 md:h-28 rounded-xl flex items-center justify-center`}
          initial={{
            x: dir === 'left' ? -300 : dir === 'right' ? 300 : 0,
            y: dir === 'top' ? -300 : dir === 'bottom' ? 300 : 0,
            scale: 8,
            opacity: 0,
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 2.5,
            opacity: 1,
          }}
          transition={{ duration: 2.5, delay: i * 1, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (i === directions.length - 1) {
              setTimeout(() => setShowText(true), 2500);
            }
          }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: 1 }}
            transition={{ duration: 0.8, delay: 2 + i * 1 }}
            className="text-white text-4xl font-bold select-none"
          >
            {textImages[i]}
          </motion.span>
        </motion.div>
      ))}

      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center space-y-6"
        >
          {/* عکس */}
          {/* <div className="overflow-hidden flex justify-center mx-auto">
            {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                className="rounded-2xl w-full max-w-lg object-cover"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.5 }}
              />
            ))}
          </div> */}

          {/* متن سطر به سطر */}
          <div className="relative w-full flex flex-col items-center space-y-4 mt-8">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="text-2xl md:text-3xl text-white dark:text-gray-300 font-[Manrope]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
                transition={{ duration: 4, delay: i * 1 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* دکمه ادامه */}
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-6 py-3 bg-white cursor-pointer font-bold text-black rounded-full shadow-xl"
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default IntroZoom;
