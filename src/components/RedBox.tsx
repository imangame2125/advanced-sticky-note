import { useEffect, useState } from "react";
import airPlane from "../assets/images/image-8.png";

const RedBox = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const p = Math.min(scrollTop / docHeight, 1);
      setProgress(p);
      if (p >= 1) onFinish();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onFinish]);

  const translateY = -progress * 300;
  const scale = 1 + progress * 0.3;
  const skyColor = progress < 0.5 ? "from-sky-400 to-indigo-600" : "from-indigo-800 to-black";

  return (
    <div className={`min-h-[300vh] bg-gradient-to-b ${skyColor} transition-colors duration-500`}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <img
          src={airPlane}
          className="transition-transform duration-300"
          style={{
            transform: `translateY(${translateY}px) scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
};

export default RedBox;
