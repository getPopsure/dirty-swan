import { Props } from '..';
import styles from './style.module.scss';
import classNamesUtil from 'classnames';
import { GenericModal } from '../genericModal';

const FullScreenModal = ({ className, classNames, ...rest }: Props) => (
  <GenericModal
    titleSize="small"
    classNames={{
      ...classNames,
      wrapper: classNamesUtil(classNames?.wrapper, 'w100'),
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

export { FullScreenModal };
