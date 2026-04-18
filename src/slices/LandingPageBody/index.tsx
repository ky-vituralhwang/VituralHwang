import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import LandingBodyModule from "@/modules/Landing/Body";


/**
 * Props for `LandingPageBody`.
 */
export type LandingPageBodyProps =
  SliceComponentProps<Content.LandingPageBodySlice>;

/**
 * Component for "LandingPageBody" Slices.
 */
const LandingPageBody: FC<LandingPageBodyProps> = ({ slice }) => {
  return <LandingBodyModule slice={slice} />;
};

export default LandingPageBody;
