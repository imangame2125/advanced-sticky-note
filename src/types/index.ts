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

export interface SheetType {
  id: number;
  title: string;
  stickyNotes: StickyNoteType[];
}

// export interface Sheet2 {
//   id: number;
//   title: string;
// }

// export interface StickyNoteType2 {
//   width: number;
//   height: number;
//   positionX: number;
//   positionY: number;
//   zIndex: number;
//   color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'orange';
//   title: string;
//   id: number;
//   isDragging: boolean;
//   border: string;
//   sheetId: number;
// }
