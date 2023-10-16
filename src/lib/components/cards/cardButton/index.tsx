import { FormEvent, createElement, ReactNode } from 'react';

import styles from './style.module.scss';
import { ChevronRightIcon } from '../../icon/icons';

type ActionProps =
  | { href: string; onClick?: (e: FormEvent) => void }
  | { href?: string; onClick: (e: FormEvent) => void };

export type CardButtonProps = {
  title: string;
  description: string | ReactNode;
  disabled?: boolean;
  className?: string;
} & ActionProps;

const CardContent = ({
  title,
  description,
}: {
  title: string;
  description: string | ReactNode;
}) => (
  <>
    <div>
      <div className="p-p--small">{title}</div>
      {typeof description === 'string' ? (
        <div className="tc-primary-500 p-p">{description}</div>
      ) : (
        description
      )}
    </div>
    <ChevronRightIcon
      size={16}
      color={'purple-500'}
      className={styles.chevronRight}
    />
  </>
);

export const CardButton = ({
  title,
  description,
  disabled = false,
  onClick,
  href,
  className,
}: CardButtonProps) => {
  const component = href ? 'a' : 'button';
  return (
    <>
      {createElement(component, {
        className: `c-pointer ta-left w100 ${styles.container} ${
          className ?? ''
        }
        `,
        children: <CardContent title={title} description={description} />,
        disabled,
        ...(component === 'a' ? { href } : { onClick }),
      })}
    </>
  );
};
