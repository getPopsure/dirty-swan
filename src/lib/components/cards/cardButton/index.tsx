import { FormEvent, createElement } from 'react';

import styles from './style.module.scss';
import { arrowRight } from '../icons';
import { limitTextLength } from '../../../util/limitTextLength';

interface Props {
  title: string;
  description: string;
  disabled?: boolean;
  maxChar?: number;
  className?: string;
}

type ActionProps =
  | { href: string; onClick?: (e: FormEvent) => void }
  | { href?: string; onClick: (e: FormEvent) => void };

const CardContent = ({
  title,
  description,
  maxChar,
}: {
  title: string;
  description: string;
  maxChar?: number;
}) => (
  <>
    <div>
      <div className="p-p--small">{title}</div>
      <div className="tc-primary-500 p-p">
        {maxChar ? limitTextLength(description, maxChar) : description}
      </div>
    </div>
    <img {...arrowRight} />
  </>
);

export default ({
  title,
  description,
  disabled,
  onClick,
  href,
  maxChar,
  className,
}: Props & ActionProps) => {
  const component = href ? 'a' : 'button';

  return (
    <>
      {createElement(component, {
        className: `c-pointer ta-left w100 ${styles.container} ${
          className ?? ''
        }`,
        children: (
          <CardContent
            title={title}
            description={description}
            maxChar={maxChar}
          />
        ),
        disabled,
        ...(component === 'a' ? { href } : { onClick }),
      })}
    </>
  );
};
