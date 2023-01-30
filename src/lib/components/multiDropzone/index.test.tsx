import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import MultiDropzone, { MultiDropzoneProps } from '.';

const mockOnFileSelect = jest.fn();
const mockOnRemoveFile = jest.fn();
const file = new File(['DummyFile'], 'dummy.png', { type: 'image/png' });

const inputTestId = "ds-drop-input";
const spinnerTestId = "ds-filecell-spinner";
const progressbarTestId = "ds-filecell-progressbar";
const uploadedFilesMock = {
   id: "123",
   name: "File name",
   progress: 100,
   type: "jpg",
};

const setup = ({
 uploadedFiles = [],
 uploading = false,
 ...rest
}: Partial<MultiDropzoneProps>) => {
  return render(
    <MultiDropzone
      {...rest}
      uploadedFiles={uploadedFiles}
      uploading={uploading}
      onFileSelect={mockOnFileSelect}
      onRemoveFile={mockOnRemoveFile}
    />
  );
};

describe('MultiDropzone component', () => {
  it("should call onFileSelect on files change", async () => {
    const screen = setup({});
    const input = screen.getByTestId(inputTestId);
    const files = [file, file];

    await act(async () => {
      fireEvent.change(input, { target: { files } });
    });

    expect(mockOnFileSelect).toHaveBeenCalledWith(files);
  });

  describe('Error states', () => {
    it("should show max files error message", () => {
      const screen = setup({
        maxFiles: 1,
        uploadedFiles: [uploadedFilesMock, {
          ...uploadedFilesMock,
          id: "222"
        }],
      });
  
      expect(screen.getByText("Too many files.")).toBeVisible();
    });

    it("should show max file size error message", async () => {
      const screen = setup({maxSize: 10 });
      const input = screen.getByTestId(inputTestId);
      const bigFile = file;
      Object.defineProperty(bigFile, 'size', { value: 1024 });

      await act(async () => {
        fireEvent.change(input, { target: { files: [bigFile] } });
      });

      expect(
        screen.getByText("File is too large. It must be less than 10 Bytes.")
      ).toBeInTheDocument();
    });

    it("should show wrong filetype error message", async () => {
      const screen = setup({ accept: "document" });
      const input = screen.getByTestId(inputTestId);
  
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
  
      expect(
        screen.getByText("File type must be one of DOC, DOCX, PDF")
      ).toBeInTheDocument();
    });

    it("should remove wrong filetype error message", async () => {
      const screen = setup({ accept: "document" });
      const input = screen.getByTestId(inputTestId);
  
      await act(async () => {
        fireEvent.change(input, { target: { files: [file] } });
      });
      
      screen.getByAltText("remove").click();

      expect(
        screen.queryByText("File type must be one of DOC, DOCX, PDF")
      ).not.toBeInTheDocument();
    });
  });

  describe('Copy text', () => {
    it("should show uploader text", () => {
      const screen = setup({});

      expect(screen.getByText("Choose file or drag & drop")).toBeInTheDocument();
    });

    it("should show uploader text translated", () => {
      const instructionsText = "Drag drop file";
      const screen = setup({
        textOverrides: { instructionsText }
      });

      expect(screen.getByText(instructionsText)).toBeInTheDocument();
    });

    it("should show image accept file type label", () => {
      const screen = setup({ accept: "image" });

      expect(
        screen.getByText("Supports HEIC, BMP, JPEG, JPG, PNG")
      ).toBeInTheDocument();
    });

    it("should show document accept file type label", () => {
      const screen = setup({ accept: "document" });

      expect(
        screen.getByText("Supports DOC, DOCX, PDF")
      ).toBeInTheDocument();
    });

    it("should custom document accept file type label", () => {
      const screen = setup({ accept: {
        "application/pdf": [".pdf"],
        "image/jpg": [".jpg"],
      } });

      expect(
        screen.getByText("Supports PDF, JPG")
      ).toBeInTheDocument();
    });

    it("should show disabled text if is uploading", () => {
      const screen = setup({ uploading: true });

      expect(
        screen.getByText("Please wait while uploading file...")
      ).toBeInTheDocument();
    });
  });

  describe('Uploaded files', () => {
    it("should show uploaded files", () => {
      const screen = setup({
        uploadedFiles: [uploadedFilesMock],
      });

      expect(
        screen.getByText(uploadedFilesMock.name)
      ).toBeInTheDocument();
    });

    it("should call onRemoveFile with uploaded file id", () => {
      const screen = setup({
        uploadedFiles: [uploadedFilesMock],
      });

      screen.getByAltText("remove").click();

      expect(mockOnRemoveFile).toBeCalledWith(uploadedFilesMock.id);
    });

    it("should show uploaded file with uploading label", () => {
      const screen = setup({
        uploadedFiles: [{ ...uploadedFilesMock, progress: 50 }],
      });

      expect(screen.getByText("Uploading...")).toBeInTheDocument();
    });

    it("should show uploaded file with progress bar", () => {
      const screen = setup({
        uploadedFiles: [{
          ...uploadedFilesMock,
          progress: 50,
        }],
      });

      expect(screen.getByTestId(progressbarTestId)).toBeInTheDocument();
    });

    it("should show uploaded file with no progress bar", () => {
      const screen = setup({
        uploadedFiles: [{
          ...uploadedFilesMock,
          progress: 50,
          showProgressBar: false
        }],
      });

      expect(screen.queryByTestId(progressbarTestId)).not.toBeInTheDocument();
    });

    it("should show uploaded file with loading spinner", () => {
      const screen = setup({
        uploadedFiles: [{
          ...uploadedFilesMock,
          progress: 50,
          showLoadingSpinner: true
        }],
      });

      expect(screen.getByTestId(spinnerTestId)).toBeInTheDocument();
    });

    it("should show uploaded file with no loading spinner", () => {
      const screen = setup({
        uploadedFiles: [{
          ...uploadedFilesMock,
          progress: 50,
          showLoadingSpinner: false
        }],
      });

      expect(screen.queryByTestId(spinnerTestId)).not.toBeInTheDocument();
    });
  });
});
