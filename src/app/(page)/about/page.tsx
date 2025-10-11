
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import { createClient } from "@/prismicio";

import { notFound } from "next/navigation";
import AboutModule from "@/modules/About";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


export const generateMetadata = async () => {
  const client = createClient();
  const page =  await client.getSingle('about_page').catch(() => notFound());

  return generateSEO(page);
}

const AboutPage = async () => {
  const client = createClient();
  const page = await client.getSingle('about_page').catch(() => notFound());

  return (
    <MainLayout>
      <AboutModule data={page}>
        <SliceZone slices={page.data.slices} components={components} />
      </AboutModule>
    </MainLayout>
  )
}

export default AboutPage