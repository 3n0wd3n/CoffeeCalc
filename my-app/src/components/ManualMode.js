import React, { useState } from "react";
import { calculateDevelopmentTimes } from "../utils/timeUtils";

/**
 * A simple manual entry interface. Users type minutes/seconds and hit calculate.
 * Props:
 *   onResults: function(array) - called with the computed list
 */
function ManualMode({ onResults }) {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    const total = m * 60 + s;
    if (total <= 0) {
      alert("Please enter a valid time");
      return;
    }
    const list = calculateDevelopmentTimes(total);
    onResults(list);
  };

  return (
    <form className='manual-mode' onSubmit={handleSubmit}>
      <h3>Enter crack time manually</h3>
      <div>
        <label>
          Minutes:
          <input type='number' min='0' value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Seconds:
          <input type='number' min='0' max='59' value={seconds} onChange={(e) => setSeconds(e.target.value)} />
        </label>
      </div>
      <button type='submit'>Calculate</button>
    </form>
  );
}

export default ManualMode;
