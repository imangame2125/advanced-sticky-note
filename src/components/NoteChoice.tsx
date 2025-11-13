import { motion } from 'framer-motion';
import type { FC } from 'react';

export type Color = 'Green' | 'Yellow' | 'Blue' | 'Red';

interface Props {
  onPick: (color: Color) => void;
  colors: Color[];
  visitedColors: Color[];
}

const NoteChoice: FC<Props> = ({ onPick, colors, visitedColors }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [0, 1, 0], scale: 2.5 }}
        transition={{ duration: 2 }}
        className="text-4xl mb-8 font-extrabold  text-white"
      >
        Which sticky note color do you vibe with?
      </motion.h1>
      <div className="grid grid-cols-2 gap-6">
        {colors.map((color) => (
          <motion.button
            key={color}
            transition={{ duration: 0.8 }}
            onClick={() => onPick(color)}
            whileHover={{ scale: 1.1, rotate: 360 }}
            className={`w-32 h-32 rounded-2xl`}
            disabled={visitedColors.includes(color)}
            style={{ background: visitedColors.includes(color) ? 'gray' : color }}
          ></motion.button>
        ))}
      </div>
    </div>
  );
};
export default NoteChoice;
