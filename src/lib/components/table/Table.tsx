import { TableCell } from './components/TableCell/TableCell';
import { BottomOrRegularModal } from '../modal';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../icon';
import { Card } from '../cards/card';

import styles from './Table.module.scss';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TableContents } from './components/TableContents/TableContents';
import classNames from 'classnames';
import { useTableNavigation } from './utils/useTableNavigation/useTableNavigation';
import { TableControls } from './components/TableControls/TableControls';
import { TableSection } from './components/TableSection/TableSection';
import { useScrollSync } from './utils/useScrollSync/useScrollSync';
import {
  CellReplacements,
  isBaseCell,
  ModalData,
  ModalFunction,
  TableCellData,
  TableData,
} from './types';

type TextOverrides = {
  showDetails?: string;
  hideDetails?: string;
};

export interface TableProps {
  className?: string;
  collapsibleSections?: boolean;
  tableData: TableData;
  hideDetails?: boolean;
  onModalOpen?: ModalFunction;
  onSelectionChanged?: (index: number) => void;
  stickyHeaderTopOffset?: number;
  textOverrides?: TextOverrides;
  title: string;
  cellReplacements?: CellReplacements;
}

const defaultTextOverrides = {
  showDetails: 'Show details',
  hideDetails: 'Hide details',
};

const Table = ({
  className,
  cellReplacements,
  collapsibleSections,
  tableData,
  hideDetails,
  onModalOpen,
  onSelectionChanged,
  stickyHeaderTopOffset = 0,
  textOverrides: definedTextOverrides,
  title,
}: TableProps) => {
  const textOverrides = { ...defaultTextOverrides, ...definedTextOverrides };
  const isMobile = useMediaQuery('BELOW_MOBILE');
  const [infoModalData, setInfoModalData] = useState<ModalData | null>(null);
  const [shouldHideDetails, setShouldHideDetails] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const columnsLength = tableData[0].rows[0].length;

  useScrollSync(headerRef, containerRef, !isMobile);

  const { activeSection, navigateTable } = useTableNavigation({
    enabled: isMobile,
    containerRef,
    onSelectionChanged,
  });

  const currentActiveSection = tableData?.[0]?.rows?.[0]?.[activeSection];
  const currentActiveSectionReplacements =
    (currentActiveSection.cellId &&
      cellReplacements?.[currentActiveSection.cellId]) ||
    {};

  const activeCellProps = {
    ...currentActiveSection,
    ...currentActiveSectionReplacements,
  } as TableCellData;

  const handleOpenModal: ModalFunction = useCallback(({ body, title }) => {
    onModalOpen?.({ body, title });
    setInfoModalData({ body, title });
  }, []);

  return (
    <div className={classNames(styles.wrapper, 'bg-white')}>
      {isMobile ? (
        <TableControls
          activeSection={activeSection}
          columnsLength={columnsLength}
          navigateTable={navigateTable}
          stickyHeaderTopOffset={stickyHeaderTopOffset}
        >
          <TableCell
            {...(isBaseCell(currentActiveSection)
              ? {
                  openModal: (body: ReactNode) =>
                    handleOpenModal({
                      body,
                      title: currentActiveSection?.text,
                    }),
                }
              : {})}
            {...activeCellProps}
            isNavigation
          />
        </TableControls>
      ) : (
        <div
          aria-hidden
          className={styles.stickyHeader}
          style={{ top: `${stickyHeaderTopOffset}px` }}
        >
          <div className={styles.container} ref={headerRef}>
            <TableSection
              tableCellRows={[tableData?.[0]?.rows?.[0]]}
              title={title}
              className={className}
              openModal={handleOpenModal}
            />
          </div>
        </div>
      )}

      <div ref={containerRef} className={classNames(styles.container, 'pb8')}>
        <TableContents
          tableData={tableData}
          title={title}
          className={className}
          collapsibleSections={collapsibleSections}
          hideDetails={hideDetails}
          isMobile={isMobile}
          shouldHideDetails={shouldHideDetails}
          openModal={handleOpenModal}
          cellReplacements={cellReplacements}
        />
      </div>

      {hideDetails && (
        <Card
          data-testid="show-hide-details"
          classNames={{
            buttonWrapper: 'm8 mt32',
            title: 'd-flex gap8 ai-center jc-center',
            wrapper: 'bg-grey-200',
          }}
          title={
            <>
              {shouldHideDetails
                ? textOverrides.showDetails
                : textOverrides.hideDetails}
              {shouldHideDetails ? (
                <ChevronDownIcon size={24} />
              ) : (
                <ChevronUpIcon size={24} />
              )}
            </>
          }
          actionIcon={null}
          dropShadow={false}
          titleVariant="small"
          density="compact"
          onClick={() => setShouldHideDetails((current) => !current)}
        />
      )}

      <BottomOrRegularModal
        isOpen={infoModalData?.body ? true : false}
        title={infoModalData?.title}
        onClose={() => setInfoModalData(null)}
      >
        <div className="pt8 p24 wmn6">{infoModalData?.body}</div>
      </BottomOrRegularModal>
    </div>
  );
};

export { Table };
