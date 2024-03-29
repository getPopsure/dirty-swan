import classNames from 'classnames';
import { Fragment } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { AccordionItem } from './components/AccordionItem';
import Chevron from './components/Chevron';
import Row from './components/Row';
import TableArrows from './components/TableArrows';
import TableButton from './components/TableButton';
import TableInfoButton from './components/TableInfoButton';
import TableRating from './components/TableRating';
import TableRowHeader from './components/TableRowHeader';
import TableTrueFalse from './components/TableTrueFalse';
import { useComparisonTable } from './hooks/useComparisonTable';
import baseStyles from './style.module.scss';

export interface CellBaseProps<T> {
  /** Used to display the row's title */
  label?: React.ReactNode;
  /**
   *
   * @param value The current data value
   * @param element The complete data object
   */
  render?: (value: any, element: T) => React.ReactNode; // TODO: add typing to value param
}

interface CellWithId<T> extends CellBaseProps<T> {
  /** Used when adding component add-ons */
  addonId: string | number;
}

export type Cell<T> =
  | ({ key: Extract<keyof T, string> } & CellBaseProps<T>)
  | ({ key?: undefined } & CellWithId<T>);

export interface TableHeader<T> {
  /** Required unique id number for each table group */
  id: number;
  /** Used to display a table group subheader */
  label?: React.ReactNode;
  cells: Array<Cell<T>>;
  default?: boolean;
}

export interface ComparisonTableProps<T> {
  headers: Array<TableHeader<T>>;
  data: Array<T>;
  hideDetails?: boolean;
  hideScrollBars?: boolean;
  collapsibleSections?: boolean;
  cellWidth?: number;
  firstColumnWidth?: number;
  stickyHeaderTopOffset?: number;
  growContent?: boolean;
  styles?: {
    header?: string;
    container?: string;
  };
}

const ComparisonTable = <T extends { id: number }>(
  props: ComparisonTableProps<T>
) => {
  const {
    headers,
    data,
    hideDetails,
    styles,
    hideScrollBars,
    collapsibleSections,
    cellWidth,
    firstColumnWidth,
    stickyHeaderTopOffset,
    growContent,
  } = props;

  const {
    headerWidth,
    contentContainerRef,
    selectedSection,
    setSelectedSection,
    selectedTabIndex,
    scrollContainerCallbackRef,
    handleArrowsClick,
    toggleMoreRows,
    showMore,
    headerId,
  } = useComparisonTable();

  const cssVariablesStyle = {
    '--tableWidth': `${headerWidth}px`,
    ...(cellWidth ? { '--cellWidth': `${cellWidth}px` } : {}),
    ...(firstColumnWidth
      ? { '--firstColumnWidth': `${firstColumnWidth}px` }
      : {}),
    ...(stickyHeaderTopOffset
      ? { '--stickyHeaderTopOffset': `${stickyHeaderTopOffset}px` }
      : {}),
    ...(growContent ? { '--growContent': '100%' } : {}),
  } as React.CSSProperties;

  return (
    <ScrollSync onSync={scrollContainerCallbackRef}>
      <div style={cssVariablesStyle}>
        <div className={classNames(baseStyles.header, styles?.header)}>
          <ScrollSyncPane>
            <div
              id={headerId}
              className={classNames(baseStyles.container, {
                [baseStyles.noScrollBars]: hideScrollBars,
              })}
            >
              <div className={classNames(baseStyles['overflow-container'])}>
                <div className={baseStyles['group-container']}>
                  <TableArrows
                    onClick={handleArrowsClick}
                    active={{
                      left: selectedTabIndex > 0,
                      right: selectedTabIndex < data.length - 1,
                    }}
                  />
                  <Row<T>
                    key="table-header-row"
                    rowId="table-header-row"
                    cell={headers[0].cells[0]}
                    data={data}
                    isRowHeader
                  />
                </div>
              </div>
            </div>
          </ScrollSyncPane>
        </div>
        <div ref={contentContainerRef}>
          {Array.isArray(headers) &&
            headers
              .filter(
                (headerGroup) => !hideDetails || showMore || headerGroup.default
              )
              .map((headerGroup, headerGroupIndex) => {
                const content = headerGroup.cells?.map((cell, index) => {
                  const rowId = `${headerGroup.id}-${
                    cell.key ?? 'addon'
                  }-${index}`;

                  /** Do not render the first row */
                  if (index === 0 && headerGroupIndex === 0) return null;

                  return (
                    <Row<T> key={rowId} rowId={rowId} cell={cell} data={data} />
                  );
                });

                const idString = `headerGroup-${headerGroup.id}`;

                return (
                  <Fragment key={idString}>
                    {headerGroup.label && collapsibleSections ? (
                      <AccordionItem
                        className="mt8"
                        label={headerGroup.label}
                        headerClassName="p24 br8"
                        isOpen={selectedSection === idString}
                        onOpen={() => setSelectedSection(idString)}
                        onClose={() => setSelectedSection('')}
                      >
                        <ScrollSyncPane>
                          <div
                            className={classNames(
                              baseStyles.container,
                              styles?.container,
                              {
                                [baseStyles.noScrollBars]: hideScrollBars,
                              }
                            )}
                          >
                            <div
                              className={classNames(
                                baseStyles['overflow-container']
                              )}
                            >
                              <div className={baseStyles['group-container']}>
                                {content}
                              </div>
                            </div>
                          </div>
                        </ScrollSyncPane>
                      </AccordionItem>
                    ) : (
                      <div key={idString}>
                        <ScrollSyncPane>
                          <div
                            className={classNames(
                              baseStyles.container,
                              styles?.container,
                              {
                                [baseStyles.noScrollBars]: hideScrollBars,
                              }
                            )}
                          >
                            <div
                              className={classNames(
                                baseStyles['overflow-container']
                              )}
                            >
                              <div className={baseStyles['group-container']}>
                                {
                                  /**
                                   * Print a table subheader if the `label` value is present
                                   */
                                  headerGroup.label && !collapsibleSections && (
                                    <div className={baseStyles['group-title']}>
                                      <h4
                                        className={`p-h4 ${baseStyles.sticky}`}
                                      >
                                        {headerGroup.label}
                                      </h4>
                                    </div>
                                  )
                                }
                                {content}
                              </div>
                            </div>
                          </div>
                        </ScrollSyncPane>
                      </div>
                    )}
                  </Fragment>
                );
              })}
          {hideDetails && (
            <div
              className={classNames(
                baseStyles['show-details-container'],
                baseStyles.sticky,
                'mt48'
              )}
            >
              <div>
                <button
                  className={`w100 d-flex p-a p-h4 c-pointer ${baseStyles['show-details-button']}`}
                  onClick={toggleMoreRows}
                  type="button"
                >
                  {showMore ? 'Hide details' : 'Show details'}
                  <Chevron
                    className={showMore ? '' : baseStyles['icon-inverted']}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollSync>
  );
};

export {
  ComparisonTable,
  TableButton,
  TableInfoButton,
  TableRating,
  TableRowHeader,
  TableTrueFalse,
};
