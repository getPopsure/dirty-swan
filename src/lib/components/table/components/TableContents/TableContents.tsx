import { useState } from 'react';
import { TableSection } from '../TableSection/TableSection';
import { ChevronDownIcon, ChevronUpIcon } from '../../../icon';
import { Card } from '../../../cards/card';

import styles from './TableContents.module.scss';
import classNames from 'classnames';
import { Collapsible } from './Collapsible';
import { CellReplacements, ModalFunction, TableData } from '../../types';

export interface TableContentsProps {
  className?: string;
  collapsibleSections?: boolean;
  tableData: TableData;
  hideDetails?: boolean;
  isMobile?: boolean;
  openModal?: ModalFunction;
  shouldHideDetails?: boolean;
  title: string;
  cellReplacements?: CellReplacements;
}

const TableContents = ({
  className,
  collapsibleSections,
  tableData,
  hideDetails,
  isMobile,
  openModal,
  shouldHideDetails,
  title,
  cellReplacements,
}: TableContentsProps) => {
  const [isSectionOpen, setOpenSection] = useState<number | null>(null);
  const firstHeadRow = tableData?.[0]?.rows?.[0];
  const tableWidth = isMobile ? `${firstHeadRow?.length * 50}%` : '';
  const handleToggleSection = (index: number) => {
    setOpenSection((currentSection) =>
      currentSection === index ? null : index
    );
  };

  return (
    <div style={{ width: tableWidth }}>
      {tableData.map(({ rows, section = {} }, index) => {
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
                <TableSection
                  className={classNames(className, 'mb24')}
                  tableCellRows={
                    isFirstSection ? rows : [firstHeadRow, ...rows]
                  }
                  hideHeader
                  openModal={openModal}
                  title={`${title}${
                    section?.title ? ` - ${section.title}` : ''
                  }`}
                  width={tableWidth}
                  cellReplacements={cellReplacements}
                />
              </Collapsible>
            </div>
          )
        );
      })}
    </div>
  );
};

export { TableContents };
