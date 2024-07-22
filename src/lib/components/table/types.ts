import { ReactNode } from 'react';
import { BaseCellProps } from './components/TableCell/BaseCell/BaseCell';
import { CTACellProps } from './components/TableCell/CTACell/CTACell';
import { ButtonCellProps } from './components/TableCell/ButtonCell/ButtonCell';

type BaseCellData = BaseCellProps & { type?: undefined };
type CTACellData = CTACellProps & { type: 'CTA' };
type ButtonCellData = ButtonCellProps & { type: 'BUTTON' };

export type TableCellData = BaseCellData | CTACellData | ButtonCellData;

export const isBaseCell = (
  tableCellData: TableCellData
): tableCellData is BaseCellData => {
  return !tableCellData.type;
};

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

export type CellReplacements = Record<string, Partial<TableCellData>>;
