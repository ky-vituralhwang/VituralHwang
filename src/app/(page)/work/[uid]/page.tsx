
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import WorkdetailModule from "@/modules/WorkDetail";
import WorkDetailSliceWrapper from "@/modules/WorkDetail/SliceWrapper";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
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
    const page =  await client.getByUID('project', uid).catch(() => notFound());

    return (
        <MainLayout>
            <WorkdetailModule data={page}/>

            <WorkDetailSliceWrapper>
                <SliceZone slices={page.data.slices} components={components} />
            </WorkDetailSliceWrapper>
        </MainLayout>
    )
}

export default WorkDetailPage