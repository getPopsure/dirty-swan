import {
  associatedClassForCardState,
  CardProps,
  headingForTitleSize,
} from '..';
import { Icon, arrowRight, featherLogo } from '../icons';

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

export default ({
  className,
  title,
  titleSize = 'medium',
  children,
  leftIcon,
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: CardProps & {
  titleSize?: 'xsmall' | 'small' | 'medium' | 'big';
  leftIcon?: 'logo' | Icon;
  rightIcon?: 'arrow' | Icon;
}) => {
  const cardStyle = `${className} ${associatedClassForCardState(
    state,
    dropshadow
  )} ${styles[containerStyleFromTitleSize(titleSize)]}`;

  const titleContainerStyle = styles['title-container'];
  const headingStyle = headingForTitleSize(titleSize);
  const iconStyle = styles['right-icon'];
  const cardTextStyle = `p-p tc-grey-600 ${titleSize === 'xsmall' ? styles.indent : 'mt16'}`;

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
      <p className={cardTextStyle}>{children}</p>
    </div>
  );
};
