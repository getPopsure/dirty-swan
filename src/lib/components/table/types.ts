import { ReactNode } from 'react';
import type { TableCellProps } from './components/TableCell/TableCell';

export type TableSectionType = {
  title?: string;
  icon?: ReactNode;
};

export type ModalData = {
  title?: ReactNode;
  body?: ReactNode;
};

export type TableCellRowData = TableCellProps[];

export type TableSectionData = {
  section?: TableSectionType;
  rows: TableCellRowData[];
};

export type TableData = TableSectionData[];

export type ModalFunction = (modalData: ModalData) => void;
