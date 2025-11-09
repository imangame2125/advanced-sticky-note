import anime from "animejs";
import { useEffect, useRef } from "react";
import image1 from "../assets/images/image-1.png";
import image2 from "../assets/images/image-2.png";
import image3 from "../assets/images/image-3.png";
import image4 from "../assets/images/image-4.png";

interface Props {
  onFinish: () => void;
}

const CreativeGallery: React.FC<Props> = ({ onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const photos = containerRef.current?.querySelectorAll(".photo");
    if (!photos) return;

    const directions = ["translateX(-150%)", "translateX(150%)", "translateY(-150%)", "translateY(150%)"];
    const rotations = [-25, 20, -15, 25];

    photos.forEach((photo, index) => {
      (photo as HTMLElement).style.transform = `${directions[index]} rotate(${rotations[index]}deg) scale(0.8)`;
      (photo as HTMLElement).style.opacity = "0";
    });

    anime({
      targets: ".photo",
      opacity: [0, 1],
      rotate: [anime.stagger([-25, 15]), 0],
      translateX: ["0%", "0%"],
      translateY: ["0%", "0%"],
      scale: [0.8, 1],
      easing: "spring(1, 80, 10, 0)",
      delay: anime.stagger(600),
      duration: 1200,
      complete: () => {
        anime({
          targets: ".continue-btn",
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 800,
          easing: "easeOutBack",
        });
      },
    });
  }, []);

  const handleContinue = () => {
    anime({
      targets: ".photo",
      translateX: () => anime.random(-600, 600),
      translateY: () => anime.random(-400, 400),
      rotate: () => anime.random(-30, 30),
      opacity: [1, 0],
      scale: [1, 0.5],
      easing: "easeInBack",
      duration: 1000,
      delay: anime.stagger(100),
      complete: onFinish,
    });
  };

  const images = [image1, image2, image3, image4];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="photo absolute w-64 h-64 bg-white shadow-2xl rounded-xl border border-gray-300"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center",
          }}
        ></div>
      ))}

      <button
        onClick={handleContinue}
        className="continue-btn opacity-0 absolute bottom-10 px-8 py-3 bg-white text-black text-xl rounded-full font-bold shadow-lg hover:scale-105 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default CreativeGallery;
