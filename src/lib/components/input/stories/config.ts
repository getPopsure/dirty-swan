const sharedConfig = {
  value: {
    defaultValue: '',
    description: 'Current input value.',
    control: { type: 'text' }
  },
  className: {
    description: 'Wrapper classNames for custom styling',
    defaultValue: '',
    control: { type: 'text' }
  },
  placeholder: {
    description: 'Placeholder for DirtySwan Input component',
    defaultValue: 'Placeholder',
    control: { type: 'text' }
  },
  label: {
    description: 'Label of the Input component',
    defaultValue: 'Input Label',
    control: { type: 'text' }
  },
  hideLabel: {
    description: 'Wether a label should be hidden. This is needed for accessibility purposes and a label should always be provided',
    defaultValue: false,
    control: { type: 'boolean' }
  },
  prefix: {
    description: 'A preffix that can be displayed on the left of the input. Specially useful for currencies.',
    defaultValue: '£',
    control: { type: 'text' }
  },
  id: {
    description: 'Unique ID identifier of the input. Relevent for accessibility.',
    defaultValue: '1234567890',
    control: { type: 'text' }
  },
  error: {
    description: 'Error message that will also make input show on error state.',
    defaultValue: '',
    control: { type: 'text' },
    table: {
      type: { 
        summary: 'string | boolean'
      },
    },
  },
  onChange: {
    description: 'Function that is called when value of current input changes',
    action: true,
    table: {
      category: "Callbacks",
    },
  },
} 

export default sharedConfig;