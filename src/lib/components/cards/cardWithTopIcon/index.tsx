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
  topIconSize = { width: 48, height: 48 },
  rightIcon,
  state = 'actionable',
  dropshadow = true,
  ...props
}: CardProps & {
  topIcon: Icon;
  topIconSize: IconSize;
  titleSize?: 'small' | 'medium' | 'big';
  rightIcon?: 'arrow' | Icon;
}) => {
  const cardStyle = `d-flex fd-column ai-center ${className} ${associatedClassForCardState(
    state,
    dropshadow
  )} ${styles.container}`;

  const headingStyle = headingForTitleSize(titleSize);
  const iconStyle = styles['right-icon'];

  return (
    <>
      <div className={cardStyle} {...props}>
        <img
          width={topIconSize.width}
          height={topIconSize.height}
          alt={topIcon.alt}
          src={topIcon.src}
        />
        <div className="d-flex mt16">
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
        {children}
      </div>
    </>
  );
};
