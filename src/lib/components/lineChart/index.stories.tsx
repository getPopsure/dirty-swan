import { LineChart, LineChartProps } from '.';

const formatEuro = (value: number) =>
  `€${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatEuroAxis = (value: number) => `€${value}`;

const tenYears = [
  22.27, 24.96, 27.98, 31.37, 35.17, 39.42, 44.19, 49.54, 55.54, 62.27,
];

const story = {
  title: 'JSX/LineChart',
  component: LineChart,
  argTypes: {
    data: {
      description: 'Points to draw, in order. `label` is shown on the x-axis.',
    },
    ariaLabel: {
      description: 'Accessible description of the chart',
      control: 'text',
    },
    formatValue: {
      description: 'Formats the start and end values',
    },
    formatAxisValue: {
      description: 'Formats the y-axis ticks. Defaults to `formatValue`.',
    },
    showAverage: {
      description: 'Whether to show the dashed average line',
      control: 'boolean',
    },
    averageLabel: {
      description: 'Label of the average line',
      control: 'text',
    },
    height: {
      description:
        'Height of the chart in pixels. Defaults to a plot twice as wide as it is tall.',
      control: 'number',
    },
    className: {
      description: 'Class name for the most parent element',
      control: 'text',
    },
  },
  args: {
    data: tenYears.map((value, index) => ({ label: 36 + index, value })),
    ariaLabel: 'Monthly price rises from €22.27 at 36 to €62.27 at 45',
    formatValue: formatEuro,
    formatAxisValue: formatEuroAxis,
    showAverage: true,
    averageLabel: 'Avg',
    className: '',
  },
};

export const LineChartStory = {
  render: (props: LineChartProps) => (
    <div style={{ maxWidth: 560 }}>
      <LineChart {...props} />
    </div>
  ),

  name: 'LineChart',
};

export const FewerPoints = () => (
  <div style={{ maxWidth: 560 }}>
    <LineChart
      data={[
        { label: 60, value: 180.4 },
        { label: 61, value: 201.9 },
        { label: 62, value: 226.3 },
        { label: 63, value: 254.1 },
        { label: 64, value: 412.27 },
      ]}
      ariaLabel="Monthly price rises from €180.40 at 60 to €412.27 at 64"
      formatValue={formatEuro}
      formatAxisValue={formatEuroAxis}
    />
  </div>
);

export const Mobile = () => (
  <div style={{ maxWidth: 343 }}>
    <LineChart
      data={tenYears.map((value, index) => ({ label: 36 + index, value }))}
      ariaLabel="Monthly price rises from €22.27 at 36 to €62.27 at 45"
      formatValue={formatEuro}
      formatAxisValue={formatEuroAxis}
    />
  </div>
);

export default story;
