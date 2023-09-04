import { render, screen } from '../../util/testUtils';

import { Spinner } from '.';

describe('Spinner component', () => {
  it('Should render spinner', async () => {
    render(<Spinner></Spinner>);

    expect(screen.getByTestId('ds-spinner')).toBeInTheDocument();
  });
});
