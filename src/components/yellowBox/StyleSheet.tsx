import React from 'react';

const StyleSheet: React.FC = () => {
  return (
    <style>{`
      html { scroll-snap-type: y mandatory; }
      .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: black;
      }
      .img-container > div {
        width: 800px;
        height: 700px;
        margin: 20px;
        background: #111;
        overflow: hidden;
      }
      .img-container img {
        width: 800px;
        height: 700px;
        object-fit: cover;
      }
      .img-container h2 {
        color: #8df0cc;
        font-family: "Azeret Mono", monospace;
        font-size: 250px;
        font-weight: 700;
        position: absolute;
        top: calc(28% - 25px);
      }
      .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 8px;
        background: #8df0cc;
        bottom: 50px;
        transform: scaleX(0);
        transform-origin: 0%;
      }
    `}</style>
  );
};

export default StyleSheet;
