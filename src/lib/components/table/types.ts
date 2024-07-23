import { ReactNode } from 'react';
import { BaseCellProps } from './components/TableCell/BaseCell/BaseCell';
import { CTACellProps } from './components/TableCell/CTACell/CTACell';
import { ButtonCellProps } from './components/TableCell/ButtonCell/ButtonCell';
import { CardCellProps } from './components/TableCell/CardCell/CardCell';

type DefaultCellProps = { colSpan?: number };

type BaseCellData = BaseCellProps & { type?: undefined } & DefaultCellProps;
type CTACellData = CTACellProps & { type: 'CTA' } & DefaultCellProps;
type ButtonCellData = ButtonCellProps & { type: 'BUTTON' } & DefaultCellProps;
type CardCellData = CardCellProps & { type: 'CARD' } & DefaultCellProps;

export type TableCellData = BaseCellData | CTACellData | ButtonCellData | CardCellData;

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
