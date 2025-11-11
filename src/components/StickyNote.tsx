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
  onResizeStart: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
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
  onResizeStart,
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
        border: selected ? '8px solid violet' : ' none',
        cursor: selected ? 'pointer' : 'nw-resize',
      }}
      className="cursor-pointer flex items-center rounded-lg "
    >
      <div
        onMouseDown={(e) => onResizeStart(item.id, e)}
        className="absolute bottom-1 right-1 w-4 h-4 bg-white cursor-nwse-resize rounded-sm"
      />
      <input
        autoFocus
        value={item.title}
        className="w-24 border-none outline-0 text-center mx-auto text-white"
        onChange={handleTextChange}
        type="text"
      />
    </div>
  );
};

export default StickyNote;
