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


export const Images = () => (
  <div className='d-flex gap8 f-wrap'>
    {Object.entries(images).map(([key, value]) => (
      <div key={key} className="ws3 d-flex fd-column ai-center br4 p24 pt16 pb16 bg-grey-100">
        <span className='p-p--small mb8'>{key}</span>
        
        <img alt={key} src={value} />
      </div>
    ))}
  </div>
);

export default story;
