import { BottomModal } from './bottomModal';
import { RegularModal } from './regularModal';
import { BottomOrRegularModal } from './bottomOrRegularModal';
import { RegularModalPopoverApi } from './regularModalPopoverApi';

export interface Props {
  title?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  dismissible?: boolean;
}

export { BottomModal, RegularModal, BottomOrRegularModal, RegularModalPopoverApi };
