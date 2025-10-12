import { useState } from 'react';
import StickyNote2 from './_StickyNote';
import type { StickyNoteType } from './types';

const App2 = () => {
  const [notes, setNotes] = useState<StickyNoteType[]>([
    {
      id: 1,
      title: 'Buy milk',
      color: 'yellow',
      width: 200,
      height: 150,
      positionX: 100,
      positionY: 100,
      zIndex: 1,
      isDragging: false,
      border: '2px solid black',
    },
  ]);

  const handleTitleChange = (noteId: number, newTitle: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, title: newTitle } : note))
    );
  };

  const handleAdd = () => {
    const newNote: StickyNoteType = {
      id: Date.now(),
      title: 'New Note',
      color: 'blue',
      width: 200,
      height: 150,
      positionX: 50,
      positionY: 50,
      zIndex: 2,
      isDragging: false,
      border: '2px solid black',
    };

    setNotes((prev) => [...prev, newNote]);
  };
  return (
    <div>
      <button onClick={handleAdd}>Add Note</button>

      {notes.map((note) => {
        return (
          <div key={note.id}>
            <StickyNote2 ontitleChange={handleTitleChange} note={note} />
          </div>
        );
      })}
    </div>
  );
};

export default App2;
