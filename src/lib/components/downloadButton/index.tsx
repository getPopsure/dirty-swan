import Button from '../button';
import { DownloadStatus } from '../../models/download';

import checkIcon from './icons/check.svg';
import downloadIcon from './icons/download.svg';
import styles from './style.module.scss';

interface Props {
  downloadStatus: DownloadStatus;
  onDownload: () => void;
  className?: string;
  customFail?: React.ReactNode;
}

const InitialButton = ({ onDownload }: { onDownload: () => void }) => (
  <Button
    className={`w100 ${styles.button}`}
    buttonTitle="Download"
    leftIcon={{ src: downloadIcon, alt: 'download arrow icon' }}
    onClick={onDownload}
    data-cy="download-documents-button"
  />
);

// TODO: Allow setting loading to true to display text
const GeneratingButton = () => (
  <Button
    className={`w100 ${styles.button}`}
    buttonTitle="Generating"
    loading={true}
  />
);

const CompletedChip = () => (
  <div className={styles['chip-complete']}>
    <img src={checkIcon} alt="grey check" />
    <div className="p-h4 tc-grey-500 ml8">Download complete</div>
  </div>
);

const DownloadButton = ({
  downloadStatus,
  onDownload,
  className = '',
  customFail,
}: Props) => {
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

export default DownloadButton;
