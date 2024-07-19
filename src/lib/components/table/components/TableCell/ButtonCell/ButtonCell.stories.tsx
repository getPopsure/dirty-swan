import { ButtonCell } from './ButtonCell';

const story = {
  title: 'JSX/Table/Cells',
  component: ButtonCell,
  argTypes: {},
  args: {
    isSelected: false,
    content: 'Premium',
    subContent: '€277/mo',
    disabled: false,
  },
};

export const ButtonCellStory = ({
  isSelected,
  content,
  subContent,
  disabled,
}: React.ComponentProps<typeof ButtonCell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <ButtonCell
      content={content}
      subContent={subContent}
      isSelected={isSelected}
      disabled={disabled}
      onClick={() => {}}
    />

    <ButtonCell
      content={content}
      subContent={subContent}
      isSelected
      disabled={disabled}
      onClick={() => {}}
    />

    <ButtonCell
      content={content}
      subContent={subContent}
      disabled
      onClick={() => {}}
    />

    <ButtonCell
      content={content}
      isSelected={isSelected}
      disabled={disabled}
      onClick={() => {}}
    />

    <ButtonCell
      content={content}
      isSelected
      disabled={disabled}
      onClick={() => {}}
    />

    <ButtonCell content={content} disabled onClick={() => {}} />
  </div>
);

ButtonCellStory.storyName = 'ButtonCell';

export default story;
