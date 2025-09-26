import { useState } from 'react';
import AddStickyNoteButton from './components/AddStickyNoteButton';
import Sidebar from './components/Sidebar';
import StickyNoteList from './components/StickyNoteList';
import type { StickNoteList } from './types';

function App() {
  const [notes, setNotes] = useState<StickNoteList[]>([
    {
      id: 1,
      listStickyNote: [
        {
          color: 'green',
          height: 100,
          id: Math.random(),
          positionX: 100,
          positionY: 100,
          title: 'Note-1',
          width: 100,
          zIndex: 1,
        },
      ],
    },
  ]);

  const handleAddStickyNoteClicked = (id: number) => {
    const copyNotes = [...notes];
    copyNotes.map((item) => item.listStickyNote);
  };

  return (
    <div className="min-h-screen flex flex-col relative ">
      <Sidebar />
      <div className="flex gap-4 p-4 w-full  justify-end">
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <StickyNoteList listStickyNote={note.listStickyNote} />
              <AddStickyNoteButton
                id={note.id}
                onAddSticky={handleAddStickyNoteClicked}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
