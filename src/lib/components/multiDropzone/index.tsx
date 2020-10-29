import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';

import styles from './style.module.scss';
import icons from './icons/index';
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
  onFileSelect: (file: File) => void;
  uploadedFiles: UploadedFile[];
  uploading: boolean;
  onRemoveFile: (id: string) => void;
}

export default ({
  uploadedFiles,
  onFileSelect,
  uploading,
  onRemoveFile,
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`w100 ${styles.container}`}>
      <div
        className={classnames(`w100 ta-center ${styles['upload-container']}`, {
          [styles['upload-container-disabled']]: uploading,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <img src={icons.uploadIcon} alt='' />
        <div className='p-h4 mt8'>
          {uploading
            ? 'Please wait while uploading file...'
            : 'Choose file or drag & drop'}
        </div>
        <div className='p-p--small tc-grey-500'>Supports JPEG, PNG, PDF</div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className={`w100 mt16`}>
          {uploadedFiles.map((file) => {
            const uploadStatus = getUploadStatus(file.progress, file.error);
            return (
              <UploadFileCell
                uploadStatus={uploadStatus}
                file={file}
                key={file.id}
                onRemoveFile={onRemoveFile}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
