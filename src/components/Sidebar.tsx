import type { FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  colors: StickyNoteType['color'][];
}
const Sidebar: FC<Props> = ({ colors }) => {
  const backgroundMap: Record<StickyNoteType['color'], string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-10 h-10 rounded-xl my-4 px-2 cursor-grab ${backgroundMap[color]}`}
        ></div>
      ))}
    </div>
  );
};

export default Sidebar;
