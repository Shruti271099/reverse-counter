import React, { useRef, useState, useEffect } from "react";
import Confetti from "js-confetti";
import "./App.css";

const confetti = new Confetti();

const App = () => {
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const isCountingUpRef = useRef(false);
  const ref = useRef();

 
  const handleReset = () => {
    setCount(0);
    setStartCounting(false);
    isCountingUpRef.current = false;
  };
  useEffect(() => {
    if (startCounting) {
      ref.current = setInterval(() => {
        setCount((c) => {
          if (isCountingUpRef.current) {
            if (c >= 5) {
              isCountingUpRef.current = false;
              return c - 1;
            }
            return c + 1;
          } else {
            if (c <= 0) {
              isCountingUpRef.current = true;
              return c + 1;
            }
            return c - 1;
          }
        }),
          confetti.addConfetti();
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [startCounting]);

  return (
    <div className="app">
      <div className="counter-display">
        <p className="count">{count}</p>
      </div>
      <div className="buttons">
        <button className="btn" onClick={() => setStartCounting(true)}>
          Start
        </button>
        <button className="btn" onClick={() => setStartCounting(false)}>
          Pause
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
