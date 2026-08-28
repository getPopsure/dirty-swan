import { useState } from 'react';
import { DirtySwanProvider } from './context';
import { BottomOrRegularModal } from './components/modal';
import { Button } from './components/button';

const story = {
  title: 'JSX/DirtySwanProvider',
  component: DirtySwanProvider,
  argTypes: {
    onModalChange: {
      description:
        'Callback fired when the modal open state changes. Receives `true` when the first modal opens and `false` when the last modal closes.',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An optional context provider that notifies consumers when any modal is open or closed. It tracks nested modals using a counter — `onModalChange(true)` fires when the first modal opens, and `onModalChange(false)` only fires when the last one closes.',
      },
    },
  },
};

export const SingleModal = {
  render: ({ onModalChange }: { onModalChange: (isOpen: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalChange = (open: boolean) => {
      setIsModalOpen(open);
      onModalChange(open);
    };

    return (
      <DirtySwanProvider onModalChange={handleModalChange}>
        <div className="d-flex fd-column gap16">
          <div>
            Modal state: <strong>{isModalOpen ? 'open' : 'closed'}</strong>
          </div>
          <Button className="wmn2" onClick={() => setIsOpen(true)}>
            Open modal
          </Button>
        </div>

        <BottomOrRegularModal
          title="Single modal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div style={{ padding: '0 24px 24px 24px' }}>
            Opening this modal triggered onModalChange(true). Closing it will
            trigger onModalChange(false).
            <Button className="mt24 wmn3" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </BottomOrRegularModal>
      </DirtySwanProvider>
    );
  },
  name: 'Single modal',
};

export const NestedModals = {
  render: ({ onModalChange }: { onModalChange: (isOpen: boolean) => void }) => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalChange = (open: boolean) => {
      setIsModalOpen(open);
      onModalChange(open);
    };

    return (
      <DirtySwanProvider onModalChange={handleModalChange}>
        <div className="d-flex fd-column gap16">
          <div>
            Modal state: <strong>{isModalOpen ? 'open' : 'closed'}</strong>
          </div>
          <Button className="wmn2" onClick={() => setIsFirstOpen(true)}>
            Open first modal
          </Button>
        </div>

        <BottomOrRegularModal
          title="First modal"
          isOpen={isFirstOpen}
          onClose={() => setIsFirstOpen(false)}
        >
          <div style={{ padding: '0 24px 24px 24px' }}>
            This is the first modal. Open a second one to see that
            onModalChange(false) only fires when both are closed.
            <div className="d-flex fd-row gap8 mt24">
              <Button className="wmn3" onClick={() => setIsSecondOpen(true)}>
                Open second modal
              </Button>
              <Button
                variant="textBlack"
                className="wmn3"
                onClick={() => setIsFirstOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </BottomOrRegularModal>

        <BottomOrRegularModal
          title="Second modal"
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
        >
          <div style={{ padding: '0 24px 24px 24px' }}>
            This is the second (nested) modal. Closing this one will not trigger
            onModalChange(false) because the first modal is still open.
            <Button
              className="mt24 wmn3"
              onClick={() => setIsSecondOpen(false)}
            >
              Close
            </Button>
          </div>
        </BottomOrRegularModal>
      </DirtySwanProvider>
    );
  },
  name: 'Nested modals',
};

export default story;
