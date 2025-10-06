import { type FC } from 'react';
import type { StickyNoteType } from '../types';

interface Props {
  item: StickyNoteType;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStickyNoteClick: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const StickyNote: FC<Props> = ({ item, onTitleChange, onStickyNoteClick, onContextMenu }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onContextMenu(e);
  };
  const handleStickyNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onStickyNoteClick();
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleStickyNoteClick}
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
      <input
        autoFocus
        value={item.title}
        className="w-24 border-none outline-0 text-center mx-auto"
        onChange={handleTextChange}
        type="text"
      />
    </div>
  );
};

export default StickyNote;
