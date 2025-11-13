import type { FC } from 'react';

interface ImageItem {
  id: string;
  src: string;
  x: number;
  y: number;
  size: number;
}

interface Props {
  items: ImageItem[];
}
const ImageTrail: FC<Props> = ({ items }) => {
  return (
    <div className="relative w-full h-full">
      {items.map((item) => (
        <img
          key={item.id}
          src={item.src}
          className="absolute pointer-events-none"
          style={{
            left: item.x - item.size / 2,
            top: item.y - item.size / 2,
            width: item.size,
            height: item.size,
          }}
        />
      ))}
    </div>
  );
};

export default ImageTrail;
