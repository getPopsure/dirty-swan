import { Props } from '..';
import styles from './style.module.scss';
import classNames from 'classnames';
import { GenericModal } from '../genericModal';

const BottomModal = ({ className, ...rest }: Props) => (
  <GenericModal
    titleSize='small'
    classNames={{
      wrapper: classNames('w100', styles.wrapper),
      container: ({ isClosing }) => classNames(
        'bg-white d-flex fd-column w100',
        className,
        styles.container, {
          [styles.containerClose]: isClosing, 
        }
      ),
    }}
    {...rest}
  />
);

export { BottomModal };