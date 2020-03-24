import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./style.module.scss";

import errorImage from "./img/error.svg";
import uploadImage from "./img/upload.svg";
import fileImage from "./img/file.svg";

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
  onSelectedFile
}: {
  className?: string;
  uploading: boolean;
  progress?: number;
  error?: string;
  uploadedFileUrl?: string;
  onSelectedFile: (file: File) => void;
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
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
    uploadedFileUrl
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
    uploadedFileUrl
  });

  const {
    action,
    image,
    text,
    containerStyle,
    actionStyle
  }: {
    action: string | undefined;
    image: string;
    text: string;
    containerStyle: string | undefined;
    actionStyle: string | undefined;
  } = {
    idle: {
      action: undefined,
      image: uploadImage,
      text: "Upload document",
      containerStyle: undefined,
      actionStyle: undefined
    },
    uploading: {
      action: undefined,
      image: uploadImage,
      text: "Uploading document…",
      containerStyle: styles["container--uploading"],
      actionStyle: undefined
    },
    error: {
      action: "Tap to retry",
      image: errorImage,
      text: "Error!",
      containerStyle: styles["container--error"],
      actionStyle: styles["action--error"]
    },
    uploaded: {
      action: "Tap to replace",
      image: fileImage,
      text: uploadedFileName,
      containerStyle: styles["container--uploaded"],
      actionStyle: styles["action--uploaded"]
    }
  }[state];

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={`${styles.container} ${containerStyle} ${className}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <img className={styles.image} src={image} alt="" />
      <div className={styles.text}>{text}</div>
      {action && (
        <div className={`${styles.action} ${actionStyle}`}>{action}</div>
      )}
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
