import { useEffect } from 'react';

export const useFocusWithin = (
  ref: HTMLElement | null,
  callback: (isFocusWithin: boolean) => void
) => {
  useEffect(() => {
    const handleOnFocusIn = () => {
      if (!ref) {
        return;
      }

      const hasFocus = ref?.contains(document.activeElement);

      callback(Boolean(hasFocus));
    };

    document.addEventListener('focusin', handleOnFocusIn);

    return () => document?.removeEventListener('focusin', handleOnFocusIn);
  }, [callback, ref]);
};
