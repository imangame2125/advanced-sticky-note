import { useState } from 'react';
import CreativeGallery from './components/CreativeGallery';
import IntroZoom from './components/IntroZoom';
import Main from './components/main';
import type { Color } from './components/NoteChoice';
import NoteChoice from './components/NoteChoice';
import RedBox from './components/RedBox';

export default function App() {
  const [step, setStep] = useState<'intro' | 'choice' | 'board' | 'final' | 'custom'>('intro');
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const handlePick = (color: Color) => {
    setSelectedColor(color);

    switch (color) {
      case 'Red':
        setStep('custom');
        break;
      case 'Blue':
        setStep('custom');
        break;
      case 'Yellow':
        setStep('custom');
        break;
      case 'Green':
        setStep('final');
        break;
    }
  };

  return (
    <>
      {step === 'board' && <Main />}

      {step === 'intro' && (
        <IntroZoom
          textImages={['1', '2', '3', '4']}
          directionColor={['bg-amber-400', 'bg-green-800', 'bg-blue-800', 'bg-red-800']}
          directions={['top', 'bottom', 'left', 'right']}
          onContinue={() => setStep('choice')}
        />
      )}

      {step === 'choice' && (
        <NoteChoice colors={['Red', 'Blue', 'Green', 'Yellow']} onPick={handlePick} />
      )}

      {step === 'custom' && selectedColor && (
        <div className="min-h-screen flex items-center justify-center text-white text-4xl bg-black">
          {selectedColor === 'Red' && <RedBox onFinish={() => {}} />}
          {selectedColor === 'Blue' && 'Hello World'}
          {selectedColor === 'Yellow' && 'Something else'}
        </div>
      )}

      {step === 'final' && <CreativeGallery onFinish={() => setStep('board')} />}
    </>
  );
}
