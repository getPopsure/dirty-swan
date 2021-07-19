import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export interface ActiveTableArrows {
  left: boolean;
  right: boolean;
}

export const useActiveTableArrows = (): {
  activeArrows: ActiveTableArrows;
  contentContainerRef: React.Ref<HTMLDivElement>;
  contentWrapperRef: React.Ref<HTMLDivElement>;
} => {
  const [activeArrows, setActiveArrows] = useState<ActiveTableArrows>({
    left: false,
    right: true,
  });
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleTableScroll = (e: Event) => {
    const width = window.innerWidth;

    if (
      e.target === contentWrapperRef.current &&
      contentContainerRef.current &&
      contentContainerRef.current
    ) {
      const left =
        contentContainerRef.current.getBoundingClientRect().left * -1;

      setActiveArrows({
        left: left > 0,
        right:
          left + width <
          contentContainerRef.current.getBoundingClientRect().width,
      });
    }
  };

  const debouncedTableScroll = debounce(handleTableScroll, 150);

  useEffect(() => {
    contentWrapperRef.current?.addEventListener(
      'scroll',
      debouncedTableScroll,
      {
        passive: true,
      }
    );

    return contentWrapperRef.current?.removeEventListener(
      'scroll',
      handleTableScroll
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    activeArrows,
    contentContainerRef,
    contentWrapperRef,
  };
};
