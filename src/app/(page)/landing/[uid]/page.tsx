import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import LandingHeroModule from "@/modules/Landing/Hero";
import { isFilled } from "@prismicio/client";

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

    const { background_color, text_color } = page.data;

    const isBackgroundColorFilled = isFilled.color(background_color)
    const isTextColorFilled = isFilled.color(text_color)

    const wrapperStyle = {
        ...(isBackgroundColorFilled && { backgroundColor: background_color }),
        ...(isTextColorFilled && { color: text_color }),
    } as React.CSSProperties

    return (
        <MainLayout
            isLandingPage
        >
            <div
                style={wrapperStyle}
            >
                <LandingHeroModule data={page.data}/>
                <SliceZone
                    slices={page.data.slices}
                    components={components}
                />
            </div>

        </MainLayout>
    )
}


export default LandingPage;