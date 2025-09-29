import { Card, CardProps } from '.';
import { illustrations } from '../../../util/images';
import { Button } from '../../button';
import { Badge } from '../../badge';
import { BasketballSportsIcon, CheckIcon, InfoIcon, MehIcon, PlusCircleIcon, XIcon } from '../../icon';

const story = {
  title: 'JSX/Cards/Card',
  component: Card,
  argTypes: {
    as: {
      control: 'text',
      description: 'Allow wrapper element type to be custom defined'
    },
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
      control: 'text',
      description: 'Content that is displayed inside the card under the pre-defined props',
    },
    onClick: {
      action: true,
      table: {
        category: "Callbacks",
      },
      description: 'On click action to be triggered on card click.',
    },
    dropShadow: {
      description: 'Wether to display card with drop shadow styles or not.',
    },
    actionIcon: {
      control: 'text',
      description: 'ReactNode to be rendered on the right side of the card when there is an onClick action. By default it renders the ChevronRightIcon.',
    },
    showActionIcon: {
      description: 'Property that always displays action icon even if no onClick is set.',
    },
    verticalAlignment: {
      description: 'Vertical alignment of the card content',
      control: { type: 'select' },
    },
  },
  args: {
    density: 'medium',
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
    verticalAlignment: 'center',
  }
};

export const CardStory = ({ 
  as,
  actionIcon,
  showActionIcon,
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
  verticalAlignment,
}: CardProps) => (
  <div className='d-flex p24 bg-neutral-100'>
    <Card
      as={as}
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
      showActionIcon={showActionIcon}
      verticalAlignment={verticalAlignment}
    >
      {children}
    </Card>
  </div>
);

export const CardVariants = ({ 
  description,
  onClick,
  title,
}: CardProps) => (
  <div className='d-flex fd-column gap24 p24'>
    <div>
      <h4 className='p-h4 mb16'>default</h4>
      <Card
        description={description}
        icon={<BasketballSportsIcon size={24} />}
        onClick={onClick}
        title={title}
        variant='default'
        dropShadow={false}
      />
    </div>
    <div>
      <h4 className='p-h4 mb16'>transparent</h4>
      <Card
        description={description}
        icon={<BasketballSportsIcon size={24} />}
        onClick={onClick}
        title={title}
        variant='transparent'
      />
    </div>
    <div>
      <h4 className='p-h4 mb16'>outline</h4>
      <Card
        description={description}
        icon={<BasketballSportsIcon size={24} />}
        onClick={onClick}
        title={title}
        variant='outline'
      />
    </div>
    <div>
      <h4 className='p-h4 mb16'>secondary</h4>
      <Card
        description={description}
        icon={<BasketballSportsIcon size={24} />}
        onClick={onClick}
        title={title}
        variant='secondary'
      />
    </div>
    <div>
      <h4 className='p-h4 mb16'>primary</h4>
      <Card
        description={description}
        icon={<BasketballSportsIcon size={24} />}
        onClick={onClick}
        title={title}
        variant='primary'
      />
    </div>
  </div>
);

CardStory.storyName = "Card";

export const CardAsOtherComponents = () => (
  <div className='d-flex fd-column gap16 p24 bg-neutral-100'>
   
    <h3 className='p-h3'>As an anchor:</h3>
    <Card
      as="a"
      href="https://feather-insurance.com"
      target="_blank"
      title="Card with an a tag"
      density='xsmall'
    />

    <h3 className='p-h3'>As a nav:</h3>
    <Card
      as="nav"
      title="Card with a nav tag"
      density='xsmall'
    />

    <p className='p-p p-p--small fw-bold d-flex ai-center gap8 mt32'>
      <InfoIcon />
      Inspect elements to see the different HTML tags being rendered.
    </p>
  </div>
);

export const CardDensities = () => (
  <div className='d-flex fd-column gap16 p24 bg-neutral-100'>
    <Card
      title={'Card density: xsmall'}
      density='xsmall'
    />
    <Card
      title={'Card density: small'}
      density='small'
    />
    <Card
      title={'Card density: medium'}
      density='medium'
    />
    <Card
      title={'Card density: large'}
      density='large'
    />
  </div>
);

export const CardsWithIcons = ({ title }: CardProps) => (
  <div className='d-flex gap16 p24 bg-neutral-100'>
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
      icon={<MehIcon size={24} noMargin />}
      title={title}
    />
  </div>
);

export const CardWithOnClickAction = ({ 
  children,
  title,
}: CardProps) => (
  <div className='d-flex p24 bg-neutral-100'>
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
  <div className='d-flex p24 bg-neutral-100'>
    <Card
      label={label}
      title={title}
      titleVariant={'medium'}
      icon={<PlusCircleIcon color="neutral-50" size={32} />}
      classNames={{ 
        wrapper: 'bg-neutral-800',
        label: 'tc-white',
        title: 'tc-white'
      }}
    >
      {children}
    </Card>
  </div>
);

export const CardsWithinCardsAndComplexLayout = () => (
  <div className='d-flex p24 bg-neutral-100'>
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
          as="a"
          href="#"
            onClick={console.log}
          >
            Full covxerage details
          </Button>
        </div>
      )}
    >
      <div className='d-flex gap16 mt16'>
        <Card
          description="Lost keys"
          classNames={{ wrapper: 'bg-neutral-300' }}
          icon={<CheckIcon color={'purple-600'} />}
          density='xsmall'
        />
        <Card
          description="Broken glass"
          classNames={{ wrapper: 'bg-neutral-300' }}
          icon={<XIcon color={'purple-600'} />}
          density='xsmall'
        />
      </div>
      
      <div className='d-flex gap16 mt16'>
        <Card
          description="Damage to property"
          classNames={{ wrapper: 'bg-neutral-300' }}
          icon={<CheckIcon color={'purple-600'} />}
          density='xsmall'
        />
        <Card
          description="Drones"
          classNames={{ wrapper: 'bg-neutral-300' }}
          icon={<XIcon color={'purple-600'} />}
          density='xsmall'
        />
      </div>
    </Card>
  </div>
);

export default story;
