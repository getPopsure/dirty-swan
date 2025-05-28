import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import { FileIcon, Trash2Icon, EyeVisionIcon } from '../../icon/icons';
import { Color } from '../../../models/styles';
import { UploadStatus, UploadedFile } from '../types';
import { Button } from '../../button';

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
        <FileIcon
          className={classnames(`${styles['main-icon']} ${styles.icon}`)}
          color={mapFileIconColor[uploadStatus]}
          size={24}
        />
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
              <Button
                as="a"
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                hideLabel
                variant="filledWhite"
                className={classnames('mr16', styles.button)}
                leftIcon={
                  <EyeVisionIcon noMargin color={'grey-500'} size={24} />
                }
              >
                Preview file
              </Button>
            )}

            {onRemoveFile && (
              <Button
                onClick={() => onRemoveFile(id)}
                disabled={uploading}
                data-testid="remove-button"
                className={styles.button}
                leftIcon={
                  <Trash2Icon
                    color={hasError ? 'red-500' : 'grey-500'}
                    size={24}
                    noMargin
                  />
                }
                hideLabel
                variant="filledWhite"
              >
                Delete file
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFileCell;
