const Chevron = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15 12.5l-5-5-5 5"
      stroke="#8E8CEE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Chevron;
