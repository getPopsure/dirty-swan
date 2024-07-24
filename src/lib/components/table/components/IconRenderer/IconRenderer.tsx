import { ReactNode } from 'react';

export type IconRendererProps = {
  icon?: ReactNode;
  imageComponent?: (args: any) => JSX.Element;
};

export const IconRenderer = ({ icon, imageComponent }: IconRendererProps) => {
  if (typeof icon !== 'string') {
    return <>{icon}</>;
  }

  if (imageComponent) {
    return imageComponent?.({ src: icon, width: 24});
  }
  
  return <img src={icon} width={24} alt="" />;
};
