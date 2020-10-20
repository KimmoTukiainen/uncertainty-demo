import sometimes from './sometimes';
import { useEffect, useState } from 'react';

export default <T>(initResult: T) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [result, setResult] = useState<T | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (sometimes()) {
        setResult(initResult);
      } else {
        setError(new Error('API failed'));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [initResult]);

  return { loading, error, result };
};
