import { useState } from 'react';
import { MultiDropzone, MultiDropzoneProps } from '.';
import { UploadedFile } from './types';

const story = {
  title: 'JSX/MultiDropzone',
  component: MultiDropzone,
  argTypes: {
    uploadedFiles: {
      defaultValue: [{
        id: '123456789',
        name: 'my-code-doesnt-work-i-have-no-idea-why-my-code-works.jpg'
      }],
      description: 'List of files to be displayed on the component.',
    },
    uploading: {
      defaultValue: false,
      description: 'Property that allows to display component in an uploading state',
    },
    isCondensed: {
      defaultValue: false,
      description: 'Property that allows to display component in a smaller layout',
    },
    maxFiles: {
      description: 'Property that allows to display the maximum number of files allowed',
      table: {
        category: 'File Validation',
      },
    },
    maxSize: {
      description: 'Property that allows to display the maximum size of files allowed',
      table: {
        category: 'File Validation',
      },
    },
    accept: {
      description: 'Property that allows to define which file types are accepted',
      table: {
        category: 'File Validation',
      },
    },
    onRemoveFile: {
      description: 'Called when a file remove button is clicked',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    onFileSelect: {
      description: 'Called when a file is uploaded',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    textOverrides: {
      description: 'Properties that allow to localise component',
    },
  },
  parameters: {
    componentSubtitle: 'MultiDropzone component allows upload of multiple documents / files.',
  },
};

export const MultiDropzoneStory = ({
  onFileSelect,
  onRemoveFile,
  uploading,
  uploadedFiles = [],
  isCondensed,
  maxFiles,
  maxSize,
  textOverrides,
}: MultiDropzoneProps) => {
  const [localFiles, setLocalFiles] = useState<UploadedFile[]>(uploadedFiles);

  const handleOnRemoveFile = (id: string) => {
    onRemoveFile?.(id);
    setLocalFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleOnFileSelect = (files: File[]) => {
    const newFiles = files.map((newFile) => ({
      id: String(new Date().getTime()),
      name: newFile.name,
      progress: 100,
    }));
    setLocalFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onFileSelect(files);
  };

  return (
    <MultiDropzone 
      onFileSelect={handleOnFileSelect} 
      onRemoveFile={handleOnRemoveFile} 
      uploadedFiles={localFiles} 
      uploading={uploading} 
      isCondensed={isCondensed}
      maxFiles={maxFiles}
      maxSize={maxSize}
      textOverrides={textOverrides}
    />
  );
};

MultiDropzoneStory.storyName = "MultiDropzone";

export const UploadingState = () => (
  <MultiDropzone
    uploadedFiles={[
      {
        id: '123',
        progress: 72,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
      },
      {
        id: '124',
        progress: 72,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
        showLoadingSpinner: true,
        showProgressBar: false,
      },
      {
        id: '125',
        progress: 72,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
        showLoadingSpinner: true,
      },
      {
        id: '456',
        progress: 100,
        name: 'test_file_name2.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name2.pdf',
      },
    ]}
    onFileSelect={() => {}}
    uploading={true}
    onRemoveFile={() => {}}
  />
);


export const CondensedView = () => (
  <MultiDropzone
    uploadedFiles={[
      {
        id: '123',
        progress: 100,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
      },
    ]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    isCondensed
  />
);

export const ErrorState = () => (
  <MultiDropzone
    uploadedFiles={[
      {
        id: '123',
        progress: 0,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
        error: 'File is too big!',
      },
    ]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
  />
);

export const TooManyFilesErrorState = () => (
  <MultiDropzone
    maxFiles={2}
    isCondensed
    uploadedFiles={[
      {
        id: '123',
        progress: 100,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
      },
      {
        id: '124',
        progress: 100,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
        showLoadingSpinner: true,
        showProgressBar: false,
      },
      {
        id: '125',
        progress: 100,
        name: 'test_file_name.pdf',
        previewUrl: 'http://getpopsure.com/test_file_name.pdf',
        showLoadingSpinner: true,
      },
    ]} uploading={false} onFileSelect={function (files: File[]): void {
      throw new Error('Function not implemented.');
    } }  />
);

export const AcceptingOnlyImages = () => (
  <MultiDropzone
    accept="image"
    isCondensed
    uploadedFiles={[]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    textOverrides={{ supportsText: 'Accepts images' }}
  />
);

export const AcceptingOnlyDocuments = () => (
  <MultiDropzone
    accept="document"
    isCondensed
    uploadedFiles={[]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    textOverrides={{ supportsText: 'Accepts documents' }}
  />
);

export const AcceptingOnlyVideos = () => (
  <MultiDropzone
    accept="video"
    isCondensed
    uploadedFiles={[]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    textOverrides={{ supportsText: 'Accepts videos' }}
  />
);

export const LimitingFileSizeTo2MB = () => (
  <MultiDropzone
    isCondensed
    uploadedFiles={[]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    maxSize={2096000}
  />
);

export const I18nSupport = () => (
  <MultiDropzone
    uploadedFiles={[]}
    onFileSelect={() => {}}
    uploading={false}
    onRemoveFile={() => {}}
    textOverrides={{
      instructionsText: 'Datei auswählen oder per Drag & Drop platzieren',
      supportsTextShort: 'Unterstützt werden',
      currentlyUploadingText:
        'Bitte warten während die Datei hochgeladen wird...'
    }}
  />
);

export default story;
