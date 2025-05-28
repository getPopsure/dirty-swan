import { ErrorCode } from 'react-dropzone';
import {
  formatAcceptFileList,
  getErrorMessage,
  getFormattedAcceptObject,
  getStatusMessage,
  getUploadStatus,
} from '.';

const documentsAccept = {
  'application/msword': ['.doc'],
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
};

const imagesAccept = {
  'image/heic': ['.heic'],
  'image/bmp': ['.bmp'],
  'image/jpeg': ['.jpeg'],
  'image/jpg': ['.jpg'],
  'image/png': ['.png'],
  'image/svg+xml': ['.svg'],
  'image/tiff': ['.tiff'],
  'image/webp': ['.webp'],
};

describe('getUploadStatus', () => {
  it('Should return error status if error is passed', () => {
    expect(getUploadStatus(0, 'Error message')).toEqual('ERROR');
  });

  it("Should return uploading status if progress hasn't finished", () => {
    expect(getUploadStatus(50)).toEqual('UPLOADING');
  });

  it('Should return complete status if progress has finished', () => {
    expect(getUploadStatus(100)).toEqual('COMPLETE');
  });
});

describe('getFormattedAcceptObject', () => {
  it('Should return image accept object if is of type image', () => {
    expect(getFormattedAcceptObject('image')).toEqual(imagesAccept);
  });

  it('Should return documents accept object if is of type document', () => {
    expect(getFormattedAcceptObject('document')).toEqual(documentsAccept);
  });

  it('Should return accept object if it is manually defined', () => {
    const accept = { 'application/pdf': ['.pdf'] };

    expect(getFormattedAcceptObject(accept)).toEqual(accept);
  });
});

describe('formatAcceptFileList', () => {
  it('Should return empty object if accept is empty', () => {
    expect(formatAcceptFileList({})).toEqual('');
  });

  it('Should return documents list if documents accept is passed', () => {
    expect(formatAcceptFileList(documentsAccept)).toEqual('DOC, PDF, DOCX');
  });

  it('Should return images list if images accept is passed', () => {
    expect(formatAcceptFileList(imagesAccept)).toEqual(
      'HEIC, BMP, JPEG, JPG, PNG, SVG, TIFF, WEBP'
    );
  });

  it('Should return extension based on accept passed', () => {
    const accept = {
      'application/pdf': ['.pdf'],
      'image/jpg': ['.jpg'],
    };

    expect(formatAcceptFileList(accept)).toEqual('PDF, JPG');
  });
});

describe('getErrorMessage', () => {
  it('Should return default error message', () => {
    const defaultMessage = 'Default Error Message.';

    expect(
      getErrorMessage(
        {
          code: 'UNKNOWN',
          message: defaultMessage,
        },
        {
          fileList: '',
        }
      )
    ).toEqual(defaultMessage);
  });

  it('Should return default FileInvalidType default message', () => {
    const fileList = 'JPG, PDF';

    expect(
      getErrorMessage(
        {
          code: ErrorCode.FileInvalidType,
          message: '',
        },
        { fileList }
      )
    ).toEqual(`File type must be ${fileList}`);
  });

  it('Should return FileInvalidType with textOverride message', () => {
    const fileTypeError = 'File Invalid Error';
    const fileList = 'JPG, PDF';

    expect(
      getErrorMessage(
        {
          code: ErrorCode.FileInvalidType,
          message: '',
        },
        { fileList },
        { fileTypeError }
      )
    ).toEqual(`${fileTypeError} ${fileList}`);
  });
});

describe('getStatusMessage', () => {
  it('returns accepted file message for multiple files', () => {
    const acceptedFiles = [
      new File([''], 'photo.jpg'),
      new File([''], 'invoice.pdf'),
    ];

    const result = getStatusMessage({
      acceptedFiles,
      filesRejected: [],
      maxSize: 5000000,
    });

    expect(result).toBe('Files uploaded: photo.jpg, invoice.pdf.');
  });

  it('returns rejection message for invalid file type with default text', () => {
    const filesRejected = [
      {
        file: new File([''], 'script.exe'),
        errors: [
          { code: ErrorCode.FileInvalidType, message: 'Invalid file type' },
        ],
      },
    ];

    const result = getStatusMessage({
      acceptedFiles: [],
      filesRejected,
      maxSize: 5000000,
      fileList: 'PDF, JPG',
    });

    expect(result).toBe(
      'Could not upload script.exe: File type must be PDF, JPG.'
    );
  });

  it('returns rejection message for file too large with default text', () => {
    const filesRejected = [
      {
        file: new File([''], 'video.mov'),
        errors: [{ code: ErrorCode.FileTooLarge, message: 'Too big' }],
      },
    ];

    const result = getStatusMessage({
      acceptedFiles: [],
      filesRejected,
      maxSize: 1048576,
    });

    expect(result).toBe(
      'Could not upload video.mov: File is too large. It must be less than 1 MB.'
    );
  });

  it('returns fallback when no files are accepted or rejected', () => {
    const result = getStatusMessage({
      acceptedFiles: [],
      filesRejected: [],
      maxSize: 1000000,
    });

    expect(result).toBe('');
  });
});
