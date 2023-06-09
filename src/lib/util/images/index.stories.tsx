import { images } from "../../util/images";

const story = {
  title: 'Utils/Images',
  parameters: {
    docs: {
      description: {
        component: 'Use the `images` object export to access our list of available images.',
      },
    },
  }
};

const ImageList = ({ list } : { list: Record<string, string | unknown> }) => (
  <div className='d-flex gap8 f-wrap'>
    {Object.entries(list).map(([key, value]) => typeof value === 'string' && (
      <div key={key} className="ws3 d-flex fd-column ai-center br4 p24 pt16 pb16 bg-grey-100">
        <span className='p-p--small mb8'>{key}</span>
        <img alt={key} src={value} />
      </div>
    ))}
  </div>
);

export const Images = () => <ImageList list={images} />;

export const ColouredIcons = () => <ImageList list={images.colouredIcons} />;

export default story;
