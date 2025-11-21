import { DownloadButton, DownloadButtonProps } from '.';

const story = {
  title: 'JSX/DownloadButton',
  component: DownloadButton,
  argTypes: {
    downloadStatus: {
      description: 'Status of the button',
    },
    customFail: {
      description:
        'Customised error message. Only visible when button is on `FAILED` state.',
      control: 'text',
    },
    onDownload: {
      description: 'Called when download button has been clicked.',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    className: {
      description:
        'This property allows to add custom styles to the component.',
    },
  },
  args: {
    downloadStatus: 'INITIAL',
  },
  parameters: {
    componentSubtitle:
      'DownloadButton component displays progress and status of downloading files.',
  },
};

export const DownloadButtonStory = {
  render: ({
    downloadStatus,
    onDownload,
    className,
    customFail,
  }: DownloadButtonProps) => (
    <DownloadButton
      className={className}
      customFail={customFail}
      downloadStatus={downloadStatus}
      onDownload={onDownload}
    />
  ),

  name: 'DownloadButton',
};

export const CustomErrorMessage = {
  render: ({ onDownload }: DownloadButtonProps) => (
    <DownloadButton
      customFail="Custom error message"
      downloadStatus="FAILED"
      onDownload={onDownload}
    />
  ),
};

export default story;
