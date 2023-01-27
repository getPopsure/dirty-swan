import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import classnames from 'classnames';
import AnimateHeight from 'react-animate-height';
import styles from './style.module.scss';
import icons from './icons/index'; // TODO: inline all of the svgs
import UploadFileCell from './UploadFileCell';
import { 
  formatAcceptFileList, 
  getErrorMessage, 
  getFormattedAcceptObject, 
  getUploadStatus 
} from './utils';
import { 
  AcceptType, 
  ErrorMessage, 
  FileType, 
  TextOverrides, 
  UploadedFile, 
  UploadStatus 
} from './types';

interface Props {
  accept?: AcceptType;
  onFileSelect: (files: File[]) => void;
  uploadedFiles: UploadedFile[];
  uploading: boolean;
  onRemoveFile: (id: string) => void;
  isCondensed?: boolean;
  maxFiles?: number;
  textOverrides?: TextOverrides;
}

const MultiDropZone = ({
  accept,
  uploadedFiles,
  onFileSelect,
  uploading,
  onRemoveFile,
  isCondensed = false,
  maxFiles = 0,
  textOverrides,
}: Props) => {
  const [error, setError] = useState<ErrorMessage | null>();
  const resetError = () => setError(null);
  const formattedAccept = getFormattedAcceptObject(accept);
  const fileList = formatAcceptFileList(formattedAccept);
  const placeholder = `${textOverrides?.supportsTextShort || "Supports"} ${fileList || "JPEG, PNG, PDF"}`;

  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      resetError();

      if (filesRejected.length > 0) {
        setError(getErrorMessage(
          filesRejected[0].errors[0],
          { fileList },
          textOverrides
        ));
        return;
      }

      onFileSelect(acceptedFiles);
    },
    [fileList, onFileSelect, textOverrides]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: formattedAccept,
    onDrop,
    maxFiles
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
        <input {...getInputProps()} />
        <img
          className={isCondensed ? styles.img : ''}
          src={isCondensed ? icons.uploadSmallIcon : icons.uploadIcon}
          alt="purple cloud with an arrow"
        />
        <div className={`p-h4 mt8 ${isCondensed ? styles.textInline : ''}`}>
          {uploading
            ? textOverrides?.currentlyUploadingText ||
              'Please wait while uploading file...'
            : textOverrides?.instructionsText || 'Choose file or drag & drop'}
        </div>
        <div className="p-p--small tc-grey-500">
          {textOverrides?.supportsText || placeholder}
        </div>
      </div>

      {error?.message && !error?.inlineError && (
        <UploadFileCell
          uploadStatus="ERROR"
          file={{
            error: error.message,
            id: "error",
            name: error.message,
            progress: 0,
            type: "",
          }}
          onRemoveFile={resetError}
          uploading={false}
        />
      )}

      <AnimateHeight duration={300} height={error?.message && error?.inlineError ? 'auto' : 0}>
        <p className="tc-red-500 p-p--small">{error?.message}</p>
      </AnimateHeight>

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
    </div>
  );
};

export type { FileType, UploadedFile, UploadStatus };
export default MultiDropZone;
