import { Markdown, MarkdownProps } from '.';

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
    {`# Headers
The header options range from h1 to h4.

\`\`\`
# H1
## H2
### H3
#### H4
\`\`\`

# H1 Lorem ipsum non sunt qui sunt

## H2 Lorem ipsum non sunt qui sunt

### H3 Lorem ipsum non sunt qui sunt

#### H4 Lorem ipsum non sunt qui sunt

# Emphasis

\`\`\`
Emphasis or italics, use *asterisk* or _underscore_.
Strong emphasis or bold, use **asterisks** or __underscores__.
Combined emphasis, use **_asterisks and underscores_**.
\`\`\`

Emphasis or italics, use _asterisk_ or _underscore_.

Strong emphasis or bold, use **asterisks** or **underscores**.

Combined emphasis, use **_asterisks and underscores_**.

# Lists

\`\`\`
1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
\`\`\`

1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

- Unordered list can use asterisks
- Or minuses
- Or pluses

# Links

For links markdown syntax should be used.

\`\`\`
[This is an inline link](https://feather-insurance.com)
\`\`\`

[This is an inline link](https://feather-insurance.com)
`}
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
