import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowValues } from '../components/TableArrows';

export const useComparisonTable = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [headerWidth, setHeaderWidth] = useState(1400);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [selectedSection, setSelectedSection] = useState('');

  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const scrollContainerCallbackRef = useCallback((node) => {
    if (node) {
      setHeaderWidth(node.clientWidth);
    }

    headerRef.current = node;
  }, []);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const currentTabIndex = Math.round(
            entry.target.scrollLeft / entry.contentRect.width
          );

          setHeaderWidth(entry.contentRect.width);

          // Update selectedTabIndex to match the calculated current tab index
          setSelectedTabIndex(currentTabIndex);
        });
      });
    }

    if (headerRef.current) {
      observerRef.current.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observerRef.current?.unobserve(headerRef.current);
      }
      observerRef.current?.disconnect();
    };
  }, []);

  const handleTableScroll = () => {
    if (!headerRef.current) {
      return;
    }

    const currentTabIndex = Math.round(
      headerRef.current.scrollLeft /
        headerRef.current.getBoundingClientRect().width
    );

    setSelectedTabIndex(currentTabIndex);
  };

  const debouncedTableScroll = debounce(handleTableScroll, 150);

  useEffect(() => {
    headerRef.current?.addEventListener('scroll', debouncedTableScroll, {
      passive: true,
    });

    return headerRef.current?.removeEventListener('scroll', handleTableScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleArrowsClick = (value: ArrowValues) => {
    if (headerRef.current) {
      const currentTabIndex = Math.round(
        headerRef.current.scrollLeft / headerRef.current.clientWidth
      );

      const direction = value === 'next' ? 1 : -1;

      const newTabIndex = currentTabIndex + direction;

      headerRef.current.scroll({
        top: 0,
        left: headerWidth * newTabIndex,
        behavior: 'smooth',
      });

      setSelectedTabIndex(() => {
        return newTabIndex;
      });
    }
  };

  const toggleMoreRows = async () => {
    if (showMore && headerRef.current && contentContainerRef.current) {
      window.scroll(
        0,
        window.scrollY +
          (contentContainerRef.current.getBoundingClientRect().y -
            headerRef.current.getBoundingClientRect().bottom)
      );
    }

    setShowMore(!showMore);
  };

  return {
    headerWidth,
    contentContainerRef,
    selectedSection,
    setSelectedSection,
    selectedTabIndex,
    setSelectedTabIndex,
    scrollContainerCallbackRef,
    handleArrowsClick,
    toggleMoreRows,
    showMore,
  };
};
