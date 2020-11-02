import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import icons from '../icons/index';
import { UploadStatus, UploadedFile, FileType } from '..';

const getUploadingIcon = (type: FileType | string): string => {
  switch (type) {
    case 'heic':
      return icons.heicIcon;
    case 'bmp':
      return icons.bmpIcon;
    case 'doc':
      return icons.docIcon;
    case 'docx':
      return icons.docxIcon;
    case 'jpeg':
      return icons.jpegIcon;
    case 'jpg':
      return icons.jpgIcon;
    case 'pdf':
      return icons.pdfIcon;
    case 'png':
      return icons.pngIcon;
    default:
      return icons.genericIcon;
  }
};

const getCompleteIcon = (type: FileType | string): string => {
  switch (type) {
    case 'heic':
      return icons.heicCompleteIcon;
    case 'bmp':
      return icons.bmpCompleteIcon;
    case 'doc':
      return icons.docCompleteIcon;
    case 'docx':
      return icons.docxCompleteIcon;
    case 'jpeg':
      return icons.jpegCompleteIcon;
    case 'jpg':
      return icons.jpgCompleteIcon;
    case 'pdf':
      return icons.pdfCompleteIcon;
    case 'png':
      return icons.pngCompleteIcon;
    default:
      return icons.genericCompleteIcon;
  }
};

export default ({
  uploadStatus,
  file,
  onRemoveFile,
  uploading,
}: {
  uploadStatus: UploadStatus;
  file: UploadedFile;
  onRemoveFile: (id: string) => void;
  uploading: boolean;
}) => {
  const { id, error, type, name, progress, previewUrl } = file;

  const mapFileIcon: { [k in UploadStatus]: string } = {
    UPLOADING: getUploadingIcon(type),
    COMPLETE: getCompleteIcon(type),
    ERROR: icons.errorIcon,
  };

  const mapDisplayText: { [s in UploadStatus]: string } = {
    UPLOADING: 'Uploading...',
    COMPLETE: name,
    ERROR: error ?? 'Something went wrong. Try uploading again.',
  };

  return (
    <div
      className={classnames(`mt8 ${styles['upload-file-cell']}`, {
        [styles['upload-file-cell-error']]: uploadStatus === 'ERROR',
      })}
    >
      <div className={`w100 ${styles['cell-left-section']}`}>
        <img
          className={styles['main-icon']}
          src={mapFileIcon[uploadStatus]}
          alt=''
        />
        <div className='w100'>
          <div className={`p-p wmx5 ${styles['upload-display-text']}`}>
            {mapDisplayText[uploadStatus]}
          </div>
          {uploadStatus === 'UPLOADING' && (
            <div className={`mt8 w100 ${styles['progress-bar-container']}`}>
              <div className={`${styles['progress-bar']}`} />
              <div
                className={`${styles['progress-bar-filler']}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={classnames(styles['cell-right-section'], {
          [styles['cell-right-section-complete']]: uploadStatus === 'COMPLETE',
        })}
      >
        {uploadStatus === 'UPLOADING' ? (
          <div className={`p-spinner p-spinner__m ${styles.spinner}`} />
        ) : (
          <div>
            {uploadStatus === 'COMPLETE' && (
              <a
                className={styles['view-icon']}
                href={previewUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={icons.eyeIcon} alt='preview' />
              </a>
            )}
            <img
              className={classnames(styles['remove-icon'], {
                [styles.disabled]: uploading,
              })}
              src={icons.trashIcon}
              onClick={() => onRemoveFile(id)}
              alt='remove'
            />
          </div>
        )}
      </div>
    </div>
  );
};
