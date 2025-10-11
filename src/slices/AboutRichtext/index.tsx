import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import AboutRichtextModule from "@/modules/About/Richtext";

/**
 * Props for `AboutRichtext`.
 */
export type AboutRichtextProps =
  SliceComponentProps<Content.AboutRichtextSlice>;

/**
 * Component for "AboutRichtext" Slices.
 */
const AboutRichtext: FC<AboutRichtextProps> = ({ slice }) => {
  return <AboutRichtextModule slice={slice} />;
};

export default AboutRichtext;
