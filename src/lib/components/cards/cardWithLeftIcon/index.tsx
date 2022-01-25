import {
  associatedClassForCardState,
  CardProps,
  headingForTitleSize,
} from '..';
import { Icon, arrowRight } from '../icons';

import styles from './style.module.scss';

const containerStyleFromTitleSize = (
  titleSize: 'xsmall' | 'small' | 'medium' | 'big'
): string => {
  switch (titleSize) {
    case 'xsmall':
      return 'container--xsmall';
    case 'small':
      return 'container--small';
    default:
      return 'container';
  }
};

export default ({
  className = '',
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
  leftIcon?: Icon;
  rightIcon?: 'arrow' | Icon;
}) => {
  const cardStyle = `d-flex ai-center ${className} ${associatedClassForCardState(
    state,
    dropshadow
  )} ${styles[containerStyleFromTitleSize(titleSize)]}`;

  const headingStyle = headingForTitleSize(titleSize);
  const iconStyle = titleSize === 'xsmall' ? 'mr16' : 'mr32';

  return (
    <div className={cardStyle} {...props}>
      {leftIcon && (
        <img
          width="48px"
          height="48px"
          className={iconStyle}
          src={leftIcon.src}
          alt={leftIcon.alt}
        />
      )}
      <div>
        <div className="d-flex">
          <div className={headingStyle}>{title}</div>
          {rightIcon && (
            <img
              className="ml-auto"
              width="24px"
              height="24px"
              src={rightIcon === 'arrow' ? arrowRight.src : rightIcon.src}
              alt={rightIcon === 'arrow' ? arrowRight.alt : rightIcon.alt}
            />
          )}
        </div>
        <p className="p-p mt8 tc-grey-600">{children}</p>
      </div>
    </div>
  );
};
