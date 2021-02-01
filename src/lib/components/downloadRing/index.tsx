import React from 'react';
import classnames from 'classnames';

import CheckOutsideCircleIcon from './icons/check-outside-circle';
import DownloadCloudIcon from './icons/download-cloud';

import styles from './style.module.scss';

const RADIUS = 140;
const STROKE = 2;

type Status = 'INITIAL' | 'GENERATING' | 'DOWNLOADING' | 'COMPLETED' | 'FAILED';

const mappingStatus: { [k in Status]: string } = {
  INITIAL: 'Click to download documents',
  GENERATING: 'Generating documents...',
  DOWNLOADING: 'Downloading documents...',
  COMPLETED: 'Done!',
  FAILED: 'Download failed. Click again to retry.',
};

export default ({
  progress,
  status,
  handleClick,
}: {
  progress: number;
  status: Status;
  handleClick: () => void;
}) => {
  const normalizedRadius = RADIUS - STROKE / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`w100 ${styles.container}`}>
      <button
        className={styles.button}
        type="button"
        onClick={handleClick}
        data-cy="download-documents-button"
      >
        <svg height={RADIUS * 2} width={RADIUS * 2}>
          <circle
            className={classnames(`${styles['inner-circle']}`, {
              [styles['inner-circle-hover']]: progress === 0,
            })}
            strokeWidth={STROKE}
            strokeDasharray={circumference + ' ' + circumference}
            r={normalizedRadius}
            cx={RADIUS}
            cy={RADIUS}
          />
          <circle
            className={
              status === 'COMPLETED'
                ? styles['overlay-circle-completed']
                : styles['overlay-circle']
            }
            strokeWidth={STROKE}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={RADIUS}
            cy={RADIUS}
          />
        </svg>
        <div className={`ws2 ${styles['text-container']}`}>
          {status === 'COMPLETED' ? (
            <CheckOutsideCircleIcon />
          ) : (
            <DownloadCloudIcon />
          )}
          <div className="p-p mt8">{mappingStatus[status]}</div>
        </div>
      </button>
    </div>
  );
};
