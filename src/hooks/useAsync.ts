import { useCallback, useLayoutEffect, useState } from "react";

export type UseAsyncResult<T> = [
  result: null,
  loading: true,
  error: null,
  reload: () => void,
] | [
  result: T,
  loading: false,
  error: null,
  reload: () => void,
] | [
  result: null,
  loading: false,
  error: Error,
  reload: () => void,
];

export const useAsync = <T>(fn: () => T | Promise<T>, deps: any[] = []) => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    setLoading(true);
    setResult(null);
    setError(null);

    Promise.resolve()
      .then(fn)
      .then(result => {
        setResult(result);
      })
      .catch(error => {
        if (error instanceof Error)
          return setError(error);
        setError(new Error(`${error}`));
      })
      .finally(() => {
        setLoading(false);
      });

  }, [count, ...deps]);

  const reload = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  return [result, loading, error, reload] as UseAsyncResult<T>;
};