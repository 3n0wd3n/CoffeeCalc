import React, { useState, useRef, useEffect } from "react";
import { calculateDevelopmentTimes, secondsToTimeString } from "../utils/timeUtils";

/**
 * Listens to the microphone and tries to detect the "first crack" sound.
 * Once the event is detected the elapsed time is passed to onResults.
 *
 * This component uses the Web Audio API to compute the RMS level of the
 * incoming audio stream and watches for a sudden spike above a heuristic
 * threshold.  Real roast cracking detection may require more sophisticated
 * DSP; this is a simple example.
 */
function ListeningMode({ onResults }) {
  const [listening, setListening] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const lastRmsRef = useRef(0);

  const threshold = 0.2; // tune depending on environment

  const start = async () => {
    setError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Microphone API not supported by this browser");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = handleProcess;
      source.connect(processor);
      processor.connect(ctx.destination); // required in some browsers
      processorRef.current = processor;

      startTimeRef.current = ctx.currentTime;
      setElapsed(0);
      setListening(true);

      intervalRef.current = setInterval(() => {
        const now = ctx.currentTime;
        setElapsed(now - startTimeRef.current);
      }, 100);
    } catch (err) {
      console.error("microphone access denied", err);
      // give more descriptive guidance
      let msg = "Could not access microphone. ";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        msg += "Permission was denied. Please allow microphone use.";
      } else if (err.name === "NotFoundError") {
        msg += "No microphone device was found.";
      } else if (err.name === "NotReadableError") {
        msg += "Microphone is busy or unavailable.";
      } else {
        msg += "Make sure you are running on HTTPS and that the browser supports getUserMedia.";
      }
      setError(msg);
    }
  };

  const stop = () => {
    setListening(false);
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleCrack = (seconds) => {
    stop();
    const list = calculateDevelopmentTimes(seconds);
    onResults(list);
  };

  const handleProcess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * input[i];
    }
    const rms = Math.sqrt(sum / input.length);
    // look for a sudden jump from previous value
    if (rms - lastRmsRef.current > threshold) {
      const now = audioContextRef.current.currentTime;
      const elapsedSeconds = now - startTimeRef.current;
      handleCrack(elapsedSeconds);
    }
    lastRmsRef.current = rms;
  };

  useEffect(() => {
    // cleanup when unmounting
    return () => {
      stop();
    };
  }, []);

  return (
    <div className='listening-mode'>
      <h3>Listening for first crack</h3>
      <button onClick={listening ? stop : start}>{listening ? "Stop listening" : "Start listening"}</button>
      {error && <p className='error-text'>{error}</p>}
      {listening && <p className='elapsed-display'>Elapsed: {secondsToTimeString(elapsed)}</p>}
    </div>
  );
}

export default ListeningMode;
