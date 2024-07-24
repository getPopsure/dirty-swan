import { ReactNode } from 'react';

export type IconRendererProps = {
  icon?: ReactNode;
  imageComponent?: (args: any) => JSX.Element;
};

export const IconRenderer = ({ icon, imageComponent }: IconRendererProps) => {
  const ImageComponent = imageComponent ?? 'img';
  const iconIsUrl = typeof icon === 'string';

  if (!icon) {
    return null;
  }

  const renderedIcon = iconIsUrl ? (
    <ImageComponent src={icon} width={24} alt="" />
  ) : (
    icon
  );

  return <>{renderedIcon}</>;
};
