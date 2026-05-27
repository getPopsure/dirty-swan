import { ReactNode } from 'react';
import ArrowRight from '../../icon/icons/ArrowRight';
import { Card, CardProps } from '../card';

import styles from './style.module.scss';
import classNames from 'classnames';

export interface InfoCardProps extends CardProps {
  topIcon: ReactNode;
  showIcon?: boolean;
  topIconType?: 'image' | 'icon' | 'iconWithBackground' | 'banner';
  disabled?: boolean;
};

export const InfoCard = ({
  className,
  showIcon = true,
  title,
  children,
  topIcon,
  topIconType,
  disabled = false,
  onClick,
  ...cardProps
}: InfoCardProps) => {
  const isIconType = topIconType === 'icon' || topIconType === 'iconWithBackground';
  const isFloatingType = isIconType || topIconType === 'image';

  return (
    <Card
      {...cardProps}
      label={topIcon && (
        <>
          {isIconType ? (
            <div
              className={classNames(
                'd-flex ai-center jc-center p16 bg-orange-200',
                styles.topIconWrapper,
              )}
            >
              {topIcon}
            </div>
          ) : (
            <div className={classNames(
              'd-flex ai-center jc-center',
              { [styles.topIconBanner]: topIconType === 'banner' },
              { [styles.topIconImage]: topIconType === 'image' },
            )}>
              {topIcon}
            </div>
          )}
        </>
      )}
      title={title && (
        <>
          {title}

          {showIcon && <ArrowRight size={20} />}
        </>
      )}
      titleVariant='medium'
      description={children}
      descriptionVariant='small'
      dropShadow={false}
      actionIcon={null}
      showActionIcon={false}
      classNames={{
        buttonWrapper: styles.buttonWrapper,
        wrapper: classNames({
          [styles.wrapper]: true,
          [styles.disabled]: disabled,
          'pt40': topIcon && isFloatingType,
          'mt40': topIcon && isFloatingType,
          [styles.bannerWrapper]: topIcon && topIconType === 'banner',
        }),
        label: classNames({
          [styles.floatingLabel]: topIcon && (isFloatingType || topIconType === 'banner'),
        }),
        title: classNames(
          {'mt16': topIcon && topIconType === 'banner'},
          'd-flex ai-center jc-center ta-center mb8',
          styles.title,
        ),
        description: 'ta-center',
        contentWrapper: styles.contentWrapper,
        ...cardProps?.classNames || {}
      }}
      variant='default'
      onClick={disabled ? undefined : onClick}
      density='xsmall'
    />
  );
}
