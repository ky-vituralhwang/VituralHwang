import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectImage`.
 */
export type ProjectImageProps = SliceComponentProps<Content.ProjectImageSlice>;

import WorkDetailSliceImageModule from "@/modules/WorkDetail/Image";

/**
 * Component for "ProjectImage" Slices.
 */
const ProjectImage: FC<ProjectImageProps> = ({ slice }) => {
  return <WorkDetailSliceImageModule slice={slice} />;
};

export default ProjectImage;
