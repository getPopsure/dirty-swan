import styles from './styles.module.scss';

export interface MarkdownStyling {
  a: string;
  p: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  ol: string;
  ul: string;
  strong: string;
  em: string;
  table: string;
  th: string;
  tr: string;
  td: string;
  blockquote: string;
  code: string;
  pre: string;
}

export const defaultStyling: MarkdownStyling = {
  a: 'p-a',
  p: 'p-p mt8',
  h1: 'p-h1 p--serif mt32',
  h2: 'p-h2 mt24',
  h3: 'p-h3 mt16',
  h4: 'p-h4 mt8',
  h5: 'p-h5 mt8',
  h6: 'p-h6 mt8',
  ol: `p-p ${styles.olist} mt8`,
  ul: `p-p ${styles.ulist} mt8`,
  strong: 'fw-bold',
  em: 'fs-italic',
  table: `w100 mt24 ${styles.table}`,
  th: 'p-h4',
  tr: styles.row,
  td: 'px8 py8 tc-grey-700',
  blockquote: 'bg-grey-200 my24 px24 pt16 pb24 br8',
  code: styles.code,
  pre: `d-block tc-grey-200 bg-grey-900 px16 py16 my16 br8 ${styles.pre}`,
};
