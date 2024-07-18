import classNames from 'classnames';

import styles from './ButtonCell.module.scss';
import { Button } from '../../../../button';
import { ReactNode } from 'react';

export type ButtonCellProps = {
  content?: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  subContent?: ReactNode;
};

export const ButtonCell = ({
  isSelected,
  onClick,
  content,
  subContent,
  disabled,
}: ButtonCellProps) => {
  return (
    <div className="w100 d-flex fd-column ai-center jc-center gap8">
      <Button
        className={classNames('w100 wmx5 d-flex fd-column', styles.buttonCell, {
          [styles.selected]: isSelected,
          [styles.withoutSubContent]: !subContent,
          [styles.withSubContent]: !!subContent,
        })}
        variant="filledWhite"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {content}
        {subContent && <span className="p-p tc-purple-500">{subContent}</span>}
      </Button>
    </div>
  );
};
