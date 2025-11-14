import { useRef, type FC } from 'react';
import { useFollowPointer } from '../../utils/useFollowPointer';
import Boxes, { type BoxProps } from './Boxes';

interface Props {
  onFinish: () => void;
}

const RedBox: FC<Props> = ({ onFinish }) => {
  const refRed = useRef<HTMLDivElement | null>(null);
  const refBlue = useRef<HTMLDivElement | null>(null);
  const refGreen = useRef<HTMLDivElement | null>(null);
  const refYellow = useRef<HTMLDivElement | null>(null);
  const { x: xRed, y: yRed } = useFollowPointer(refRed, 0);
  const { x: xBlue, y: yBlue } = useFollowPointer(refBlue, Math.PI / 2);
  const { x: xGreen, y: yGreen } = useFollowPointer(refGreen, Math.PI);
  const { x: xYellow, y: yYellow } = useFollowPointer(refYellow, (3 * Math.PI) / 2);
  const boxes: BoxProps[] = [
    {
      width: 100,
      height: 100,
      color: 'red',
      name: 'Red',
      textColor: 'black',
      ref: refRed,
      x: xRed,
      y: yRed,
    },
    {
      width: 100,
      height: 100,
      color: 'blue',
      name: 'Blue',
      textColor: 'black',
      ref: refBlue,
      x: xBlue,
      y: yBlue,
    },
    {
      width: 100,
      height: 100,
      color: 'green',
      name: 'Green',
      textColor: 'black',
      ref: refGreen,
      x: xGreen,
      y: yGreen,
    },
    {
      width: 100,
      height: 100,
      color: 'yellow',
      name: 'Yellow',
      textColor: 'black',
      ref: refYellow,
      x: xYellow,
      y: yYellow,
    },
  ];

  return (
    <div className='bg-black w-full h-screen' >
      <Boxes onFinish={onFinish} box={boxes} />
    </div>
  );  
};

export default RedBox;
