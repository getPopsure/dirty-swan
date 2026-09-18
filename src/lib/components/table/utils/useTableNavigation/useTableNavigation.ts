import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseTableNavigationReturn {
  activeSection: number;
  navigateTable: (increase?: boolean) => void;
  setActiveSection: (section: number) => void;
  syncActiveSection: (section: number) => void;
}

interface UseTableNavigationProps {
  containerRef: React.RefObject<HTMLElement>,
  enabled?: boolean,
  initialSection?: number,
  onSelectionChanged?: (index: number) => void
}

export const useTableNavigation = ({
  enabled,
  containerRef,
  initialSection = 0,
  onSelectionChanged
}: UseTableNavigationProps): UseTableNavigationReturn => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const activeSectionRef = useRef(initialSection);
  const skipNextReportRef = useRef(false);

  const syncActiveSection = useCallback((section: number) => {
    if (section === activeSectionRef.current) {
      return;
    }

    skipNextReportRef.current = true;
    setActiveSection(section);
  }, []);

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
    const scrollLeft = containerRef.current.scrollLeft * 1.1;
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
    activeSectionRef.current = activeSection;

    const skipReport = skipNextReportRef.current;
    skipNextReportRef.current = false;

    if (!enabled) {
      return
    }

    if (!skipReport) {
      onSelectionChanged?.(activeSection + 1);
    }

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
    setActiveSection,
    syncActiveSection,
  }
}