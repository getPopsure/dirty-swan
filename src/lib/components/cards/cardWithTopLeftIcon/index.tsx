import { associatedClassForCardState, CardProps, headingForCardSize } from '..';
import { arrowRight, featherLogo, Icon } from '../icons';

import styles from './style.module.scss';

const containerStyleFromTitleSize = (
  titleSize: 'xsmall' | 'small' | 'medium' | 'big'
): string => {
  switch (titleSize) {
    case 'xsmall':
      return 'container--xsmall';
    default:
      return 'container';
  }
};

export type CardWithTopLeftIconProps = CardProps & {
  cardSize?: 'xsmall' | 'small' | 'medium' | 'big';
  leftIcon?: 'logo' | Icon;
  rightIcon?: 'arrow' | Icon;
};

export const CardWithTopLeftIcon = ({
  className,
  title,
  cardSize = 'medium',
  children,
  leftIcon,
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: CardWithTopLeftIconProps) => {
  const cardStyle = `${className} ${associatedClassForCardState(
    state,
    dropshadow
  )} ${styles[containerStyleFromTitleSize(cardSize)]}`;

  const titleContainerStyle = styles['title-container'];
  const headingStyle = headingForCardSize(cardSize);
  const iconStyle = styles['right-icon'];
  const cardTextStyle = `p-p tc-grey-600 ${
    cardSize === 'xsmall' ? styles.indent : 'mt16'
  }`;

  return (
    <div className={cardStyle} {...props}>
      <div className={titleContainerStyle}>
        {leftIcon && (
          <img
            className="mr8"
            width="28px"
            height="28px"
            src={leftIcon === 'logo' ? featherLogo.src : leftIcon.src}
            alt={leftIcon === 'logo' ? featherLogo.alt : leftIcon.src}
          />
        )}
        <div className={headingStyle}>{title}</div>
        {rightIcon && (
          <img
            className={iconStyle}
            width="24px"
            height="24px"
            src={rightIcon === 'arrow' ? arrowRight.src : rightIcon.src}
            alt={rightIcon === 'arrow' ? arrowRight.alt : rightIcon.alt}
          />
        )}
      </div>
      <div className={cardTextStyle}>{children}</div>
    </div>
  );
};
