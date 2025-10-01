import { ReactNode } from 'react';
import classNames from 'classnames';

import { AlertCircleIcon } from '../icon/icons';
import { Color } from '../../models/styles';
import styles from './style.module.scss';

type Variant = 'warning' | 'error' | 'success' | 'information' | 'neutral';

export interface InformationBoxProps {
  className?: string;
  variant?: Variant;
  title?: string;
  children: ReactNode;
  showIcon?: boolean;
  size?: 'default' | 'small';
}

const InformationBox = ({
  className = '',
  variant = 'information',
  title,
  children,
  showIcon,
  size = 'default',
}: InformationBoxProps) => {
  const mapAlertIconColor: { [k in Variant]: Color } = {
    warning: 'yellow-500',
    error: 'red-500',
    success: 'green-500',
    information: 'blue-500',
    neutral: 'purple-600',
  };

  return (
    <div
      className={classNames(
        className,
        'p16 br8 color-black',
        styles.informationBox,
        styles[`informationBox--${variant}`]
      )}
      role="alert"
    >
      <div className="d-flex">
        {showIcon && (
          <div data-testid="information-box-icon" className={'mr8'}>
            <AlertCircleIcon
              className={styles.icon}
              color={mapAlertIconColor[variant]}
              size={size === 'default' ? 24 : 16}
            />
          </div>
        )}
        <div>
          {title && (
            <h4
              data-testid="information-box-title"
              className={classNames(
                size === 'default' ? 'p-h4' : 'p-h5',
                'mb8'
              )}
            >
              {title}
            </h4>
          )}

          <p className={size === 'default' ? 'p-p' : 'p-p--small'}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

export { InformationBox };
