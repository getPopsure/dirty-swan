import { ErrorCode } from 'react-dropzone';
import { 
  formatAcceptFileList,
  getErrorMessage,
  getFormattedAcceptObject, 
  getUploadStatus 
} from '.';

const documentsAccept = {
  'application/msword': ['.doc'],
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

const imagesAccept = {
  'image/heic': [".heic"],
  'image/bmp': [".bmp"],
  'image/jpeg': [".jpeg"],
  'image/jpg': [".jpg"],
  'image/png': [".png"],
  'image/svg+xml': [".svg"],
  'image/tiff': [".tiff"],
  'image/webp': [".webp"]
};

describe('getUploadStatus', () => {
  it('Should return error status if error is passed', () => {
    expect(getUploadStatus(0, "Error message")).toEqual("ERROR");
  });

  it("Should return uploading status if progress hasn't finished", () => {
    expect(getUploadStatus(50)).toEqual("UPLOADING");
  });

  it("Should return complete status if progress has finished", () => {
    expect(getUploadStatus(100)).toEqual("COMPLETE");
  });
});

describe('getFormattedAcceptObject', () => {
  it('Should return image accept object if is of type image', () => {
    expect(getFormattedAcceptObject("image")).toEqual(imagesAccept);
  });

  it('Should return documents accept object if is of type document', () => {
    expect(getFormattedAcceptObject("document")).toEqual(documentsAccept);
  });

  it('Should return accept object if it is manually defined', () => {
    const accept = { "application/pdf": [".pdf"] };

    expect(getFormattedAcceptObject(accept)).toEqual(accept);
  });
});

describe('formatAcceptFileList', () => {
  it('Should return empty object if accept is empty', () => {
    expect(formatAcceptFileList({})).toEqual("");
  });

  it('Should return documents list if documents accept is passed', () => {
    expect(formatAcceptFileList(documentsAccept)).toEqual("DOC, PDF, DOCX");
  });

  it('Should return images list if images accept is passed', () => {
    expect(formatAcceptFileList(imagesAccept)).toEqual("HEIC, BMP, JPEG, JPG, PNG, SVG, TIFF, WEBP"); 
  });

  it('Should return extension based on accept passed', () => {
    const accept = { 
      "application/pdf": [".pdf"],
      "image/jpg": [".jpg"]
    };

    expect(formatAcceptFileList(accept)).toEqual("PDF, JPG");
  });
});

describe('getErrorMessage', () => {
  it('Should return default error message', () => {
    const defaultMessage = "Default Error Message.";

    expect(
      getErrorMessage({
        code: "UNKNOWN",
        message: defaultMessage
      }, { 
        fileList: "" 
      })
    ).toEqual(defaultMessage);
  });

  it('Should return default FileInvalidType default message', () => {
    const fileList = "JPG, PDF";

    expect(
      getErrorMessage({
        code: ErrorCode.FileInvalidType,
        message: ""
      }, { fileList })
    ).toEqual(`File type must be ${fileList}`);
  });

  it('Should return FileInvalidType with textOverride message', () => {
    const fileTypeError = "File Invalid Error";
    const fileList = "JPG, PDF";
    
    expect(
      getErrorMessage({
        code: ErrorCode.FileInvalidType,
        message: ""
      }, { fileList }, { fileTypeError })
    ).toEqual(`${fileTypeError} ${fileList}`);
  });
});
