import {
  associatedClassForCardState,
  CardProps,
  headingForTitleSize,
} from '..';
import { Icon, arrowRight, IconSize } from '../icons';

import styles from './style.module.scss';

export default ({
  className,
  title,
  titleSize = 'medium',
  children,
  topIcon,
  topIconSize,
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: CardProps & {
  topIcon: Icon;
  topIconSize?: IconSize;
  titleSize?: 'small' | 'medium' | 'big';
  rightIcon?: 'arrow' | Icon;
}) => (
  <>
    <div
      className={`d-flex ${associatedClassForCardState(state, dropshadow)} ${
        styles.container
      } ${className ?? ''}`}
      {...props}
    >
      <img
        width={topIconSize?.width ? `${topIconSize?.width}px` : '48xp'}
        height={topIconSize?.height ? `${topIconSize?.height}px` : '48xp'}
        alt={topIcon.alt}
        src={topIcon.src}
      />
      <div className="d-flex mt16">
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
      {children}
    </div>
  </>
);
