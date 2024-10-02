import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './CTACell.module.scss';
import { IconRenderer } from '../../IconRenderer/IconRenderer';

export type CTACellProps = {
  title: ReactNode;
  price?: ReactNode;
  icon?: ReactNode;
  imageComponent?: (args: any) => JSX.Element;
  buttonCaption?: ReactNode;
  grey?: boolean;
  narrow?: boolean;
  href: string;
  className?: string;
  dataTestId?: string;
  dataCy?: string;
};

export const CTACell = ({
  title,
  price,
  icon,
  grey,
  narrow,
  href,
  buttonCaption,
  imageComponent,
  className,
  ...rest
}: CTACellProps) => {
  const renderedIcon = (
    <IconRenderer icon={icon} imageComponent={imageComponent} />
  );

  return (
    <div className={classNames(className, "ta-center")} {...rest}>
      <div className="d-flex jc-center ai-center gap8">
        {renderedIcon}
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
