const sharedConfig = {
  argTypes: {
    value: {
      description: 'Current input value.',
    },
    className: {
      description: 'Wrapper classNames for custom styling',
    },
    placeholder: {
      description: 'Placeholder for DirtySwan Input component',
    },
    label: {
      description: 'Label of the Input component',
    },
    hideLabel: {
      description:
        'Whether or not a label should be hidden. This is needed for accessibility purposes and a label should always be provided',
    },
    labelInsideInput: {
      description:
        'Whether or not a label should be visually displayed inside the input borders.',
    },
    prefix: {
      description:
        'A prefix that can be displayed on the left of the input. Specially useful for currencies.',
    },
    id: {
      description:
        'Unique ID identifier of the input. Relevant for accessibility.',
    },
    error: {
      description:
        'Error message that will also make input show on error state.',
      table: {
        type: {
          summary: 'string | boolean',
        },
      },
    },
    onChange: {
      description:
        'Function that is called when value of current input changes',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  args: {
    value: '',
    className: '',
    placeholder: 'Placeholder',
    label: 'Input Label',
    hideLabel: false,
    labelInsideInput: false,
    prefix: '£',
    id: '1234567890',
    error: '',
    disabled: false,
  },
};

export default sharedConfig;
