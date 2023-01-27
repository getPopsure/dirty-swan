import { Accept } from "react-dropzone";

export type UploadStatus = 'UPLOADING' | 'COMPLETE' | 'ERROR';

export type FileType =
  | 'heic'
  | 'bmp'
  | 'jpeg'
  | 'jpg'
  | 'png'
  | 'doc'
  | 'docx'
  | 'pdf';

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
  instructionsText?: string;
  supportsText?: string;
  supportsTextShort?: string;
  tooManyFilesError?: string;
}
export interface ErrorMessage {
  inlineError: boolean;
  message: string;
}
