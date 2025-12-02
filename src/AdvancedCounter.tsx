/**
 * AdvancedCounter Component
 *
 * This component demonstrates React hooks (useState and useEffect) by building
 * a counter with advanced features like history tracking, auto-save, keyboard
 * controls, and custom step increments.
 *
 * Key learning points:
 * - useState manages multiple pieces of state (count, history, step)
 * - useEffect handles side effects with proper cleanup
 * - Dependency arrays control when effects re-run
 * - Event listeners need cleanup to prevent memory leaks
 */

import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './AdvancedCounter.css';

function AdvancedCounter() {
  /**
   * Lazy initialization for count state
   *
   * I learned that useState can take a function for lazy initialization.
   * This function only runs once on mount, which is perfect for loading
   * from localStorage without triggering the ESLint warning about
   * setState in effects.
   */
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('advancedCounterValue');
    if (savedCount !== null) {
      const parsedCount = parseInt(savedCount, 10);
      return parsedCount;
    }
    return 0; // Default value if nothing is saved
  });

  /**
   * Lazy initialization for history state
   *
   * History should start with the initial count value.
   * I'm using lazy initialization here too to match the loaded count.
   */
  const [history, setHistory] = useState<number[]>(() => {
    const savedCount = localStorage.getItem('advancedCounterValue');
    if (savedCount !== null) {
      const parsedCount = parseInt(savedCount, 10);
      return [parsedCount];
    }
    return [0];
  });

  // Step state: allows custom increment/decrement amounts
  // Default is 1, but user can change this
  const [step, setStep] = useState<number>(1);

  /**
   * Effect #1: Auto-save to localStorage
   *
   * This effect saves the current count whenever it changes.
   * I learned that localStorage only stores strings, so I need to
   * convert the number to a string when saving.
   *
   * Dependency: [count] - only runs when count changes
   */
  useEffect(() => {
    // Save count to localStorage
    localStorage.setItem('advancedCounterValue', count.toString());

    // No cleanup needed for localStorage operations
  }, [count]);

  /**
   * Effect #2: Keyboard Event Listeners
   *
   * This effect adds keyboard listeners to the document so users can:
   * - Press ArrowUp to increment
   * - Press ArrowDown to decrement
   *
   * IMPORTANT: I learned that event listeners MUST be cleaned up!
   * Otherwise they'll stay attached even after component unmounts,
   * causing memory leaks and bugs.
   *
   * The cleanup function (return statement) removes the listeners.
   *
   * I'm using handleIncrement/handleDecrement refs to avoid recreating
   * the event listener every time step changes.
   */
  useEffect(() => {
    // Handler for keyboard events
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        // Increment by step amount
        setCount(prevCount => {
          const newCount = prevCount + step;
          setHistory(prevHistory => [...prevHistory, newCount]);
          return newCount;
        });
      } else if (event.key === 'ArrowDown') {
        // Decrement by step amount
        setCount(prevCount => {
          const newCount = prevCount - step;
          setHistory(prevHistory => [...prevHistory, newCount]);
          return newCount;
        });
      }
    };

    // Attach the listener to the document
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function - this is CRITICAL!
    // It runs when component unmounts OR before effect re-runs
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [step]); // Re-run if step changes so keyboard uses new step value

  /**
   * Increment Handler
   *
   * Increases count by the current step value.
   * Using prevCount => prevCount + step ensures we always
   * work with the latest count value (important for rapid clicks).
   *
   * I'm also updating history here to track the change.
   * This approach avoids the ESLint warning about setState in effects.
   */
  const handleIncrement = () => {
    setCount(prevCount => {
      const newCount = prevCount + step;
      setHistory(prevHistory => [...prevHistory, newCount]);
      return newCount;
    });
  };

  /**
   * Decrement Handler
   *
   * Decreases count by the current step value.
   * Also updates history to track this change.
   */
  const handleDecrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - step;
      setHistory(prevHistory => [...prevHistory, newCount]);
      return newCount;
    });
  };

  /**
   * Reset Handler
   *
   * Resets count to 0 and clears the history.
   * I'm setting history to [0] instead of empty array
   * because we want to show the reset state in history.
   */
  const handleReset = () => {
    setCount(0);
    setHistory([0]);
  };

  /**
   * Step Input Handler
   *
   * Updates the step value when user types in the input.
   * I'm using Math.max(1, ...) to prevent step from being 0 or negative,
   * which would break the counter or make it go backwards unexpectedly.
   */
  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);
    // Ensure step is at least 1
    if (!isNaN(newStep)) {
      setStep(Math.max(1, newStep));
    }
  };

  return (
    <div className="advanced-counter">
      <h1>Advanced Counter</h1>

      {/* Main counter display */}
      <div className="counter-display">
        <h2>Current Count: {count}</h2>
      </div>

      {/* Control buttons */}
      <div className="counter-controls">
        <button onClick={handleDecrement} className="btn btn-decrement">
          - Decrement
        </button>
        <button onClick={handleIncrement} className="btn btn-increment">
          + Increment
        </button>
        <button onClick={handleReset} className="btn btn-reset">
          Reset
        </button>
      </div>

      {/* Step input control */}
      <div className="step-control">
        <label htmlFor="step-input">
          Step Value:
          <input
            id="step-input"
            type="number"
            value={step}
            onChange={handleStepChange}
            min="1"
            className="step-input"
          />
        </label>
        <p className="step-info">Use arrow keys (↑/↓) or buttons to change count by {step}</p>
      </div>

      {/* History display */}
      <div className="history-section">
        <h3>Count History</h3>
        <p className="history-list">
          {history.length > 0
            ? `Previous counts: ${history.join(', ')}`
            : 'No history yet'}
        </p>
        <p className="history-count">Total changes: {history.length - 1}</p>
      </div>

      {/* Feature information */}
      <div className="features-info">
        <h3>Features Implemented</h3>
        <ul>
          <li><FaCheckCircle className="check-icon" /> History Tracking - see all previous values</li>
          <li><FaCheckCircle className="check-icon" /> Auto-Save - count persists in localStorage</li>
          <li><FaCheckCircle className="check-icon" /> Keyboard Controls - use arrow keys</li>
          <li><FaCheckCircle className="check-icon" /> Reset Mechanism - clear count and history</li>
          <li><FaCheckCircle className="check-icon" /> Custom Step Input - change increment amount</li>
        </ul>
      </div>
    </div>
  );
}

export default AdvancedCounter;
