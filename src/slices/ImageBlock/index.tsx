import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

import ImageFullViewport from "@/modules/Global/ImageBlock/ImageFullViewport";

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  const variation = slice.variation


  switch (variation) {
    case "default":
      return <ImageFullViewport slice={slice} />;
    default:
      return null;
  }
};

export default ImageBlock;
