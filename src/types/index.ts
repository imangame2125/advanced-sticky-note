export interface StickyNoteType {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'orange';
  title: string;
  id: number;
  isDragging: boolean;
  border: string;
}

export interface SheetType {
  id: number;
  title: string;
  stickyNotes: StickyNoteType[];
}
