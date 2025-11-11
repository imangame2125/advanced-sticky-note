import { motion } from 'framer-motion';
import type { FC } from 'react';

export type Color = 'Green' | 'Yellow' | 'Blue' | 'Red';

interface Props {
  onPick: (color: Color) => void;
  colors: Color[];
}

const NoteChoice: FC<Props> = ({ onPick }) => {
  const myColors: Color[] = ['Red', 'Yellow', 'Blue', 'Green'];
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl mb-8">Which sticky note color do you vibe with?</h2>
      <div className="grid grid-cols-2 gap-6">
        {myColors.map((c) => (
          <motion.button
            key={c}
            onClick={() => onPick(c)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-32 h-32 rounded-lg shadow-lg font-bold`}
            style={{ background: c }}
          >
            {c}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
export default NoteChoice;
