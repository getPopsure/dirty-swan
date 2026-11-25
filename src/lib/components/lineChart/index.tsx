import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import generateId from '../../util/generateId';
import { getSmoothPath, getValueScale, Point } from './geometry';
import styles from './style.module.scss';

export interface LineChartDataPoint {
  label: string | number;
  value: number;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  ariaLabel: string;
  formatValue?: (value: number) => string;
  formatAxisValue?: (value: number) => string;
  showAverage?: boolean;
  averageLabel?: string;
  height?: number;
  className?: string;
}

const DEFAULT_WIDTH = 560;
const AXIS_WIDTH = 56;
const AXIS_LABEL_HEIGHT = 40;
const PLOT_TOP = 12;
const PLOT_RIGHT_GAP = 12;
const PLOT_ASPECT_RATIO = 2;
const MIN_LABEL_SPACING = 32;
const PILL_GAP = 12;

const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (element.clientWidth > 0) {
      setWidth(element.clientWidth);
    }

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
};

const LineChart = ({
  data,
  ariaLabel,
  formatValue = String,
  formatAxisValue = formatValue,
  showAverage = true,
  averageLabel = 'Avg',
  height: heightOverride,
  className,
}: LineChartProps) => {
  const { ref, width } = useWidth();
  const gradientId = useMemo(() => `line-chart-gradient-${generateId()}`, []);

  const values = data.map(({ value }) => value);
  const scale = getValueScale(values);
  const average =
    values.length > 0
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0;

  const plotLeft = AXIS_WIDTH;
  const plotRight = Math.max(plotLeft + 1, width - PLOT_RIGHT_GAP);
  const height =
    heightOverride ??
    Math.round(
      (plotRight - plotLeft) / PLOT_ASPECT_RATIO + PLOT_TOP + AXIS_LABEL_HEIGHT
    );
  const plotBottom = height - AXIS_LABEL_HEIGHT;

  const toX = (index: number) =>
    data.length > 1
      ? plotLeft + (index / (data.length - 1)) * (plotRight - plotLeft)
      : (plotLeft + plotRight) / 2;
  const toY = (value: number) =>
    plotBottom -
    ((value - scale.min) / (scale.max - scale.min)) * (plotBottom - PLOT_TOP);

  const points: Point[] = data.map(({ value }, index) => ({
    x: toX(index),
    y: toY(value),
  }));
  const linePath = getSmoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  const areaPath =
    first && last
      ? `${linePath} L${last.x},${plotBottom} L${first.x},${plotBottom} Z`
      : '';

  const labelEvery = Math.max(
    1,
    Math.ceil(
      MIN_LABEL_SPACING /
        ((plotRight - plotLeft) / Math.max(1, data.length - 1))
    )
  );

  const startIsBelow = data.length < 2 || data[1].value >= data[0].value;
  const endIsAbove =
    data.length < 2 ||
    data[data.length - 1].value >= data[data.length - 2].value;
  const averageY = toY(average);

  return (
    <div
      ref={ref}
      className={classNames(className, 'p-p--small', styles.container)}
      style={{ height }}
      role="img"
      aria-label={ariaLabel}
      data-testid="line-chart"
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" className={styles.gradientStart} />
            <stop offset="100%" className={styles.gradientEnd} />
          </linearGradient>
        </defs>

        {scale.ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.gridLine}
              x1={plotLeft}
              x2={plotRight}
              y1={toY(tick)}
              y2={toY(tick)}
            />
            <text
              className={styles.axisLabel}
              x={0}
              y={toY(tick)}
              dominantBaseline="middle"
            >
              {formatAxisValue(tick)}
            </text>
          </g>
        ))}

        {data.map(({ label }, index) =>
          index === data.length - 1 ||
          (index % labelEvery === 0 &&
            data.length - 1 - index >= labelEvery) ? (
            <text
              key={`${label}-${index}`}
              className={styles.axisLabel}
              x={toX(index)}
              y={height - 8}
              textAnchor="middle"
            >
              {label}
            </text>
          ) : null
        )}

        {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} />}

        {showAverage && data.length > 0 && (
          <line
            className={styles.averageLine}
            x1={plotLeft}
            x2={plotRight}
            y1={averageY}
            y2={averageY}
            data-testid="line-chart-average"
          />
        )}

        {linePath && <path className={styles.line} d={linePath} />}

        {first && (
          <circle className={styles.dot} cx={first.x} cy={first.y} r={5} />
        )}
        {last && points.length > 1 && (
          <circle className={styles.dot} cx={last.x} cy={last.y} r={5} />
        )}
      </svg>

      {showAverage && data.length > 0 && (
        <span
          className={classNames(
            styles.pill,
            styles.averagePill,
            'p-p--small fw-bold'
          )}
          style={{ left: plotLeft, top: averageY - PILL_GAP }}
          aria-hidden="true"
        >
          {averageLabel}
        </span>
      )}

      {first && (
        <span
          className={classNames(
            styles.pill,
            styles.valuePill,
            'p-p--small fw-bold',
            {
              [styles.above]: !startIsBelow,
            }
          )}
          style={{
            left: Math.max(0, first.x - PILL_GAP),
            top: first.y + (startIsBelow ? PILL_GAP : -PILL_GAP),
          }}
          aria-hidden="true"
          data-testid="line-chart-start"
        >
          {formatValue(data[0].value)}
        </span>
      )}

      {last && points.length > 1 && (
        <span
          className={classNames(
            styles.pill,
            styles.valuePill,
            'p-p--small fw-bold',
            {
              [styles.above]: endIsAbove,
            }
          )}
          style={{
            right: Math.max(0, width - last.x - PILL_GAP),
            top: last.y + (endIsAbove ? -PILL_GAP : PILL_GAP),
          }}
          aria-hidden="true"
          data-testid="line-chart-end"
        >
          {formatValue(data[data.length - 1].value)}
        </span>
      )}
    </div>
  );
};

export { LineChart };
