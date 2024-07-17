import { useEffect, RefObject } from "react";

export const useScrollSync = (
  sourceRef: RefObject<HTMLDivElement>,
  targetRef: RefObject<HTMLDivElement>,
  enabled = true
) => {
  useEffect(() => {
    if (!sourceRef.current || !targetRef.current || !enabled) {
      return;
    }

    const sourceElement = sourceRef?.current;
    const targetElement = targetRef?.current;

    const handleScroll = (
      source?: HTMLDivElement | null,
      target?: HTMLDivElement | null
    ) => {
      if (source && target) {
        target.scrollLeft = source.scrollLeft;
      }
    };

    const syncScroll1 = () => handleScroll(sourceElement, targetElement);
    const syncScroll2 = () => handleScroll(targetElement, sourceElement);

    if (sourceElement && targetElement) {
      sourceElement.addEventListener("scroll", syncScroll1);
      targetElement.addEventListener("scroll", syncScroll2);
    }

    return () => {
      if (sourceElement && targetElement) {
        sourceElement.removeEventListener("scroll", syncScroll1);
        targetElement.removeEventListener("scroll", syncScroll2);
      }
    };
  }, [enabled, sourceRef, targetRef]);
};