import { ComponentProps, ElementType, ReactNode } from 'react';
import classNamesUtil from 'classnames';
import { ChevronRightIcon } from '../../icon';

import styles from './style.module.scss';

const cardDefaultAs = 'section' as const
type CardDefaultAsType = typeof cardDefaultAs;
type DensityType = 'balanced' | 'compact' | 'spacious';
type TitleVariantType = 'small' | 'medium' | 'large';
type VerticalAlignmentType = 'top' | 'center' | 'bottom';
type CardVariant = 'default' | 'transparent' | 'outline' | 'secondary' | 'primary';

type CardOwnProps<E extends ElementType = CardDefaultAsType> = {
  as?: E;
  children?: ReactNode;
  classNames?: {
    buttonWrapper?: string;
    wrapper?: string
    contentWrapper?: string;
    label?: string;
    title?: string;
    description?: string;
    children?: string;
    icon?: string;
    actionIcon?: string;
  };
  density?: DensityType;
  dropShadow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  titleVariant?: TitleVariantType;
  description?: ReactNode;
  descriptionVariant?: 'small' | 'large';
  label?: ReactNode;
  onClick?: () => void;
  actionIcon?: ReactNode;
  showActionIcon?: boolean;
  verticalAlignment?: VerticalAlignmentType;
  variant?: CardVariant
} 

export type CardProps<E extends ElementType = CardDefaultAsType> = CardOwnProps<E> &
  Omit<ComponentProps<E>, keyof CardOwnProps<E>>

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
  verticalAlignment = 'center',
  variant = 'default',
  ...rest
}: CardProps<E>) => {
  const hideActionIcon = typeof actionIcon !== 'undefined' && !actionIcon;
  const propsWithActionIcon = onClick || rest?.href || rest.to; 
  const cardDefaultTag = onClick ? 'button' : cardDefaultAs;
  const Tag = as || cardDefaultTag;
  
  return (
    <Tag
      className={classNamesUtil(
        classNames?.buttonWrapper,
        'd-flex w100 ai-stretch',
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
          'd-flex fd-column jc-center w100 ta-left br8',
          { 'bs-sm': dropShadow && variant === 'default' },
          {
            compact: 'p16',
            balanced: 'p24',
            spacious: 'p32',
          }[density as DensityType],
          {
            top: 'jc-start',
            center: 'jc-center',
            bottom: 'jc-end',
          }[verticalAlignment as VerticalAlignmentType],
          styles?.wrapper,
          styles?.[`wrapper--${variant}`],
          classNames?.wrapper
        )}
      >
        <div className="d-flex w100">
          {icon && (
            <div
              className={classNamesUtil(
                `d-flex`,
                styles.icon,
                styles[`icon${density}`],
                classNames?.icon, 
                {
                  top: 'ai-start',
                  center: 'ai-center',
                  bottom: 'ai-end',
                }[verticalAlignment as VerticalAlignmentType],
              )}
            >
              {icon}
            </div>
          )}

          <div className="d-flex jc-between w100">
            <div
              className={classNamesUtil(
                classNames?.contentWrapper || '',
                "d-flex jc-center gap8 fd-column tc-neutral-900 w100"
              )}
            >
              {label && (
                <h4 className={classNamesUtil('p-p--small', classNames?.label)}>
                  {label}
                </h4>
              )}

              {title && (
                <h3
                  className={classNamesUtil(
                    classNames?.title,
                    {
                      large: 'p-h3',
                      medium: 'p-h4',
                      small: 'p-p',
                    }[titleVariant as TitleVariantType]
                  )}
                >
                  {title}
                </h3>
              )}

              {description && (
                <div
                  className={classNamesUtil(
                    styles.description,
                    classNames?.description,
                    descriptionVariant === 'small' ? 'p-p--small' : 'p-p',
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
