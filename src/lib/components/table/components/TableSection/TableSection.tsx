import { TableCellProps } from '../TableCell/TableCell';
import { ReactNode, useState } from 'react';
import { TableContent } from '../TableContent/TableContent';
import { ChevronDownIcon, ChevronUpIcon } from '../../../icon';
import { Card } from '../../../cards/card';

import styles from './TableSection.module.scss';
import classNames from 'classnames';
import { Collapsible } from './Collapsible';

export type TableSectionType = {
  title?: string;
  icon?: ReactNode;
};

interface TableSectionData {
  section?: TableSectionType;
  items: TableCellProps[][];
}

export type TableData = TableSectionData[];

export interface TableSectionProps {
  className?: string;
  collapsibleSections?: boolean;
  data: TableData;
  hideDetails?: boolean;
  isMobile?: boolean;
  openModal?: (title: ReactNode, body: ReactNode) => void;
  shouldHideDetails?: boolean;
  title: string;
}

const TableSection = ({
  className,
  collapsibleSections,
  data,
  hideDetails,
  isMobile,
  openModal,
  shouldHideDetails,
  title,
}: TableSectionProps) => {
  const [isSectionOpen, setOpenSection] = useState<number | null>(null);
  const firstHeadRow = data?.[0]?.items?.[0];
  const tableWidth = isMobile ? `${firstHeadRow?.length * 50}%` : '';

  const handleToggleSection = (index: number) => {
    setOpenSection((currentSection) =>
      currentSection === index ? null : index
    );
  };

  return (
    <div style={{ width: tableWidth }}>
      {data.map(({ items, section = {} }, index) => {
        const isFirstSection = index === 0;
        const isExpanded = !collapsibleSections
          ? true
          : isSectionOpen === index || isFirstSection;
        const isVisible = hideDetails ? !shouldHideDetails : true;

        return (
          (isFirstSection || isVisible) && (
            <div key={index}>
              {section?.title && (
                <div className={styles.cardWrapper}>
                  <div className={classNames(styles.card, 'p8')}>
                    <Card
                      actionIcon={
                        isExpanded ? (
                          <ChevronUpIcon size={24} />
                        ) : (
                          <ChevronDownIcon size={24} />
                        )
                      }
                      aria-expanded={isExpanded ? 'true' : 'false'}
                      aria-hidden
                      classNames={{
                        wrapper: 'bg-grey-200',
                        icon: 'tc-grey-900',
                      }}
                      dropShadow={false}
                      icon={section?.icon}
                      title={section.title}
                      titleVariant="medium"
                      {...(collapsibleSections
                        ? {
                            onClick: () => handleToggleSection(index),
                          }
                        : {})}
                    />
                  </div>
                </div>
              )}

              <Collapsible isExpanded={isExpanded} isMobile={isMobile}>
                <TableContent
                  className={classNames(className, 'mb24')}
                  data={isFirstSection ? items : [firstHeadRow, ...items]}
                  hideHeader
                  openModal={openModal}
                  title={`${title}${
                    section?.title ? ` - ${section.title}` : ''
                  }`}
                  width={tableWidth}
                />
              </Collapsible>
            </div>
          )
        );
      })}
    </div>
  );
};

export { TableSection };
