import { Button } from '../button';
import { DownloadStatus } from '../../models/download';
import { CheckIcon, DownloadIcon } from '../icon/icons';
import styles from './style.module.scss';

export interface DownloadButtonProps {
  downloadStatus: DownloadStatus;
  onDownload: () => void;
  className?: string;
  customFail?: React.ReactNode;
}

const InitialButton = ({ onDownload }: { onDownload: () => void }) => (
  <Button
    className={`w100 ${styles.button}`}
    leftIcon={<DownloadIcon />}
    onClick={onDownload}
    data-cy="download-documents-button"
  >
    Download
  </Button>
);

// TODO: Allow setting loading to true to display text
const GeneratingButton = () => (
  <Button
    className={`w100 ${styles.button}`}
    loading={true}
  >
    Generating
  </Button>
);

const CompletedChip = () => (
  <div className={styles['chip-complete']}>
    <CheckIcon color={'grey-500'} size={16} />
    <div className="p-h4 tc-grey-500 ml8">Download complete</div>
  </div>
);

const DownloadButton = ({
  downloadStatus,
  onDownload,
  className = '',
  customFail,
}: DownloadButtonProps) => {
  const mapDownloadButton: { [K in DownloadStatus]: React.ReactNode } = {
    INITIAL: <InitialButton onDownload={onDownload} />,
    GENERATING: <GeneratingButton />,
    COMPLETED: <CompletedChip />,
    FAILED: <InitialButton onDownload={onDownload} />,
  };

  return (
    <div className={`d-flex fd-column ai-center ${className}`}>
      <div className="ws4">{mapDownloadButton[downloadStatus]}</div>
      {downloadStatus === 'FAILED' && (
        <div className="p-notice p-notice--danger p-p mt40 wmx5">
          {customFail ??
            'An error occured when generating documents. Please try again or contact us.'}
        </div>
      )}
    </div>
  );
};

export { DownloadButton };
