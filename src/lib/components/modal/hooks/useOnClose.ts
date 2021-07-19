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
    const handleWheelEvent = (e: Event) => (isOpen ? e.preventDefault() : null);

    /**
     * If we add an event listener with identical options,
     * the event listener will be discarded.
     * So we can safely add the event inside a useEffect function
     * that will excecute multiple times.
     *
     * More info: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#multiple_identical_event_listeners
     */
    window.addEventListener('touchmove', handleWheelEvent, { passive: false }); // mobile
    window.addEventListener('wheel', handleWheelEvent, { passive: false }); // desktop

    return () => {
      window.removeEventListener('touchmove', handleWheelEvent);
      window.removeEventListener('wheel', handleWheelEvent);
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
