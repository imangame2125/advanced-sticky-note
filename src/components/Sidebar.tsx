import type { FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  onClick: (color: StickyNoteType['color']) => void;
}
const Sidebar: FC<Props> = ({ onClick }) => {
  //todo: read colors from StickyNoteType
  const colors: StickyNoteType['color'][] = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'indigo',
    'orange',
  ];
  const handleClick = (color: StickyNoteType['color']) => {
    onClick(color);
  };
  return (
    <div className="grid grid-cols-2 ">
      {colors.map((color) => {
        return (
          <div
            key={color}
            onClick={() => handleClick(color)}
            style={{ background: color }}
            className="w-10 h-10  m-2 rounded-lg cursor-pointer"
          ></div>
        );
      })}
    </div>
  );
};

export default Sidebar;
