import { ReactNode } from 'react';
import { Card } from '../../../../cards/card';
import { IconRenderer } from '../../IconRenderer/IconRenderer';
export type CardCellProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  imageComponent?: (args: any) => JSX.Element;
  onClick?: () => void;
  href: string;
};

export const CardCell = ({
  title,
  description,
  icon,
  onClick,
  href,
  imageComponent,
}: CardCellProps) => {
  const renderedIcon = (
    <IconRenderer icon={icon} imageComponent={imageComponent} />
  );

  return (
    <div className="ta-left">
      <Card
        title={title}
        description={description}
        density="balanced"
        icon={renderedIcon}
        onClick={onClick}
        {...(href && { href, as: 'a' })}
        actionIcon={null}
        showActionIcon={false}
      />
    </div>
  );
};
