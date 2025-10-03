import { asImageSrc } from "@prismicio/client";

const generateSEO = (data: any) => {
    const { meta_title, meta_image, meta_description } = data?.data;

    const seoData: any = {};

    if (meta_title) {
        seoData.title = meta_title;
    }

    if (meta_description) {
        seoData.description = meta_description;
    }

    if (meta_image) {
        seoData.openGraph = {}
        seoData.openGraph.images = [{ url: asImageSrc(meta_image) }];
    }

    return seoData;
}

export default generateSEO;