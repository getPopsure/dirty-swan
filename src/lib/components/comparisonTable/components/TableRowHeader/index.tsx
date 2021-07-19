import React from 'react';
import classNames from 'classnames';

import TableInfoButton from '../TableInfoButton';

import styles from './style.module.scss';

const TableRowHeader = (props: {
  label: string;
  icon?: string;
  subtitle?: string;
  onClickInfo?: () => void;
}) => {
  const { icon, label, subtitle, onClickInfo } = props;
  return (
    <div className="d-flex">
      <span className={`mr8 ${styles.icon}`}>{icon}</span>
      <div>
        <p className="p-p d-inline">
          <span
            className={classNames({
              mr8: onClickInfo,
            })}
          >
            {label}
          </span>
          {onClickInfo && <TableInfoButton onClick={onClickInfo} />}
        </p>
        {subtitle && <p className="p-p--small tc-grey-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default TableRowHeader;
