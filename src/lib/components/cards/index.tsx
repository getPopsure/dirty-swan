import CardWithTopLeftIcon from './cardWithTopLeftIcon';
import CardWithLeftIcon from './cardWithLeftIcon';
import CardWithTopIcon from './cardWithTopIcon';
import InfoCard from './infoCard';
import CardButton from './cardButton';

type CardState = 'actionable' | 'static' | 'muted';

export type CardProps = {
  title: string;
  children: React.ReactNode;
  state?: CardState;
  dropshadow?: boolean;
} & JSX.IntrinsicElements['div'];

export const headingForCardSize = (
  cardSize: 'xsmall' | 'small' | 'medium' | 'big'
): string => {
  switch (cardSize) {
    case 'xsmall':
    case 'small':
      return 'p-h4';
    case 'medium':
      return 'p-h3';
    case 'big':
      return 'p-h2';
  }
};

export const associatedClassForCardState = (
  state: CardState,
  dropshadow: boolean
): string => {
  const baseClass = (() => {
    switch (state) {
      case 'actionable':
        return 'ds-card--actionable';
      case 'muted':
        return 'ds-card--muted';
      case 'static':
        return 'ds-card';
    }
  })();

  if (dropshadow === false) {
    return `${baseClass} ds-card--no-dropshadow`;
  }
  return baseClass;
};

export {
  CardWithTopLeftIcon,
  CardWithLeftIcon,
  CardWithTopIcon,
  InfoCard,
  CardButton,
};
