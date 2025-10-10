import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `VituralightRecognizedPotential`.
 */
export type VituralightRecognizedPotentialProps =
  SliceComponentProps<Content.VituralightRecognizedPotentialSlice>;


import VituralightRecognizedPotentialModule from "@modules/VituralLight/RecognizedPotential";

/**
 * Component for "VituralightRecognizedPotential" Slices.
 */
const VituralightRecognizedPotential: FC<
  VituralightRecognizedPotentialProps
> = ({ slice }) => {
  return <VituralightRecognizedPotentialModule slice={slice} />;
};

export default VituralightRecognizedPotential;
