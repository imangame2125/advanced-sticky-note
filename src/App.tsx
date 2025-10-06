import { useEffect, useState } from 'react';
import AddSheetButton from './components/AddSheet';
import AddStickyNote from './components/AddStickyNote';
import DeleteStickyNotesButton from './components/DeleteStickyNotesButton';
import SheetList from './components/SheetList';
import Sidebar from './components/Sidebar';
import StickyNote from './components/StickyNote';
import type { SheetType, StickyNoteType } from './types';

function App() {
  // const [zIndex, setZindex] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<StickyNoteType['color'] | null>(null);
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
          zIndex: 5,
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
                  title: '',
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
      prev.map((sheet) => (sheet.id === id ? { ...sheet, title: value } : sheet))
    );
  };

  const handleColorClick = (color: StickyNoteType['color']) => {
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleTitleChangeStickyNote = (e: React.ChangeEvent<HTMLInputElement>, noteId: number) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                note.id === noteId ? { ...note, title: e.target.value } : note
              ),
            }
      )
    );
  };
  const handleStickyNoteClick = (id: number) => {
    setSelectedColor(null);
    const currentSheet = sheets.find((sheet) => sheet.id === activeSheetId);
    // for (let i = 0; i < currentSheet!.stickyNotes.length; i++) {
    //   const element = currentSheet!.stickyNotes[i];
    //   if (element.zIndex > maxZindex) {
    //     maxZindex = element.zIndex;
    //   }
    // }
    // currentSheet?.stickyNotes.forEach((note) => {
    //   if (note.zIndex > maxZindex) {
    //     maxZindex = note.zIndex;
    //   }
    // });
    // console.log(maxZindex);
    const zIndexes = currentSheet!.stickyNotes.map((note) => note.zIndex);
    console.log(Math.max(...zIndexes));
    const maxZindex = Math.max(...zIndexes);

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.map((note) =>
                note.id === id ? { ...note, zIndex: maxZindex + 1 } : note
              ),
            }
      )
    );
  };
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedColor) {
      const width = 100;
      const height = 100;
      const rect = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - rect.left - width / 2;
      let y = e.clientY - rect.top - height / 2;
      const maxX = document.body.clientWidth - width / 2;
      const maxY = document.body.clientHeight - height / 2;
      const minX = rect.left + width / 2;
      const minY = rect.top + height / 2;
      if (e.clientX > maxX) {
        x = x - width / 2;
      }
      if (e.clientY > maxY) {
        y = y - height / 2;
      }

      if (e.clientX < minX) {
        x = x + width / 2;
      }

      if (e.clientY < minY) {
        y = y + height / 2;
      }
      const newSticky: StickyNoteType = {
        title: '',
        color: selectedColor,
        height: height,
        id: Math.random(),
        positionX: x,
        positionY: y,
        width: width,
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

  const handleRightClickOnStickyNote = (e: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    e.preventDefault();
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id !== activeSheetId
          ? sheet
          : {
              ...sheet,
              stickyNotes: sheet.stickyNotes.filter((note) => note.id !== noteId),
            }
      )
    );
  };

  const handleDeleteStickyNotesClick = (sheetId: number) => {
    setSheets((prev) =>
      prev.map((sheet) => (sheet.id === sheetId ? { ...sheet, stickyNotes: [] } : sheet))
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
          <StickyNote
            onContextMenu={(e) => handleRightClickOnStickyNote(e, note.id)}
            onStickyNoteClick={() => handleStickyNoteClick(note.id)}
            onTitleChange={(e) => handleTitleChangeStickyNote(e, note.id)}
            key={note.id}
            item={note}
          />
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
        <DeleteStickyNotesButton onDelete={() => handleDeleteStickyNotesClick(activeSheetId)} />
      </div>
    </div>
  );
}

export default App;
