import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';
import { Toaster as HotToaster, toast as hotToast } from 'react-hot-toast';
import { XIcon } from '../icon';

export type ToastType = 'warning' | 'error' | 'success' | 'information';

export interface ToastOptions {
  type?: ToastType;
  description?: ReactNode;
  duration?: number;
  action?: {
    title: string;
    onClick: () => void;
  }
};

export interface ToastProps extends ToastOptions { 
  onDismiss: () => void,
  title: string 
};

const Toaster = () => (
  <HotToaster 
    toastOptions={{
      className: classNames(styles.toast, 'bs-lg'),
    }}
  />
);

const Toast = ({
  action,
  description,
  onDismiss,
  title,
  type = "success"
}: ToastProps) => (
  <div 
    className={classNames(
      styles.toastContent,
      'd-flex jc-between w100'
  )}>
    <div
      className={classNames(
        styles.toastSidebar, 
        styles[`toastSidebar--${type}`]
      )}
    />
    <div className='d-flex fd-column jc-center ta-left mr8'>
      <h4 className='p-h4'>{title}</h4>
      
      {description && (
        <p className='p-p p-p--small mt8 tc-grey-600'>{description}</p>
      )}

      {action && (
        <button
          className={classNames(
            styles.actionButton,
            styles[`actionButton--${type}`],
            'mt8 c-pointer ta-left'
          )}
          onClick={() => {
            action.onClick();
            onDismiss();
          }}
          type="button"
        >
          {action.title}
        </button>
      )}
    </div>

    <div className='d-flex ai-center'>
      <button
        className={classNames(styles.closeButton, 'c-pointer')}
        onClick={onDismiss}
        data-testid="toast-close-button"
      >
        <XIcon size={24} /> 
      </button>
    </div>
  </div>
);

const toast = (title: string, { duration = 3000, ...toastOptions }: ToastOptions) => (
  hotToast((t) => (
    <Toast
      title={title} 
      onDismiss={() => hotToast.dismiss(t.id)} 
      {...toastOptions}
    />
  ), { duration })
);

export { Toaster, Toast, toast };
