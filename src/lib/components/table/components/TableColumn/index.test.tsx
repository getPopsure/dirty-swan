import { RenderResult } from '@testing-library/react';
import { TableColumn, TableColumnProps } from '.';
import { render, screen } from '../../../../util/testUtils';


const setup = (props: TableColumnProps): RenderResult => render(
  <table>
    <tbody>
      <tr>
        <TableColumn {...props} />
      </tr>
    </tbody>
  </table>
);

describe('TableColumn', () => {
  it('renders children correctly', () => {
    const children = 'TableColumn content';
    setup({ children });

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should render as a th element when isHeader prop is true', () => {
    const { container } = setup({ isHeader: true });

    expect(container.querySelector('th')).toBeInTheDocument();
  });

  it('should render as a td element when isHeader prop is false', () => {
    const { container } = setup({ isHeader: false });

    expect(container.querySelector('td')).toBeInTheDocument();
  });

  it('should apply custom cellProps correctly', () => {
    const cellProps = {
      'data-testid': 'custom-cell',
      className: 'custom-class',
    };

    setup({ cellProps });

    const customCell = screen.getByTestId('custom-cell');

    expect(customCell).toBeInTheDocument();
    expect(customCell).toHaveClass('custom-class');
  });
});
