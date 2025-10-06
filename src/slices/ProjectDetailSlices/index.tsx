import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectDetailSlices`.
 */
export type ProjectDetailSlicesProps =
  SliceComponentProps<Content.ProjectDetailSlicesSlice>;


import WorkDetailSliceDetailModule from "@/modules/WorkDetail/Slices";
/**
 * Component for "ProjectDetailSlices" Slices.
 */
const ProjectDetailSlices: FC<ProjectDetailSlicesProps> = ({ slice }) => {
  return <WorkDetailSliceDetailModule slice={slice} />;
};

export default ProjectDetailSlices;
