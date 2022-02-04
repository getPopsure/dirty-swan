import { FormEvent, createElement, ReactNode } from 'react';

import styles from './style.module.scss';
import { chevronRight } from '../icons';

interface Props {
  title: string;
  description: string | ReactNode;
  disabled?: boolean;
  className?: string;
}

type ActionProps =
  | { href: string; onClick?: (e: FormEvent) => void }
  | { href?: string; onClick: (e: FormEvent) => void };

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
    <img {...chevronRight} alt="Expander icon" />
  </>
);

const CardButton = ({
  title,
  description,
  disabled = false,
  onClick,
  href,
  className,
}: Props & ActionProps) => {
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

export default CardButton;
