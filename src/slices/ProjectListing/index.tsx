import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectListing`.
 */
export type ProjectListingProps =
  SliceComponentProps<Content.ProjectListingSlice>;

import ProjectListingModule from "@/modules/Home/ProjectListing";

/**
 * Component for "ProjectListing" Slices.
 */
const ProjectListing: FC<ProjectListingProps> = ({ slice }) => {
  const variation = slice.variation


  switch (variation) {
    case "default":
      return <ProjectListingModule slice={slice} />;
    default:
      return null;
  }
};

export default ProjectListing;
