
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import { createClient } from "@/prismicio";

import { notFound } from "next/navigation";
import VituralLightModule from "@/modules/VituralLight";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


export const generateMetadata = async () => {
    const client = createClient();
    const page =  await client.getSingle('virtuallight_page').catch(() => notFound());

    return generateSEO(page);
}

const VituralLightPage = async () => {
    const client = createClient();
    const page = await client.getSingle('virtuallight_page').catch(() => notFound());

    return (
        <MainLayout>
            <VituralLightModule data={page.data} />
            <SliceZone slices={page.data.slices} components={components} />
        </MainLayout>
    )
}

export default VituralLightPage