import React, { useState } from "react";
import { calculateChargeTemp } from "../utils/timeUtils";

/**
 * Charge temperature calculator based on bean density.  The component shows a
 * range between the conservative and aggressive estimates (no profile toggle).
 *
 * Props: none
 */
function ChargeTemp() {
  const [density, setDensity] = useState(630);
  const [range, setRange] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const d = parseFloat(density);
    if (isNaN(d)) {
      alert("Please enter a valid density");
      return;
    }

    const cons = calculateChargeTemp(d, "conservative");
    const aggr = calculateChargeTemp(d, "aggressive");
    // ensure lower-first order
    const low = Math.min(cons, aggr);
    const high = Math.max(cons, aggr);
    setRange({ low, high });
  };

  return (
    <form className='ratio-mode manual-mode' onSubmit={handleSubmit}>
      <h3>Charge temperature</h3>
      <p>Enter bean density and view the estimated temperature range (°C).</p>
      <div>
        <label>
          Bean density (g/L):
          <input type='number' min='0' step='any' value={density} onChange={(e) => setDensity(e.target.value)} />
        </label>
      </div>
      <button type='submit'>Calculate</button>
      {range && (
        <div className='loss-results' style={{ marginTop: "1rem" }}>
          <p>
            Estimated charge temp: {range.low.toFixed(1)}–{range.high.toFixed(1)}
            °C
          </p>
        </div>
      )}
    </form>
  );
}

export default ChargeTemp;
