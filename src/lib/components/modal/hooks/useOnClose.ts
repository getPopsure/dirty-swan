import React, { useEffect, useState } from 'react';

const useOnClose = (
  onClose: () => void,
  isOpen: boolean,
  dismissable: boolean
) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOnClose = () => {
    if (!dismissable) return null;

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
