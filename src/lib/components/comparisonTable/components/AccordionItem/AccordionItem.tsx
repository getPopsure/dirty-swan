import AnimateHeight from 'react-animate-height';

import styles from './AccordionItem.module.scss';
import { useRef, useState } from 'react';

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
  label,
  isOpen: controlledIsOpen,
  onToggle,
  scrollOnOpen,
  scrollTopOffset = 0,
}: {
  children: React.ReactNode | string;
  className?: string;
  headerClassName?: string;
  label: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  scrollOnOpen?: boolean;
  scrollTopOffset?: number;
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const userToggled = useRef(false);

  const isControlled = controlledIsOpen !== undefined && onToggle !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClick = () => {
    userToggled.current = true;
    if (isControlled) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleAnimationEnd = () => {
    if (userToggled.current && isOpen && scrollOnOpen && sectionRef.current) {
      userToggled.current = false;
      const top =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        scrollTopOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`d-flex fd-column ${styles.container} ${className}`}
    >
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
      <AnimateHeight
        duration={300}
        height={isOpen ? 'auto' : 0.1}
        onHeightAnimationEnd={handleAnimationEnd}
      >
        {children}
      </AnimateHeight>
    </section>
  );
};
