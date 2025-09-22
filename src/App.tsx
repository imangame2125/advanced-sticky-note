import StickyNote from './components/StickyNote';

function App() {
  return (
    <div>
      <StickyNote
        item={{
          width: 100,
          height: 100,
          color: 'blue',
          positionX: 100,
          positionY: 20,
          title: 'Note',
          zIndex: 1,
        }}
      />

      {/* <div className="bg-green-400">asjjfaksm</div> */}
    </div>
  );
}

export default App;
