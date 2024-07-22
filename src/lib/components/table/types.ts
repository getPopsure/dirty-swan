import { ReactNode } from 'react';
import { BaseCellProps } from './components/TableCell/BaseCell/BaseCell';
import { CTACellProps } from './components/TableCell/CTACell/CTACell';
import { ButtonCellProps } from './components/TableCell/ButtonCell/ButtonCell';

export type TableCellData =
  | (BaseCellProps & { type?: undefined; cellId?: string })
  | (CTACellProps & { type: 'CTA'; cellId?: string })
  | (ButtonCellProps & { type: 'BUTTON'; cellId?: string });

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
