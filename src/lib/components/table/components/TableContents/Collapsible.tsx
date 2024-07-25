import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';
import classNames from 'classnames';
interface CollapsibleProps {
  children: ReactNode;
  isExpanded?: boolean;
}

export const Collapsible = ({ children, isExpanded }: CollapsibleProps) => {
  const [height, setHeight] = useState<number | undefined>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scrollheight = containerRef.current.scrollHeight;
      setHeight(scrollheight);
    }
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
