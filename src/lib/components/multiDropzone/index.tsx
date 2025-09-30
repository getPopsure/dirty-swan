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
  getStatusMessage,
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
import { useMediaQuery } from '../../hooks/useMediaQuery';
import classNames from 'classnames';

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
  const [statusMessage, setStatusMessage] = useState('');
  const formattedAccept = getFormattedAcceptObject(accept);
  const fileList = formatAcceptFileList(formattedAccept);
  const placeholder = getPlaceholder(textOverrides, accept, maxSize);
  const isOverMaxFiles = maxFiles > 0 && uploadedFiles.length > maxFiles;

  const removeError = (removeId: string) =>
    setErrors(errors.filter(({ id }) => id !== removeId));

  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      onFileSelect(acceptedFiles);

      const messageForScreenReader = getStatusMessage({
        acceptedFiles,
        filesRejected,
        fileList,
        maxSize,
        textOverrides,
      });
      setStatusMessage(messageForScreenReader);

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

  const isNonDesktopDevice = useMediaQuery('BELOW_TABLET');

  const instructionsTextDesktop =
    textOverrides?.instructionsText || 'Choose file or drag & drop';
  const instructionsTextMobile =
    textOverrides?.instructionsTextMobile || 'Tap to choose file';

  const instructionsText = isNonDesktopDevice
    ? instructionsTextMobile
    : instructionsTextDesktop;

  return (
    <div className={styles.container}>
      <div
        className={classnames(
          `w100 ta-center br8 c-pointer ${styles.dropzoneContainer}`,
          {
            [styles['dropzoneContainerDisabled']]: uploading,
            [styles['dropzoneContainerCondensed']]: isCondensed,
          }
        )}
        {...getRootProps()}
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {statusMessage}
        </div>
        <input data-testid="ds-drop-input" {...getInputProps()} />
        {!isCondensed && (
          <UploadCloudIcon size={56} color={'neutral-900'} />
        )}
        <div
          className={`p-h4 mt8 d-block c-pointer ${
            isCondensed ? styles.textInline : ''
          }`}
        >
          <div className='d-flex ai-center jc-center w100'>
            {isCondensed && (
              <UploadCloudIcon
                className={classNames('mr16', styles.img)}
                size={20}
                color={'neutral-900'}
              />
            )}
            {uploading
              ? textOverrides?.currentlyUploadingText ||
                'Please wait while uploading file...'
              : instructionsText}
            </div>
        </div>
        <div className="p-p--small tc-neutral-600">
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
          {textOverrides?.tooManyFilesError ||
            `You can upload maximum ${maxFiles} files.`}
        </p>
      </AnimateHeight>
    </div>
  );
};

export type { FileType, MultiDropzoneProps, UploadedFile, UploadStatus };
export { MultiDropzone };
