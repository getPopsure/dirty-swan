import { BottomModal } from './bottomModal';
import { RegularModal } from './regularModal';
import { BottomOrRegularModal } from './bottomOrRegularModal';
import { ReactNode } from 'react';

export interface Props {
  title?: ReactNode;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  dismissible?: boolean;
  footer?: ReactNode;
}

export { BottomModal, RegularModal, BottomOrRegularModal };
