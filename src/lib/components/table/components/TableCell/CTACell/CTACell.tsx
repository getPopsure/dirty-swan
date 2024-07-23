import classNames from 'classnames';
import { ReactNode } from 'react';

export type CTACellProps = {
  title: ReactNode;
  price?: ReactNode;
  icon?: ReactNode;
  buttonCaption?: ReactNode;
  grey?: boolean;
  narrow?: boolean;
  href: string;
  cellId?: string;
};
import styles from './CTACell.module.scss';

export const CTACell = ({
  title,
  price,
  icon,
  grey,
  narrow,
  href,
  buttonCaption,
}: CTACellProps) => {
  return (
    <div className="ta-center">
      <div className="d-flex jc-center ai-center gap8">
        {icon}
        <p className="p-h3">
          {title}
          {price && <span className="tc-purple-500"> {price}</span>}
        </p>
      </div>

      <a
        className={classNames('mt16 w100 wmx3', {
          'p-btn--primary': !grey,
          'p-btn--secondary-grey': grey,
          [styles.narrow]: narrow,
        })}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonCaption}
      </a>
    </div>
  );
};
