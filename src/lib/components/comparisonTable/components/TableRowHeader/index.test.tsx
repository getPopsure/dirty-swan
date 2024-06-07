import { render } from '../../../../util/testUtils';
import '@testing-library/jest-dom';

import TableRowHeader, { TableRowHeaderProps } from '.';

const mockOnClick = jest.fn();

const label = 'Table label';
const subtitle = 'Subtitle label';
const icon = '🎉';
const buttonTestId = 'ds-table-info-button';

const setup = (props: Partial<TableRowHeaderProps> = {}) =>
  render(<TableRowHeader label={label} {...props} />);

describe('TableRowHeader component', () => {
  it('should render label', () => {
    const { getByText } = setup();

    expect(getByText(label)).toBeInTheDocument();
  });

  it('should not render subtitle', () => {
    const { queryByText } = setup();

    expect(queryByText(subtitle)).not.toBeInTheDocument();
  });

  it('should render subtitle', () => {
    const { getByText } = setup({ subtitle });

    expect(getByText(subtitle)).toBeInTheDocument();
  });

  it('should not render icon', () => {
    const { queryByText } = setup();

    expect(queryByText(icon)).not.toBeInTheDocument();
  });

  it('should render icon', () => {
    const { getByText } = setup({ icon });

    expect(getByText(icon)).toBeInTheDocument();
  });

  it('should not render button if onClickInfo is not defined', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId(buttonTestId)).not.toBeInTheDocument();
  });

  it('should render button if onClickInfo is defined', () => {
    const { getByTestId } = setup({ onClickInfo: mockOnClick });

    expect(getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('should not call onClickInfo if not defined', async () => {
    const { getByText, user } = setup();

    await user.click(getByText(label));

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should call onClickInfo if defined', async () => {
    const { getByTestId, user } = setup({ onClickInfo: mockOnClick });

    await user.click(getByTestId('ds-table-info-button'));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
