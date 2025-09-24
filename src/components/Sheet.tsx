import { type FC } from 'react';
import type { SheetType } from '../types';

interface Props {
  sheet: SheetType;
  onTitleChange: (value: string) => void;
}

const Sheet: FC<Props> = ({ sheet, onTitleChange }) => {
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };
  return (
    <div className=" bg-sky-800 p-2 opacity-75  rounded-lg cursor-pointer">
      <div className="flex items-center">
        <input
          onChange={handleChangeTitle}
          value={sheet.title}
          className="text-center text-xs outline-0 cursor-pointer text-white"
        ></input>
      </div>
    </div>
  );
};

export default Sheet;
