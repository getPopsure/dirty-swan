import { Props } from '..';
import styles from './style.module.scss';
import classNamesUtil from 'classnames';
import { GenericModal } from '../genericModal';

const RegularModal = ({ className = '', classNames, size, ...rest }: Props) => (
  <GenericModal
    classNames={{
      ...classNames,
      wrapper: ({ isClosing }) =>
        classNamesUtil(
          'd-flex ai-center w90 mx-auto my0',
          className,
          styles.wrapper,
          classNames?.wrapper,
          {
            [styles.wrapperClose]: isClosing,
          }
        ),
      container: classNamesUtil(
        'bg-white br8 d-flex ai-center fd-column mx-auto my0',
        styles.container,
        size === 'large' ? 'wmx10' : 'wmx8',
        classNames?.container
      ),
    }}
    {...rest}
  />
);

export { RegularModal };
