import { useState } from 'react';
import { TableSection } from '../TableSection/TableSection';
import { ChevronDownIcon, ChevronUpIcon } from '../../../icon';
import { Card } from '../../../cards/card';

import styles from './TableContents.module.scss';
import classNames from 'classnames';
import { Collapsible } from './Collapsible';
import { CellReplacements, ModalFunction, TableData } from '../../types';
import { IconRenderer } from '../IconRenderer/IconRenderer';

export interface TableContentsProps {
  className?: string;
  collapsibleSections?: boolean;
  tableData: TableData;
  hideColumns?: number[];
  hideDetails?: boolean;
  hideRows?: number[];
  isMobile?: boolean;
  openModal?: ModalFunction;
  shouldHideDetails?: boolean;
  title: string;
  cellReplacements?: CellReplacements;
  imageComponent?: (args: any) => JSX.Element;
}

const TableContents = ({
  className,
  collapsibleSections,
  tableData,
  hideColumns = [],
  hideDetails,
  hideRows = [],
  isMobile,
  openModal,
  shouldHideDetails,
  title,
  cellReplacements,
  imageComponent,
}: TableContentsProps) => {
  const [isSectionOpen, setOpenSection] = useState<number | null>(null);
  const firstHeadRow = tableData?.[0]?.rows?.[0];
  const tableWidth = isMobile ? `${firstHeadRow?.length * 50}%` : '';
  const handleToggleSection = (index: number) => {
    setOpenSection((currentSection) =>
      currentSection === index ? null : index
    );
  };

  // Calculate global row offset for each section
  let globalRowOffset = 0;

  return (
    <div style={{ width: tableWidth }}>
      {tableData.map(({ rows, section = {} }, index) => {
        const isFirstSection = index === 0;
        const isExpanded = !collapsibleSections
          ? true
          : isSectionOpen === index || isFirstSection;
        const isVisible = hideDetails ? !shouldHideDetails : true;

        const renderedIcon = (
          <IconRenderer icon={section.icon} imageComponent={imageComponent} width={20} />
        );

        // Calculate section-specific hideRows based on global offset
        const sectionHideRows = hideRows
          .map(globalRowIndex => globalRowIndex - globalRowOffset)
          .filter(localRowIndex => localRowIndex >= 0 && localRowIndex < rows.length);

        const result = (isFirstSection || isVisible) && (
          <div key={index}>
            {section?.title && (
              <div className={styles.cardWrapper}>
                <div className={classNames(styles.card, 'p0')}>
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
                      wrapper: 'pl16',
                      buttonWrapper: styles.cardButton,
                      icon: classNames(styles.cardIcon, 'tc-neutral-900'),
                    }}
                    dropShadow={false}
                    icon={renderedIcon}
                    title={section.title}
                    titleVariant="medium"
                    variant="primary"
                    {...(collapsibleSections
                      ? {
                          onClick: () => handleToggleSection(index),
                        }
                      : {})}
                  />
                </div>
              </div>
            )}

            <Collapsible isExpanded={isExpanded}>
              <TableSection
                className={classNames(className, 'mb24')}
                tableCellRows={
                  isFirstSection ? rows : [firstHeadRow, ...rows]
                }
                hideColumns={hideColumns}
                hideRows={sectionHideRows}
                hideHeader
                openModal={openModal}
                title={`${title}${
                  section?.title ? ` - ${section.title}` : ''
                }`}
                width={tableWidth}
                cellReplacements={cellReplacements}
                imageComponent={imageComponent}
              />
            </Collapsible>
          </div>
        );

        // Update global offset for next section (excluding header row for non-first sections)
        globalRowOffset += rows.length;

        return result;
      })}
    </div>
  );
};

export { TableContents };
