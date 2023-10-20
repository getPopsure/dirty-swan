import { render, screen } from '../../util/testUtils';

import { Toast } from '.';

const onDismiss = jest.fn();
const onActionClick = jest.fn();

describe('Toast component', () => {
  it('Should render title', async () => {
    render(
      <Toast title={'Title'} onDismiss={() => {}} />
    )

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('Should not render description', async () => {
    render(
      <Toast title={'Title'} onDismiss={() => {}} />
    )

    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('Should render description', async () => {
    render(
      <Toast title={'Title'} description={"Description"} onDismiss={() => {}} />
    )

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('Should not render action', async () => {
    render(
      <Toast title={'Title'} onDismiss={() => {}} />
    )

    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('Should render action', async () => {
    render(
      <Toast title={'Title'} action={{ title: 'Action', onClick: () => {}}} onDismiss={() => {}} />
    )

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('Should trigger action', async () => {
    const { user } = render(
      <Toast title={'Title'} action={{ title: 'Action', onClick: onActionClick}} onDismiss={() => {}} />
    )

    await user.click(screen.getByText('Action'))

    expect(onActionClick).toHaveBeenCalled();
  });

  it('Should trigger dismiss', async () => {
    const { user } = render(
      <Toast title={'Title'} onDismiss={onDismiss} />
    )

    await user.click(screen.getByTestId('toast-close-button'))

    expect(onDismiss).toHaveBeenCalled();
  });
});
