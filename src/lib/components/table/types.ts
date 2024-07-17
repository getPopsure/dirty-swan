import { ReactNode } from 'react';
import { TableCellProps } from './components/TableCell/TableCell';

export type TableSectionType = {
  title?: string;
  icon?: ReactNode;
};

export type ModalData = {
  title?: ReactNode;
  body?: ReactNode;
};

export interface TableSectionData {
  section?: TableSectionType;
  items: TableCellProps[][];
}

export type ModalFunction = (modalData: ModalData) => void;
