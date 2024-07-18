import { ReactNode } from "react";
import AnimateHeight from "react-animate-height";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

interface CollapsibleProps {
  children: ReactNode;
  isExpanded?: boolean;
  isMobile?: boolean;
}
  
export const Collapsible = ({ children, isExpanded }: CollapsibleProps) => {
  const isDesktop = useMediaQuery('ABOVE_DESKTOP');

  if (!isDesktop) {
    return (
      <div>
        {isExpanded ? children : null}
      </div>
    );
  }

  return (
    <AnimateHeight
      duration={300}
      height={isExpanded ? 'auto' : 0}
    >
      <div>{children}</div>
    </AnimateHeight>
  );
}
