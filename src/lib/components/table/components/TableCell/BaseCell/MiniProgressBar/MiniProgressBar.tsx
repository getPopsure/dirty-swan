import classNames from 'classnames';

import styles from './MiniProgressBar.module.scss';

export const MiniProgressBar = ({ nFilledBars }: { nFilledBars: number }) => (
  <svg
    className={classNames(
      styles.progressBar,
      styles[`filledBars${nFilledBars}`]
    )}
    width="40"
    height="6"
    viewBox="0 0 40 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_37507_20658)">
      <rect id="r1" x="0.5" y="0.5" width="7" height="5" rx="1" />
      <rect id="r2" x="8.5" y="0.5" width="7" height="5" rx="1" />
      <rect id="r3" x="16.5" y="0.5" width="7" height="5" rx="1" />
      <rect id="r4" x="24.5" y="0.5" width="7" height="5" rx="1" />
      <rect id="r5" x="32.5" y="0.5" width="7" height="5" rx="1" />
    </g>
    <defs>
      <clipPath id="clip0_37507_20658">
        <rect
          width="39"
          height="5"
          fill="white"
          transform="translate(0.5 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
