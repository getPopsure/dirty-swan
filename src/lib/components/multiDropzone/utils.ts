import { Accept, ErrorCode, FileError } from "react-dropzone";
import { AcceptType, ErrorMessage, TextOverrides, UploadStatus } from "./types";

export const getUploadStatus = (progress: number, error?: string): UploadStatus => {
  if (error) {
    return 'ERROR';
  }

  if (progress < 100) {
    return 'UPLOADING';
  }

  return 'COMPLETE';
};
  
export const getFormattedAcceptObject = (accept: AcceptType = {}): Accept => {
  if (accept === "document") {
    return {
      'application/*': [ '.doc', '.docx', '.pdf' ]
    };
  };

  if (accept === "image") {
    return {
      'image/*': [ '.heic', '.bmp', '.jpeg', '.jpg', '.png' ]
    };
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
): ErrorMessage => {
  switch (code) {
    case ErrorCode.FileInvalidType:
      return {
        message: `${textOverrides?.fileTypeError || "File type must be one of"} ${fileList}`,
        inlineError: false
      };
    case ErrorCode.TooManyFiles:
      return {
        message: textOverrides?.tooManyFilesError || "Too many files.",
        inlineError: true
      };
    default:
      return {
        message,
        inlineError: true
      };
  }
}
