export interface Point {
  x: number;
  y: number;
}

export interface Scale {
  min: number;
  max: number;
  ticks: number[];
}

const niceStep = (roughStep: number) => {
  const exponent = Math.floor(Math.log10(roughStep));
  const magnitude = 10 ** exponent;
  const fraction = roughStep / magnitude;
  const niceFraction =
    [1, 2, 2.5, 5, 10].find((step) => fraction <= step) ?? 10;

  return niceFraction * magnitude;
};

export const getValueScale = (values: number[], tickCount = 4): Scale => {
  const dataMin = Math.min(0, ...values);
  const dataMax = Math.max(0, ...values);

  if (dataMin === dataMax) {
    return { min: 0, max: 1, ticks: [0, 1] };
  }

  const step = niceStep((dataMax - dataMin) / tickCount);
  const min = Math.floor(dataMin / step) * step;
  let max = Math.ceil(dataMax / step) * step;

  if (max - dataMax < step / 2) {
    max += step;
  }

  const ticks = Array.from(
    { length: Math.round((max - min) / step) + 1 },
    (_, index) => min + index * step
  );

  return { min, max, ticks };
};

const sign = (value: number) => (value < 0 ? -1 : 1);

const getTangents = (points: Point[]) => {
  const count = points.length;
  const widths = points
    .slice(1)
    .map((point, index) => point.x - points[index].x);
  const slopes = points
    .slice(1)
    .map((point, index) => (point.y - points[index].y) / widths[index]);

  if (count === 2) {
    return [slopes[0], slopes[0]];
  }

  const tangents = points.map((_, index) => {
    if (index === 0 || index === count - 1) {
      return 0;
    }

    const before = slopes[index - 1];
    const after = slopes[index];

    if (before * after <= 0) {
      return 0;
    }

    const weighted =
      (before * widths[index] + after * widths[index - 1]) /
      (widths[index - 1] + widths[index]);

    return (
      (sign(before) + sign(after)) *
      Math.min(Math.abs(before), Math.abs(after), 0.5 * Math.abs(weighted))
    );
  });

  tangents[0] = (3 * slopes[0] - tangents[1]) / 2;
  tangents[count - 1] = (3 * slopes[count - 2] - tangents[count - 2]) / 2;

  return tangents;
};

export const getSmoothPath = (points: Point[]) => {
  if (points.length === 0) {
    return '';
  }

  const [first] = points;

  if (points.length === 1) {
    return `M${first.x},${first.y}`;
  }

  const tangents = getTangents(points);

  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const third = (point.x - previous.x) / 3;

    return `${path} C${previous.x + third},${
      previous.y + tangents[index] * third
    } ${point.x - third},${point.y - tangents[index + 1] * third} ${point.x},${
      point.y
    }`;
  }, `M${first.x},${first.y}`);
};
