import { type FC } from 'react';
import type { StickyNote as StickyNoteType } from '../types';

interface Props {
  item: StickyNoteType;
}

const StickyNote: FC<Props> = ({ item }) => {
  const backgorund = {
    green: 'bg-green-400',
    red: 'bg-red-600',
    blue: 'bg-blue-200',
    yellow: 'bg-yellow-500',
  };
  return (
    <div
      className={`${
        backgorund[item.color]
      } w-[100px] h-[100px] absolute top-[20px] left-[100px] z-[1]`}
      //   style={{
      //     background: item.color,
      //     width: item.width,
      //     height: item.height,
      //     position: 'absolute',
      //     top: item.positionY,
      //     left: item.positionX,
      //   }}
    >
      <p>{item.title}</p>
    </div>
  );
};

export default StickyNote;
