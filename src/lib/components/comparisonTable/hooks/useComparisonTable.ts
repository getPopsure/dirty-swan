import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import generateId from '../../../util/generateId';
import { ArrowValues } from '../components/TableArrows';

export const useComparisonTable = ({
  onSelectionChanged,
}: {
  onSelectionChanged?: (selectedIndex: number) => void;
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [headerWidth, setHeaderWidth] = useState(1400);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState('');
  const [headerId, setHeaderId] = useState('');
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const headerRefCallbackRef = useCallback((node) => {
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

  useEffect(() => {
    const resetHeaderWidth = () => {
      if (headerRef.current) {
        setHeaderWidth(headerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', resetHeaderWidth);

    return () => window.removeEventListener('resize', resetHeaderWidth);
  }, []);

  const handleTableScroll = () => {
    if (!headerRef.current) {
      return;
    }

    const headerWidth = headerRef.current.getBoundingClientRect().width;

    const currentTabIndex = Math.round(
      headerRef.current.scrollLeft / headerWidth
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
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (headerRef.current) {
      return;
    }

    const headerById = document.getElementById(headerId);

    if (headerById) {
      headerRefCallbackRef(headerById);
    }
  }, [headerId, headerRefCallbackRef]);

  useEffect(() => {
    setHeaderId(generateId());
  }, []);

  useEffect(() => {
    onSelectionChanged?.(selectedTabIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabIndex]);

  return {
    headerWidth,
    headerId,
    contentContainerRef,
    selectedSection,
    setSelectedSection,
    selectedTabIndex,
    setSelectedTabIndex,
    headerRefCallbackRef,
    handleArrowsClick,
    toggleMoreRows,
    showMore,
  };
};
