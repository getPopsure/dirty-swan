import classNames from 'classnames';

import styles from './ButtonCell.module.scss';
import { Button } from '../../../../button';
import { ReactNode } from 'react';

export type ButtonCellProps = {
  buttonCaption: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  price?: ReactNode;
  className?: string;
  dataTestId?: string;
  dataCy?: string;
};

export const ButtonCell = ({
  isSelected,
  onClick,
  buttonCaption,
  price,
  disabled,
  className,
  dataCy,
  dataTestId,
}: ButtonCellProps) => {
  return (
    <div
      className={
        classNames(
          "w100 d-flex fd-column ai-center jc-center gap8",
          className,
        )
      }
      data-cy={dataCy}
      data-testid={dataTestId}
    >
      <Button
        className={classNames('w100 wmx5 d-flex fd-column', styles.buttonCell, {
          [styles.selected]: isSelected,
          [styles.withoutPrice]: !price,
          [styles.withPrice]: !!price,
        })}
        variant="filledWhite"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonCaption}
        {price && <span className="p-p">{price}</span>}
      </Button>
    </div>
  );
};
