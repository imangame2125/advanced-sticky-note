import { useState } from 'react';
import AddSheetButton from './components/AddSheet';
import AddStickyNote from './components/AddStickyNote';
import SheetList from './components/SheetList';
import Sidebar from './components/Sidebar';
import StickyNote from './components/StickyNote';
import type { SheetType, StickyNoteType } from './types';

function App() {
  const [activeSheetId, setActiveSheetId] = useState<number>(1);

  const [sheets, setSheets] = useState<SheetType[]>([
    {
      id: 1,
      title: 'Sheet 1',
      stickyNotes: [
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
      ],
    },
  ]);

  const handleSelectSheet = (id: number) => {
    setActiveSheetId(id);
  };

  const handleAddStickyNoteClick = () => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === activeSheetId
          ? {
              ...sheet,
              stickyNotes: [
                ...sheet.stickyNotes,
                {
                  id: Math.random(),
                  width: 100,
                  height: 100,
                  positionX: 200,
                  positionY: 400,
                  zIndex: 1,
                  color: 'red',
                  title: 'New Note',
                },
              ],
            }
          : sheet
      )
    );
  };

  const handleAddSheet = () => {
    const newSheet: SheetType = {
      id: Math.random(),
      title: `Sheet ${sheets.length + 1}`,
      stickyNotes: [],
    };
    setSheets((prev) => [...prev, newSheet]);
    setActiveSheetId(newSheet.id);
  };

  const handleTitleChange = (id: number, value: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === id ? { ...sheet, title: value } : sheet
      )
    );
  };

  const handleColorClick = (color: StickyNoteType['color']) => {
    const newSticky: StickyNoteType = {
      title: 'iman',
      color,
      height: 100,
      id: Math.random(),
      positionX: 200,
      positionY: 100,
      width: 100,
      zIndex: 1,
    };
    const nextState = sheets.map((sheet) =>
      sheet.id === activeSheetId
        ? { ...sheet, stickyNotes: [...sheet.stickyNotes, newSticky] }
        : sheet
    );
    setSheets(nextState);
  };

  const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="max-w-32 bg-gray-400 shadow-2xl flex flex-col flex-1 z-50">
        <Sidebar onClick={handleColorClick} />
      </div>

      <div>
        {activeSheet?.stickyNotes.map((note) => (
          <StickyNote key={note.id} item={note} />
        ))}
      </div>

      <AddStickyNote AddStickyNote={handleAddStickyNoteClick} />

      <div className="p-4 absolute right-0 bottom-0 flex items-center">
        <SheetList
          activeSheetId={activeSheetId}
          sheets={sheets}
          onTitleChange={handleTitleChange}
          onSelectSheet={handleSelectSheet}
        />
        <div className="flex items-center space-x-2">
          <AddSheetButton onAddSheet={handleAddSheet} />
        </div>
      </div>
    </div>
  );
}

export default App;
