import { DownloadButton, DownloadButtonProps } from '.';

const story = {
  title: 'JSX/DownloadButton',
  component: DownloadButton,
  argTypes: {
    downloadStatus: {
      description: 'Status of the button',
      defaultValue: 'INITIAL',
    },
    customFail: {
      description: 'Customised error message. Only visible when button is on `FAILED` state.',
      control: { type: 'text' },
    },
    onDownload: {
      description: 'Called when download button has been clicked.',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    className: {
      description: 'This property allows to add custom styles to the component.',
    }
  },
  parameters: {
    componentSubtitle: 'DownloadButton component displays progress and status of downloading files.',
  },
};

export const DownloadButtonStory = ({
  downloadStatus,
  onDownload,
  className,
  customFail
}: DownloadButtonProps) => (
  <DownloadButton
    className={className}
    customFail={customFail}
    downloadStatus={downloadStatus}
    onDownload={onDownload}
  />
);

DownloadButtonStory.storyName = "DownloadButton";

export const CustomErrorMessage = ({
    onDownload,
}: DownloadButtonProps) => (
  <DownloadButton
    customFail="Custom error message"
    downloadStatus="FAILED"
    onDownload={onDownload}
  />
);


export default story;
