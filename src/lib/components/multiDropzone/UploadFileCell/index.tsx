import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import icons from '../icons/index';
import { UploadStatus, UploadedFile } from '../types';

interface Props {
  uploadStatus: UploadStatus;
  file: UploadedFile;
  onRemoveFile?: (id: string) => void;
  uploading: boolean;
}

const UploadFileCell: React.FC<Props> = ({
  uploadStatus,
  file,
  onRemoveFile,
  uploading,
}) => {
  const {
    id,
    error,
    name,
    progress,
    previewUrl,
    showLoadingSpinner = false,
    showProgressBar = true
  } = file;

  const isComplete = uploadStatus === 'COMPLETE';
  const isUploading = uploadStatus === 'UPLOADING';
  const hasError = uploadStatus === 'ERROR';

  const mapFileIcon: { [k in UploadStatus]: string } = {
    UPLOADING: icons.fileUploadIcon,
    COMPLETE: icons.fileIcon,
    ERROR: icons.fileErrorIcon,
  };

  const displayText = {
    UPLOADING: 'Uploading...',
    COMPLETE: name,
    ERROR: error ?? 'Something went wrong. Try uploading again.',
  }[uploadStatus];

  return (
    <div
      className={classnames(`mt8 ${styles['upload-file-cell']}`, {
        [styles['upload-file-cell-error']]: hasError,
      })}
    >
      <div className={`w100 ${styles['cell-left-section']}`}>
        <img
          className={styles['main-icon']}
          src={mapFileIcon[uploadStatus]}
          alt=""
        />
        <div className="w100">
          <div className={`p-p ${styles['upload-display-text']}`} title={displayText}>
            {displayText}
          </div>

          {isUploading && showProgressBar && (
            <div className={`mt8 w100 ${styles['progress-bar-container']}`}>
              <div className={`${styles['progress-bar']}`} />
              <div
                data-testid="ds-filecell-progressbar"
                className={`${styles['progress-bar-filler']}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={classnames(styles['cell-right-section'], {
          [styles['cell-right-section-complete']]: isComplete,
        })}
      >
        {isUploading ? (
          <div className={styles.spinner}>
            {showLoadingSpinner && (
              <div
                className='ds-spinner ds-spinner__m'
                data-testid="ds-filecell-spinner"
              />
            )}
          </div>
        ) : (
          <div>
            {isComplete && (
              <a
                className={styles['view-icon']}
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.eyeIcon} alt="preview" />
              </a>
            )}

            {onRemoveFile && (
              <img
                className={classnames(styles['remove-icon'], {
                  [styles.disabled]: uploading,
                })}
                src={hasError ? icons.trashErrorIcon : icons.trashIcon}
                onClick={() => onRemoveFile(id)}
                alt="remove"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFileCell;
