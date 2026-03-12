// utility helpers for converting time and calculating various ratios

export function secondsToTimeString(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Given a roast time in seconds, return an array of objects representing
 * 20% through 25% of that duration.  Each object contains the percentage and
 * a formatted mm:ss string.
 */
export function calculateDevelopmentTimes(totalSeconds) {
  const list = [];
  for (let pct = 20; pct <= 25; pct++) {
    const devSeconds = (totalSeconds * pct) / 100;
    const combined = totalSeconds + devSeconds;
    list.push({
      percent: pct,
      time: secondsToTimeString(devSeconds),
      combinedTime: secondsToTimeString(combined),
    });
  }
  return list;
}

/**
 * Given a total roast time in seconds, return an array of objects describing
 * splits from 75:25 up through 80:20.  Each entry contains the leading
 * percentage, and the two durations formatted for display.
 */
export function calculateRatios(totalSeconds) {
  const list = [];
  for (let pct = 75; pct <= 80; pct++) {
    const first = (totalSeconds * pct) / 100;
    const second = totalSeconds - first;
    list.push({
      percent: pct,
      firstTime: secondsToTimeString(first),
      secondTime: secondsToTimeString(second),
    });
  }
  return list;
}

/**
 * Determine a charge / final roasting temperature based on bean density and
 * chosen intensity.  Assumes standard reference of 630 g/L and 180 °C.
 *
 * - conservative: every 20 g/L above the standard adds 2 °C
 * - aggressive: every 10 g/L above the standard adds 5 °C
 */
export function calculateChargeTemp(density, profile) {
  const diff = density - 630;
  let temp = 180;
  if (profile === "conservative") {
    temp += (diff / 20) * 2;
  } else {
    temp += (diff / 10) * 5;
  }
  return temp;
}

/**
 * Given seconds until first crack, compute the remaining development phase
 * times when that crack represents 75‑80% of the total roast.  Returns an array
 * of {percent, remainingSeconds, remainingTime}.
 */
export function calculateDTRRemainingTimes(fcSeconds) {
  const list = [];
  for (let fcPct = 75; fcPct <= 80; fcPct++) {
    const total = fcSeconds / (fcPct / 100);
    const remaining = total - fcSeconds;
    list.push({
      percent: fcPct,
      remainingSeconds: remaining,
      remainingTime: secondsToTimeString(remaining),
      totalSeconds: total,
      totalTime: secondsToTimeString(total),
    });
  }
  return list;
}
