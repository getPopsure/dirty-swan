import { render, screen } from '../../util/testUtils';

import { LineChart } from '.';
import { getSmoothPath, getValueScale } from './geometry';

const data = [
  { label: 36, value: 22.27 },
  { label: 37, value: 30 },
  { label: 38, value: 62.27 },
];

describe('LineChart component', () => {
  it('Should label the chart and show the start and end values', () => {
    render(
      <LineChart
        data={data}
        ariaLabel="Price over time"
        formatValue={(value) => `€${value.toFixed(2)}`}
      />
    );

    expect(
      screen.getByRole('img', { name: 'Price over time' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('line-chart-start')).toHaveTextContent('€22.27');
    expect(screen.getByTestId('line-chart-end')).toHaveTextContent('€62.27');
  });

  it('Should show an x-axis label per point', () => {
    render(<LineChart data={data} ariaLabel="Price over time" />);

    data.forEach(({ label }) => {
      expect(screen.getByText(String(label))).toBeInTheDocument();
    });
  });

  it('Should show the average line with its label', () => {
    render(
      <LineChart
        data={data}
        ariaLabel="Price over time"
        averageLabel="Average"
      />
    );

    expect(screen.getByTestId('line-chart-average')).toBeInTheDocument();
    expect(screen.getByText('Average')).toBeInTheDocument();
  });

  it('Should hide the average line when asked', () => {
    render(
      <LineChart data={data} ariaLabel="Price over time" showAverage={false} />
    );

    expect(screen.queryByTestId('line-chart-average')).not.toBeInTheDocument();
    expect(screen.queryByText('Avg')).not.toBeInTheDocument();
  });

  it('Should show only the start value for a single point', () => {
    render(<LineChart data={[data[0]]} ariaLabel="Price over time" />);

    expect(screen.getByTestId('line-chart-start')).toHaveTextContent('22.27');
    expect(screen.queryByTestId('line-chart-end')).not.toBeInTheDocument();
  });

  it('Should render nothing but the axes without data', () => {
    render(<LineChart data={[]} ariaLabel="Price over time" />);

    expect(screen.queryByTestId('line-chart-start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-chart-average')).not.toBeInTheDocument();
  });
});

describe('getValueScale', () => {
  it('Should start at zero and round up to a nice step with headroom', () => {
    expect(getValueScale([22.27, 62.27])).toEqual({
      min: 0,
      max: 80,
      ticks: [0, 20, 40, 60, 80],
    });
  });

  it('Should add a step when the maximum sits on a tick', () => {
    expect(getValueScale([10, 60]).max).toBe(80);
  });

  it('Should handle all-zero values', () => {
    expect(getValueScale([0, 0])).toEqual({ min: 0, max: 1, ticks: [0, 1] });
  });
});

describe('getSmoothPath', () => {
  it('Should start at the first point and end at the last', () => {
    const path = getSmoothPath([
      { x: 0, y: 10 },
      { x: 10, y: 5 },
      { x: 20, y: 0 },
    ]);

    expect(path.startsWith('M0,10')).toBe(true);
    expect(path.endsWith('20,0')).toBe(true);
  });

  it('Should keep control points within the range of a monotonic series', () => {
    const path = getSmoothPath([
      { x: 0, y: 100 },
      { x: 10, y: 90 },
      { x: 20, y: 0 },
    ]);
    const numbers = path.match(/-?\d+(\.\d+)?/g)!.map(Number);
    const ys = numbers.filter((_, index) => index % 2 === 1);

    expect(Math.max(...ys)).toBeLessThanOrEqual(100);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(0);
  });

  it('Should return an empty path without points', () => {
    expect(getSmoothPath([])).toBe('');
  });
});
