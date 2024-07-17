import { ReactNode } from 'react';
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

interface BaseTableCellProps {
  align?: 'center' | 'left' | 'right';
  checkmarkValue?: boolean;
  content?: ReactNode;
  modalContent?: ReactNode;
  openModal?: (modalContent: ReactNode) => void;
  subContent?: ReactNode;
  rating?: {
    value: number;
    type: 'zap' | 'star';
  };
}

interface PositionalTableCellProps {
  isHeader?: boolean;
  isFirstCellInRow?: boolean;
  isTopLeftCell?: boolean;
  isNavigation?: boolean;
}

export type TableCellProps = BaseTableCellProps & PositionalTableCellProps;

const TableCell = ({
  align = 'center',
  checkmarkValue,
  content = '',
  isFirstCellInRow = false,
  isHeader = false,
  isNavigation = false,
  isTopLeftCell = false,
  modalContent = '',
  openModal,
  rating,
  subContent = '',
}: TableCellProps) => {
  // prettier-ignore
  const Tag = isNavigation
    ? 'div'
    : isHeader || isFirstCellInRow ? 'th' : 'td';

  // prettier-ignore
  const thScope = isHeader
    ? 'col'
    : isFirstCellInRow ? 'row' : undefined;

  const scope = {
    scope: thScope,
  };

  const alignClassName = {
    center: 'ta-center jc-center',
    left: 'ta-left jc-start',
    right: 'ta-right',
  }[align];

  const validRatingValues: number[] = [1, 2, 3];
  const SelectedIcon = rating?.type === 'zap' ? ZapFilledIcon : StarFilledIcon;

  return (
    <Tag
      {...scope}
      className={classNames('bg-white py24 px8', styles.th, {
        'ta-left': isFirstCellInRow,
        [styles.fixedCell]: isFirstCellInRow,
        pl32: isFirstCellInRow,
      })}
    >
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

          {checkmarkValue !== undefined && (
            <span title={checkmarkValue ? 'Yes' : 'No'}>
              {checkmarkValue ? (
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

          {content && !isTopLeftCell && (
            <div className="p-p" data-testid="table-cell-content">
              {content}
            </div>
          )}

          {content && isTopLeftCell && (
            <div
              aria-hidden
              className={classNames(
                'tc-grey-800 p-h2 p--serif',
                styles.topLeftCell
              )}
            >
              {content}
            </div>
          )}

          {modalContent && openModal && (
            <Button
              className={styles.button}
              hideLabel
              leftIcon={<InfoIcon size={20} />}
              onClick={() => openModal(modalContent)}
              type="button"
              variant="textColor"
            >
              View more info
            </Button>
          )}
        </div>

        {subContent && (
          <div
            className={classNames(
              'd-flex p-p--small tc-grey-500',
              alignClassName
            )}
          >
            {subContent}
          </div>
        )}
      </div>
    </Tag>
  );
};

export { TableCell };
