import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import AboutSkillModule from "@/modules/About/Skills";

/**
 * Props for `AboutSkill`.
 */
export type AboutSkillProps = SliceComponentProps<Content.AboutSkillSlice>;

/**
 * Component for "AboutSkill" Slices.
 */
const AboutSkill: FC<AboutSkillProps> = ({ slice }) => {
  return <AboutSkillModule slice={slice} />;
};

export default AboutSkill;
