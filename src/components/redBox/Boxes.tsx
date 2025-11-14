import { motion, MotionValue } from 'framer-motion';
import { type FC, type Ref } from 'react';

export interface BoxProps {
  width: number;
  height: number;
  color: string;
  name: string;
  textColor: string;
  ref: Ref<HTMLDivElement> | undefined;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rounded?: string;
}

export interface BoxesProps {
  box: BoxProps[];
  onFinish: () => void;
}

const Boxes: FC<BoxesProps> = ({ box, onFinish }) => {
  return (
    <div className="flex  gap-4 items-center justify-center relative">
      {box.map((item) => (
        <motion.div
          ref={item.ref}
          key={item.name}
          className="text-center flex  items-center justify-center text-lg font-bold rounded-lg"
          style={{
            background: item.color,
            width: item.width,
            height: item.height,
            x: item.x,
            y: item.y,
            color: item.textColor,
            borderRadius: item.rounded,
            zIndex: 1,
          }}
        >
          {item.name}
        </motion.div>
      ))}
      <motion.button
        onClick={onFinish}
        whileHover={{ scale: 3 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-80 px-8 py-3 bg-green-700 cursor-pointer text-white font-extrabold text-xl rounded-xl shadow-lg"
      >
        Continue
      </motion.button>
    </div>
  );
};

export default Boxes;
