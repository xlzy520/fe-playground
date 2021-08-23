// @ts-ignore
import { useState, useEffect, useRef } from 'react';

const useDebounce = <T>(value: T, interval: number = 200)=>{
  const [debounce, setDebounce] = useState<T>(value);
  useEffect(()=> {
    const timer = setTimeout(() => {
      setDebounce(() => value)
    }, interval)

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])
  return debounce
}

const debounce = (fn: Function, interval: number) => {
  let timer = null
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function");
  }

  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
      clearTimeout(timer)
    }, interval)
  }
}


const useThrottle = <T>(value: T, interval: number = 200) => {
  const [throttleValue, setThrottleValue] = useState<T>(value)
  const startTimeRef = useRef<number>(Date.now())
  useEffect(() => {
    let endTime: number = Date.now()
    const startTime: number = startTimeRef.current
    let timer
    const diffTime = endTime - startTime
    const nextTime = interval - (endTime - startTime)
    if (diffTime >= interval) {
      startTimeRef.current = Date.now()
      setThrottleValue(value)
    } else {
      timer = setTimeout(() => {
        startTimeRef.current = Date.now()
        setThrottleValue(value)
      }, nextTime)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])
  return throttleValue
}

const throttle = (fn: Function, interval: number) => {
  let timer
  let startTime: number = Date.now()

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    let endTime: number = Date.now()
    const diffTime: number = endTime - startTime
    const nextTime: number = interval - diffTime
    if (diffTime >= interval) {
      startTime = Date.now()
      fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        startTime = Date.now()
        fn.apply(this, args)
        timer = null
        clearTimeout(timer)
      }, nextTime)
    }
  }
}


/* istanbul ignore next */
/** keep typescript happy */
const noop = () => {};

export function useInterval(
  callback: () => void,
  delay: number | null | false,
  immediate?: boolean
) {
  const savedCallback = useRef(noop);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current();
  }, [immediate]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null || delay === false) return undefined;
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
