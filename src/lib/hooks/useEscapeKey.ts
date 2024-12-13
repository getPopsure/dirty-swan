import { useCallback, useEffect } from 'react';

export const useEscapeKey = (callback: () => void) => {
  const handleOnEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleOnEscape);

    return () => window.removeEventListener('keydown', handleOnEscape);
  }, [handleOnEscape]);
};
