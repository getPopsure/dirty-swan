import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import { FileIcon, Trash2Icon, EyeVisionIcon } from '../../icon/icons';
import { Color } from '../../../models/styles';
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
    showProgressBar = true,
  } = file;

  const isComplete = uploadStatus === 'COMPLETE';
  const isUploading = uploadStatus === 'UPLOADING';
  const hasError = uploadStatus === 'ERROR';

  const mapFileIconColor: { [k in UploadStatus]: Color } = {
    UPLOADING: 'purple-500',
    COMPLETE: 'grey-500',
    ERROR: 'red-500',
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
        <div className={classnames(`${styles['main-icon']} ${styles.icon}`)}>
          <FileIcon
            color={mapFileIconColor[uploadStatus]}
            size={24}
          />
        </div>
        <div className="w100">
          <div
            className={`p-p ${styles['upload-display-text']}`}
            title={displayText}
          >
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
                className="ds-spinner ds-spinner__m"
                data-testid="ds-filecell-spinner"
              />
            )}
          </div>
        ) : (
          <>
            {isComplete && (
              <a
                className={styles['view-icon']}
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeVisionIcon
                  color={'grey-500'}
                  size={24}
                  className={styles.icon}
                />
              </a>
            )}

            {onRemoveFile && (
              <button
                type="button"
                onClick={() => onRemoveFile(id)}
                className={classnames(styles['remove-icon'], {
                  [styles.disabled]: uploading,
                })}
                data-testid="remove-button"
              >
                <Trash2Icon
                  color={hasError ? 'red-500' : 'grey-500'}
                  size={24}
                  className={styles.icon}
                />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFileCell;
