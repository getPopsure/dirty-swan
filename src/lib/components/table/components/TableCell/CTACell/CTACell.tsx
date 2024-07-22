import classNames from 'classnames';
import { ReactNode } from 'react';

export type CTACellProps = {
  title: ReactNode;
  price?: ReactNode;
  buttonCaption?: ReactNode;
  grey?: boolean;
  narrow?: boolean;
  href: string;
};
import styles from './CTACell.module.scss';

export const CTACell = ({
  title,
  price,
  grey,
  narrow,
  href,
  buttonCaption,
}: CTACellProps) => {
  return (
    <div className="wmn3 ta-center">
      <p className="p-h3">
        {title}
        {price && <span className="tc-purple-500"> {price}</span>}
      </p>
      <a
        className={classNames('mt16', {
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
