import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./style.module.scss";

import ErrorImage from "./images/error";
import UploadImage from "./images/upload";
import FileImage from "./images/file";

export function truncateStringTail(aString: string, length: number) {
  if (aString.length > length) {
    const tail = "[...]";
    const truncatedString = aString.substring(
      aString.length - length + tail.length,
      aString.length
    );
    return `${tail}${truncatedString}`;
  }

  return aString;
}

export default ({
  className,
  uploading,
  progress,
  error,
  uploadedFileUrl,
  onSelectedFile,
}: {
  className?: string;
  uploading: boolean;
  progress?: number;
  error?: string;
  uploadedFileUrl?: string;
  onSelectedFile: (file: File) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onSelectedFile(acceptedFiles[0]);
    },
    [onSelectedFile]
  );

  const uploadedFileName =
    (uploadedFileUrl &&
      truncateStringTail(
        new URL(uploadedFileUrl).pathname.split("/").pop() || "",
        22
      )) ||
    "";

  type State = "idle" | "uploading" | "error" | "uploaded";

  function stateFromParameters({
    uploading,
    progress,
    error,
    uploadedFileUrl,
  }: {
    uploading: boolean;
    progress?: number;
    error?: string;
    uploadedFileUrl?: string;
  }): State {
    if (error) {
      return "error";
    }

    if (uploading && progress) {
      return "uploading";
    }

    if (uploadedFileUrl) {
      return "uploaded";
    }

    return "idle";
  }

  const state = stateFromParameters({
    uploading,
    progress,
    error,
    uploadedFileUrl,
  });

  const {
    action,
    Image,
    text,
    containerStyle,
    textColor,
  }: {
    action: string | undefined;
    Image: React.ComponentType<{}>;
    text: string;
    containerStyle: string | undefined;
    textColor: string;
  } = {
    idle: {
      action: undefined,
      Image: UploadImage,
      text: "Upload document",
      containerStyle: undefined,
      textColor: "tc-primary-500",
    },
    uploading: {
      action: undefined,
      Image: UploadImage,
      text: "Uploading document…",
      containerStyle: styles["container--uploading"],
      textColor: "tc-primary-500",
    },
    error: {
      action: "Tap to retry",
      Image: ErrorImage,
      text: "Error!",
      containerStyle: styles["container--error"],
      textColor: "tc-red-500",
    },
    uploaded: {
      action: "Tap to replace",
      Image: FileImage,
      text: uploadedFileName,
      containerStyle: styles["container--uploaded"],
      textColor: "tc-primary-500",
    },
  }[state];

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={`${styles.container} ${containerStyle} ${className}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Image />
      <div className="p-p mt16">{text}</div>
      {action && <div className={`p-p ${textColor}`}>{action}</div>}
      {state === "uploading" && (
        <div className={styles["progress-container"]}>
          <div
            className={styles["progress-bar"]}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
