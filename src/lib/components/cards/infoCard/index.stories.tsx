import { InfoCard, InfoCardProps } from '.';
import { images } from '../../../util/images';
import { BookOpenIcon, HeartIcon, StarIcon, ShieldIcon } from '../../icon';

const story = {
  title: 'JSX/Cards/InfoCard',
  component: InfoCard,
  argTypes: {
    title: {
      description: 'Title text that needs to be displayed',
      control: 'text',
    },
    children: {
      description: 'Content that is displayed inside the card',
      control: 'text',
    },
    topIcon: {
      description: 'Icon displayed on the top of the card',
    },
    topIconType: {
      description: 'Type of top icon display',
      control: 'select',
      options: ['icon', 'image', 'banner'],
    },
    showIcon: {
      description: 'Whether to show the arrow icon in the title',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the card is disabled',
      control: 'boolean',
    },
    onClick: {
      description: 'Click handler for the card',
    },
    className: {
      description: 'Class name for most top parent element',
      control: 'text',
    },
  },
  args: {
    title: 'Knowledge Base',
    children: 'Find the answers you\'re looking for in our comprehensive, fact-checked library of articles and resources.',
    topIcon: <BookOpenIcon size={40} />,
    topIconType: 'icon',
    showIcon: true,
    disabled: false,
    className: '',
  }
};

export const InfoCardStory = (args: InfoCardProps) => {
  return (
    <div className='bg-neutral-50 p32'>
      <div className='wmx4'>
        <InfoCard
          {...args}
          onClick={() => console.log('InfoCard clicked!')}
        >
          {args.children}
        </InfoCard>
      </div>
    </div>
  );
}

export const IconTypes = () => {
  return (
    <div className='bg-neutral-50 p32'>
      <div className='d-flex gap32 flex-wrap'>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Book Icon</div>
          <InfoCard
            title='Knowledge Base'
            topIcon={<BookOpenIcon size={40} />}
            topIconType='icon'
            onClick={() => console.log('Book clicked!')}
          >
            Find answers in our comprehensive library of articles.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Heart Icon</div>
          <InfoCard
            title='Favorites'
            topIcon={<HeartIcon size={40} />}
            topIconType='icon'
            onClick={() => console.log('Heart clicked!')}
          >
            Save and organize your favorite items.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Star Icon</div>
          <InfoCard
            title='Premium Features'
            topIcon={<StarIcon size={40} />}
            topIconType='icon'
            onClick={() => console.log('Star clicked!')}
          >
            Unlock advanced features with premium.
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

export const TopIconTypes = () => {
  return (
    <div className='bg-neutral-50 p32'>
      <div className='d-flex gap32 flex-wrap'>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Icon Type</div>
          <InfoCard
            title='Help Center'
            topIcon={<BookOpenIcon size={40} />}
            topIconType='icon'
            onClick={() => console.log('Icon type clicked!')}
          >
            Icon is displayed in a circular background.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Image Type</div>
          <InfoCard
            title='Image Gallery'
            topIcon={<img src="https://placehold.co/80x80" alt="Image" style={{borderRadius: '8px'}} />}
            topIconType='image'
            onClick={() => console.log('Image type clicked!')}
          >
            Image is displayed as-is without background.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Banner Type</div>
          <InfoCard
            title='Featured Content'
            topIcon={<img src="https://placehold.co/600x200" alt="Banner" />}
            topIconType='banner'
            onClick={() => console.log('Banner type clicked!')}
          >
            Banner spans the full width of the card.
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

export const States = () => {
  return (
    <div className='bg-neutral-50 p32'>
      <div className='d-flex gap32 flex-wrap'>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Default State</div>
          <InfoCard
            title='Default Card'
            topIcon={<BookOpenIcon size={40} />}
            topIconType='icon'
            onClick={() => console.log('Default clicked!')}
          >
            This is a default interactive card.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Disabled State</div>
          <InfoCard
            title='Disabled Card'
            topIcon={<BookOpenIcon size={40} />}
            topIconType='icon'
            disabled={true}
            onClick={() => console.log('This should not fire')}
          >
            This card is disabled and non-interactive.
          </InfoCard>
        </div>
        <div className='wmx4'>
          <div className='mb16 fw-bold'>Without Arrow Icon</div>
          <InfoCard
            title='No Arrow'
            topIcon={<BookOpenIcon size={40} />}
            topIconType='icon'
            showIcon={false}
            onClick={() => console.log('No arrow clicked!')}
          >
            This card has no arrow icon in the title.
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

InfoCardStory.storyName = "InfoCard";

export default story;
