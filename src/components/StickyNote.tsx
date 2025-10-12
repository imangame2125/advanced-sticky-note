import { type FC } from 'react';
import type { StickyNoteType } from '../types';

export interface TitleChangeEventArg {
  text: string;
  noteId: number;
}

interface Props {
  item: StickyNoteType;
  onTitleChange: (arg: TitleChangeEventArg) => void;
  onStickyNoteClick: (id: number) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onMouseDown: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  selected: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const StickyNote: FC<Props> = ({
  item,
  onTitleChange,
  onStickyNoteClick,
  onContextMenu,
  selected,
  onMouseDown,
  onKeyDown,
  onMouseUp,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange({ text: e.target.value, noteId: item.id });
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onContextMenu(e, item.id);
  };
  const handleStickyNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onStickyNoteClick(item.id);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown(item.id, e);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseUp={onMouseUp}
      onMouseDown={handleMouseDown}
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
        border: selected ? '4px dashed white' : 'none',
      }}
      className="cursor-pointer flex items-center rounded-lg "
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
