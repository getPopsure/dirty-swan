import { Markdown, MarkdownProps } from '.';
import example from './example.md';

const story = {
  title: 'JSX/Markdown',
  component: Markdown,
  argTypes: {
    children: {
      description: 'MD content to be rendered in the component.',
    },
    className: {
      defaultValue: '',
      description: 'This property allows to add custom styles to the component.',
    },
    customMDComponents: {
      defaultValue: {},
      description: 'An object that allows creating custom MD components by passing the key to wrap it in, and the logic to render, as a function that returns an HTMLElement.',
      table: {
        type: {
            summary: 'Record<componentKey, (props: HTMLElmentAttributes) => HTMLElement>'
        }
      }
    },
    paragraphClassName: {
      defaultValue: '',
      description: 'This property allows to add custom styles to the paragraph (`<p>`) component rendered inside Markdown component.',
    },
    openLinksInNewTab: {
      defaultValue: false,
      description: 'Wether link components rendered inside Markdown should open in a new tab (`target="_blank"`).',
    }
  },
  args: {
    children: '## Title \n This is **our content**.'
  },
  parameters: {
    componentSubtitle: (
      <>
        Display markdown text based on <a href="https://github.com/remarkjs/react-markdown" target='_blank' rel="noreferrer">react-markdown</a> with custom styling.
      </>
    ),
  },
};

export const MarkdownStory = ({ children, className }: MarkdownProps) => (
  <Markdown className={className}>
    {children}
  </Markdown>
);

MarkdownStory.storyName = "Markdown";

export const AvailableMDComponents = ({ className }: MarkdownProps) => (
  <Markdown className={className}>
    {example}
  </Markdown>
);

export const AddingCustomComponents = ({ className }: MarkdownProps) => (
  <Markdown customMDComponents={{
    h6: (props: any) => (
      <h6 className='tc-red-500'>{props.children}</h6>
    )
  }}>
    ###### This is a custom H6 that will always be red
  </Markdown>
);

export default story;
