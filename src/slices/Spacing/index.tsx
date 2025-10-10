import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Spacing`.
 */
export type SpacingProps = SliceComponentProps<Content.SpacingSlice>;

/**
 * Component for "Spacing" Slices.
 */
const Spacing: FC<SpacingProps> = ({ slice }) => {
  const { spacing } = slice.primary || {};
  return <div style={{height: `${Number(spacing) / 10}rem`}}/>;
};

export default Spacing;
