import { ReactNode } from 'react';

export interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title?: ReactNode;
  className?: string;
  dismissible?: boolean;
  footer?: ReactNode;
}

// export { BottomModal, RegularModal, BottomOrRegularModal };
export * from './bottomModal'
export * from './regularModal'
export * from './bottomOrRegularModal'
export * from './regularModalV2'

