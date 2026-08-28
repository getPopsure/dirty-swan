import { render, screen, fireEvent } from './util/testUtils';
import { DirtySwanProvider, useDirtySwan } from './context';

const TestConsumer = () => {
  const ctx = useDirtySwan();

  return (
    <div>
      <button onClick={() => ctx?.onModalOpen()}>open</button>
      <button onClick={() => ctx?.onModalClose()}>close</button>
    </div>
  );
};

describe('DirtySwanProvider', () => {
  it('calls onModalChange(true) when first modal opens', () => {
    const onModalChange = jest.fn();
    render(
      <DirtySwanProvider onModalChange={onModalChange}>
        <TestConsumer />
      </DirtySwanProvider>
    );

    fireEvent.click(screen.getByText('open'));

    expect(onModalChange).toHaveBeenCalledWith(true);
  });

  it('calls onModalChange(false) when last modal closes', () => {
    const onModalChange = jest.fn();
    render(
      <DirtySwanProvider onModalChange={onModalChange}>
        <TestConsumer />
      </DirtySwanProvider>
    );

    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('close'));

    expect(onModalChange).toHaveBeenLastCalledWith(false);
  });

  it('does not call onModalChange(false) when nested modals are still open', () => {
    const onModalChange = jest.fn();
    render(
      <DirtySwanProvider onModalChange={onModalChange}>
        <TestConsumer />
      </DirtySwanProvider>
    );

    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('close'));

    expect(onModalChange).toHaveBeenCalledTimes(1);
    expect(onModalChange).toHaveBeenCalledWith(true);
  });

  it('calls onModalChange(false) when all nested modals close', () => {
    const onModalChange = jest.fn();
    render(
      <DirtySwanProvider onModalChange={onModalChange}>
        <TestConsumer />
      </DirtySwanProvider>
    );

    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('close'));
    fireEvent.click(screen.getByText('close'));

    expect(onModalChange).toHaveBeenCalledTimes(2);
    expect(onModalChange).toHaveBeenLastCalledWith(false);
  });

  it('returns null when used outside provider', () => {
    let contextValue: ReturnType<typeof useDirtySwan> = undefined as any;

    const Spy = () => {
      contextValue = useDirtySwan();
      return null;
    };

    render(<Spy />);

    expect(contextValue).toBeNull();
  });
});
