import classNames from 'classnames';
import {
  CheckThickIcon,
  StarFilledIcon,
  XIcon,
  ZapFilledIcon,
} from '../../../../icon';
import { ReactNode } from 'react';
import styles from './BaseCell.module.scss';
import { MiniProgressBar } from './MiniProgressBar/MiniProgressBar';
import { TableInfoButton } from '../../../../comparisonTable';
import { ModalFunction } from '../../../types';

export type FontVariant = 'NORMAL' | 'TITLE' | 'PRICE';

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
  className?: string;
  dataTestId?: string;
  dataCy?: string;
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
  className,
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
      className={classNames(
        className,
        'd-flex gap8 ai-center', {
        'jc-center': align === 'center',
      })}
    >
      <div
        className={classNames('d-flex fd-column', alignClassName, {
          [styles.maxWidth]: modalContent && align === 'center',
        })}
      >
        <div className="d-flex ai-center">
          {rating?.value && (
            <span
              data-testid="table-cell-rating"
              title={`${rating?.value} out of 3`}
            >
              {validRatingValues.map((value) => (
                <SelectedIcon
                  aria-hidden="true"
                  key={value}
                  color={value <= rating?.value ? 'neutral-900' : 'neutral-400'}
                  className={styles.icon}
                  size={rating?.type === 'zap' ? 16 : 14}
                />
              ))}
            </span>
          )}

          {checkmarkValue !== undefined && (
            <span className='d-inline-block mx8' title={checkmarkValue ? 'Yes' : 'No'}>
              {checkmarkValue ? (
                <CheckThickIcon
                  noMargin
                  data-testid="table-cell-boolean-yes"
                  size={24}
                  aria-hidden
                  color="neutral-900"
                />
              ) : (
                <XIcon
                  noMargin
                  data-testid="table-cell-boolean-no"
                  size={24}
                  aria-hidden
                  color="neutral-400"
                />
              )}
            </span>
          )}

          <div className="d-inline">
            {text && fontVariant === 'NORMAL' && (
              <div className={classNames(
                "p-p d-inline",
                { 'ml8': align !== 'left' }
              )}
              data-testid="table-cell-text"
            >
                {text}
              </div>
            )}

            {text && fontVariant === 'PRICE' && (
              <div
                className="p-h1 p--serif tc-neutral-900"
                data-testid="table-cell-content"
              >
                {text}
              </div>
            )}

            {text && fontVariant === 'TITLE' && (
              <h2
                aria-hidden
                className="tc-grey-800 p-h2 p--serif"
              >
                {text}
              </h2>
            )}

            {modalContent && openModal && (
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

        {progressBarValue !== undefined && (
          <MiniProgressBar nFilledBars={progressBarValue} />
        )}

        {description && (
          <div
            className={classNames(
              styles.description,
              'd-flex p-p--small tc-neutral-600',
              alignClassName
            )}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
