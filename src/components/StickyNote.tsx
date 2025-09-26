import { type FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  item: StickyNoteType;
  startPosition: number;
}

const StickyNote: FC<Props> = ({ item, startPosition }) => {
  const backgorund = {
    green: 'bg-green-400',
    red: 'bg-red-600',
    blue: 'bg-blue-200',
    yellow: 'bg-yellow-500',
  };
  return (
    <div
      className={`${backgorund[item.color]} `}
      style={{
        width: item.width,
        height: item.height,
        position: 'absolute',
        top: item.positionY,
        left: item.positionX + startPosition,
      }}
    >
      <p>{item.title}</p>
    </div>
  );
};

export default StickyNote;
