import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import icons from '../icons/index';
import { UploadStatus, UploadedFile } from '..';

interface Props {
  uploadStatus: UploadStatus;
  file: UploadedFile;
  onRemoveFile: (id: string) => void;
  uploading: boolean;
  showSpinnerLoader?: boolean;
  showProgressLoader?: boolean;
}

const UploadFileCell: React.FC<Props> = ({
  uploadStatus,
  file,
  onRemoveFile,
  uploading,
  showSpinnerLoader = false,
  showProgressLoader = true,
}) => {
  const { id, error, name, progress, previewUrl } = file;
  const isComplete = uploadStatus === 'COMPLETE';
  const isUploading = uploadStatus === 'UPLOADING';
  const hasError = uploadStatus === 'ERROR';

  const mapFileIcon: { [k in UploadStatus]: string } = {
    UPLOADING: icons.fileUploadIcon,
    COMPLETE: icons.fileIcon,
    ERROR: icons.fileErrorIcon,
  };

  const mapDisplayText: { [s in UploadStatus]: string } = {
    UPLOADING: 'Uploading...',
    COMPLETE: name,
    ERROR: error ?? 'Something went wrong. Try uploading again.',
  };

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
          <div className={`p-p wmx5 ${styles['upload-display-text']}`}>
            {mapDisplayText[uploadStatus]}
          </div>

          {isUploading && showProgressLoader && (
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
          [styles['cell-right-section-complete']]: isComplete,
        })}
      >
        {isUploading ? (
          <div className={styles.spinner}>
            {showSpinnerLoader && <div className='ds-spinner ds-spinner__m' />}
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

            <img
              className={classnames(styles['remove-icon'], {
                [styles.disabled]: uploading,
              })}
              src={hasError ? icons.trashErrorIcon : icons.trashIcon}
              onClick={() => onRemoveFile(id)}
              alt="remove"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFileCell;
