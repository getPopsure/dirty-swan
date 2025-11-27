import { ButtonCell } from './ButtonCell';

const story = {
  title: 'JSX/Table/Cells',
  component: ButtonCell,
  argTypes: {},
  args: {
    buttonCaption: 'Premium',
    price: '€277/mo',
    isSelected: false,
    disabled: false,
  },
};

export const ButtonCellStory = {
  render: ({
    isSelected,
    buttonCaption,
    price,
    disabled,
  }: React.ComponentProps<typeof ButtonCell>) => (
    <div className="p48 d-flex fd-column gap16 bg-white">
      <ButtonCell
        buttonCaption={buttonCaption}
        price={price}
        isSelected={isSelected}
        disabled={disabled}
        onClick={() => {}}
      />

      <ButtonCell
        buttonCaption={buttonCaption}
        price={price}
        isSelected
        disabled={disabled}
        onClick={() => {}}
      />

      <ButtonCell
        buttonCaption={buttonCaption}
        price={price}
        disabled
        onClick={() => {}}
      />

      <ButtonCell
        buttonCaption={buttonCaption}
        isSelected={isSelected}
        disabled={disabled}
        onClick={() => {}}
      />

      <ButtonCell
        buttonCaption={buttonCaption}
        isSelected
        disabled={disabled}
        onClick={() => {}}
      />

      <ButtonCell buttonCaption={buttonCaption} disabled onClick={() => {}} />
    </div>
  ),

  name: 'ButtonCell',
};

export default story;
