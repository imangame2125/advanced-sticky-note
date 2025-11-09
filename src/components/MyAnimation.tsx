import anime from 'animejs';
import React, { useEffect } from 'react';
import image1 from '../assets/images/image-1.png';
import image10 from '../assets/images/image-10.png';
import image11 from '../assets/images/image-11.png';
import image12 from '../assets/images/image-12.png';
import image13 from '../assets/images/image-13.png';
import image15 from '../assets/images/image-15.png';
import image2 from '../assets/images/image-2.png';
import image3 from '../assets/images/image-3.png';
import image4 from '../assets/images/image-4.png';
import image5 from '../assets/images/image-5.png';
import image6 from '../assets/images/image-6.png';
import image7 from '../assets/images/image-7.png';
import image8 from '../assets/images/image-8.png';
import image9 from '../assets/images/image-9.png';
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



  useEffect(() => {
    const frame = document.getElementById('album-frame');
    if (!frame) return;
    const rect = frame.getBoundingClientRect();

    images.forEach((_, index) => {
      const el = document.getElementById(`photo-${index}`);
      if (!el) return;

      const targetX = anime.random(rect.left + 450, rect.right - 200);
      const targetY = anime.random(rect.top + 450, rect.bottom - 200);

      anime({
        targets: el,
        scale: [3, 1],
        translateX: [0, targetX - window.innerWidth / 2],
        translateY: [0, targetY - window.innerHeight / 2],
        rotateX: () => anime.random(-45, 45),
        rotateY: () => anime.random(-45, 45),
        rotateZ: () => anime.random(-90, 90),
        opacity: [0, 1],
        duration: 4000,
        delay: index * 300,
        easing: 'easeOutBack',
      });
    });
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <img id="album-frame" src={image15} className="absolute w-full h-auto object-contain" />
      {images.map((src, i) => (
        <img
          key={i}
          id={`photo-${i}`}
          src={src}
          className="absolute w-60 rounded-2xl h-[226px] object-cover "
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1)',
          }}
        />
      ))}

      <button
        onClick={onFinish}
        className="absolute bottom-10 px-8 py-3 bg-white text-black text-xl rounded-full font-bold shadow-lg hover:scale-105 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default CreativeGallery;
