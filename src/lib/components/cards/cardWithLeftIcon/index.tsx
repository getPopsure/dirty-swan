import {
  associatedClassForCardState,
  CardProps,
  headingForCardSize,
} from '..';
import { Icon, arrowRight } from '../icons';

import styles from './style.module.scss';

const containerStyleFromCardSize = (
  cardSize: 'xsmall' | 'small' | 'medium' | 'big'
): string => {
  switch (cardSize) {
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
  cardSize = 'medium',
  children,
  leftIcon,
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: CardProps & {
  cardSize?: 'xsmall' | 'small' | 'medium' | 'big';
  leftIcon?: Icon;
  rightIcon?: 'arrow' | Icon;
}) => {
  const cardStyle = `d-flex ai-center ${className} ${associatedClassForCardState(
    state,
    dropshadow
  )} ${styles[containerStyleFromCardSize(cardSize)]}`;

  const headingStyle = headingForCardSize(cardSize);
  const iconStyle = cardSize === 'xsmall' ? 'mr16' : 'mr32';

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
