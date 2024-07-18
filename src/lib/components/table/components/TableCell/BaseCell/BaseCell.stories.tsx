import { BaseCell } from './BaseCell';

const story = {
  title: 'JSX/Table/Cells',
  component: BaseCell,
  argTypes: {},
  args: {
    rating: {
      value: 2,
      type: 'zap',
    },
    content: 'For dogs',
    subContent: 'Annual only',
    modalContent: 'More info',
    checkmarkValue: undefined,
    contentFontVariant: 'NORMAL',
  },
};

export const BaseCellStory = ({
  content,
  subContent,
  modalContent,
  checkmarkValue,
  rating,
  contentFontVariant,
  align,
}: React.ComponentProps<typeof BaseCell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <BaseCell
      align={align}
      checkmarkValue={checkmarkValue}
      content={content}
      contentFontVariant={contentFontVariant}
      modalContent={modalContent}
      openModal={() => {}}
      rating={rating}
      subContent={subContent}
    />
  </div>
);

BaseCellStory.storyName = 'BaseCell';

export default story;
