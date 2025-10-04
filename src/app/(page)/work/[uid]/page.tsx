
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import WorkdetailModule from "@/modules/WorkDetail";
import WorkdetailListingModule from "@/modules/WorkDetail/Listing";
import { createClient } from "@/prismicio";

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
            <WorkdetailModule data={page}>
                <WorkdetailListingModule data={page} /> 
            </WorkdetailModule>
        </MainLayout>
    )
}

export default WorkDetailPage