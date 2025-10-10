import { useCallback, useEffect, useState, type FC } from 'react';

interface OffsetState {
  x: number;
  y: number;
  isDragging?: boolean;
}

const Sample: FC = () => {
  const [offset, setOffset] = useState<OffsetState>({ isDragging: false, x: 0, y: 0 });
  // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const width = 128;
  //   const height = 128;
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   let x = e.clientX - rect.left - width / 2;
  //   let y = e.clientY - rect.top - height / 2;
  //   const maxX = document.body.clientWidth - width / 2;
  //   const maxY = document.body.clientWidth - height / 2;
  //   const minX = rect.left + width / 2;
  //   const minY = rect.top + height / 2;
  //   if (e.clientX > maxX) {
  //     x = x - width / 2;
  //   }

  //   if (e.clientX > maxY) {
  //     y = y - height / 2;
  //   }

  //   if (e.clientX < minX) {
  //     x = x + width / 2;
  //   }

  //   if (e.clientX < minY) {
  //     y = y + height / 2;
  //   }

  //   setOffSet({
  //     x: x,
  //     y: y,
  //     isDragging: false,
  //   });
  // };

  const handleMouseUp = useCallback(() => {
    setOffset((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleMouseDown = () => {
    setOffset((prev) => ({ ...prev, isDragging: true }));
  };
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const boxWidth = 128;
      if (!offset.isDragging) return;

      setOffset((prev) => ({
        ...prev,
        x: e.clientX - boxWidth / 2,
        y: e.clientY - boxWidth / 2,
      }));
    },
    [offset.isDragging]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full h-screen bg-gray-800 relative overflow-hidden">
      <div
        onMouseDown={handleMouseDown}
        style={{ position: 'absolute', left: offset.x, top: offset.y }}
        className="bg-red-400 text-white w-32 h-32 flex justify-center items-center rounded-xl cursor-pointer select-none"
      >
        Iman
      </div>
    </div>
  );
};

export default Sample;
