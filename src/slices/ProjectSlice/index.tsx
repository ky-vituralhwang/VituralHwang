import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import WorkDetailSliceImageModule from "@/modules/WorkDetail/Image";
import WorkDetailSliceVideoModule from "@/modules/WorkDetail/Video";
import WorkDetailSliceSlideModule from "@/modules/WorkDetail/Slide";
import WorkDetailSlideDetailModule from "@/modules/WorkDetail/Detail";
import WorkDetailSliceEmbedModule from "@/modules/WorkDetail/Embed";
import WorkDetailSliceGridModule from "@/modules/WorkDetail/GridLayout";

/**
 * Props for `ProjectSlice`.
 */
export type ProjectSliceProps = SliceComponentProps<Content.ProjectSliceSlice>;

/**
 * Component for "ProjectSlice" Slices.
 */
const ProjectSlice: FC<ProjectSliceProps> = ({ slice }) => {
  const { variation } = slice || {};

  switch (variation) {
    case "singleImage":
      return <WorkDetailSliceImageModule slice={slice} />;
    case "default":
      return <WorkDetailSliceVideoModule slice={slice} />;
    case "listImage":
      return <WorkDetailSliceSlideModule slice={slice} />;
    case "detail":
      return <WorkDetailSlideDetailModule slice={slice} />;
    case "embedVideo":
      return <WorkDetailSliceEmbedModule slice={slice} />;
    case "gridLayout":
      return <WorkDetailSliceGridModule slice={slice} />;
    default:
      console.log(variation)
  }
};

export default ProjectSlice;
