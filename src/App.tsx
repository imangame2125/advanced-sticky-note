import { useEffect, useState } from 'react';
import Main from './components/main';
import StartScene from './components/StartScene';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true);
  }, []);

  const finishIntro = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showIntro ? <StartScene onFinish={finishIntro} /> : <Main />}
    </div>
  );
}
