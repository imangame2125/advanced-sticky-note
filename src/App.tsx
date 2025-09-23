import { Add } from 'iconsax-reactjs';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import StickyNote from './components/StickyNote';
import type { StickyNoteType } from './types';

function App() {
  const [list, setList] = useState<StickyNoteType[]>([
    {
      id: 1,
      width: 120,
      height: 120,
      positionX: 50,
      positionY: 100,
      zIndex: 2,
      color: 'green',
      title: 'Note 1',
    },
    {
      id: 2,
      width: 100,
      height: 100,
      positionX: 200,
      positionY: 150,
      zIndex: 3,
      color: 'red',
      title: 'Note 2',
    },

    {
      id: 3,
      width: 200,
      height: 200,
      positionX: 400,
      positionY: 350,
      zIndex: 4,
      color: 'blue',
      title: 'Note 3',
    },

    {
      id: 4,
      width: 200,
      height: 200,
      positionX: 100,
      positionY: 400,
      zIndex: 1,
      color: 'yellow',
      title: 'Note 3',
    },
  ]);
  const handleAddStickyNoteClick = () => {
    setList((prev) => [
      ...prev,
      {
        color: 'red',
        height: 100,
        width: 100,
        id: Math.random(),
        positionX: 200,
        positionY: 400,
        title: 'New Note',
        zIndex: 1,
      },
    ]);
  };
  const colors: StickyNoteType['color'][] = [
    'red',
    'blue',
    'green',
    'yellow',
    'indigo',
    'purple',
    'orange',
  ];
  return (
    <div className="flex flex-col min-h-screen  relative ">
      <div className="max-w-32 bg-white shadow-2xl flex flex-col flex-1 z-50">
        <div className="flex gap-4">
          <Sidebar colors={colors} />
        </div>
      </div>
      <div>
        {list.map((stickyNote) => {
          return (
            <StickyNote
              startPosition={132}
              key={stickyNote.id}
              item={stickyNote}
            />
          );
        })}
      </div>
      <button
        onClick={handleAddStickyNoteClick}
        className="px-2 py-2 rounded-md bg-pink-700 cursor-pointer flex items-center text-white text-xs absolute top-0 right-0 "
      >
        <Add size="18" color="#FFFFFF" />
        Add
      </button>
    </div>
  );
}

export default App;
