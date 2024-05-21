import { Accept, ErrorCode, FileError } from "react-dropzone";
import { formatBytes } from "../../../util/formatBytes";
import { 
  AcceptType, 
  DOCUMENT_FILES, 
  FileMimeTypes,
  FileType,
  IMAGE_FILES, 
  TextOverrides,
  UploadStatus,
  VIDEO_FILES
} from "../types";

export const getUploadStatus = (progress: number, error?: string): UploadStatus => {
  if (error) {
    return 'ERROR';
  }

  if (progress < 100) {
    return 'UPLOADING';
  }

  return 'COMPLETE';
};

const formatMimeType = (values: FileType[]): Accept  => {
  const formatedValues = {} as Accept;

  values.forEach((value) => {
    formatedValues[FileMimeTypes[value]] = [`.${value}`];
  });

  return formatedValues;
};

export const DOCUMENT_FILES_ACCEPT = formatMimeType(DOCUMENT_FILES);
export const IMAGE_FILES_ACCEPT = formatMimeType(IMAGE_FILES);
export const VIDEO_FILES_ACCEPT = formatMimeType(VIDEO_FILES);
  
export const getFormattedAcceptObject = (accept: AcceptType = {}): Accept => {
  if (accept === "document") {
    return DOCUMENT_FILES_ACCEPT;
  };

  if (accept === "image") {
    return IMAGE_FILES_ACCEPT;
  };

  if (accept === "video") {
    return VIDEO_FILES_ACCEPT;
  }

  if (accept) {
    return accept;
  }

  return {
    ...DOCUMENT_FILES_ACCEPT,
    ...IMAGE_FILES_ACCEPT,
    ...VIDEO_FILES_ACCEPT
  };
}
  
export const formatAcceptFileList = (accept: Accept): string => (
  Object.values(accept)
    .reduce((acc, value) => [...acc, ...value], [])
    .join(", ")
    .replace(/\./g, '')
    .toUpperCase()
);

export const getPlaceholder = (
  textOverrides?: TextOverrides,
  accept?: AcceptType,
  maxSize?: number
) => {
  const maxSizePlaceholder =
    maxSize && maxSize > 0
      ? `${textOverrides?.sizeUpToText || 'up to'} ${formatBytes(maxSize)}`
      : '';
  
      const isAcceptString = 
    typeof accept === 'string' && 
    ['video', 'image', 'document'].includes(accept)
  
  const defaultPlaceholder = `${textOverrides?.supportsTextShort || 'Supports images, videos and documents'} ${maxSizePlaceholder}`;
  const acceptPlaceholder = `${textOverrides?.supportsTextShort || `Supports ${accept}s ${maxSizePlaceholder}`}`;

  return isAcceptString ? acceptPlaceholder : defaultPlaceholder;
}

export const getErrorMessage = (
  { code, message }: FileError,
  { fileList = "", maxSize }: { fileList?: string, maxSize?: number },
  textOverrides?: TextOverrides,
): string => {
  switch (code) {
    case ErrorCode.FileInvalidType:
      return `${textOverrides?.fileTypeError || "File type must be"} ${fileList}`;
    case ErrorCode.FileTooLarge:
      return `${textOverrides?.fileTooLargeError || "File is too large. It must be less than"} ${formatBytes(maxSize || 0)}.`;
    default:
      return message;
  }
}
