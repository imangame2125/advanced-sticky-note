import { type FC } from 'react';

interface Props {
  onDelete: () => void;
}
const DeleteStickyNotesButton: FC<Props> = ({ onDelete }) => {
  const handleDelete = () => {
    console.log('asdakd');

    onDelete();
  };
  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-800  rounded-lg cursor-pointer text-white text-sm mx-2"
    >
      Delete All
    </button>
  );
};

export default DeleteStickyNotesButton;
