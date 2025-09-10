const TableTrueFalse = ({
  value,
  className = '',
}: {
  value: boolean;
  className?: string;
}) => {
  if (value) {
    return (
      <svg
        width="18"
        height="13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M15.667 1.833L6.5 11 2.333 6.833"
          stroke="#26262e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.707 1.707A1 1 0 0010.293.293L6 4.586 1.707.293A1 1 0 00.293 1.707L4.586 6 .293 10.293a1 1 0 101.414 1.414L6 7.414l4.293 4.293a1 1 0 001.414-1.414L7.414 6l4.293-4.293z"
        fill="#d2d2d9"
      />
    </svg>
  );
};

export default TableTrueFalse;
