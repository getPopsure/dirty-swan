import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface OnCloseReturn {
  isClosing: boolean;
  isVisible: boolean;
  handleOnCloseAnimationEnded: () => void;
  handleContainerClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleOnClose: () => void;
  handleOnOverlayClick: () => void;
}

const useOnClose = (
  onClose: () => void,
  isOpen: boolean,
  dismissable: boolean
): OnCloseReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOnClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleOnCloseAnimationEnded = useCallback(() => {
    if (isVisible && isClosing) {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
    }
  }, [isClosing, isVisible, onClose]);

  const handleOnOverlayClick = useCallback(() => {
    if (!dismissable) {
      return;
    }

    handleOnClose();
  }, [dismissable, handleOnClose]);

  const handleEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Escape' || !dismissable || !isOpen) {
        return null;
      }

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
    if (isOpen) {
      setIsVisible(true);
    }

    if (!isOpen && isVisible) {
      handleOnClose();
    }

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [handleOnClose, isOpen, isVisible]);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return {
    isClosing,
    isVisible,
    handleContainerClick,
    handleOnCloseAnimationEnded,
    handleOnClose,
    handleOnOverlayClick,
  };
};

export default useOnClose;
