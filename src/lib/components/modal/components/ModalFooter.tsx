import { ReactNode, useEffect, useRef, useState } from "react";
import styles from './style.module.scss';
import classNames from "classnames";

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
  fixed?: boolean;
  onHeightChange?: (height: number) => void;
}

const ModalFooter = ({
  children,
  className,
  fixed,
  onHeightChange,
}: ModalFooterProps) => {
  const [height, setHeight] = useState(80);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !fixed) {
        return;
    }

    const currentRef = ref.current;
    const observer = new ResizeObserver((entries) => {
        const { height } = entries[0].contentRect;
        setHeight(height);
    });

    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, [fixed]);

  useEffect(() => {
    onHeightChange?.(height);
  }, [height, onHeightChange]);

  return (
    <div
      ref={ref}
      className={classNames(
        className,
        'bg-white',
        styles.wrapper,
        { [styles.wrapperFixed]: fixed }
      )}
    >
      <div className="px24 py16">
        {children}
      </div>
    </div>
  );
};

export { ModalFooter };
