import type { FC } from 'react';

interface Props {
  onAddSticky: (id: number) => void;
  id: number;
}
const AddStickyNoteButton: FC<Props> = ({ onAddSticky, id }) => {
  return (
    <button
      onClick={() => onAddSticky(id)}
      className="bg-red-800 text-2xl cursor-pointer"
    >
      +
    </button>
  );
};

export default AddStickyNoteButton;
