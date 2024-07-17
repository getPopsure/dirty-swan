import { TableCell, TableCellProps } from './components/TableCell/TableCell';
import { BottomOrRegularModal } from '../modal';
import { useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../icon';
import { Card } from '../cards/card';

import styles from './Table.module.scss';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TableSection } from './components/TableSection/TableSection';
import classNames from 'classnames';
import { useTableNavigation } from './utils/useTableNavigation/useTableNavigation';
import { TableControls } from './components/TableControls/TableControls';
import { TableContent } from './components/TableContent/TableContent';
import { useScrollSync } from './utils/useScrollSync/useScrollSync';
import { ModalData, ModalFunction, TableSectionData } from './types';

type TextOverrides = {
  showDetails?: string;
  hideDetails?: string;
};

export type TableData = TableSectionData[];

export interface TableProps {
  className?: string;
  collapsibleSections?: boolean;
  data: TableData;
  hideDetails?: boolean;
  onModalOpen?: ModalFunction;
  onSelectionChanged?: (index: number) => void;
  stickyHeaderTopOffset?: number;
  textOverrides?: TextOverrides;
  title: string;
}

const defaultTextOverrides = {
  showDetails: 'Show details',
  hideDetails: 'Hide details',
};

const Table = ({
  className,
  collapsibleSections,
  data,
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
  const columnsLength = data[0].items[0].length;

  useScrollSync(headerRef, containerRef, !isMobile);

  const { activeSection, navigateTable } = useTableNavigation({
    enabled: isMobile,
    containerRef,
    columnsLength,
    onSelectionChanged,
  });

  const currentActiveSection = data?.[0]?.items?.[0]?.[activeSection];

  const handleOpenModal: ModalFunction = ({ body, title }) => {
    onModalOpen?.({ body, title });
    setInfoModalData({ body, title });
  };

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
            {...currentActiveSection}
            openModal={(body) =>
              handleOpenModal({
                body,
                title: currentActiveSection?.content,
              })
            }
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
            <TableContent
              data={[data?.[0]?.items?.[0]]}
              title={title}
              className={className}
              openModal={handleOpenModal}
            />
          </div>
        </div>
      )}

      <div ref={containerRef} className={classNames(styles.container, 'pb8')}>
        <TableSection
          data={data}
          title={title}
          className={className}
          collapsibleSections={collapsibleSections}
          hideDetails={hideDetails}
          isMobile={isMobile}
          shouldHideDetails={shouldHideDetails}
          openModal={handleOpenModal}
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
