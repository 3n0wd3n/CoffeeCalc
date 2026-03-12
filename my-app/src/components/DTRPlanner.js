import React, { useState } from "react";
import { calculateDTRRemainingTimes, secondsToTimeString } from "../utils/timeUtils";

/**
 * Development Time Ratio (DTR) planner.  User enters first-crack time and
 * sees how much time remains if that crack represents 75–80% of the roast.
 *
 * Props: onResults - function(list) optional; similar to other modes
 */
function DTRPlanner({ onResults }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    const fc = m * 60 + s;
    if (fc <= 0) {
      alert("Please enter a valid first-crack time");
      return;
    }
    const list = calculateDTRRemainingTimes(fc);
    setResults(list);
    if (onResults) onResults(list);
  };

  return (
    <div className='dtr-planner manual-mode ratio-mode'>
      <h3>DTR Planner</h3>
      <p>Enter the time to first crack and see how much development time is needed.</p>
      <form onSubmit={handleSubmit}>
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
      {results.length > 0 && (
        <div className='percentage-list' style={{ marginTop: "1rem" }}>
          <h4>Development time required</h4>
          <ul>
            {results.map((r) => (
              <li key={r.percent}>
                FC as {r.percent}% &rarr; need {r.remainingTime} (total {r.totalTime})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DTRPlanner;
