
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import { createClient } from "@/prismicio";

import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


export const generateMetadata = async () => {
  const client = createClient();
  const page =  await client.getSingle('home_page').catch(() => notFound());

  return generateSEO(page);
}

const HomePage = async () => {
  const client = createClient();
  const page = await client.getSingle('home_page').catch(() => notFound());

  return (
    <MainLayout>
      <SliceZone slices={page.data.slices} components={components} />
    </MainLayout>
  )
}

export default HomePage