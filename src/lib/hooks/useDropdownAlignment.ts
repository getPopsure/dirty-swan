import { RefObject, useCallback, useEffect, useState } from 'react';

export const useDropdownAlignment = (
  containerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  const [alignX, setAlignX] = useState<'left' | 'right'>('left');
  const [alignY, setAlignY] = useState<'top' | 'bottom'>('bottom');

  const updateAlignment = useCallback(() => {
    if (containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const spaceOnRight = window.innerWidth - containerRect.left;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      setAlignX(spaceOnRight < dropdownWidth ? 'right' : 'left');
      setAlignY(spaceBelow < dropdownHeight && containerRect.top > spaceBelow ? 'top' : 'bottom');
    }
  }, [containerRef, dropdownRef]);

  useEffect(() => {
    if (!isOpen) return;

    updateAlignment();

    const observer = new ResizeObserver(updateAlignment);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [isOpen, updateAlignment]);

  return { alignX, alignY };
};
