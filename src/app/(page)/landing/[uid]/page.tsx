import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import LandingHeroModule from "@/modules/Landing/Hero";

export const generateMetadata = async ({ params }: { params: Promise<{ uid: any }> }) => {
    const { uid } = await params;

    const client = createClient();
    const page =  await client.getByUID('landing_page', uid).catch(() => notFound());

    return generateSEO(page);
}


const LandingPage = async ({ params }: { params: Promise<{ uid: any }> }) => {
    const { uid } = await params;

    const client = createClient();
    const page = await client.getByUID('landing_page', uid).catch(() => notFound());

    return (
        <MainLayout
            isLandingPage
        >
            <LandingHeroModule data={page.data}/>
            <SliceZone slices={page.data.slices} components={components} />
        </MainLayout>
    )
}


export default LandingPage;