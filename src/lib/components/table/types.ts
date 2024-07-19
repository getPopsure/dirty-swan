import { ReactNode } from 'react';
import { BaseCellProps } from './components/TableCell/BaseCell/BaseCell';
import { CTACellProps } from './components/TableCell/CTACell/CTACell';
import { ButtonCellProps } from './components/TableCell/ButtonCell/ButtonCell';

export type TableCellData =
  | (BaseCellProps & { type?: undefined })
  | (CTACellProps & { type: 'CTA' })
  | (ButtonCellProps & { type: 'BUTTON' });

export type TableSectionType = {
  title?: string;
  icon?: ReactNode;
};

export type ModalData = {
  title?: ReactNode;
  body?: ReactNode;
};

export type TableCellRowData = TableCellData[];

export type TableSectionData = {
  section?: TableSectionType;
  rows: TableCellRowData[];
};

export type TableData = TableSectionData[];

export type ModalFunction = (modalData: ModalData) => void;
