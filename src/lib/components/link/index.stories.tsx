import { Link, LinkProps } from '.';

const story = {
  title: 'JSX/Link',
  component: Link,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Click here to go to Feather Insurance',
      description: 'Content that is displayed as clickable inside the link',
    },
    href: {
      control: 'text',
      defaultValue: 'https://feather-insurance.com',
      description: 'Specifies the URL of the page the link goes to',
    },
  },
  parameters: {
    componentSubtitle: 'Links are a styled helper component for anchor (<a />) tags.',
  },
};

export const LinkStory = ({ children, href, ...rest }: LinkProps) => (
  <Link href={href} {...rest}>{children}</Link>
);

LinkStory.storyName = "Link";

export default story;
