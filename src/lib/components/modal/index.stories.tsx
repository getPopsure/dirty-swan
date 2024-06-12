
import { useState } from 'react';
import { BottomModal, BottomOrRegularModal, Props, RegularModal, RegularModalPopoverApi } from '.';
import { Markdown } from '../markdown';

const story = {
  title: 'JSX/Modals',
  component: BottomOrRegularModal,
  argTypes: {
    title: {
      defaultValue: "Modal title",
      description: "The title that needs to be displayed on the modal",
    },
    isOpen: {
      defaultValue: false,
      description: "When set to `true`, the modal is displayed. When set to `false` the modal gets removed",
    },
    dismissible: {
      defaultValue: true,
      description: "The content that gets displayed on the modal",
    },
    className: {
      defaultValue: '',
      description: 'Any additional className',
    },
    children: {
      defaultValue: 'Modal content to be displayed',
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
      <Markdown>
        If you want to use it for Mobile only, you should check [Bottom modal](#bottommodal) instead.
        Want to use either Regular Modal or Bottom Modal based on the screen width? You can use [Bottom or Regular modal](#bottomorregularmodal).
      </Markdown>

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
      <Markdown>
        If you want to use it for Desktop only, you should check [Regular modal](#regularmodal) instead.
        Want to use either Regular Modal or Bottom Modal based on the screen width? You can use [Bottom or Regular modal](#bottomorregularmodal).
      </Markdown>

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
      <Markdown>
        Setting the dismissible prop to false will hide the close button and prevent the user from closing it using the escape key or clicking outside.
        This prop can be useful if we want the user to explicitly interact with the modal options.
      </Markdown>

      <Markdown>
        **Warning:** a modal with the dismissible prop can only be closed by changing the isOpen prop to false.
      </Markdown>

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

export const RegularModalPopoverApiStory = ({
  children,
  title
}: Props) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
    }}>
      <Markdown>
        Regular Modal (Popover API)
      </Markdown>

      <button
        className="p-btn--primary wmn2 mt24"
        type='button'
        popovertarget="regular-modal-popover"
      >
        Click to open modal
      </button>
      <RegularModalPopoverApi
        title={title}
        popoverId="regular-modal-popover"
      >
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div>
            {children}
          </div>
          <button
            type='button'
            className="p-btn--primary mt24 wmn3"
            popovertarget="regular-modal-popover"
            popovertargetaction="hide"
          >
            Continue
          </button>
        </div>
      </RegularModalPopoverApi>
    </div>
  )
}

RegularModalPopoverApiStory.storyName = 'RegularModal (Popover API)';


export default story;
