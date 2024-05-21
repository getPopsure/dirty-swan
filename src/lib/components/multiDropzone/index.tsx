import { useCallback, useState } from 'react';
import classnames from 'classnames';
import { useDropzone, FileRejection } from 'react-dropzone';
import AnimateHeight from 'react-animate-height';
import generateId from '../../util/generateId';
import styles from './style.module.scss';
import { UploadCloudIcon } from '../icon/icons';
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

import { getPlaceholder } from './utils';

interface MultiDropzoneProps {
  uploadedFiles: UploadedFile[];
  uploading: boolean;
  onFileSelect: (files: File[]) => void;
  onRemoveFile?: (id: string) => void;
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
  const placeholder = getPlaceholder(textOverrides, accept, maxSize);
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
          {...getInputProps()}
        />
        <UploadCloudIcon
          className={isCondensed ? styles.img : ''}
          size={isCondensed ? 24 : 64}
          color={'purple-500'}
        />
        <div
          className={`p-h4 mt8 d-block c-pointer ${
            isCondensed ? styles.textInline : ''
          }`}
        >
          {uploading
            ? textOverrides?.currentlyUploadingText ||
              'Please wait while uploading file...'
            : textOverrides?.instructionsText || 'Choose file or drag & drop'}
        </div>
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
              {...(!onRemoveFile ? {} : { onRemoveFile })}
              uploading={uploading}
            />
          ))}
        </div>
      )}

      <AnimateHeight duration={300} height={isOverMaxFiles ? 'auto' : 0}>
        <p className="tc-red-500 mt16">
          {textOverrides?.tooManyFilesError || `You can upload maximum ${maxFiles} files.`}
        </p>
      </AnimateHeight>
    </div>
  );
};

export type { FileType, MultiDropzoneProps, UploadedFile, UploadStatus };
export { MultiDropzone };
