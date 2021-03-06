import { associatedClassForCardState, CardProps } from '..';
import { Icon, info } from '../icons';

import styles from './style.module.scss';

export default ({
  className,
  title,
  children,
  topIcon,
  rightIcon,
  state = 'actionable',
  ...props
}: CardProps & {
  topIcon: Icon;
  rightIcon?: 'info' | Icon;
}) => (
  <div className={`${styles['root-container']} ${className ?? ''}`} {...props}>
    <div className={styles['top-icon-background']}>
      <img
        src={topIcon.src}
        alt={topIcon.alt}
        className={styles['top-icon']}
        width="48px"
        height="48px"
      />
    </div>
    <div
      className={`${associatedClassForCardState(state)} ${styles.container}`}
    >
      {rightIcon && (
        <img
          width="20px"
          height="20px"
          className={styles['right-icon']}
          src={rightIcon === 'info' ? info.src : rightIcon.src}
          alt={rightIcon === 'info' ? info.alt : rightIcon.alt}
        />
      )}
      <div className="p-h4 ta-center mt64">{title}</div>
      <p className="p-p mt16">{children}</p>
    </div>
  </div>
);
