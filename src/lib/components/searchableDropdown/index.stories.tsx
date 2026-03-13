import { useState } from 'react';
import { SearchableDropdown, SearchableDropdownProps } from '.';

const story = {
  title: 'JSX/SearchableDropdown',
  component: SearchableDropdown,
  argTypes: {
    options: {
      description: 'Array of options to display',
      table: {
        type: {
          summary: '{ id: string; label: string; icon?: ReactNode }[]',
        },
      },
    },
    value: {
      description: 'The currently selected option id',
    },
    onChange: {
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    searchable: {
      description: 'Whether the dropdown includes a search input',
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text for the search input',
      control: 'text',
    },
    triggerPlaceholder: {
      description: 'Placeholder text shown on the trigger when no value is selected',
      control: 'text',
    },
    noResultsText: {
      description: 'Text shown when no options match the search',
      control: 'text',
    },
    groupName: {
      description: 'Name attribute for the radio group',
      control: 'text',
    },
    dropUp: {
      description: 'Whether the dropdown opens upward',
      control: 'boolean',
    },
    condensed: {
      description: 'Whether to use a compact trigger (icon only)',
      control: 'boolean',
    },
    bordered: {
      description: 'Whether to show a border on the trigger',
      control: 'boolean',
    },
    showChevron: {
      description: 'Whether to show a chevron icon on the trigger',
      control: 'boolean',
    },
  },
  args: {
    options: [
      { id: 'de', label: 'Germany' },
      { id: 'fr', label: 'France' },
      { id: 'es', label: 'Spain' },
      { id: 'it', label: 'Italy' },
      { id: 'pt', label: 'Portugal' },
    ],
    value: 'de',
    searchable: false,
    placeholder: 'Search',
    triggerPlaceholder: 'Select a country',
    noResultsText: 'No results found',
    groupName: 'country',
    dropUp: false,
    condensed: false,
    bordered: false,
    showChevron: false,
  },
  parameters: {
    componentSubtitle:
      'A dropdown component that supports searchable options with keyboard navigation.',
  },
};

export const Default = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState(args.value);

    return (
      <div style={{ width: 300 }}>
        <SearchableDropdown
          {...args}
          value={selected}
          onChange={(val) => {
            args.onChange(val);
            setSelected(val);
          }}
        />
      </div>
    );
  },

  name: 'Default',
};

export const Searchable = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState(args.value);

    const options = [
      { id: 'de', label: 'Germany' },
      { id: 'fr', label: 'France' },
      { id: 'es', label: 'Spain' },
      { id: 'it', label: 'Italy' },
      { id: 'pt', label: 'Portugal' },
      { id: 'nl', label: 'Netherlands' },
      { id: 'be', label: 'Belgium' },
      { id: 'at', label: 'Austria' },
      { id: 'ch', label: 'Switzerland' },
      { id: 'pl', label: 'Poland' },
    ];

    return (
      <div style={{ width: 300 }}>
        <SearchableDropdown
          {...args}
          options={options}
          searchable
          value={selected}
          onChange={(val) => {
            args.onChange(val);
            setSelected(val);
          }}
        />
      </div>
    );
  },

  name: 'Searchable',
};

export const WithIcons = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState('de');

    const options = [
      { id: 'de', label: 'Germany', icon: <span>🇩🇪</span> },
      { id: 'fr', label: 'France', icon: <span>🇫🇷</span> },
      { id: 'es', label: 'Spain', icon: <span>🇪🇸</span> },
      { id: 'it', label: 'Italy', icon: <span>🇮🇹</span> },
      { id: 'pt', label: 'Portugal', icon: <span>🇵🇹</span> },
    ];

    return (
      <div style={{ width: 300 }}>
        <SearchableDropdown
          {...args}
          options={options}
          value={selected}
          onChange={(val) => {
            args.onChange(val);
            setSelected(val);
          }}
        />
      </div>
    );
  },

  name: 'With Icons',
};

export const Condensed = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState('de');

    const options = [
      { id: 'de', label: 'Germany', icon: <span>🇩🇪</span> },
      { id: 'fr', label: 'France', icon: <span>🇫🇷</span> },
      { id: 'es', label: 'Spain', icon: <span>🇪🇸</span> },
    ];

    return (
      <SearchableDropdown
        {...args}
        options={options}
        condensed
        bordered
        value={selected}
        onChange={(val) => {
          args.onChange(val);
          setSelected(val);
        }}
      />
    );
  },

  name: 'Condensed',
};

export const WithChevron = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState('de');

    const options = [
      { id: 'de', label: 'Germany' },
      { id: 'fr', label: 'France' },
      { id: 'es', label: 'Spain' },
    ];

    return (
      <div style={{ width: 300 }}>
        <SearchableDropdown
          {...args}
          options={options}
          showChevron
          bordered
          value={selected}
          onChange={(val) => {
            args.onChange(val);
            setSelected(val);
          }}
        />
      </div>
    );
  },

  name: 'With Chevron',
};

export const Disabled = {
  render: (args: SearchableDropdownProps) => {
    return (
      <div style={{ width: 300 }}>
        <SearchableDropdown
          {...args}
          options={[
            { id: 'de', label: 'Germany' },
            { id: 'fr', label: 'France' },
            { id: 'es', label: 'Spain' },
          ]}
          disabled
          bordered
          showChevron
          value="de"
          onChange={args.onChange}
        />
      </div>
    );
  },

  name: 'Disabled',
};

export const DropUp = {
  render: (args: SearchableDropdownProps) => {
    const [selected, setSelected] = useState('de');

    const options = [
      { id: 'de', label: 'Germany' },
      { id: 'fr', label: 'France' },
      { id: 'es', label: 'Spain' },
    ];

    return (
      <div style={{ width: 300, marginTop: 300 }}>
        <SearchableDropdown
          {...args}
          options={options}
          dropUp
          searchable
          value={selected}
          onChange={(val) => {
            args.onChange(val);
            setSelected(val);
          }}
        />
      </div>
    );
  },

  name: 'Drop Up',
};

export default story;
