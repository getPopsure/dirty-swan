import { ReactNode } from 'react';

export type TableSectionType = {
  title?: string;
  icon?: ReactNode;
};

export type ModalData = {
  title?: ReactNode;
  body?: ReactNode;
};

export type ModalFunction = (modalData: ModalData) => void;
