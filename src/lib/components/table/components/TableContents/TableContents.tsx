import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { TableSection } from '../TableSection/TableSection';
import { ChevronDownIcon, ChevronUpIcon } from '../../../icon';

import styles from './TableContents.module.scss';
import classNames from 'classnames';
import { Collapsible } from './Collapsible';
import { CellReplacements, ModalFunction, TableData } from '../../types';
import { IconRenderer } from '../IconRenderer/IconRenderer';

export interface TableContentsProps {
  className?: string;
  collapsibleSections?: boolean;
  scrollOnOpen?: boolean;
  scrollTopOffset?: number;
  stickyHeaderRef?: MutableRefObject<HTMLDivElement | null>;
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
  selectedColumn?: number;
}

const TableContents = ({
  className,
  collapsibleSections,
  scrollOnOpen,
  scrollTopOffset = 0,
  stickyHeaderRef,
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
  selectedColumn,
}: TableContentsProps) => {
  const [isSectionOpen, setOpenSection] = useState<number | null>(null);
  const lastToggledSection = useRef<number | null>(null);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const firstHeadRow = tableData?.[0]?.rows?.[0];
  const tableWidth = isMobile ? `${firstHeadRow?.length * 50}%` : '';
  const handleToggleSection = (index: number) => {
    lastToggledSection.current = isSectionOpen === index ? null : index;
    setOpenSection((currentSection) =>
      currentSection === index ? null : index
    );
  };

  const handleScrollToSection = useCallback(
    (index: number) => {
      if (scrollOnOpen && lastToggledSection.current === index && sectionRefs.current[index]) {
        const headerHeight =
          stickyHeaderRef?.current?.getBoundingClientRect().height ?? 0;
        const top =
          sectionRefs.current[index]!.getBoundingClientRect().top +
          window.scrollY -
          scrollTopOffset -
          headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [scrollOnOpen, scrollTopOffset, stickyHeaderRef]
  );

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

        const renderedIcon = section.icon ? (
          <IconRenderer icon={section.icon} imageComponent={imageComponent} width={20} />
        ) : null;

        // Calculate section-specific hideRows based on global offset
        const sectionHideRows = hideRows
          .map(globalRowIndex => globalRowIndex - globalRowOffset)
          .filter(localRowIndex => localRowIndex >= 0 && localRowIndex < rows.length);

        const result = (isFirstSection || isVisible) && (
          <div key={index} ref={(el) => { sectionRefs.current[index] = el; }}>
            {section?.title &&
              (collapsibleSections ? (
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  className={classNames(
                    'w100 d-flex ai-center jc-between ta-left',
                    styles.sectionButton
                  )}
                  onClick={() => handleToggleSection(index)}
                >
                  <span className="d-flex ai-center gap8">
                    {renderedIcon}
                    <span className="p-h3">{section.title}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUpIcon size={20} />
                  ) : (
                    <ChevronDownIcon size={20} />
                  )}
                </button>
              ) : (
                <div
                  className={classNames(
                    'w100 d-flex ai-center jc-between ta-left',
                    styles.sectionButton
                  )}
                >
                  <span className="d-flex ai-center gap8">
                    {renderedIcon}
                    <span className="p-h3">{section.title}</span>
                  </span>
                </div>
              ))}

            <Collapsible
              isExpanded={isExpanded}
              onTransitionEnd={() => handleScrollToSection(index)}
            >
              <TableSection
                className={classNames(className, 'mb16', {
                  mt16: !!section?.title,
                })}
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
                selectedColumn={selectedColumn}
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
