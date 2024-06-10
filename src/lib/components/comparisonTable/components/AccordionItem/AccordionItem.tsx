import AnimateHeight from 'react-animate-height';

import styles from './AccordionItem.module.scss';

const ChevronSVG = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 15L12 9L6 15"
      stroke="#b4b4ba"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AccordionItem = ({
  children,
  className = '',
  headerClassName = '',
  isOpen,
  onOpen,
  onClose,
  label,
}: {
  children: React.ReactNode | string;
  className?: string;
  headerClassName?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  label: React.ReactNode;
}) => {
  const handleClick = () => {
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <section className={`d-flex fd-column ${styles.container} ${className}`}>
      <button
        className={`d-flex ai-center jc-between ${styles.headerButton} ${headerClassName}`}
        onClick={handleClick}
        type="button"
      >
        <div className={`d-flex ai-center ${styles.iconAndTextContainer}`}>
          {typeof label === 'string' ? (
            <h4 className="p-h4">{label}</h4>
          ) : (
            <>{label}</>
          )}
        </div>
        <ChevronSVG
          className={`${styles.chevron} ${!isOpen && styles.chevronClosed}`}
        />
      </button>
      {/* Min height is 0.1 so that the scroll position is correctly synced across accordion items but is not actually shown.
      If set to 0, react-animate-height will set display to "none" which means scrolling is not synced. */}
      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0.1}>
        {children}
      </AnimateHeight>
    </section>
  );
};
