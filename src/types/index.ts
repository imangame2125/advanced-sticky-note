export interface StickyNoteType {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
  color: 'red' | 'blue' | 'green' | 'yellow';
  title: string;
  id: number;
}

export interface StickNoteList {
  listStickyNote: StickyNoteType[];
  id: number;
}
