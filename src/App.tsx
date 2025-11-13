import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Image1 from './assets/images/image-1.png';
import Image10 from './assets/images/image-10.png';
import Image11 from './assets/images/image-11.png';
import Image12 from './assets/images/image-12.png';
import Image13 from './assets/images/image-13.png';
import Image14 from './assets/images/image-14.png';
import Image15 from './assets/images/image-15.png';
import Image2 from './assets/images/image-2.png';
import Image3 from './assets/images/image-3.png';
import Image4 from './assets/images/image-4.png';
import Image5 from './assets/images/image-5.png';
import Image6 from './assets/images/image-6.png';
import Image7 from './assets/images/image-7.png';
import Image8 from './assets/images/image-8.png';
import Image9 from './assets/images/image-9.png';
import CreativeGallery from './components/CreativeGallery';
import IntroZoom from './components/IntroZoom';
import Main from './components/main';
import type { Color } from './components/NoteChoice';
import NoteChoice from './components/NoteChoice';
import RedBox from './components/RedBox';
import SimpleGallery from './components/SimpleGallery';
import YellowWrapper from './components/yellowBox/YellowWrapper';
export default function App() {
  const imagesBlueComponent = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];

  const imagesYellowComponent = [
    Image10,
    Image9,
    Image8,
    Image11,
    Image12,
    Image13,
    Image14,
    Image15,
  ];
  const [visitedColors, setVisitedColors] = useState<Color[]>([]);
  const navigate = useNavigate();

  const handlePick = (color: Color) => {
    navigate(`/color/${color.toLowerCase()}`);
  };

  const handleFinishColor = (color: Color) => {
    if (!visitedColors.includes(color)) {
      setVisitedColors([...visitedColors, color]);
    }
    if (visitedColors.length + 1 === 4) {
      navigate('/main');
    } else {
      navigate('/choice');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <IntroZoom
            textImages={['1', '2', '3', '4']}
            directions={['bottom', 'left', 'right', 'top']}
            directionColor={['bg-amber-400', 'bg-blue-800', 'bg-green-800', 'bg-red-800']}
            onContinue={() => navigate('/choice')}
          />
        }
      />
      <Route
        path="/choice"
        element={
          <NoteChoice
            colors={['Red', 'Blue', 'Green', 'Yellow']}
            visitedColors={visitedColors}
            onPick={handlePick}
          />
        }
      />
      <Route path="/color/red" element={<RedBox onFinish={() => handleFinishColor('Red')} />} />
      <Route
        path="/color/blue"
        element={
          <SimpleGallery onFinish={() => handleFinishColor('Blue')} images={imagesBlueComponent} />
        }
      />
      <Route
        path="/color/yellow"
        element={
          <YellowWrapper
            onFinish={() => handleFinishColor('Yellow')}
            images={imagesYellowComponent}
          />
        }
      />
      <Route
        path="/color/green"
        element={<CreativeGallery onFinish={() => handleFinishColor('Green')} />}
      />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
