import React, { useState } from "react";
import "./App.css";

// modes: ratio and manual operate on a roast time, density is post-roast
import RatioMode from "./components/RatioMode";
import ManualMode from "./components/ManualMode";
import ChargeTemp from "./components/ChargeTemp";
import DTRPlanner from "./components/DTRPlanner";
import PercentageList from "./components/PercentageList";
import RatioList from "./components/RatioList";
import PostRoast from "./components/PostRoast";

// root component orchestrates mode switching and displays results
function App() {
  const [mode, setMode] = useState("ratio"); // 'ratio', 'manual', 'charge', 'dtr' or 'density'
  const [results, setResults] = useState([]);
  const navRef = React.useRef(null);
  // underline logic removed since nav is now colored text only

  // clear previous results whenever the user changes mode
  React.useEffect(() => {
    setResults([]);
  }, [mode]);

  // underline logic removed; simply color active text

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Coffee Calc</h1>
      </header>

      <nav className='mode-nav' ref={navRef}>
        <button data-mode='ratio' onClick={() => setMode("ratio")} className={mode === "ratio" ? "active" : ""}>
          DTR Based on Total Time
        </button>
        <button data-mode='manual' onClick={() => setMode("manual")} className={mode === "manual" ? "active" : ""}>
          Manual Entry
        </button>
        <button data-mode='charge' onClick={() => setMode("charge")} className={mode === "charge" ? "active" : ""}>
          Charge Temp
        </button>
        <button data-mode='dtr' onClick={() => setMode("dtr")} className={mode === "dtr" ? "active" : ""}>
          DTR Planner
        </button>
        <button data-mode='density' onClick={() => setMode("density")} className={mode === "density" ? "active" : ""}>
          Post‑roast Weight Loss
        </button>
      </nav>

      <main>
        {mode === "ratio" && <RatioMode onResults={setResults} />}
        {mode === "manual" && <ManualMode onResults={setResults} />}
        {mode === "charge" && <ChargeTemp />}
        {mode === "dtr" && <DTRPlanner />}
        {mode === "density" && <PostRoast />}

        {/* pick the right list component depending on mode */}
        {mode === "ratio" && <RatioList items={results} />}
        {mode === "manual" && <PercentageList items={results} />}
      </main>
    </div>
  );
}

export default App;
