import classNames from 'classnames';
import { KeyboardEvent, useCallback, useRef } from 'react';

import styles from './Tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
}

const Tabs = ({ tabs, activeIndex, onTabChange, className }: TabsProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setTabRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      tabRefs.current[index] = el;
    },
    []
  );

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const count = tabs.length;
    let nextIndex: number | null = null;

    if (e.key === 'ArrowRight') nextIndex = (index + 1) % count;
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + count) % count;

    if (nextIndex !== null) {
      e.preventDefault();
      onTabChange(nextIndex);
      tabRefs.current[nextIndex]?.focus({ preventScroll: true });
    }
  };

  return (
    <div className={classNames(styles.tabs, className)} role="tablist">
      {tabs.map((tab, index) => (
        <button
          ref={setTabRef(index)}
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeIndex === index}
          tabIndex={activeIndex === index ? 0 : -1}
          className={classNames('p-p bg-transparent c-pointer', styles.tab, {
            [styles.tabActive]: activeIndex === index,
          })}
          onClick={() => onTabChange(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export { Tabs };
