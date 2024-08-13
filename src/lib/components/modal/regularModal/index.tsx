import { Props } from '..';
import styles from './style.module.scss';
import classNames from 'classnames';
import { GenericModal } from '../genericModal';

const RegularModal = ({ className = '', size, ...rest }: Props) => (
  <GenericModal
    classNames={{
      wrapper: ({ isClosing }) => classNames(
        'd-flex ai-center w90 mx-auto my0',
        className,
        styles.wrapper, {
          [styles.wrapperClose]: isClosing,
        }
      ),
      container: classNames(
        'bg-white br8 d-flex ai-center fd-column mx-auto my0',
        styles.container,
        size === 'large' ? 'wmx10' : 'wmx8'
      )
    }}
    {...rest}
  />
);

export { RegularModal };
