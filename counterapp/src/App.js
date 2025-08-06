import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);
  const [autoIncrement, setAutoIncrement] = useState(false);

  // Limit settings
  const MIN = 0;
  const MAX = 1000;

  const increment = () => {
    if (count < MAX) {
      setCount(prev => prev + 1);
      setHistory(prev => [`+1 → ${count + 1}`, ...prev]);
    }
  };

  const decrement = () => {
    if (count > MIN) {
      setCount(prev => prev - 1);
      setHistory(prev => [`-1 → ${count - 1}`, ...prev]);
    }
  };

  const reset = () => {
    setCount(0);
    setHistory(prev => [`Reset → 0`, ...prev]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Auto-increment effect
  useEffect(() => {
    let interval = null;
    if (autoIncrement && count < MAX) {
      interval = setInterval(() => {
        setCount(prev => {
          const newCount = prev + 1;
          if (newCount <= MAX) {
            setHistory(prev => [`Auto +1 → ${newCount}`, ...prev]);
          }
          return newCount > MAX ? MAX : newCount;
        });
      }, 1000);
    } else if (!autoIncrement && interval !== null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [autoIncrement, count]);

  return (
    <div className={`App ${theme}`}>
      <h1>🌟 Enhanced Counter App</h1>
      <h2 className="count">{count}</h2>

      {count === MAX && <p className="warning">🚫 Max limit reached!</p>}
      {count === MIN && <p className="warning">⚠️ Min limit reached!</p>}

      <div className="buttons">
        <button onClick={increment} disabled={count >= MAX}>Increment</button>
        <button onClick={decrement} disabled={count <= MIN}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="options">
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <button onClick={() => setAutoIncrement(!autoIncrement)}>
          {autoIncrement ? '⏸ Stop Auto' : '▶ Auto Increment'}
        </button>
      </div>

      <h3>Action History</h3>
      <ul className="history">
        {history.slice(0, 5).map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
