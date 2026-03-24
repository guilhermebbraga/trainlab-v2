import { useState, useRef, useCallback } from "react";

export default function useLongPress(callback: () => void, ms = 500) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  const start = useCallback(() => {
    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      if (navigator.vibrate) navigator.vibrate(50);
      callback();

      setIsPressing(false);
    }, ms);
  }, [callback, ms]);

  const stop = useCallback(() => {
    setIsPressing(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    isPressing,
  };
}
