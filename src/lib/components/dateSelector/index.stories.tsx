import { useState } from 'react';
import { DateSelector, DateSelectorProps } from '.';
import de from 'dayjs/locale/de';

const story = {
  title: 'JSX/DateSelector',
  component: DateSelector,
  decorators: [
    (Story: any) => (
      <div style={{ minHeight: '320px', paddingTop: '80px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    yearBoundaries: {
      description: 'Object containing the min and max year boundaries to show.',
      defaultValue: {
        min: 1920, 
        max: 2001
      }
    },
    displayCalendar: {
      description: 'Whether the calendar icon/button trigger should show',
      defaultValue: false
    },
    onChange: {
      description: 'Called when the value is changed. Must be a valid date to be triggered',
      action: true,
      table: {
        category: 'Callbacks',
        type: { 
          summary: '(date: YYYY-MM-DD) => void'
        },
      },
    },
    value: {
      defaultValue: '2000-12-12',
      description: 'Value of the input',
      table: {
        type: { 
          summary: 'YYYY-MM-DD'
        },
      },
    },
    dayjsLocale: {
      description: `Property used to localize the calendar of the DateSelector. If no dayjsLocale is supplied, the default locale 'en' will be used. Additional locales can be imported from dayjs like import de from 'dayjs/locale/de'; and then passed on to the component.`
    },
    placeholders: {
      description: 'Properties used to localize the calendar of the DateSelector. `placeholders` object can be used to change the text of the different dropdowns.'
    },
    firstDayOfWeek: {
      description: `Index of the first day of the week (0 = Sunday, 1 = Monday, etc.)`
    }
  },
  parameters: {
    componentSubtitle: 'Date selector are user interface elements which allow user to select a date in the `YYYY-MM-DD` format.',
    design: {
      url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FMKs4cbojdVOBKUxv7okb93%2FDirty-Swan-Design-System%3Fnode-id%3D293%253A169',
      type: 'figma'
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
};

export const DateSelectorStory = ({
  displayCalendar,
  onChange,
  yearBoundaries,
  value
}: DateSelectorProps) => {
  const [newValue, setValue] = useState(value);

  const handleOnChange = (value: string) => {
    setValue(value)
    onChange?.(value);
  }

  return (
    <DateSelector
      onChange={handleOnChange}
      displayCalendar={displayCalendar}
      yearBoundaries={yearBoundaries}
      value={newValue}
    />
  );
}

DateSelectorStory.storyName = "DateSelector";

export const DateSelectorLocalisation = ({ onChange, value, yearBoundaries }: DateSelectorProps) => (
  <>
    {/** import de from 'dayjs/locale/de'; */}
    <DateSelector
      value={value}
      yearBoundaries={yearBoundaries}
      onChange={onChange}
      displayCalendar={true}
      placeholders={{
        day: 'Tag',
        month: 'Monat',
        year: 'Jahr',
      }}
      dayjsLocale={de}
      firstDayOfWeek={2}
    />
  </>
);

export default story;
