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

  return (
    <Card
      {...cardProps}
      label={topIcon && (
        <>
          {isIconType ? (
            <div
              className={classNames(
                'd-flex ai-center jc-center br-circle p16',
                styles.topIconWrapper, {
                  'bg-orange-200': topIconType === 'iconWithBackground'
                }
              )}
            >
              {topIcon}
            </div>
          ) : (
            <div className={classNames(
              'd-flex ai-center jc-center',
              { [styles.topIconBanner]: topIconType === 'banner' }
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
      actionIcon={null}
      showActionIcon={false}
      classNames={{
        buttonWrapper: styles.buttonWrapper,
        wrapper: classNames({
          [styles.wrapper]: true,
          [styles.disabled]: disabled,
          'pt40': topIcon && isIconType,
          'mt40': topIcon && isIconType,
          [styles.bannerWrapper]: topIcon && topIconType === 'banner',
        }),
        label: classNames({
          [styles.floatingLabel]: topIcon && topIconType !== 'image',
        }),
        title: classNames(
          {'mt16': topIcon && topIconType === 'banner'},
          'd-flex ai-center jc-center ta-center my8'
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
