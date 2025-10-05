import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

import Summary from "@/modules/Global/TextBlock/Summary";
import Resume from "@/modules/Global/TextBlock/Resume";
import Richtext from "@/modules/Global/TextBlock/Richtext";

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  const variation = slice.variation;
  switch (variation) {
    case "default":
      return <Summary slice={slice} />;
    case "resume":
      return <Resume slice={slice} />;
    case "richtext":
      return <Richtext slice={slice} />;
    default:
      return null;
  }
};

export default TextBlock;
