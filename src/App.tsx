import { useEffect, useState } from 'react';
import AddSheetButton from './components/AddSheet';
import AddStickyNote from './components/AddStickyNote';
import SheetList from './components/SheetList';
import Sidebar from './components/Sidebar';
import StickyNote from './components/StickyNote';
import type { SheetType, StickyNoteType } from './types';

function App() {
  const [selectedColor, setSelectedColor] = useState<
    StickyNoteType['color'] | null
  >(null);
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
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedColor) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newSticky: StickyNoteType = {
        title: 'iman',
        color: selectedColor,
        height: 100,
        id: Math.random(),
        positionX: x,
        positionY: y,
        width: 100,
        zIndex: 1,
      };

      const nextState = sheets.map((sheet) => {
        if (sheet.id === activeSheetId) {
          return { ...sheet, stickyNotes: [...sheet.stickyNotes, newSticky] };
        } else {
          return sheet;
        }
      });
      setSheets(nextState);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setSelectedColor(null);
      }
    });
  }, []);

  const handleDeleteStickyNotesClick = (sheetId: number) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId ? { ...sheet, stickyNotes: [] } : sheet
      )
    );
  };
  const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId);

  return (
    <div className=" flex min-h-screen">
      <div className="max-w-32 bg-gray-400 shadow-2xl flex flex-col flex-1 z-50">
        <Sidebar selectedColor={selectedColor} onClick={handleColorClick} />
      </div>
      <div onClick={handleContainerClick} className=" relative flex-1">
        {activeSheet?.stickyNotes.map((note) => (
          <StickyNote key={note.id} item={note} />
        ))}

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
        <button
          onClick={() => handleDeleteStickyNotesClick(activeSheetId)}
          className="px-4 py-2 bg-red-800 w-20 h-10 rounded-lg text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
