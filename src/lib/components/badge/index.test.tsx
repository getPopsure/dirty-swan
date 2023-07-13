import { render, screen } from '../../util/testUtils';

import { Badge } from '.';

describe('Badge component', () => {
  it('Should render content', async () => {
    render(<Badge>Content</Badge>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
