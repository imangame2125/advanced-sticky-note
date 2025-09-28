import { type FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  item: StickyNoteType;
  startPosition?: number;
}

const StickyNote: FC<Props> = ({ item, startPosition = 132 }) => {
  const backgorund = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
  };
  return (
    <div
      style={{
        width: item.width,
        height: item.height,
        zIndex: item.zIndex,
        position: 'absolute',
        top: item.positionY,
        left: item.positionX + startPosition,
      }}
      className={`${
        backgorund[item.color]
      } cursor-pointer flex items-center rounded-lg `}
    >
      <p className="text-center mx-auto text-2xl">{item.title}</p>
    </div>
  );
};

export default StickyNote;
