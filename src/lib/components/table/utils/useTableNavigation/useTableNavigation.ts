import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

interface UseTableNavigationReturn {
  activeSection: number;
  navigateTable: (increase?: boolean) => void;
}

interface UseTableNavigationProps {
  containerRef: React.RefObject<HTMLElement>,
  enabled?: boolean,
  onSelectionChanged?: (index: number) => void
}

export const useTableNavigation = ({
  enabled,
  containerRef,
  onSelectionChanged
}: UseTableNavigationProps): UseTableNavigationReturn => {
  const [activeSection, setActiveSection] = useState(0);

  const handleScrollToSection = (increase?: boolean) => {
    if (!enabled) {
      return;
    }

    setActiveSection((prevSection) => 
      prevSection + (increase ? 1 : -1)
    );
  };

  const handleTableScroll = useCallback(() => {
    if (!containerRef.current || !enabled) {
      return;
    }

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const scrollLeft = containerRef.current.scrollLeft;
    const cellWidth = containerWidth / 2;

    setActiveSection(Math.floor(scrollLeft / cellWidth));
   }, [activeSection, containerRef, enabled]);

  const debouncedTableScroll = debounce(handleTableScroll, 150);

  useEffect(() => {
    const container = containerRef.current;

    container?.addEventListener('scroll', debouncedTableScroll, {
      passive: true,
    });

    return container?.removeEventListener('scroll', handleTableScroll);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return
    }

    onSelectionChanged?.(activeSection + 1);

    if (containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const cellWidth = containerWidth / 2;

      containerRef.current.scroll({
        top: 0,
        left: cellWidth * activeSection,
        behavior: 'smooth',
      });
    }
  }, [enabled, activeSection]);

  return {
    activeSection: activeSection + 1,
    navigateTable: handleScrollToSection,
  }
}