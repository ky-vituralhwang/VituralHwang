import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import VituralightRichtext from "@/modules/VituralLight/Slice/Richtext";
import VituralightEmbed from "@/modules/VituralLight/Slice/Embed";
import VituralightGridLayout from "@/modules/VituralLight/Slice/GridLayout";
import Vituralight2Cols from "@/modules/VituralLight/Slice/2Cols";

/**
 * Props for `VituralightSlice`.
 */
export type VituralightSliceProps =
  SliceComponentProps<Content.VituralightSliceSlice>;

/**
 * Component for "VituralightSlice" Slices.
 */
const VituralightSlice: FC<VituralightSliceProps> = ({ slice }) => {
  const { variation } = slice;

  switch (variation) {
    case "default":
      return <VituralightRichtext slice={slice} />;
    case "embed":
      return <VituralightEmbed slice={slice} />;
    case "gridLayout":
      return <VituralightGridLayout slice={slice} />;
    case "2Columns":
      return <Vituralight2Cols slice={slice} />;
    default:
      console.log(variation)
      return null;
  }
};

export default VituralightSlice;
