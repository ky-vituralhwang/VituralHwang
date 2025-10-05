import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import VirtualLightCompModule from "@/modules/VituralLight/Comp/Default";
import VirtualLightGridLayoutModule from "@/modules/VituralLight/Comp/GridLayout";

/**
 * Props for `VirtualLightComp`.
 */
export type VirtualLightCompProps =
  SliceComponentProps<Content.VirtualLightCompSlice>;

/**
 * Component for "VirtualLightComp" Slices.
 */
const VirtualLightComp: FC<VirtualLightCompProps> = ({ slice }) => {
  const { variation } = slice || {};

  switch (variation) {
    case "default":
      return <VirtualLightCompModule data={slice} />;
    case "gridLayout":
      return <VirtualLightGridLayoutModule data={slice} />;
    default:
      return null;
  }
};

export default VirtualLightComp;
