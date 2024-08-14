
import { useState } from 'react';
import { BottomModal, BottomOrRegularModal, Props, RegularModal } from '.';
import { Button } from '../button';

const story = {
  title: 'JSX/Modals',
  component: BottomOrRegularModal,
  argTypes: {
    title: {
      description: "The title that needs to be displayed on the modal",
    },
    isOpen: {
      description: "When set to `true`, the modal is displayed. When set to `false` the modal gets removed",
    },
    dismissible: {
      description: "The content that gets displayed on the modal",
    },
    className: {
      description: 'Any additional className',
    },
    size: {
      description: 'The size of the modal, either large or default.',
      control: 'radio',
      options: {
        default: 'default',
        large: 'large',
      }
    },
    children: {
      description: 'The content that gets displayed on the modal',
      type: 'text',
      table: {
        type: {
            summary: 'ReactNode'
        }
      }
    },
    onClose: {
      description: 'Callback when the user close the modal',
      action: true,
      table: {
        category: "Callbacks",
      },
    },
    onModalScroll: {
      description: 'Callback when the user scroll the modal',
      action: true,
      table: {
        category: "Callbacks",
      }
    }
  },
  args: {
    title: "Modal title",
    isOpen: false,
    dismissible: true,
    className: '',
    children: 'Modal content to be displayed',
    size: 'default',
  },
  parameters: {
    componentSubtitle: 'Bottom or Regular modal will automatically choose what’s best to display based on the users screen width.',
    docs: {
      description: {
        component: 'Modals are dialog overlays that prevent the user from interacting with the rest of the website until an action is taken or the dialog is dismissed. Modals are purposefully disruptive and should be used thoughtfully and sparingly.',
      }
    },
  },
};

export const BottomOrRegularModalStory = ({
  children,
  className,
  dismissible,
  isOpen,
  onClose,
  onModalScroll,
  size,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      <button
        className="p-btn--primary wmn2"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <BottomOrRegularModal
        dismissible={dismissible}
        className={className}
        title={title}
        isOpen={display}
        size={size}
        onModalScroll={onModalScroll}
        onClose={handleOnClose}
      >
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div>
            {children}
          </div>
          <button
            className="p-btn--primary mt24 wmn3"
            onClick={() => setDisplay(false)}
          >
            Continue
          </button>
        </div>
      </BottomOrRegularModal>
    </>
  );
}

BottomOrRegularModalStory.storyName = 'BottomOrRegularModal';

export const RegularModalStory = ({
  children,
  isOpen,
  onClose,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      Regular modals are primary meant to be used on Desktop or Tablet environment. The modal will appear in the middle of the screen and the user will be able to dismiss them using the top left "X" icon.  
      If you want to use it for Mobile only, you should check BottomModal instead.
      Want to use either Regular Modal or Bottom Modal based on the screen width? You can use Bottom or Regular modal.

      <button
        className="p-btn--primary wmn2 mt24"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <RegularModal
        title={title}
        isOpen={display}
        onClose={handleOnClose}
      >
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div>
            {children}
          </div>
          <button
            className="p-btn--primary mt24 wmn3"
            onClick={() => setDisplay(false)}
          >
            Continue
          </button>
        </div>
      </RegularModal>
    </>
  );
}

RegularModalStory.storyName = 'RegularModal';

export const BottomModalStory = ({
  children,
  isOpen,
  onClose,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      Bottom modals are primary meant to be used on Mobile environment. The modal will appear from the bottom of the screen and the user will be able to dismiss them using the top left "X" icon.
      If you want to use it for Desktop only, you should check Regular modal instead.
      Want to use either Regular Modal or Bottom Modal based on the screen width? You can use Bottom or Regular modal.

      <button
        className="p-btn--primary wmn2 mt24"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <BottomModal
        title={title}
        isOpen={display}
        onClose={handleOnClose}
      >
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div>
            {children}
          </div>
          <button
            className="p-btn--primary mt24 wmn3"
            onClick={() => setDisplay(false)}
          >
            Continue
          </button>
        </div>
      </BottomModal>
    </>
  );
}

BottomModalStory.storyName = 'BottomModal';

export const NonDismissibleModal = ({
  children,
  isOpen,
  onClose,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      Setting the dismissible prop to false will hide the close button and prevent the user from closing it using the escape key or clicking outside.
      This prop can be useful if we want the user to explicitly interact with the modal options.

      <strong>Warning:</strong> a modal with the dismissible prop can only be closed by changing the isOpen prop to false.

      <button
        className="p-btn--primary wmn2 mt24"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <BottomOrRegularModal
        dismissible={false}
        title={title}
        isOpen={display}
        onClose={handleOnClose}
      >
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div>
            {children}
          </div>
          <button
            className="p-btn--primary mt24 wmn3"
            onClick={() => setDisplay(false)}
          >
            Continue
          </button>
        </div>
      </BottomOrRegularModal>
    </>
  );
}

export const ModalWithFooter = ({
  children,
  isOpen,
  onClose,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      <button
        className="p-btn--primary wmn2"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <BottomOrRegularModal
        title={title}
        isOpen={display}
        onClose={handleOnClose}
        footer={(
          <div className='d-flex fd-row gap8'>
            <Button variant='textColor' className='w100' onClick={handleOnClose}>
              Skip
            </Button>
            <Button className='w100' onClick={handleOnClose}>
              Continue
            </Button>
          </div>
        )}
      >
        <div className='p24'>
          <div>
            {children}
          </div>
        </div>
      </BottomOrRegularModal>
    </>
  );
}

export const ModalWithFooterAndScroll = ({
  children,
  isOpen,
  onClose,
  title,
}: Props) => {
  const [display, setDisplay] = useState(isOpen);
  const handleOnClose = () => {
    onClose();
    setDisplay(false);
  };

  return (
    <>
      <button
        className="p-btn--primary wmn2"
        onClick={() => setDisplay(true)}
      >
        Click to open modal
      </button>

      <BottomOrRegularModal
        title={title}
        isOpen={display}
        onClose={handleOnClose}
        footer={(
          <div className='d-flex fd-row gap8'>
            <Button variant='textColor' className='w100' onClick={handleOnClose}>
              Skip
            </Button>
            <Button className='w100' onClick={handleOnClose}>
              Continue
            </Button>
          </div>
        )}
      >
        <div className='p24'>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <div style={{ height: '840px' }} />
            {children}
          </div>
        </div>
      </BottomOrRegularModal>
    </>
  );
}

export default story;
