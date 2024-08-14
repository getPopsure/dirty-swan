import { BottomModal } from './bottomModal';
import { RegularModal } from './regularModal';
import { BottomOrRegularModal } from './bottomOrRegularModal';
import { ReactNode } from 'react';

export interface Props {
  title?: ReactNode;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  onModalScroll?: (scrollTop: number, element: HTMLDivElement) => void;
  className?: string;
  dismissible?: boolean;
  size?: 'default' | 'large';
  footer?: ReactNode;
}

export { BottomModal, RegularModal, BottomOrRegularModal };
