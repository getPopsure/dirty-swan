import { Props } from '..';
import useOnClose, { OnCloseReturn } from '../hooks/useOnClose';

import styles from './style.module.scss';
import classNamesUtil from 'classnames';
import { Button } from '../../button';
import { XIcon } from '../../icon';
import { useRef, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

export interface GenericModalClassNames {
  wrapper?: string | (({ isClosing }: { isClosing: boolean }) => string);
  container?: string | (({ isClosing }: { isClosing: boolean }) => string);
  overlay?: string;
  header?: string;
  closeButton?: string;
  closeButtonIcon?: string;
  title?: string;
  body?: string;
  footer?: string;
}
interface GenericModalProps extends Props {
  classNames?: GenericModalClassNames;
  titleSize?: 'small' | 'default';
}

const InnerModal = ({
  title,
  children,
  classNames,
  dismissible = true,
  footer,
  titleSize = 'default',
  isClosing,
  onModalScroll,
  handleContainerClick,
  handleOnCloseAnimationEnded,
  handleOnClose,
  handleOnOverlayClick,
}: GenericModalProps & OnCloseReturn) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalBodyRef.current || !onModalScroll) {
      return;
    }
    const handleOnScroll = () => {
      if (modalBodyRef.current) {
        onModalScroll(modalBodyRef.current.scrollTop, modalBodyRef.current);
      }
    };

    modalBodyRef.current.addEventListener('scroll', handleOnScroll);

    return () => {
      modalBodyRef.current?.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <div
      className={classNamesUtil(classNames?.overlay, styles.overlay, {
        [styles.overlayClose]: isClosing,
      })}
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
      <FocusLock returnFocus className="m-auto">
        <div
          aria-modal="true"
          role="dialog"
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
                styles.header,
                {
                  'jc-between': !!title,
                  'jc-end': !title,
                }
              )}
            >
              {title && (
                <div
                  className={classNamesUtil(
                    styles.title,
                    titleSize === 'small' ? 'p-h4' : 'p-h2',
                    classNames?.title,
                  )}
                >
                  {title}
                </div>
              )}

              {dismissible && (
                <Button
                  hideLabel
                  leftIcon={
                    <XIcon
                      color="grey-700"
                      className={classNames?.closeButtonIcon}
                    />
                  }
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
              className={classNamesUtil('w100', classNames?.body, styles.body)}
              ref={modalBodyRef}
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
                <div className="p24 pt16">{footer}</div>
              </div>
            )}
          </div>
        </FocusLock>
      </div>
    </div>
  );
};

export const GenericModal = (props: GenericModalProps) => {
  const { isOpen, onClose, dismissible = true } = props;
  const { isVisible, ...rest } = useOnClose(onClose, isOpen, dismissible);

  if (!isVisible) {
    return null;
  }

  return <InnerModal {...props} isVisible={isVisible} {...rest} />;
};
