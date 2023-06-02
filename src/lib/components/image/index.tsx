import { ImageKey, sources } from "./images";

export type ImageProps = {
  src: ImageKey;
  className?: string;
} & JSX.IntrinsicElements['img'];

const Image = ({
  alt,
  src,
  className,
  ...rest
}: ImageProps) => (
  <img
    alt={alt}
    className={className}
    src={sources?.[src]}
    {...rest}
  />
);

export { Image };