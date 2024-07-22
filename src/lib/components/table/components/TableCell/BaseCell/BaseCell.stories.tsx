import { BaseCell } from './BaseCell';

const story = {
  title: 'JSX/Table/Cells',
  component: BaseCell,
  argTypes: {},
  args: {
    text: 'For dogs',
    description: 'Annual only',
    modalContent: 'More info',
    fontVariant: 'NORMAL',
    checkmarkValue: undefined,
    rating: {
      value: 2,
      type: 'zap',
    },
  },
};

export const BaseCellStory = ({
  text,
  description,
  modalContent,
  checkmarkValue,
  rating,
  fontVariant,
  align,
}: React.ComponentProps<typeof BaseCell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <BaseCell
      align={align}
      checkmarkValue={checkmarkValue}
      fontVariant={fontVariant}
      description={description}
      modalContent={modalContent}
      openModal={() => {}}
      rating={rating}
      text={text}
    />
  </div>
);

BaseCellStory.storyName = 'BaseCell';

export default story;
