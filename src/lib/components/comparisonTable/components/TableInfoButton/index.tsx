import styles from './style.module.scss';

const TableInfoButton = ({
  onClick,
  className = '',
}: {
  onClick: () => void;
  className?: string;
}) => (
  <span
    role="button"
    className={`p-btn--secondary ${styles.button} ${className}`}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onClick();
      }
    }}
    tabIndex={0}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.66667C5.94991 2.66667 2.66667 5.94991 2.66667 10C2.66667 14.0501 5.94991 17.3333 10 17.3333C14.0501 17.3333 17.3333 14.0501 17.3333 10C17.3333 5.94991 14.0501 2.66667 10 2.66667ZM0.666667 10C0.666667 4.84534 4.84534 0.666667 10 0.666667C15.1547 0.666667 19.3333 4.84534 19.3333 10C19.3333 15.1547 15.1547 19.3333 10 19.3333C4.84534 19.3333 0.666667 15.1547 0.666667 10Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 9C10.5523 9 11 9.44772 11 10V13.3333C11 13.8856 10.5523 14.3333 10 14.3333C9.44772 14.3333 9 13.8856 9 13.3333V10C9 9.44772 9.44772 9 10 9Z"
      />
      <path d="M10.8333 6.66667C10.8333 7.1269 10.4602 7.5 10 7.5C9.53976 7.5 9.16667 7.1269 9.16667 6.66667C9.16667 6.20643 9.53976 5.83333 10 5.83333C10.4602 5.83333 10.8333 6.20643 10.8333 6.66667Z" />
    </svg>
  </span>
);

export default TableInfoButton;
