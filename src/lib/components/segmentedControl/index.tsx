import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

interface TitleWithSubtitle {
  title: string;
  subtitle: string;
}

export interface SegmentedControlProps {
  className?: string;
  values: Array<TitleWithSubtitle> | Array<string>;
  selectedIndex: number;
  onChange: (selectedIndex: number) => void;
}

const SegmentedControl = ({
  className = '',
  values,
  selectedIndex,
  onChange,
}: SegmentedControlProps) => {
  const [selectedChipBackgroundWidthLeft, setSelectedChipBackgroundWidthLeft] =
    useState<{
      left: number;
      width: number;
    }>({ left: 0, width: 0 });
  const chipContainer = useRef<HTMLDivElement | null>(null);
  const height = typeof values[0] === 'string' ? 48 : 66;

  useEffect(() => {
    const selectedChip = chipContainer.current?.children[
      selectedIndex
    ] as HTMLDivElement;
    const left = selectedChip.offsetLeft;
    const width = selectedChip.offsetWidth;
    setSelectedChipBackgroundWidthLeft({ left, width });
  }, [selectedIndex]);

  return (
    <div className={className}>
      <div className={styles['background-container']}>
        <div
          ref={chipContainer}
          className={styles['chip-container']}
          style={{ height: `${height}px` }}
        >
          {values.map((value: TitleWithSubtitle | string, index: number) => {
            return (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.code === 'Space') {
                    onChange(index);
                  }
                }}
                onClick={() => {
                  onChange(index);
                }}
                className={styles.chip}
                key={typeof value === 'string' ? value : value.title}
              >
                {typeof value === 'string' ? (
                  <div
                    className={`p-h4 ta-center ${
                      selectedIndex === index ? '' : 'tc-purple-600'
                    }`}
                  >
                    {value}
                  </div>
                ) : (
                  <>
                    <div
                      className={`p-h4 ta-center ${
                        selectedIndex === index ? '' : 'tc-purple-600'
                      }`}
                    >
                      {value.title}
                    </div>
                    <div
                      className={`p-p--small ta-center ${
                        selectedIndex === index
                          ? 'tc-neutral-600'
                          : 'tc-purple-600'
                      }`}
                    >
                      {value.subtitle}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div
          className={styles['select-chip-background']}
          style={{
            width: `${selectedChipBackgroundWidthLeft.width}px`,
            height: `${height - 16}px`,
            left: `${selectedChipBackgroundWidthLeft.left}px`,
          }}
        />
      </div>
    </div>
  );
};

export { SegmentedControl };
