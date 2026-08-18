import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';
import classNames from 'classnames';
interface CollapsibleProps {
  children: ReactNode;
  isExpanded?: boolean;
  onTransitionEnd?: () => void;
}

const measureHeight = (element: Element) => {
  let height = 0;

  for (const child of Array.from(element.children)) {
    const childStyles = getComputedStyle(child);

    height +=
      child.getBoundingClientRect().height +
      (parseFloat(childStyles.marginTop) || 0) +
      (parseFloat(childStyles.marginBottom) || 0);
  }

  return Math.ceil(height);
};

export const Collapsible = ({ children, isExpanded, onTransitionEnd }: CollapsibleProps) => {
  const [height, setHeight] = useState<number | undefined>();

  const observerRef = useRef<ResizeObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(() => {
        if (containerRef.current) {
          setHeight(measureHeight(containerRef.current));
        }
      });
    }
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
      Array.from(containerRef.current.children).forEach((child) => {
        observerRef.current?.observe(child);
      });
      setHeight(measureHeight(containerRef.current));
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerRef.current]);

  return (
    <div
      className={classNames(styles.collapsible, {
        [styles.hideDelayed]: !isExpanded,
      })}
      ref={containerRef}
      style={{
        maxHeight: isExpanded ? height : '0px',
      }}
      onTransitionEnd={isExpanded ? onTransitionEnd : undefined}
    >
      {children}
    </div>
  );
};
