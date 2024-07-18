import classNames from 'classnames';
import { Button } from '../../../../button';
import {
  CheckIcon,
  XIcon,
  InfoIcon,
  StarFilledIcon,
  ZapFilledIcon,
} from '../../../../icon';
import { ReactNode } from 'react';
import styles from './BaseCell.module.scss';
import { MiniProgressBar } from './MiniProgressBar/MiniProgressBar';
import { TableInfoButton } from '../../../../comparisonTable';

export type ContentFontVariant = 'NORMAL' | 'BIG_WITH_UNDERLINE' | 'PRICE';

const progressLookup: Record<string, number> = {
  '30%': 1,
  '50%': 2,
  '70%': 3,
  '75%': 4,
  '80%': 4,
  '90%': 4,
  '75%-90%': 4,
  '75%-100%': 4,
  '80%-100%': 4,
  '100%': 5,
};

export type BaseCellProps = {
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
  contentFontVariant?: ContentFontVariant;
};

export const BaseCell = ({
  align = 'center',
  checkmarkValue,
  content = '',
  modalContent = '',
  openModal,
  rating,
  subContent = '',
  contentFontVariant = 'NORMAL',
}: BaseCellProps) => {
  const alignClassName = {
    center: 'ta-center jc-center ai-center',
    left: 'ta-left jc-start',
    right: 'ta-right jc-end ai-end',
  }[align];

  const validRatingValues: number[] = [1, 2, 3];
  const SelectedIcon = rating?.type === 'zap' ? ZapFilledIcon : StarFilledIcon;

  const progressBarValue =
    typeof content === 'string' ? progressLookup[content] : undefined;

  return (
    <div
      className={classNames('d-flex gap8 ai-center', {
        'jc-center': align === 'center',
      })}
    >
      <div className={classNames('d-flex fd-column gap8', alignClassName)}>
        {progressBarValue !== undefined && (
          <MiniProgressBar nFilledBars={progressBarValue} />
        )}

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

        {content && contentFontVariant === 'NORMAL' && (
          <div className="p-p" data-testid="table-cell-content">
            {content}
          </div>
        )}

        {content && contentFontVariant === 'PRICE' && (
          <div
            className="p-h1 p--serif tc-primary-500"
            data-testid="table-cell-content"
          >
            {content}
          </div>
        )}

        {content && contentFontVariant === 'BIG_WITH_UNDERLINE' && (
          <div
            aria-hidden
            className={classNames(
              'tc-grey-800 p-h2 p--serif',
              styles.bigWithUnderline
            )}
          >
            {content}
          </div>
        )}

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

      {modalContent && openModal && (
        <TableInfoButton onClick={() => openModal(modalContent)} />
      )}
    </div>
  );
};
