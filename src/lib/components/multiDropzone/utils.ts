import { Accept, ErrorCode, FileError } from "react-dropzone";
import { AcceptType, DOCUMENT_FILES, FileType, IMAGE_FILES, TextOverrides, UploadStatus } from "./types";

export const getUploadStatus = (progress: number, error?: string): UploadStatus => {
  if (error) {
    return 'ERROR';
  }

  if (progress < 100) {
    return 'UPLOADING';
  }

  return 'COMPLETE';
};

const formatMimeType = (type: string, values: FileType[]): Accept  => {
  const formatedValues = {} as Accept;

  values.forEach((value) => {
    formatedValues[`${type}/${value}`] = [`.${value}`];
  });

  return formatedValues;
};

export const DOCUMENT_FILES_ACCEPT = formatMimeType("application", DOCUMENT_FILES);
export const IMAGE_FILES_ACCEPT = formatMimeType("image", IMAGE_FILES);
  
export const getFormattedAcceptObject = (accept: AcceptType = {}): Accept => {
  if (accept === "document") {
    return DOCUMENT_FILES_ACCEPT;
  };

  if (accept === "image") {
    return IMAGE_FILES_ACCEPT;
  };

  return accept;
}
  
export const formatAcceptFileList = (accept: Accept): string => (
  Object.values(accept)
    .reduce((acc, value) => [...acc, ...value], [])
    .join(", ")
    .replace(/\./g, '')
    .toUpperCase()
);

export const getErrorMessage = (
  { code, message }: FileError,
  { fileList }: { fileList?: string },
  textOverrides?: TextOverrides,
): string => {
  switch (code) {
    case ErrorCode.FileInvalidType:
      return `${textOverrides?.fileTypeError || "File type must be one of"} ${fileList}`;
    default:
      return message;
  }
}
