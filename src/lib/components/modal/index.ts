import BottomModal from './bottomModal';
import RegularModal from './regularModal';
import BottomOrRegularModal from './bottomOrRegularModal';

export interface Props {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  dismissible?: boolean;
}

export { BottomModal, RegularModal, BottomOrRegularModal };
