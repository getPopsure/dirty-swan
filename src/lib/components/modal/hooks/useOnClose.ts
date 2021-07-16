import React, { useEffect, useState } from 'react';

const useOnClose = (onClose: () => void) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleOnClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.code !== 'Escape') return;

    handleOnClose();
  };

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return { isClosing, handleContainerClick, handleOnClose };
};

export default useOnClose;
