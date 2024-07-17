import { HTMLProps, ReactNode } from 'react';
import { Button } from '../../../button';
import {
  CheckIcon,
  InfoIcon,
  StarFilledIcon,
  XIcon,
  ZapFilledIcon,
} from '../../../icon';
import classNames from 'classnames';

import styles from './TableCell.module.scss';

export interface TableCellProps {
  align?: 'center' | 'left' | 'right';
  boolean?: boolean;
  cellProps?: HTMLProps<HTMLTableCellElement>;
  description?: ReactNode;
  info?: ReactNode;
  rating?: {
    value: number;
    type: 'zap' | 'star';
  };
  text?: ReactNode;
  openModal?: (info: ReactNode) => void;
}

const TableCell = ({
  align = 'center',
  boolean,
  description = '',
  info = '',
  openModal,
  rating,
  text = '',
}: TableCellProps) => {
  const alignClassName = {
    center: 'ta-center jc-center',
    left: 'ta-left jc-start',
    right: 'ta-right',
  }[align];

  const validRatingValues: number[] = [1, 2, 3];
  const SelectedIcon = rating?.type === 'zap' ? ZapFilledIcon : StarFilledIcon;

  return (
    <div className="d-flex fd-column gap8">
      <div className={classNames('d-flex gap8 ai-center', alignClassName)}>
        {rating?.value && (
          <span
            data-testid="table-cell-rating"
            title={`${rating?.value} out of 3`}
          >
            {validRatingValues.map((value) => (
              <SelectedIcon
                aria-hidden="true"
                key={value}
                color={value <= rating?.value ? 'primary-500' : 'grey-400'}
                className={styles.icon}
              />
            ))}
          </span>
        )}

        {boolean !== undefined && (
          <span title={boolean ? 'Yes' : 'No'}>
            {boolean ? (
              <CheckIcon
                data-testid="table-cell-boolean-yes"
                size={24}
                aria-hidden
                color="primary-500"
              />
            ) : (
              <XIcon
                data-testid="table-cell-boolean-no"
                size={24}
                aria-hidden
                color="grey-400"
              />
            )}
          </span>
        )}

        {text && (
          <div className="p-p" data-testid="table-cell-text">
            {text}
          </div>
        )}

        {info && openModal && (
          <Button
            className={classNames(styles.button)}
            hideLabel
            leftIcon={<InfoIcon size={20} />}
            onClick={() => openModal(info)}
            type="button"
            variant="textColor"
          >
            View more info
          </Button>
        )}
      </div>

      {description && (
        <div
          className={classNames(
            'd-flex p-p--small tc-grey-500',
            alignClassName
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export { TableCell };
