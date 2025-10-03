import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

import Richtext from "@/modules/Global/TextBlock/Richtext";
import Resume from "@/modules/Global/TextBlock/Resume";

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  const variation = slice.variation

  switch (variation) {
    case "default":
      return <Richtext slice={slice} />;
    case "resume":
      return <Resume slice={slice} />;
    default:
      return null;
  }
};

export default TextBlock;
