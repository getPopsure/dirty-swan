import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './style.module.scss';
import { XIcon } from '../../icon/icons';
import classNames from 'classnames';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;


export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      {/* <DialogPrimitive.Overlay className={classNames(styles.overlay)} /> */}
      <DialogPrimitive.Content {...props} ref={forwardedRef} className={classNames(styles.container)}>
        <div className={classNames(styles.body)}>
          {children}
        </div>
        <DialogPrimitive.Close aria-label="Close" className={styles.close}>
          <XIcon
            size={24}
            color={'grey-700'}
            className={classNames(styles.closeIcon)}
          />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classNames(styles.title, 'p-h2')}
    {...props}
  />
));

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classNames(styles.description, className)}
    {...props}
  />
));

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
);


type Props = {
  children?: React.ReactNode;
  triggerBtnText: string;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const RegularModalV2 = ({ triggerBtnText, children, open, onOpenChange, title, description }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={classNames("p-btn--primary wmn2 mt24")}>{triggerBtnText}</DialogTrigger>
      <DialogContent>
        {(title || description) && (
          <DialogHeader className={classNames(styles.header, {
            'jc-between': !!title,
            'jc-end': !title,
          })}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
