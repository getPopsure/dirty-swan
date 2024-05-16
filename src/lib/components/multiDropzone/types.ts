import { Accept } from "react-dropzone";

export enum FileMimeTypes {
  avi = "video/x-msvideo",
  bmp = "image/bmp",
  doc = "application/msword",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  heic = "image/heic",
  jpeg = "image/jpeg",
  jpg = "image/jpg",
  mov = "video/quicktime",
  mp4 = "video/mp4",
  pdf = "application/pdf",
  png = "image/png",
  svg = "image/svg+xml",
  tif = "image/tiff",
  tiff = "image/tiff",
  webp = "image/webp",
}

// mp4, mov, avi

export type FileType = keyof typeof FileMimeTypes;

export type UploadStatus = 'UPLOADING' | 'COMPLETE' | 'ERROR';

export const DOCUMENT_FILES: FileType[] = ['doc', 'docx', 'pdf'];
export const VIDEO_FILES: FileType[] = ['avi', 'mov', 'mp4'];
export const IMAGE_FILES: FileType[] = [
  'heic',
  'bmp',
  'jpeg',
  'jpg',
  'png',
  'tiff',
  'webp',
  'svg'
];

export interface UploadedFile {
  id: string;
  name: string;
  previewUrl?: string;
  progress: number;
  error?: string;
  showProgressBar?: boolean;
  showLoadingSpinner?: boolean;
}

export type AcceptType = "document" | "image" | "video" | Accept;

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
