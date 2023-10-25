import { ReactNode } from 'react';
import classNamesUtil from 'classnames';
import { ChevronRightIcon } from '../icon';

import styles from './style.module.scss';

export interface CardProps {
  children?: ReactNode;
  classNames?: {
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
} 

const CardContent = ({ 
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
}: CardProps) => (
  <section
    className={classNamesUtil(
      'br8 bg-white bs-sm w100 ta-left', 
      {
        'bs-sm': dropShadow,
        compact: 'p16',
        balanced: 'p24',
        spacious: 'p32'
      }[density],
      classNames?.wrapper,
    )}
  >
    <div className='d-flex'>
      {icon && (
        <div 
          className={classNamesUtil(
            'd-flex mr16 ai-center tc-primary-500',
            classNames?.icon
          )}
        >
          {icon}
        </div>
      )}

      <div className='d-flex jc-between w100'>
        <div className='d-flex jc-center gap8 fd-column tc-grey-900 w100'>
          {label && (
            <h3
              className={classNamesUtil('p-p--small', classNames?.label)}
            >
              {label}
            </h3>
          )}

          {title && (
            <h2
              className={classNamesUtil(classNames?.title, {
                large:'p-h3',
                medium:'p-h4',
                small:'p-p',
              }[titleVariant])}
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

        {onClick && (
          <div
            className={classNamesUtil(
              classNames?.actionIcon,
              "d-flex ml16 ai-center"
            )}
          >
            {actionIcon || <ChevronRightIcon size={24} />}
          </div>
        )}
      </div>
    </div>

    {children && (
      <div className={classNames?.children}>{children}</div>
    )}
  </section>
);

const Card = (props: CardProps) => {
  const { onClick } = props;

  if (onClick) {
    return (
      <button
        className={classNamesUtil('c-pointer d-flex w100 br8', styles.button)}
        onClick={onClick} 
        type="button"
      >
        <CardContent {...props} />
      </button>
    )
  }

  return <CardContent {...props} />;
}

export { Card };
