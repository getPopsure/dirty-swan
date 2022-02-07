import React from 'react';

import styles from './style.module.scss';

export default () => (
  <svg
    width="60"
    height="72"
    viewBox="0 0 60 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={styles['stroke-primary-500']}
      d="M50.5975 69H8.94969C7.37173 69 5.8584 68.3679 4.74262 67.2426C3.62684 66.1174 3 64.5913 3 63V21L20.8491 3H50.5975C52.1754 3 53.6888 3.63214 54.8045 4.75736C55.9203 5.88258 56.5472 7.4087 56.5472 9V63C56.5472 64.5913 55.9203 66.1174 54.8045 67.2426C53.6888 68.3679 52.1754 69 50.5975 69Z"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path
      className={styles['stroke-primary-500']}
      d="M20.434 3V15.4528C20.434 17.1042 19.8217 18.6879 18.7319 19.8556C17.642 21.0233 16.1639 21.6792 14.6226 21.6792H3"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);
