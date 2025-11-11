import { useRef, useState } from 'react';

const Sample = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isResizing, setIsResizing] = useState(false);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [resize, setResize] = useState({
    width: 80,
    height: 80,
  });

  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;

    setIsResizing(true);
    setIsDragging(true);

    setStartSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setResize({
      width: startSize.width + dx,
      height: startSize.height + dy,
    });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full h-screen bg-green-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        style={{
          width: resize.width,
          height: resize.height,
        }}
        className={`absolute top-10 left-10 bg-amber-400  transition-all duration-75 flex items-center justify-center select-none ${isDragging ? 'cursor-pointer' : 'cursor-se-resize'}`}
      >
        sample
      </div>
    </div>
  );
};

export default Sample;
