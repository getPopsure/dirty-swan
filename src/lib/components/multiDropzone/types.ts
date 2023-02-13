import { Accept } from "react-dropzone";

export enum FileMimeTypes {
  bmp = "image/bmp",
  doc = "application/msword",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  heic = "image/heic",
  jpeg = "image/jpeg",
  jpg = "image/jpg",
  pdf = "application/pdf",
  png = "image/png",
  tif = "image/tiff",
  tiff = "image/tiff",
  webp = "image/webp",
}

export type FileType = keyof typeof FileMimeTypes;

export type UploadStatus = 'UPLOADING' | 'COMPLETE' | 'ERROR';

export const DOCUMENT_FILES: FileType[] = ['doc', 'docx', 'pdf'];
export const IMAGE_FILES: FileType[] = ['heic', 'bmp', 'jpeg', 'jpg', 'png'];

export interface UploadedFile {
  id: string;
  name: string;
  previewUrl?: string;
  progress: number;
  error?: string;
  showProgressBar?: boolean;
  showLoadingSpinner?: boolean;
}

export type AcceptType = "document" | "image" | Accept;

export interface TextOverrides {
  currentlyUploadingText?: string;
  fileTypeError?: string;
  fileTooLargeError?: string;
  instructionsText?: string;
  sizeUpToText?: string;
  supportsText?: string;
  supportsTextShort?: string;
  tooManyFilesError?: string;
}
export interface ErrorMessage {
  id: string;
  message: string;
}
