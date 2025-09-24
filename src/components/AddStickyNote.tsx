import { Add } from 'iconsax-reactjs';
import { type FC } from 'react';

interface Props {
  AddStickyNote: () => void;
}
const AddStickyNote: FC<Props> = ({ AddStickyNote }) => {
  const handleAddStickyNoteClick = () => {
    AddStickyNote();
  };
  return (
    <div>
      <button
        onClick={handleAddStickyNoteClick}
        className="px-2 py-2 rounded-md bg-pink-700 cursor-pointer flex items-center text-white text-xs absolute top-0 right-0 "
      >
        <Add size="18" color="#FFFFFF" />
        Add
      </button>
    </div>
  );
};

export default AddStickyNote;
