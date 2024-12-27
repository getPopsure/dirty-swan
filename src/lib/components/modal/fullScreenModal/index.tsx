import { Props } from "..";
import styles from "./style.module.scss";
import classNames from "classnames";
import { GenericModal } from "../genericModal";

const FullScreenModal = ({ className, ...rest }: Props) => (
  <GenericModal
    titleSize="small"
    classNames={{
      wrapper: "w100",
      container: ({ isClosing }) => classNames(
        "bg-white d-flex fd-column w100",
        className,
        styles.container, {
          [styles.containerClose]: isClosing, 
        }
      ),
      body: styles.body,
    }}
    {...rest}
  />
);

export { FullScreenModal };