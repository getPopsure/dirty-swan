import AnimateHeight from 'react-animate-height';
import ReactMarkdown from 'react-markdown';

import styles from './AccordionItem.module.scss';
import chevronUpIcon from './assets/chevron-up.svg';

export const AccordionItem = ({
  children,
  className = '',
  headerClassName = '',
  iconSrc = '',
  isOpen,
  markdownClassName = '',
  onOpen,
  onClose,
  title,
}: {
  children: React.ReactNode | string;
  className?: string;
  headerClassName?: string;
  iconSrc?: string;
  isOpen: boolean;
  markdownClassName?: string;
  onOpen: () => void;
  onClose: () => void;
  title: string;
}) => {
  const content =
    typeof children === 'string' ? (
      <ReactMarkdown
        className={`p-p ${styles.markdown} ${markdownClassName}`}
        components={{
          link: ({
            href,
            children: linkChildren,
          }: {
            href?: string;
            children: React.ReactNode;
          }) => (
            <a href={href} className="p-a" target="_blank" rel="noreferrer">
              {linkChildren}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    ) : (
      children
    );

  const handleClick = () => {
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <div className={`d-flex fd-column ${className}`}>
      <button
        className={`d-flex ai-center jc-between ${styles.headerButton} ${headerClassName}`}
        onClick={handleClick}
        type="button"
      >
        <div className={`d-flex ai-center ${styles.iconAndTextContainer}`}>
          {!!iconSrc && <img src={iconSrc} alt={`${title} icon`} />}
          <h4 className="p-h4">{title}</h4>
        </div>
        <img
          className={`${styles.chevron} ${!isOpen && styles.chevronClosed}`}
          src={chevronUpIcon}
          alt="expand / collapse"
        />
      </button>
      {/* Min height is 0.1 so that the scroll position is correctly synced across accordion items but is not actually shown.
      If set to 0, react-animate-height will set display to "none" which means scrolling is not synced.*/}
      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0.1}>
        {content}
      </AnimateHeight>
    </div>
  );
};
