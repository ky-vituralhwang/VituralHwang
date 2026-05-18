
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import WorkdetailModule from "@/modules/WorkDetail";
import NextProjectModule from "@/modules/WorkDetail/NextProject";
import WorkDetailSliceWrapper from "@/modules/WorkDetail/SliceWrapper";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: Promise<{ uid: any }> }) => {
    const { uid } = await params;

    const client = createClient();
    const page =  await client.getByUID('project', uid).catch(() => notFound());

    return generateSEO(page);
}

const WorkDetailPage = async ({ params }: { params: Promise<{ uid: any }> }) => {
    const { uid } = await params;

    const client = createClient();
    const [ page, listOrder] = await Promise.all([
        client.getByUID('project', uid).catch(() => notFound()),
        client.getSingle('listing_order_project').catch(() => notFound()),
    ])

    const listProjects = listOrder.data.list_ortder_projects

    const currentIndex = listProjects.findIndex((item: any) => item.project.id === page.id)
    let nextIndex = 0

    if (currentIndex === -1) {
        nextIndex = 0
    } else {
        nextIndex = (currentIndex + 1) % listProjects.length
    }

    const nextProject = listProjects[nextIndex].project

    const { background_color, text_color, secondary_text_color } = page.data;

    const isBackgroundColorFilled = isFilled.color(background_color)
    const isTextColorFilled = isFilled.color(text_color)
    const isSecondaryTextColorFilled = isFilled.color(secondary_text_color)

    const wrapperStyle = {
        ...(isBackgroundColorFilled && { backgroundColor: background_color }),
        ...(isTextColorFilled && { color: text_color }),
        ...(isSecondaryTextColorFilled && { "--secondary-text-color": secondary_text_color }),
    } as React.CSSProperties;

    return (
        <MainLayout>
            <div
                style={wrapperStyle}
            >
                <WorkdetailModule data={page}/>
                <WorkDetailSliceWrapper>
                    <SliceZone slices={page.data.slices} components={components} />
                </WorkDetailSliceWrapper>
                <NextProjectModule data={nextProject}/>
            </div>
        </MainLayout>
    )
}

export default WorkDetailPage