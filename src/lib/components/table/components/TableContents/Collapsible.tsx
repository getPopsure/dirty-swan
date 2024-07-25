import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';
interface CollapsibleProps {
  children: ReactNode;
  isExpanded?: boolean;
}

export const Collapsible = ({ children, isExpanded }: CollapsibleProps) => {
  const [height, setHeight] = useState<number | undefined>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && height === undefined) {
      const scrollheight = containerRef.current.scrollHeight;
      setHeight(scrollheight);
    }
  }, [containerRef.current]);

  return (
    <div
      className={styles.collapsible}
      ref={containerRef}
      style={{
        maxHeight: isExpanded ? height : '0px',
      }}
    >
      <div>{children}</div>
    </div>
  );
};
