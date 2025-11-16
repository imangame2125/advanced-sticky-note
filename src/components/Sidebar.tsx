import type { FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  onClick: (color: StickyNoteType['color']) => void;
  selectedColor: StickyNoteType['color'] | null;
}
const Sidebar: FC<Props> = ({ onClick, selectedColor }) => {
  const colors: StickyNoteType['color'][] = [
    'red',
    'blue',
    'purple',
    'green',
    'yellow',
    'indigo',
    'pink',
    'orange',
  ];
  const handleClick = (color: StickyNoteType['color']) => {
    onClick(color);
  };

  return (
    <div className="grid grid-cols-2  from-violet-200 to-pink-200">
      {colors.map((color) => {
        return (
          <div
            key={color}
            onClick={() => handleClick(color)}
            style={{ background: color }}
            className={`w-10 h-10  m-2 rounded-lg cursor-pointer border-2 border-black${
              color === selectedColor ? 'border-4 border-gray-50' : ''
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default Sidebar;
