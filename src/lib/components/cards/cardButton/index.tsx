import { FormEvent, createElement } from 'react';

import styles from './style.module.scss';
import { arrowRight } from '../icons';
import classnames from 'classnames';

interface Props {
  title: string;
  description: string;
  disabled?: boolean;
  className?: string;
  ellipsis: boolean;
}

type ActionProps =
  | { href: string; onClick?: (e: FormEvent) => void }
  | { href?: string; onClick: (e: FormEvent) => void };

const CardContent = ({
  title,
  description,
  ellipsis,
}: {
  title: string;
  description: string;
  ellipsis: boolean;
}) => (
  <>
    <div className="w90">
      <div className="p-p--small">{title}</div>
      <div
        className={classnames('tc-primary-500 p-p', {
          [styles['text-ellipsis']]: ellipsis,
        })}
      >
        {description}
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
  className,
  ellipsis = false,
}: Props & ActionProps) => {
  const component = href ? 'a' : 'button';
  return (
    <>
      {createElement(component, {
        className: `c-pointer ta-left w100 ${styles.container} ${
          className ?? ''
        }
        `,
        children: (
          <CardContent
            title={title}
            description={description}
            ellipsis={ellipsis}
          />
        ),
        disabled,
        ...(component === 'a' ? { href } : { onClick }),
      })}
    </>
  );
};
