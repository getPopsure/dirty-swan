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
        description: 'tc-primary-500 p-p',
      }}
      density='compact'
      label={title}
      description={typeof description === 'string' ? description : null}
      actionIcon={
        <ChevronRightIcon
          size={20}
          color={'purple-500'}
          className={styles.chevronRight}
        />
      }
      showActionIcon
      {...href ? { href } : {}}
    >
      {typeof description !== 'string' ? description : null}
  </Card>
);
