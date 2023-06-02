import { Image, ImageProps } from '.';
import { ImageKey, sources } from './images';

const story = {
  title: 'JSX/Image',
  component: Image,
  argTypes: {
    src: {
      defaultValue: 'aid',
      description: 'Identifier key of the image',
      table: {
        type: { 
          summary: 'ImageKey (see Available Images story for all images)'
        },
      },
      control: { type: 'select' },
    },
    className: {
      description: 'classname',
      table: {
        type: { 
          summary: 'Your own custom classnames can be added here'
        },
      },
    },
  },
};

export const ImageStory = ({
  src,
  className
}: ImageProps) => (
  <Image
    src={src}
    className={className}
  />
);

ImageStory.storyName = "Image";

export const AvailableImages = () => (
  <div className='d-flex gap8 w100 f-wrap'>
   {Object.keys(sources).map((src) => (
     <div className="d-flex fd-column ai-center ws2 br4 p24 pt16 pb16 bg-grey-100">
      <span className='p-p--small mb8'>{src}</span>
      <Image src={src as ImageKey} />
     </div>
   ))}
  </div>
);

export default story;
