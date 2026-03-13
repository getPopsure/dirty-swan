import { RefObject, useCallback, useEffect, useState } from 'react';

export const useDropdownAlignment = (
  containerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  const [alignRight, setAlignRight] = useState(false);
  const [alignUp, setAlignUp] = useState(false);

  const updateAlignment = useCallback(() => {
    if (containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const spaceOnRight = window.innerWidth - containerRect.left;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      setAlignRight(spaceOnRight < dropdownWidth);
      setAlignUp(spaceBelow < dropdownHeight && containerRect.top > spaceBelow);
    }
  }, [containerRef, dropdownRef]);

  useEffect(() => {
    if (!isOpen) return;

    updateAlignment();

    const observer = new ResizeObserver(updateAlignment);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [isOpen, updateAlignment]);

  return { alignRight, alignUp };
};
