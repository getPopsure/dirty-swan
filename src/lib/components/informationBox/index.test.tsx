import { render, screen } from '../../util/testUtils';

import { InformationBox } from '.';

describe('InformationBox component', () => {
  it('Should render title', async () => {
    render(
      <InformationBox title={'Title'}>
        Content
      </InformationBox>
    )

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('Should not render title when title prop is not passed', async () => {
    render(
      <InformationBox>
        Content
      </InformationBox>
    )

    expect(screen.queryByTestId('information-box-title')).not.toBeInTheDocument();
  });
  
  it('Should render content', async () => {
    render(
      <InformationBox>
        Content
      </InformationBox>
    )

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  
  it('Should show icon when showIcon is true', async () => {
    render(
      <InformationBox showIcon>
        Content
      </InformationBox>
    )

    expect(screen.getByTestId('information-box-icon')).toBeInTheDocument();
  });
  
  it('Should not show icon when showIcon is false', async () => {
    render(
      <InformationBox showIcon={false}>
        Content
      </InformationBox>
    )

    expect(screen.queryByTestId('information-box-icon')).not.toBeInTheDocument();
  });
});
