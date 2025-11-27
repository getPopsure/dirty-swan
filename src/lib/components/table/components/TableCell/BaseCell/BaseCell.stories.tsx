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

export const BaseCellStory = {
  render: ({
    text,
    description,
    modalContent,
    checkmarkValue,
    rating,
    fontVariant,
    align,
    hideProgressBar,
  }: React.ComponentProps<typeof BaseCell>) => (
    <div className="p48 d-flex fd-column gap16 bg-white">
      <BaseCell
        align={align}
        checkmarkValue={checkmarkValue}
        fontVariant={fontVariant}
        description={description}
        modalContent={modalContent}
        hideProgressBar={hideProgressBar}
        openModal={() => {}}
        rating={rating}
        text={text}
      />
    </div>
  ),

  name: 'BaseCell',
};

export default story;
