import type { FC } from 'react';
import type { StickyNoteType } from '../types';
import StickyNote from './StickyNote';

interface Props {
  listStickyNote: StickyNoteType[];
}
const StickyNoteList: FC<Props> = ({ listStickyNote }) => {
  return (
    <div>
      {listStickyNote.map((item) => {
        return <StickyNote startPosition={64} key={item.id} item={item} />;
      })}
    </div>
  );
};

export default StickyNoteList;
