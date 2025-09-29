import { ReactNode } from 'react';

import { ChevronRightIcon } from '../../icon/icons';

import styles from './style.module.scss';
import { Card, CardProps } from '../card';
import classNames from 'classnames';

export type CardButtonProps = {
  title: string;
  description: string | ReactNode;
  disabled?: boolean;
  className?: string;
  href?: string;
} & CardProps;

export const CardButton = ({
  title,
  description,
  disabled = false,
  className,
  href,
}: CardButtonProps) => (
  <Card
      as={href ? 'a' : 'button'}
      classNames={{
        buttonWrapper: classNames(
          'c-pointer ta-left w100',
          className,
          { [styles.containerDisabled]: disabled }
        ),
        label: 'tc-neutral-700',
        description: 'tc-neutral-900 p-p',
        contentWrapper: styles.contentWrapper
      }}
      density='xsmall'
      label={title}
      description={typeof description === 'string' ? description : null}
      actionIcon={
        <ChevronRightIcon
          size={20}
          color={'neutral-900'}
          className={styles.chevronRight}
        />
      }
      showActionIcon
      {...href ? { href } : {}}
    >
      {typeof description !== 'string' ? description : null}
  </Card>
);
