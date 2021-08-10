import {
  associatedClassForCardState,
  CardProps,
  headingForTitleSize,
} from '..';
import { Icon, arrowRight, featherLogo } from '../icons';

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
  titleSize?: 'xsmall' | 'small' | 'medium' | 'big';
  leftIcon?: 'logo' | Icon;
  rightIcon?: 'arrow' | Icon;
}) => (
  <div
    className={`${associatedClassForCardState(state, dropshadow)} ${
      styles.container
    }
    ${titleSize === 'xsmall' ? styles['container--xsmall'] : ''}
    ${className ?? ''}`}
    {...props}
  >
    <div className={styles['title-container']}>
      {leftIcon && (
        <img
          className="mr8"
          width="28px"
          height="28px"
          src={leftIcon === 'logo' ? featherLogo.src : leftIcon.src}
          alt={leftIcon === 'logo' ? featherLogo.alt : leftIcon.src}
        />
      )}
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
    <p
      className={`p-p tc-grey-600 ${
        titleSize === 'xsmall' ? styles.indent : 'mt16'
      }`}
    >
      {children}
    </p>
  </div>
);
