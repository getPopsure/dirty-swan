import CardWithTopLeftIcon from './cardWithTopLeftIcon';
import CardWithLeftIcon from './cardWithLeftIcon';
import CardWithTopIcon from './cardWithTopIcon';
import InfoCard from './infoCard';

type CardState = 'actionable' | 'static' | 'muted';

export type CardProps = {
  title: string;
  children: React.ReactNode;
  state?: CardState;
} & JSX.IntrinsicElements['div'];

export const headingForTitleSize = (
  titleSize: 'small' | 'medium' | 'big'
): string => {
  switch (titleSize) {
    case 'small':
      return 'p-h4';
    case 'medium':
      return 'p-h3';
    case 'big':
      return 'p-h2';
  }
};

export const associatedClassForCardState = (state: CardState): string => {
  switch (state) {
    case 'actionable':
      return 'ds-card--actionable';
    case 'muted':
      return 'ds-card--muted';
    case 'static':
      return 'ds-card';
  }
};

export { CardWithTopLeftIcon, CardWithLeftIcon, CardWithTopIcon, InfoCard };
