import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import classnames from 'classnames';
import AnimateHeight from 'react-animate-height';
import styles from './style.module.scss';
import icons from './icons/index'; // TODO: inline all of the svgs
import UploadFileCell from './UploadFileCell';

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

const getUploadStatus = (progress: number, error?: string): UploadStatus => {
  if (error) {
    return 'ERROR';
  }

  if (progress < 100) {
    return 'UPLOADING';
  }

  return 'COMPLETE';
};

export interface UploadedFile {
  id: string;
  name: string;
  type: FileType | string;
  previewUrl?: string;
  progress: number;
  error?: string;
}

interface Props {
  onFileSelect: (files: File[]) => void;
  uploadedFiles: UploadedFile[];
  uploading: boolean;
  onRemoveFile: (id: string) => void;
  isCondensed?: boolean;
  maxFiles?: number;
}

export default ({
  uploadedFiles,
  onFileSelect,
  uploading,
  onRemoveFile,
  isCondensed = false,
  maxFiles = 0,
}: Props) => {
  const [error, setError] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      if (filesRejected.length === 0) {
        onFileSelect(acceptedFiles);
      }
      setError(filesRejected[0].errors[0].message);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles });

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
          src={icons.uploadIcon}
          alt="purple cloud with an arrow"
        />
        <div className={`p-h4 mt8 ${isCondensed ? styles.textInline : ''}`}>
          {uploading
            ? 'Please wait while uploading file...'
            : 'Choose file or drag & drop'}
        </div>
        <div className="p-p--small tc-grey-500">Supports JPEG, PNG, PDF</div>
      </div>
      <AnimateHeight duration={300} height={error ? 'auto' : 0}>
        <p className="tc-red-500 p-p--small">{error}</p>
      </AnimateHeight>
      {uploadedFiles.length > 0 && (
        <div className="w100 mt16">
          {uploadedFiles.map((file) => {
            const uploadStatus = getUploadStatus(file.progress, file.error);
            return (
              <UploadFileCell
                uploadStatus={uploadStatus}
                file={file}
                key={file.id}
                onRemoveFile={onRemoveFile}
                uploading={uploading}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
