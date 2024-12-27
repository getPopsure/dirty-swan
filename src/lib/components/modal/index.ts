import { BottomModal } from './bottomModal';
import { RegularModal } from './regularModal';
import { BottomOrRegularModal } from './bottomOrRegularModal';
import { FullScreenModal } from './fullScreenModal';
import { ReactNode } from 'react';
import { GenericModalClassNames } from './genericModal';

export interface Props {
  title?: ReactNode;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  onModalScroll?: (scrollTop: number, element: HTMLDivElement) => void;
  className?: string;
  classNames?: GenericModalClassNames;
  dismissible?: boolean;
  size?: 'default' | 'large';
  footer?: ReactNode;
}

export { BottomModal, RegularModal, BottomOrRegularModal, FullScreenModal };
