import { ReactNode } from 'react';
import { Card } from '../../../../cards/card';

export type CardCellProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href: string;
  cellId?: string;
};
export const CardCell = ({
  title,
  description,
  icon,
  onClick,
  href,
}: CardCellProps) => {
  return (
    <div className="ta-left">
      <Card 
        title={title}
        description={description}
        density='balanced'
        icon={icon}
        onClick={onClick}
        {...(href && { href, as: 'a' })}
        actionIcon={null}
        showActionIcon={false}
      />
    </div>
  );
};
