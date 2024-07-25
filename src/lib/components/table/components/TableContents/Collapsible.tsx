import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';
import classNames from 'classnames';
interface CollapsibleProps {
  children: ReactNode;
  isExpanded?: boolean;
}

export const Collapsible = ({ children, isExpanded }: CollapsibleProps) => {
  const [height, setHeight] = useState<number | undefined>();

  const observerRef = useRef<ResizeObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const scrollheight = entry.target.scrollHeight;

          setHeight(scrollheight);
        });
      });
    }
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
      const scrollheight = containerRef.current.scrollHeight;
      setHeight(scrollheight);
    }

    return () => {
      if (containerRef.current) {
        observerRef.current?.unobserve(containerRef.current);
      }
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
    >
      {children}
    </div>
  );
};
