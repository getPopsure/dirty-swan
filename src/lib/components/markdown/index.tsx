import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';

import styles from './styles.module.scss';


const Link = (openLinksInNewTab: boolean) => (props: any) => {
  return openLinksInNewTab ? (
    <a href={props.href} className="p-a" target="_blank" rel="noreferrer">
      {props.children}
    </a>
  ) : (
    <a href={props.href} className="p-a">
      {props.children}
    </a>
  );
};

const Paragraph = (className: string) => (props: any) => {
  return <p className={className || 'p-p mt8'}>{props.children}</p>;
};

const Heading = (props: any) => {
  const { level } = props;

  switch (level) {
    case 1:
      return <h1 className="p-h1 p--serif mt32">{props.children}</h1>;
    case 2:
      return <h2 className="p-h2 mt24">{props.children}</h2>;
    case 3:
      return <h3 className="p-h3 mt16">{props.children}</h3>;
    case 4:
      return <h4 className="p-h4 mt8">{props.children}</h4>;
    default:
      return <p>{props.children}</p>;
  }
};

const UList = (props: any) => {
  return <ul className={`p-p ${styles.ulist} mt8`}>{props.children}</ul>;
};

const OList = (props: any) => {
  return <ol className={`p-p ${styles.olist} mt8`}>{props.children}</ol>;
};

const Strong = (props: any) => {
  return <strong className="fw-bold">{props.children}</strong>;
};

const Italic = (props: any) => {
  return <em className="fs-italic">{props.children}</em>;
};

const Code = (props: any) => {
  return (
    <div className={`bg-grey-200 p8 p-p--small my8 br2 ${styles.code}`}>
      {props.children}
    </div>
  );
};

export interface MarkdownProps {
  children: string;
  customMDComponents?: Record<string, FunctionComponent<any>>;
  className?: string;
  openLinksInNewTab?: boolean;
  paragraphClassName?: string;
}

const Markdown = ({
  children,
  customMDComponents,
  className = '',
  openLinksInNewTab = false,
  paragraphClassName = '',
}: MarkdownProps) => (
  <ReactMarkdown
    children={children}
    className={className}
    components={{
      a: Link(openLinksInNewTab),
      p: Paragraph(paragraphClassName),
      h1: Heading,
      h2: Heading,
      h3: Heading,
      h4: Heading,
      h5: Heading,
      ol: OList,
      ul: UList,
      strong: Strong,
      em: Italic,
      code: Code,
      ...customMDComponents,
    }}
    remarkPlugins={[remarkDirective]}
  />
);

export { Markdown};
