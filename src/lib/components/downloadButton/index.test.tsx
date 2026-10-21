import { fireEvent, render, screen } from '../../util/testUtils';
import { DownloadButton } from '.';

describe('DownloadButton', () => {
  it.each(['INITIAL', 'FAILED'] as const)(
    'exposes the %s download button as download-documents-button',
    (downloadStatus) => {
      const onDownload = jest.fn();

      render(
        <DownloadButton
          downloadStatus={downloadStatus}
          onDownload={onDownload}
        />
      );

      fireEvent.click(screen.getByTestId('download-documents-button'));

      expect(onDownload).toHaveBeenCalledTimes(1);
    }
  );
});
