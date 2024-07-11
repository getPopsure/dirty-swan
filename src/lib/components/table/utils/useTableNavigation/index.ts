import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

interface UseTableNavigationReturn {
  activeSection: number;
  navigateTable: (increase?: boolean) => void;
}

interface UseTableNavigationProps {
  containerRef: React.RefObject<HTMLElement>,
  columnsLength: number,
  enabled?: boolean,
  onSelectionChanged?: (index: number) => void
}

export const useTableNavigation = ({
  enabled,
  containerRef,
  columnsLength,
  onSelectionChanged
}: UseTableNavigationProps): UseTableNavigationReturn => {
  const [activeSection, setActiveSection] = useState(1);
  const [isIncrease, setIsIncrease] = useState<boolean>();

  const handleScrollToSection = (increase?: boolean) => {
    if (!enabled) {
      return;
    }

    setActiveSection((prevSection) => {
      setIsIncrease(!!increase);

      return prevSection + (increase ? 1 : -1);
    });
  };

  const handleTableScroll = useCallback(() => {
    if (!containerRef.current || !enabled) {
      return;
    }

    const scrollLeft = containerRef.current.scrollLeft;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const cellWidth = containerWidth / (columnsLength  - 1);
    const newValue = Math.floor(scrollLeft / cellWidth * 0.8) + 1;

    setIsIncrease(newValue > activeSection);
    setActiveSection(newValue);
   }, [activeSection, columnsLength, containerRef, enabled]);

  const debouncedTableScroll = debounce(handleTableScroll, 150);

  useEffect(() => {
    const container = containerRef.current;

    container?.addEventListener('scroll', debouncedTableScroll, {
      passive: true,
    });

    return container?.removeEventListener('scroll', handleTableScroll);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof isIncrease === 'undefined') {
      return
    }

    onSelectionChanged?.(activeSection);

    if (containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const cellWidth = containerWidth / columnsLength;

      containerRef.current.scroll({
        top: 0,
        left: (cellWidth * activeSection) * (isIncrease ? 1.2 : 0.8),
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  return {
    activeSection,
    navigateTable: handleScrollToSection,
  }
}