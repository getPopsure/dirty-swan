import { Accordion, AccordionProps } from '.';
import { ArthritisIcon, CpuIcon, WindIcon, ZapIcon } from '../icon';

const story = {
  title: 'JSX/Accordion',
  component: Accordion,
  argTypes: {
    classNames: {
      description:
        'Class names for the Accordion component and its children elements',
    },
    variant: {
      description: 'Variant that defines the style of the Accordion',
    },
    multiple: {
      description: 'Allow multiple items to be open at the same time',
    },
    items: {
      description:
        'Accordion items to be displayed. Each item should have an id, question, and answer. Optionally, an icon can be added to the item. \n\nThe answer property accepts markdown.',
    },
    renderAnswer: {
      description:
        'Function that allows you to render the answer in a custom way',
      action: true,
    },
    onClick: {
      description: 'Function that runs on click of the Accordion item',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  args: {
    items: [
      {
        id: '1',
        question: 'What is the meaning of life?',
        answer: '42',
        icon: <CpuIcon size={24} />,
      },
      {
        id: '2',
        question: 'How old is the universe?',
        answer: '13.8 billion years',
        icon: <ZapIcon size={24} />,
      },
      {
        id: '3',
        question: 'What is the capital of France?',
        answer: 'Paris',
        icon: <WindIcon size={24} />,
      },
      {
        id: '4',
        question: 'Who painted the Mona Lisa?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: <ArthritisIcon size={24} />,
      },
    ],
    variant: 'default',
    multiple: false,
    classNames: {
      questionWrapper: '',
      buttonWrapper: '',
      wrapper: '',
      icon: '',
      question: '',
      answer: '',
      markdown: '',
    },
  },
};

export const AccordionStory = {
  render: ({ items, multiple, onClick, variant }: AccordionProps) => (
    <Accordion
      items={items}
      multiple={multiple}
      variant={variant}
      onClick={onClick}
    />
  ),

  name: 'Accordion',
};

export default story;
