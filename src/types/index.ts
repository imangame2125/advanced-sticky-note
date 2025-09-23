export interface StickyNoteType {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'orange';
  title: string;
  id: number;
}

export interface ListStickyNote {
  StickyNote: StickyNoteType[];
  id: number;
}
