import { useCallback, useState, useRef } from 'react';
import classnames from 'classnames';
import { useDropzone, FileRejection } from 'react-dropzone';
import AnimateHeight from 'react-animate-height';
import generateId from '../../util/generateId';
import styles from './style.module.scss';
import icons from './icons/index'; // TODO: inline all of the svgs
import UploadFileCell from './UploadFileCell';
import {
  formatAcceptFileList,
  getErrorMessage,
  getFormattedAcceptObject,
  getUploadStatus,
} from './utils';

import {
  AcceptType,
  ErrorMessage,
  FileType,
  TextOverrides,
  UploadedFile,
  UploadStatus,
} from './types';

import { formatBytes } from '../../util/formatBytes';

interface MultiDropzoneProps {
  uploadedFiles: UploadedFile[];
  uploading: boolean;
  onFileSelect: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  accept?: AcceptType;
  isCondensed?: boolean;
  maxFiles?: number;
  maxSize?: number;
  textOverrides?: TextOverrides;
}

const MultiDropzone = ({
  uploadedFiles,
  onFileSelect,
  onRemoveFile,
  uploading,
  isCondensed = false,
  accept,
  maxFiles = 0,
  maxSize,
  textOverrides,
}: MultiDropzoneProps) => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const formattedAccept = getFormattedAcceptObject(accept);
  const fileList = formatAcceptFileList(formattedAccept);
  const maxSizePlaceholder =
    maxSize && maxSize > 0
      ? `${textOverrides?.sizeUpToText || 'up to'} ${formatBytes(maxSize)}`
      : '';
  const placeholder = `${textOverrides?.supportsTextShort || 'Supports'} ${
    fileList || 'JPEG, PNG, PDF'
  } ${maxSizePlaceholder}`;
  const isOverMaxFiles = maxFiles > 0 && uploadedFiles.length > maxFiles;

  const removeError = (removeId: string) =>
    setErrors(errors.filter(({ id }) => id !== removeId));

  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      onFileSelect(acceptedFiles);

      setErrors((previousErrors) => [
        ...previousErrors,
        ...filesRejected.map(({ errors }) => ({
          id: generateId(),
          message: getErrorMessage(
            errors[0],
            { fileList, maxSize },
            textOverrides
          ),
        })),
      ]);
    },
    [fileList, maxSize, onFileSelect, textOverrides]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: formattedAccept,
    disabled: uploading,
    maxSize,
    onDrop,
  });

  const uniqueId = useRef(generateId());

  return (
    <div className={styles.container}>
      <div
        className={classnames(
          `w100 ta-center br8 c-pointer ${styles.dropzoneContainer}`,
          {
            [styles['dropzoneContainerDisabled']]: uploading,
          }
        )}
        {...getRootProps()}
      >
        <input
          data-testid="ds-drop-input"
          id={uniqueId.current}
          {...getInputProps()}
        />
        <img
          className={isCondensed ? styles.img : ''}
          src={isCondensed ? icons.uploadSmallIcon : icons.uploadIcon}
          alt="purple cloud with an arrow"
        />
        <label
          htmlFor={uniqueId.current}
          className={`p-h4 mt8 d-block ${isCondensed ? styles.textInline : ''}`}
        >
          {uploading
            ? textOverrides?.currentlyUploadingText ||
              'Please wait while uploading file...'
            : textOverrides?.instructionsText || 'Choose file or drag & drop'}
        </label>
        <div className="p-p--small tc-grey-500">
          {textOverrides?.supportsText || placeholder}
        </div>
      </div>

      {errors.map(
        ({ id, message }) =>
          message && (
            <UploadFileCell
              uploadStatus="ERROR"
              file={{
                error: message,
                id,
                name: message,
                progress: 0,
              }}
              key={id}
              onRemoveFile={() => removeError(id)}
              uploading={false}
            />
          )
      )}

      {uploadedFiles.length > 0 && (
        <div className="w100 mt16">
          {uploadedFiles.map((file) => (
            <UploadFileCell
              uploadStatus={getUploadStatus(file.progress, file.error)}
              file={file}
              key={file.id}
              onRemoveFile={onRemoveFile}
              uploading={uploading}
            />
          ))}
        </div>
      )}

      <AnimateHeight duration={300} height={isOverMaxFiles ? 'auto' : 0}>
        <p className="tc-red-500 p-p--small">
          {textOverrides?.tooManyFilesError || 'Too many files.'}
        </p>
      </AnimateHeight>
    </div>
  );
};

export type { FileType, MultiDropzoneProps, UploadedFile, UploadStatus };
export { MultiDropzone };
