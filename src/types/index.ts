export interface StickyNote {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
  color: 'red' | 'blue' | 'green' | 'yellow';
  title: string;
}
