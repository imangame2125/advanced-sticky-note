import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import image1 from '../../assets/images/image-1.png';
import image10 from '../../assets/images/image-10.png';
import image11 from '../../assets/images/image-11.png';
import image12 from '../../assets/images/image-12.png';
import image13 from '../../assets/images/image-13.png';
import image15 from '../../assets/images/image-15.png';
import image2 from '../../assets/images/image-2.png';
import image3 from '../../assets/images/image-3.png';
import image4 from '../../assets/images/image-4.png';
import image5 from '../../assets/images/image-5.png';
import image6 from '../../assets/images/image-6.png';
import image7 from '../../assets/images/image-7.png';
import image8 from '../../assets/images/image-8.png';
import image9 from '../../assets/images/image-9.png';

interface Props {
  onFinish: () => void;
}

const CreativeGallery: React.FC<Props> = ({ onFinish }) => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
  ];
  const message = `All of this was my idea.
Of course, I used AI to help generate some images,
but from start to finish, the concepts and designs were mine.
I know there is always room to improve,
but this was a fun and interesting experience for me.`;
  const lines = [message];

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const totalDuration = 3 + images.length * 0.2;
    const timer = setTimeout(() => setShowText(true), totalDuration * 1000);
    return () => clearTimeout(timer);
  }, [images.length]);

  const fanAngles = [-400, -250, -100, -50, 0, 100, 150, 250, 350, 450, 550, 650, 750];

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <img id="album-frame" src={image15} className="absolute w-full h-full object-cover" />

      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          className="absolute w-40 h-40 rounded-2xl object-cover border-4 border-white"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0, 2, 1.5],
            opacity: [0, 1, 1],
            rotate: [0, fanAngles[i]],
            x: [0, Math.sin((fanAngles[i] * Math.PI) / 180) * 200],
            y: [0, -Math.cos((fanAngles[i] * Math.PI) / 180) * 50],
          }}
          transition={{ duration: 3, delay: i * 0.1, ease: 'easeInOut' }}
        />
      ))}

      {showText && (
        <motion.div
          initial={{ opacity: 40, y: 20 }}
          animate={{ opacity: 20, y: 10 }}
          transition={{ duration: 10 }}
          className="absolute text-center space-y-12 font-mono whitespace-pre-line"
        >
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0], y: [0, 1, 0], scale: [3, 2, 1] }}
              transition={{ duration: 45, delay: i * 20 }}
              className="text-2xl text-fuchsia-700 font-extrabold "
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      )}

      {showText && (
        <motion.button
          onClick={onFinish}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-10  px-8 py-3 bg-green-700 cursor-pointer text-white font-extrabold text-xl rounded-xl shadow-lg"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
};

export default CreativeGallery;
