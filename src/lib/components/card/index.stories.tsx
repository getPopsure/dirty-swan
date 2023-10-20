import { Card, CardProps } from '.';
import { illustrations } from '../../util/images';
import { Button } from '../button';
import { Badge } from '../badge';
import { CheckIcon, MehIcon, PlusCircleIcon, XIcon } from '../icon';

const story = {
  title: 'JSX/Card',
  component: Card,
  argTypes: {
    density: {
      description: 'Spacing around the card'
    },
    label: {
      description: 'Content to be rendered as label'
    },
    title: {
      description: 'Content to be rendered as title'
    },
    titleVariant: {
      description: 'Variant that allows changing title sizing styles.'
    },
    description: {
      description: 'Content to be rendered as description'
    },
    descriptionVariant: {
      description: 'Variant that allows changing description sizing styles.'
    },
    icon: {
      description: 'ReactNode to be rendered on the left side of the card',
    },
    children: {
      control: { type: 'text' },
      description: 'Content that is displayed inside the card under the pre-defined props',
    },
    onClick: {
      description: 'On click action to be triggered on card click.',
    },
    dropShadow: {
      description: 'Wether to display card with drop shadow styles or not.',
    },
    actionIcon: {
      description: 'ReactNode to be rendered on the right side of the card when there is an onClick action. By default it renders the ChevronRightIcon.',
    },
  },
  args: {
    density: 'balanced',
    description: 'Believe you’re a great fit but can’t find a position listed for your skill set? We’d love to hear from you!',
    descriptionVariant: 'large',
    label: 'Label',
    title: 'Honest, simple insurance',
    titleVariant: 'large',
    icon: 'ABC',
    children: '',
    classNames: {
      wrapper: '',
      label: '',
      title: '',
      description: '',
      children: '',
      icon: ''
    },
    dropShadow: true,
  }
};

export const CardStory = ({ 
  actionIcon,
  children,
  classNames,
  density,
  description,
  descriptionVariant,
  dropShadow,
  icon,
  label,
  onClick,
  title,
  titleVariant,
}: CardProps) => (
  <div className='d-flex p24 bg-grey-200'>
    <Card
      classNames={classNames}
      description={description}
      descriptionVariant={descriptionVariant}
      density={density}
      dropShadow={dropShadow}
      icon={icon}
      label={label}
      title={title}
      titleVariant={titleVariant}
      onClick={onClick}
      actionIcon={actionIcon}
    >
      {children}
    </Card>
  </div>
);

CardStory.storyName = "Card";

export const CardDensities = () => (
  <div className='d-flex fd-column gap16 p24 bg-grey-200'>
    <Card
      title={'Card density: Compact'}
      density='compact'
    />
    <Card
      title={'Card density: Balanced'}
      density='balanced'
    />
    <Card
      title={'Card density: Spacious'}
      density='spacious'
    />
  </div>
);

export const CardsWithIcons = ({ 
  children,
  icon,
  title,
}: CardProps) => (
  <div className='d-flex gap16 p24 bg-grey-200'>
    <Card
      icon={
        <img
          alt=""
          src={illustrations.aids}
          width={24}
        />
      }
      title={title}
    />
    <Card
      icon={<MehIcon size={24} />}
      title={title}
    />
  </div>
);

export const CardWithOnClickAction = ({ 
  children,
  icon,
  title,
}: CardProps) => (
  <div className='d-flex p24 bg-grey-200'>
    <Card
      icon={
        <img
          alt=""
          src={illustrations.aids}
          width={24}
        />
      }
      title={title}
      titleVariant={'medium'}
      onClick={() => {}}
    >
      {children}
    </Card>
  </div>
);

export const CardOverridesStyles = ({ 
  children,
  label,
  title,
}: CardProps) => (
  <div className='d-flex p24 bg-grey-200'>
    <Card
      label={label}
      title={title}
      titleVariant={'medium'}
      icon={<PlusCircleIcon color="grey-100" size={32} />}
      classNames={{ 
        wrapper: 'bg-grey-700',
        label: 'tc-white',
        title: 'tc-white'
      }}
    >
      {children}
    </Card>
  </div>
);

export const CardsWithinCardsAndComplexLayout = ({ 
  children,
  label,
  title,
}: CardProps) => (
  <div className='d-flex p24 bg-grey-200'>
    <Card
      label={(
        <Badge size='small' variant='success'>
          Active
        </Badge>
      )}
      title={(
        <div className='d-flex jc-between ai-center w100'>
          Coverage overview

          <Button
            onClick={() => {}}
            variant='filledGray'
          >
            Full coverage details
          </Button>
        </div>
      )}
    >
      <div className='d-flex gap16 mt16'>
        <Card
          description="Lost keys"
          classNames={{ wrapper: 'bg-grey-300' }}
          icon={<CheckIcon color={'primary-500'} />}
          density='compact'
        />
        <Card
          description="Broken glass"
          classNames={{ wrapper: 'bg-grey-300' }}
          icon={<XIcon color={'primary-500'} />}
          density='compact'
        />
      </div>
      
      <div className='d-flex gap16 mt16'>
        <Card
          description="Damage to property"
          classNames={{ wrapper: 'bg-grey-300' }}
          icon={<CheckIcon color={'primary-500'} />}
          density='compact'
        />
        <Card
          description="Drones"
          classNames={{ wrapper: 'bg-grey-300' }}
          icon={<XIcon color={'primary-500'} />}
          density='compact'
        />
      </div>
    </Card>
  </div>
);

export default story;
