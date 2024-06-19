import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';

import { MarkdownStyling, defaultStyling } from './config';

type ComponentProps = {
  children?: ReactNode;
}

export interface MarkdownProps {
  children: string;
  className?: string;
  openLinksInNewTab?: boolean;
  styling?: Partial<MarkdownStyling>;
  renderRawMarkdownChild?: boolean;
}

const Markdown = ({
  children: rawMarkdownChild,
  className = '',
  openLinksInNewTab = false,
  styling: rawStyling,
  renderRawMarkdownChild = false
}: MarkdownProps) => {
  const styling = { ...defaultStyling, ...rawStyling };

  if (renderRawMarkdownChild) {
    return <>{rawMarkdownChild}</>;
  }

  const Link = ({ children, href }: ComponentProps & { href?: string }) =>
    openLinksInNewTab ? (
      <a href={href} className={styling.a} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <a href={href} className={styling.a}>
        {children}
      </a>
    );

  const Paragraph = ({ children }: ComponentProps) => (
    <p className={styling.p}>{children}</p>
  );

  const Heading = ({
    children,
    node,
  }: ComponentProps & { node?: { tagName: string } }) => {
    switch (node?.tagName) {
      case 'h1':
        return <h1 className={styling.h1}>{children}</h1>;
      case 'h2':
        return <h2 className={styling.h2}>{children}</h2>;
      case 'h3':
        return <h3 className={styling.h3}>{children}</h3>;
      case 'h4':
        return <h4 className={styling.h4}>{children}</h4>;
      case 'h5':
        return <h5 className={styling.h5}>{children}</h5>;
      case 'h6':
        return <h6 className={styling.h6}>{children}</h6>;
      default:
        return <p>{children}</p>;
    }
  };

  const UList = ({ children }: ComponentProps) => {
    return <ul className={styling.ul}>{children}</ul>;
  };

  const OList = ({ children }: ComponentProps) => {
    return <ol className={styling.ol}>{children}</ol>;
  };

  const Strong = ({ children }: ComponentProps) => {
    return <strong className={styling.strong}>{children}</strong>;
  };

  const Emphasis = ({ children }: ComponentProps) => {
    return <em className={styling.em}>{children}</em>;
  };

  const Table = ({ children }: ComponentProps) => {
    return <table className={styling.table}>{children}</table>;
  };

  const TableRow = ({ children }: ComponentProps) => {
    return <tr className={styling.tr}>{children}</tr>;
  };

  const TableCell = ({ children }: ComponentProps) => {
    return <td className={styling.td}>{children}</td>;
  };

  const TableHeader = ({ children }: ComponentProps) => {
    return <th className={styling.th}>{children}</th>;
  };

  const Image = ({
    src,
    alt,
    ...props
  }: {
    src?: string | undefined;
    alt?: string | undefined;
  }) => {
    return (
      <a href={src} target="_blank" rel="noreferrer noreferrer">
        <img style={{ maxWidth: '100%' }} src={src} alt={alt} {...props} />
      </a>
    );
  };

  const BlockQuote = ({ children }: ComponentProps) => {
    return <blockquote className={styling.blockquote}>{children}</blockquote>;
  };

  const Pre = ({ children }: ComponentProps) => {
    return <pre className={styling.pre}>{children}</pre>;
  };

  const Code = ({ children }: ComponentProps) => {
    return <code className={styling.code}>{children}</code>;
  };

  return (
    <ReactMarkdown
      className={className}
      components={{
        a: Link,
        p: Paragraph,
        h1: Heading,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        h5: Heading,
        h6: Heading,
        ol: OList,
        ul: UList,
        strong: Strong,
        em: Emphasis,
        table: Table,
        th: TableHeader,
        tr: TableRow,
        td: TableCell,
        blockquote: BlockQuote,
        img: Image,
        code: Code,
        pre: Pre,
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkDirective, remarkGfm]}
    >
      {rawMarkdownChild}
    </ReactMarkdown>
  );
};

export { Markdown };
