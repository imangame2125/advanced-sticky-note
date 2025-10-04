import { type FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  item: StickyNoteType;
}

const StickyNote: FC<Props> = ({ item }) => {
  return (
    <div
      style={{
        width: item.width,
        height: item.height,
        zIndex: item.zIndex,
        position: 'absolute',
        top: item.positionY,
        left: item.positionX,
        background: item.color,
      }}
      className="cursor-pointer flex items-center rounded-lg"
    >
      <p className="text-center mx-auto text-2xl">{item.title}</p>
    </div>
  );
};

export default StickyNote;
