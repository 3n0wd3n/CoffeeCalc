import React, { useState } from "react";
import { calculateRatios } from "../utils/timeUtils";

/**
 * Let the user enter a total roast time and compute a series of
 * 75:25 through 80:20 splits.  Each row reports the two portions
 * in mm:ss format.
 *
 * Props:
 *   onResults: function(array) - called with computed list
 */
function RatioMode({ onResults }) {
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
    const list = calculateRatios(total);
    onResults(list);
  };

  return (
    // reuse manual-mode styling so appearance is identical
    <form className='ratio-mode manual-mode' onSubmit={handleSubmit}>
      <h3>Roast time ratios</h3>
      <p>
        Enter the total roast duration and the app will show splits from 75:25 up through 80:20. Results are shown as
        two time values for each split.
      </p>
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

export default RatioMode;
