import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

interface DirtySwanContextValue {
  onModalOpen: () => void;
  onModalClose: () => void;
}

const DirtySwanContext = createContext<DirtySwanContextValue | null>(null);

interface DirtySwanProviderProps {
  children: ReactNode;
  onModalChange?: (isModalOpen: boolean) => void;
}

export const DirtySwanProvider = ({
  children,
  onModalChange,
}: DirtySwanProviderProps) => {
  const countRef = useRef(0);
  const onModalChangeRef = useRef(onModalChange);
  onModalChangeRef.current = onModalChange;

  const onModalOpen = useCallback(() => {
    countRef.current += 1;
    if (countRef.current === 1) {
      onModalChangeRef.current?.(true);
    }
  }, []);

  const onModalClose = useCallback(() => {
    countRef.current -= 1;
    if (countRef.current === 0) {
      onModalChangeRef.current?.(false);
    }
  }, []);

  const value = useMemo(
    () => ({ onModalOpen, onModalClose }),
    [onModalOpen, onModalClose]
  );

  return (
    <DirtySwanContext.Provider value={value}>
      {children}
    </DirtySwanContext.Provider>
  );
};

export const useDirtySwan = () => useContext(DirtySwanContext);

export const useModalTrack = (isVisible: boolean) => {
  const dirtySwan = useDirtySwan();

  useEffect(() => {
    if (!isVisible) return;

    dirtySwan?.onModalOpen();
    return () => dirtySwan?.onModalClose();
  }, [isVisible, dirtySwan]);
};
