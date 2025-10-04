
import MainLayout from "@/base/Layouts/Layout"
import generateSEO from "@/base/SEO";
import ArchiveModule from "@/modules/Archive";
import { createClient } from "@/prismicio";

import { notFound } from "next/navigation";

export const generateMetadata = async () => {
    const client = createClient();
    const page =  await client.getSingle('archive_page').catch(() => notFound());

    return generateSEO(page);
}

const ArchivePage = async () => {
    const client = createClient();
    const page = await client.getSingle('archive_page').catch(() => notFound());

    const { slices, columns_number, max_items } = page.data;


    if (!slices || slices.length === 0) notFound()

    const allMedia: any[] = slices
        .map((slice: any) => slice?.primary?.list_media)
        .flat();


    let loop = 1;

    let maxItems = max_items || 40;
    let cols = columns_number || 5;

    if (allMedia.length < maxItems) {
        loop = Math.ceil(maxItems / allMedia.length);
    }

    let loopedMedia = [];

    for (let i = 0; i < loop; i++) {
        loopedMedia.push(...allMedia);
    }

    const shuffledMedia = shuffleArray(loopedMedia);

    const chunkedMedia = chunkArray.byCols(shuffledMedia, Math.ceil(cols) + 1);

    return (
        <MainLayout>
            <ArchiveModule data={chunkedMedia} columns={cols} />
        </MainLayout>
    )
}


const chunkArray =  {
    byRows: (array: any[] = [], minSize = 5) => {
        if (array.length === 0) return [];
        
        const totalItems = array.length;
        const numChunks = Math.ceil(totalItems / minSize);
        const chunkSize = Math.ceil(totalItems / numChunks);
        
        const result: any[][] = [];
        
        for (let i = 0; i < totalItems; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        
        return result;
    },
    byCols: (array: any[] = [], minSize = 5) => {
        if (array.length === 0) return Array.from({ length: minSize }, () => []);

        const result: any[][] = Array.from({ length: minSize }, () => []);
        const totalItems = array.length;
        
        for (let i = 0; i < totalItems; i++) {
            const colIndex = i % minSize;
            result[colIndex].push(array[i]);
        }
        
        return result;
    }
}


const shuffleArray = (array: any[] = []) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default ArchivePage