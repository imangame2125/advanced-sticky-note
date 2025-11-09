import { useEffect, useState } from 'react';
import IntroZoom from './components/IntroZoom';
import Main from './components/main';
import CreativeGallery from './components/MyAnimation';
import NoteChoice from './components/NoteChoice';

export default function App() {
  const [step, setStep] = useState<'intro' | 'choice' | 'board'|'final'>('intro');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true);
  }, [showIntro]);

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
        <NoteChoice onPick={() => setStep('final')} colors={['Red', 'Blue', 'Green']} />
      )}

        {step === 'final' && (
        <CreativeGallery onFinish={() => setStep('board')} />
      )}
    </>
  );
}
