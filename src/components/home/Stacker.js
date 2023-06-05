import React, { useState, useRef } from 'react';
import SendSolForm from './Button';
import { Buffer } from 'buffer';

function Stacker() {
    window.Buffer = Buffer;

  const [boxes, setBoxes] = useState([]);
  const [currentBox, setCurrentBox] = useState(0);
  const boxRef = useRef();

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) { // spacebar
      addBox();
    }
  };

  const addBox = () => {
    const newBox = currentBox + 1;
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setCurrentBox(newBox);
  };

  const removeBox = () => {
    if (boxes.length > 0) {
      setBoxes((prevBoxes) => prevBoxes.slice(0, -1));
      setCurrentBox((prevBox) => prevBox - 1);
    }
  };

  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex={0}>
     <SendSolForm cost={9}/>
    </div>
  );
}

export default Stacker;
