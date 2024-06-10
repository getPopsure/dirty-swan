import { BottomModal } from './bottomModal';
import { RegularModal } from './regularModal';
import { BottomOrRegularModal } from './bottomOrRegularModal';
import { RegularModalV2 } from './regularModal/index-v2';

export interface Props {
  title?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  dismissible?: boolean;
}

export { BottomModal, RegularModal, BottomOrRegularModal, RegularModalV2 };
