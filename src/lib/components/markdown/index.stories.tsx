import { render } from 'sass';
import { Markdown, MarkdownProps } from '.';

const story = {
  title: 'JSX/Markdown',
  component: Markdown,
  argTypes: {
    
    children: {
      description: 'MD content to be rendered in the component.',
    },
    className: {
      description: 'This property allows to add custom styles to the component.',
    },
    renderRawMarkdownChild: {
      description: 'This property allows to render the raw markdown child as a component.',
    },
    openLinksInNewTab: {
      description: 'Wether link components rendered inside Markdown should open in a new tab (`target="_blank"`).',
    },
    styling: {
      desription: 'This property allows to customize the styling of the markdown content.',
    }
  },
  args: {
    children: '## Title \n This is **our content**.',
    className: '',
    renderRawMarkdownChild: false,
    openLinksInNewTab: false,
    styling: {},
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
    {`
## Headers
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

## Emphasis

\`\`\`
Emphasis or italics, use *asterisk* or _underscore_.
Strong emphasis or bold, use **asterisks** or __underscores__.
Combined emphasis, use **_asterisks and underscores_**.
\`\`\`

Emphasis or italics, use _asterisk_ or _underscore_.

Strong emphasis or bold, use **asterisks** or **underscores**.

Combined emphasis, use **_asterisks and underscores_**.

## Lists

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

## Links

For links markdown syntax should be used.

\`\`\`
[This is an inline link](https://feather-insurance.com)
\`\`\`

[This is an inline link](https://feather-insurance.com)

## Inline code block

Inline code block can be set by using backtick or \`\`\`

\`\`\`
It is usefull to define a \`variable\` inside a text
\`\`\`

It is usefull to define a \`variable\` inside a text

## Quote

You can use quote markdown by using \`>\` at the beginning of your text

\`\`\`
> The busy man is least busy with living. - Seneca
\`\`\`

> The busy man is least busy with living. - Seneca

## Images

Images markdown syntax is the following
\`\`\`
![Feather logo](https://feather-website.cdn.prismic.io/feather-website/88519fe0-d85f-47d3-83d7-20a74ee94591_feather-logo-icon.svg)
\`\`\`

![Feather logo](https://feather-website.cdn.prismic.io/feather-website/88519fe0-d85f-47d3-83d7-20a74ee94591_feather-logo-icon.svg)

## Tables

Defining a table in markdown is a bit tricky. You can use websites such as [tablesgenerator.com](https://www.tablesgenerator.com/markdown_tables) for help

\`\`\`
| Department | Yearly spend | Category |
|------------|--------------|----------|
| Marketing  | 150k€        | \`c\`    |
| Sales      | 200k€        | \`e\`    |
| Product    | 84k€         | \`f\`    |
\`\`\`

| Department | Yearly spend | Category |
|------------|--------------|----------|
| Marketing  | 150k€        | \`c\`    |
| Sales      | 200k€        | \`e\`    |
| Product    | 84k€         | \`f\`    |

`}
  </Markdown>
);

export const AddingCustomComponents = ({ 
  className,
  openLinksInNewTab,
  renderRawMarkdownChild
 }: MarkdownProps) => (
  <Markdown
    className={className}
    openLinksInNewTab={openLinksInNewTab}
    styling={{
      h6: 'tc-red-500'
    }}
    renderRawMarkdownChild={renderRawMarkdownChild}

  >
    ###### This is a custom H6 that will always be red
  </Markdown>
);

export default story;
