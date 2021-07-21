import React, { useRef, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import classNames from 'classnames';

import Row from './components/Row';
import TableArrows, { ArrowValues } from './components/TableArrows';
import TableRating from './components/TableRating';
import TableTrueFalse from './components/TableTrueFalse';
import TableRowHeader from './components/TableRowHeader';
import TableInfoButton from './components/TableInfoButton';
import Chevron from './components/Chevron';
import { useActiveTableArrows } from './hooks/useActiveTableArrows';

import baseStyles from './style.module.scss';

export interface CellBaseProps<T> {
  /** Used to display the row's title */
  label?: React.ReactNode;
  /**
   *
   * @param value The current data value
   * @param element The complete data object
   */
  render?: (value: any, element: T) => React.ReactNode; //TODO: add typing to value param
}

interface CellWithId<T> extends CellBaseProps<T> {
  /** Used when adding component add-ons */
  addonId: string | number;
}

export type Cell<T> =
  | ({ key: Extract<keyof T, string> } & CellBaseProps<T>)
  | ({ key?: undefined } & CellWithId<T>);

export interface Header<T> {
  /** Required unique id number for each table group */
  id: number;
  /** Used to display a table group subheader */
  label?: React.ReactNode;
  cells: Array<Cell<T>>;
  default?: boolean;
}

export interface ComparisonTableProps<T> {
  headers: Array<Header<T>>;
  data: Array<T>;
  hideDetails?: boolean;
  styles?: {
    header?: string;
    container?: string;
  };
}

const ComparisonTable = <T extends { id: number }>(
  props: ComparisonTableProps<T>
) => {
  const { headers, data, hideDetails, styles } = props;
  const [showMore, setShowMore] = useState<boolean>(false);
  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const { activeArrows, contentContainerRef, contentWrapperRef } =
    useActiveTableArrows();

  /** narrow types */
  const headerContainer = headerContainerRef
    ? headerContainerRef.current
    : null;
  const contentWrapper =
    typeof contentWrapperRef === 'object' && contentWrapperRef
      ? contentWrapperRef.current
      : null;

  const handleArrowsClick = (value: ArrowValues) => {
    if (headerContainerRef.current) {
      headerContainerRef.current.scroll({
        top: 0,
        left:
          value === 'next'
            ? headerContainerRef.current.scrollLeft + window.innerWidth
            : headerContainerRef.current.scrollLeft - window.innerWidth,
        behavior: 'smooth',
      });
    }
  };

  const toggleMoreRows = async () => {
    if (showMore && headerContainer && contentWrapper) {
      window.scroll(
        0,
        window.scrollY +
          (contentWrapper.getBoundingClientRect().y -
            headerContainer.getBoundingClientRect().bottom)
      );
    }
    setShowMore(!showMore);
  };

  return (
    <ScrollSync>
      <div>
        <div className={classNames(baseStyles.header, styles?.header)}>
          <ScrollSyncPane>
            <div className={baseStyles.container} ref={headerContainerRef}>
              <div className={classNames(baseStyles['overflow-container'])}>
                <div className={baseStyles['group-container']}>
                  <TableArrows
                    onClick={handleArrowsClick}
                    active={activeArrows}
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
        <ScrollSyncPane>
          <div
            className={classNames(baseStyles.container, styles?.container)}
            ref={contentWrapperRef}
          >
            <div
              className={classNames(baseStyles['overflow-container'])}
              ref={contentContainerRef}
            >
              <div className={baseStyles['group-container']}>
                {Array.isArray(headers) &&
                  headers
                    .filter(
                      (headerGroup) =>
                        !hideDetails || showMore || headerGroup.default
                    )
                    .map((headerGroup, headerGroupIndex) => (
                      <div key={headerGroup.id}>
                        {
                          /**
                           * Print a table subheader if the `label` value is present
                           */
                          headerGroup.label && (
                            <div className={baseStyles['group-title']}>
                              <h4 className={`p-h4 ${baseStyles.sticky}`}>
                                {headerGroup.label}
                              </h4>
                            </div>
                          )
                        }

                        {headerGroup.cells?.map((cell, index) => {
                          const rowId = `${headerGroup.id}-${
                            cell.key ?? 'addon'
                          }-${index}`;

                          /** Do not render the first row */
                          if (index === 0 && headerGroupIndex === 0)
                            return null;

                          return (
                            <Row<T>
                              key={rowId}
                              rowId={rowId}
                              cell={cell}
                              data={data}
                            />
                          );
                        })}
                      </div>
                    ))}
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
                      >
                        {showMore ? 'Hide details' : 'Show details'}
                        <Chevron
                          className={
                            showMore ? '' : baseStyles['icon-inverted']
                          }
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollSyncPane>
      </div>
    </ScrollSync>
  );
};

export {
  ComparisonTable,
  TableRating,
  TableTrueFalse,
  TableRowHeader,
  TableInfoButton,
};
