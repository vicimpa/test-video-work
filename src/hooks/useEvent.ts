import { useCallback, useLayoutEffect, useRef } from "react";

export const useEvent = <T extends (...args: any[]) => any>(fn: T) => {
  const ref = useRef(fn as T | null);

  useLayoutEffect(() => {
    ref.current = fn;
    return () => {
      ref.current = null;
    };
  }, [fn]);

  return useCallback((
    (...args: Parameters<T>): ReturnType<T> => {
      if (!ref.current)
        throw new Error('Component will unmounted');

      return ref.current(...args);
    }
  ) as T, [ref]);
};