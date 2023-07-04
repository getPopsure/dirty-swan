import classnames from 'classnames';

export type LinkProps = JSX.IntrinsicElements['a'];

export const Link = ({ children, className, ...rest }: LinkProps) => (
  <a className={classnames(className, 'p-a c-pointer')} {...rest}>
    {children}
  </a>
);