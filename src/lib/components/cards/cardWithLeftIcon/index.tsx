import {
  associatedClassForCardState,
  CardProps,
  headingForTitleSize,
} from '..';
import { Icon, arrowRight } from '../icons';

import styles from './style.module.scss';

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
  titleSize?: 'small' | 'medium' | 'big';
  leftIcon?: Icon;
  rightIcon?: 'arrow' | Icon;
}) => (
  <div
    className={`${associatedClassForCardState(state, dropshadow)} d-flex ${
      styles.container
    } ${className ?? ''} ${
      titleSize === 'small' ? styles['container--small'] : ''
    }`}
    {...props}
  >
    {leftIcon && (
      <img
        width="48px"
        height="48px"
        className={`mr32 ${styles['left-icon']}`}
        src={leftIcon.src}
        alt={leftIcon.alt}
      />
    )}
    <div>
      <div className="d-flex">
        <div className={headingForTitleSize(titleSize)}>{title}</div>
        {rightIcon && (
          <img
            className={styles['right-icon']}
            width="24px"
            height="24px"
            src={rightIcon === 'arrow' ? arrowRight.src : rightIcon.src}
            alt={rightIcon === 'arrow' ? arrowRight.alt : rightIcon.alt}
          />
        )}
      </div>
      <p className="p-p mt8">{children}</p>
    </div>
  </div>
);
