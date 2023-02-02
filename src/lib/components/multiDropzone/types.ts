import { Accept } from "react-dropzone";
import { FileType } from "../../types/file-type";

export type UploadStatus = 'UPLOADING' | 'COMPLETE' | 'ERROR';

export const DOCUMENT_FILES: FileType[] = ['doc', 'docx', 'pdf'];
export const IMAGE_FILES: FileType[] = ['heic', 'bmp', 'jpeg', 'jpg', 'png'];

export const FILE_TYPES = [...DOCUMENT_FILES, ...IMAGE_FILES];

export interface UploadedFile {
  id: string;
  name: string;
  type: FileType | string;
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
