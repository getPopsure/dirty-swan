import { ReactNode } from 'react';

export type IconRendererProps = {
  icon?: ReactNode;
  imageComponent?: (args: any) => JSX.Element;
  width?: number;
};

export const IconRenderer = ({ icon, imageComponent, width = 24 }: IconRendererProps) => {
  const ImageComponent = imageComponent ?? 'img';
  const iconIsUrl = typeof icon === 'string';

  const renderedIcon = iconIsUrl ? (
    <ImageComponent src={icon} width={width} alt="" />
  ) : (
    icon
  );

  return <>{renderedIcon}</>;
};
