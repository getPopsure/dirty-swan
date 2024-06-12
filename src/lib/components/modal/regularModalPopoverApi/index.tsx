import classNames from 'classnames';
import styles from './styles.module.scss';
import { XIcon } from '../../icon/icons';

interface Props {
  title?: string;
  popoverId: string;
  children: React.ReactNode;
}

export const RegularModalPopoverApi = ({ popoverId, title, children }: Props) => {
  return (
    <div
      className={styles.overlay}
      id={popoverId}
      popover="manual"
    >
      <div className={styles.body}>
        <div
          className={classNames(styles.header, {
            'jc-between': !!title,
            'jc-end': !title,
          })}
        >
          {title && <div className={`p-h2 ${styles.title}`}>{title}</div>}
          <button
            type="button"
            className={styles.close}
            popovertarget={popoverId}
            popovertargetaction="hide"
          >
            <XIcon
              size={24}
              color={'grey-700'}
              className={`${styles.closeIcon}`}
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  )

}