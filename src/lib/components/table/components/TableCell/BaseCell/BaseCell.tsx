import classNames from 'classnames';
import {
  CheckIcon,
  XIcon,
  StarFilledIcon,
  ZapFilledIcon,
} from '../../../../icon';
import { ReactNode } from 'react';
import styles from './BaseCell.module.scss';
import { MiniProgressBar } from './MiniProgressBar/MiniProgressBar';
import { TableInfoButton } from '../../../../comparisonTable';
import { ModalFunction } from '../../../types';

export type FontVariant = 'NORMAL' | 'BIG_WITH_UNDERLINE' | 'PRICE';

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

export type Alignment = 'center' | 'left' | 'right';

export type BaseCellProps = {
  align?: Alignment;
  checkmarkValue?: boolean;
  description?: ReactNode;
  fontVariant?: FontVariant;
  hideProgressBar?: boolean;
  modalTitle?: ReactNode;
  modalContent?: ReactNode;
  openModal?: ModalFunction;
  text?: ReactNode;
  rating?: {
    value: number;
    type: 'zap' | 'star';
  };
  cellId?: string;
};

export const BaseCell = ({
  align = 'center',
  checkmarkValue,
  description = '',
  fontVariant = 'NORMAL',
  hideProgressBar = false,
  modalTitle = '',
  modalContent = '',
  openModal,
  rating,
  text = '',
}: BaseCellProps) => {
  const alignClassName = {
    center: 'ta-center jc-center ai-center',
    left: 'ta-left jc-start',
    right: 'ta-right jc-end ai-end',
  }[align];

  const validRatingValues: number[] = [1, 2, 3];
  const SelectedIcon = rating?.type === 'zap' ? ZapFilledIcon : StarFilledIcon;

  const progressBarValue =
    !hideProgressBar && typeof text === 'string'
      ? progressLookup[text]
      : undefined;

  return (
    <div
      className={classNames('d-flex gap8 ai-center', {
        'jc-center': align === 'center',
      })}
    >
      <div
        className={classNames(
          'd-flex fd-column',
          alignClassName,
          styles.relative
        )}
      >
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

        <div className="d-flex ai-center">
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

          <div className="d-inline">
            {text && fontVariant === 'NORMAL' && (
              <div className="p-p d-inline" data-testid="table-cell-text">
                {text}
              </div>
            )}

            {text && fontVariant === 'PRICE' && (
              <div
                className="p-h1 p--serif tc-primary-500"
                data-testid="table-cell-content"
              >
                {text}
              </div>
            )}

            {text && fontVariant === 'BIG_WITH_UNDERLINE' && (
              <div
                aria-hidden
                className={classNames(
                  'tc-grey-800 p-h2 p--serif',
                  styles.bigWithUnderline
                )}
              >
                {text}
              </div>
            )}

            {modalContent && openModal && align == 'left' && (
              <span className="ml8">
                <TableInfoButton
                  onClick={() =>
                    openModal({
                      title: modalTitle,
                      body: modalContent,
                    })
                  }
                />
              </span>
            )}
          </div>
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

        {modalContent && openModal && align == 'center' && (
          <span className={styles.infoButtonAbsolute}>
            <TableInfoButton
              onClick={() =>
                openModal({
                  title: modalTitle,
                  body: modalContent,
                })
              }
            />
          </span>
        )}
      </div>
    </div>
  );
};
