import { Props } from '..';
import styles from './style.module.scss';
import classNamesUtil from 'classnames';
import { GenericModal } from '../genericModal';

const BottomModal = ({ className, classNames, ...rest }: Props) => (
  <GenericModal
    titleSize="small"
    classNames={{
      ...classNames,
      wrapper: classNamesUtil('w100', styles.wrapper, classNames?.wrapper),
      container: ({ isClosing }) =>
        classNamesUtil(
          'bg-white d-flex fd-column w100',
          className,
          styles.container,
          classNames?.container,
          {
            [styles.containerClose]: isClosing,
          }
        ),
      body: classNamesUtil(styles.body, classNames?.body),
    }}
    {...rest}
  />
);

export { BottomModal };
