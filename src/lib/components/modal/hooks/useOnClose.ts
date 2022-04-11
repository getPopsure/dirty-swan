import React, { useCallback, useEffect, useState } from 'react';

const useOnClose = (
  onClose: () => void,
  isOpen: boolean,
  dismissable: boolean
) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleOnClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [setIsClosing, onClose]);

  const handleEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Escape') return;
      if (!dismissable) return null;
      if (!isOpen) return null;

      handleOnClose();
    },
    [isOpen, dismissable, handleOnClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [handleEscKey]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return { isClosing, handleContainerClick, handleOnClose };
};

export default useOnClose;
