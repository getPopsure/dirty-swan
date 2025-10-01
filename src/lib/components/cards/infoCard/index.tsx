import { associatedClassForCardState, CardProps } from '..';
import { Icon, info } from '../icons';

import styles from './style.module.scss';

export type InfoCardProps = CardProps & {
  topIcon: Icon;
  rightIcon?: 'info' | Icon;
};

export const InfoCard = ({
  className,
  title,
  children,
  topIcon,
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: InfoCardProps) => (
  <div className={`${styles['root-container']} ${className ?? ''}`} {...props}>
    <img
      src={topIcon.src}
      alt={topIcon.alt}
      className={`${styles['top-icon']} ${
        state === 'muted' ? styles['top-icon--muted'] : ''
      } `}
      width="80px"
      height="80px"
    />
    <div
      className={`${associatedClassForCardState(state, dropshadow)} ${
        styles.container
      }`}
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
      <h3 className="p-h4 ta-center mt64">{title}</h3>
      <div className="p-p mt16 tc-neutral-700">{children}</div>
    </div>
  </div>
);
