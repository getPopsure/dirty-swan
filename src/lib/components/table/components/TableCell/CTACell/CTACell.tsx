import classNames from 'classnames';
import { ReactNode } from 'react';

export type CTACellProps = {
  content?: ReactNode;
  subContent?: ReactNode;
  grey?: boolean;
  narrow?: boolean;
  href: string;
};
import styles from './CTACell.module.scss';

export const CTACell = ({
  content,
  subContent,
  grey,
  narrow,
  href,
}: CTACellProps) => {
  return (
    <div className="wmn3 ta-center">
      <p className="p-h3">
        {content}
        {subContent && <span className="tc-purple-500"> {subContent}</span>}
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
        Get covered
      </a>
    </div>
  );
};
