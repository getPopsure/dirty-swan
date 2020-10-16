import React from "react";

import styles from "./style.module.scss";

export default (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { hasError?: boolean }
) => (
  <div className={`${styles.container} ${props.className ?? ""}`}>
    <input
      type="text"
      {...props}
      className={`${props.hasError ? "p-input--error" : "p-input"} ${
        props.placeholder && props.placeholder?.length > 0
          ? styles.input
          : styles["input--no-placeholder"]
      }`}
      placeholder=" "
    />
    <span className={styles.placeholder}>{props.placeholder}</span>
  </div>
);
