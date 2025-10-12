import { useState } from 'react';
import type { StickyNoteType } from './types';
interface Props {
  note: StickyNoteType;
  ontitleChange: (id: number, text: string) => void;
}
const StickyNote2 = ({ note, ontitleChange }: Props) => {
  const [text, setText] = useState<string>(note.title);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    ontitleChange(note.id, value);
  };

  return (
    <div
      style={{
        background: note.color,
        width: note.width,
        height: note.height,
        position: 'absolute',
        top: note.positionY,
        left: note.positionX,
        border: note.border,
        padding: 8,
      }}
    >
      <input type="text" value={text} onChange={handleInputChange} style={{ width: '100%' }} />
    </div>
  );
};

export default StickyNote2;
