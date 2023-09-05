import classNames from 'classnames';

export interface SpinnerProps {
  size?: 's' | 'm' | 'l';
}

const Spinner = ({ size = 's' }: SpinnerProps) => (
  <div
    className={classNames('ds-spinner', `ds-spinner__${size}`)}
    data-testid="ds-spinner"
  ></div>
);

export { Spinner };
