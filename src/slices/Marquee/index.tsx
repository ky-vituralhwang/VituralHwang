import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MarqueeModule from "@/modules/Global/Marquee";

/**
 * Props for `Marquee`.
 */
export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>;

/**
 * Component for "Marquee" Slices.
 */
const Marquee: FC<MarqueeProps> = ({ slice }) => {
  return <MarqueeModule slice={slice} />;
};

export default Marquee;
