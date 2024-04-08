import { ElementType, ReactNode } from 'react';
import classNamesUtil from 'classnames';
import { ChevronRightIcon } from '../icon';

import styles from './style.module.scss';

const CardDefault = 'section' as const
type CardDefaultAsType = typeof CardDefault;

type CardOwnProps<E extends ElementType = CardDefaultAsType> = {
  as?: E;
  children?: ReactNode;
  classNames?: {
    buttonWrapper?: string;
    wrapper?: string;
    label?: string;
    title?: string;
    description?: string;
    children?: string;
    icon?: string;
    actionIcon?: string;
  };
  density?: 'balanced' | 'compact' | 'spacious';
  dropShadow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  titleVariant?: 'small' | 'medium' | 'large';
  description?: ReactNode;
  descriptionVariant?: 'small' | 'large';
  label?: ReactNode;
  onClick?: () => void;
  actionIcon?: ReactNode;
  showActionIcon?: boolean;
}

export type CardProps<E extends ElementType = CardDefaultAsType> = CardOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof CardOwnProps<E>>

const Card = <E extends ElementType = CardDefaultAsType>({
  as,
  children,
  classNames,
  density = 'balanced',
  description,
  descriptionVariant = 'large',
  dropShadow = true,
  icon,
  label,
  onClick,
  actionIcon,
  title,
  titleVariant = 'large',
  showActionIcon,
  ...rest
}: CardProps<E>) => {
  const hideActionIcon = typeof actionIcon !== 'undefined' && !actionIcon;
  const propsWithActionIcon = onClick || rest?.href || rest.to; 
  const cardDefaultTag = onClick ? 'button' : CardDefault;
  const Tag = as || cardDefaultTag;
  
  return (
    <Tag
      className={classNamesUtil(
        classNames?.buttonWrapper,
        ' d-flex w100 br8 ai-stretch',
        {
          'c-pointer': propsWithActionIcon,
          [styles.button]: propsWithActionIcon
        },
      )}
      {...onClick && { 
        onClick, 
        type: "button"
      }}
      {...rest}
    >
      <div
        className={classNamesUtil(
          'd-flex fd-column jc-center br8 bg-white w100 ta-left',
          { 'bs-sm': dropShadow },
          {
            compact: 'p16',
            balanced: 'p24',
            spacious: 'p32',
          }[density],
          classNames?.wrapper
        )}
      >
        <div className="d-flex w100">
          {icon && (
            <div
              className={classNamesUtil(
                `d-flex ai-center tc-primary-500`,
                styles.icon,
                styles[`icon${density}`],
                classNames?.icon
              )}
            >
              {icon}
            </div>
          )}

          <div className="d-flex jc-between w100">
            <div className="d-flex jc-center gap8 fd-column tc-grey-900 w100">
              {label && (
                <h3 className={classNamesUtil('p-p--small', classNames?.label)}>
                  {label}
                </h3>
              )}

              {title && (
                <h2
                  className={classNamesUtil(
                    classNames?.title,
                    {
                      large: 'p-h3',
                      medium: 'p-h4',
                      small: 'p-p',
                    }[titleVariant]
                  )}
                >
                  {title}
                </h2>
              )}

              {description && (
                <div
                  className={classNamesUtil(
                    'tc-grey-600',
                    classNames?.description,
                    descriptionVariant === 'small' ? 'p-p--small' : 'p-p'
                  )}
                >
                  {description}
                </div>
              )}
            </div>

            {(showActionIcon || (propsWithActionIcon && !hideActionIcon)) && (
              <div
                className={classNamesUtil(
                  styles.actionIcon,
                  classNames?.actionIcon,
                  styles[`actionIcon${density}`],
                  'd-flex ai-center'
                )}
              >
                {actionIcon || <ChevronRightIcon size={24} />}
              </div>
            )}
          </div>
        </div>

        {children && <div className={classNames?.children}>{children}</div>}
      </div>
    </Tag>
  );
};

export { Card };
