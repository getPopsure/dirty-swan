import { Props } from '..';
import useOnClose from '../hooks/useOnClose';

import styles from './style.module.scss';
import classNamesUtil from 'classnames';
import { Button } from '../../button';
import { XIcon } from '../../icon';

interface GenericModalProps extends Props {
  classNames?: {
    wrapper?: string | (({ isClosing }: { isClosing: boolean }) => string);
    container?: string | (({ isClosing }: { isClosing: boolean }) => string);
    overlay?: string;
    header?: string;
    closeButton?: string;
    title?: string;
    body?: string;
    footer?: string;
  };
  titleSize?: 'small' | 'default';
}

export const GenericModal = ({
  title,
  isOpen,
  children,
  onClose,
  classNames,
  dismissible = true,
  footer,
  titleSize = 'default',
}: GenericModalProps) => {
  const {
    isClosing,
    isVisible,
    handleContainerClick,
    handleOnCloseAnimationEnded,
    handleOnClose,
    handleOnOverlayClick,
  } = useOnClose(onClose, isOpen, dismissible);

  return !isVisible ? null : (
    <div
      className={classNamesUtil(
        classNames?.overlay,
        styles.overlay, {
          [styles.overlayClose]: isClosing,
        }
      )}
      onAnimationEnd={handleOnCloseAnimationEnded}
      onClick={handleOnOverlayClick}
    >
      <div 
        className={
          typeof classNames?.wrapper === 'string' 
            ? classNames?.wrapper 
            : classNames?.wrapper?.({ isClosing })
        }
      >
        <div
          className={
            typeof classNames?.container === 'string' 
            ? classNames?.container 
            : classNames?.container?.({ isClosing })
          }
          onClick={handleContainerClick}
        >

          <div
            className={classNamesUtil(
              'bg-white d-flex ai-center w100 px24 pt24 pb16',
              styles.header, {
                'jc-between': !!title,
                'jc-end': !title,
              }
            )}
          >
            {title && (
              <div
                className={classNamesUtil(
                  styles.title,
                  titleSize === 'small' ? 'p-h4' : 'p-h2'
                )}
              >
                {title}
              </div>
            )}
          
            {dismissible && (
              <Button
                hideLabel
                leftIcon={<XIcon color="grey-700" />}
                onClick={handleOnClose}
                type="button"
                variant="textColor"
                className={classNamesUtil(
                  classNames?.closeButton,
                  'p0',
                  styles.closeButton
                )}
              >
                Close modal
              </Button>
            )}
          </div>

          <div
            className={classNamesUtil(
              'w100',
              classNames?.body,
              styles.body
            )}
          >
            {children}
          </div>

          {footer && (
            <div
              className={classNamesUtil(
                classNames?.footer,
                'w100 bg-white',
                styles.footer
              )}
            >
              <div className="px24 py16">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
