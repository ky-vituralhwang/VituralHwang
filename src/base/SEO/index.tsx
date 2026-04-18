import { asImageSrc, isFilled } from "@prismicio/client";
import { Metadata } from "next";

const generateSEO = (data: any) => {
    const { meta_title, meta_image, meta_description } = data?.data;

    const seoData: Metadata = {};

    if (isFilled.keyText(meta_title)) {
        seoData.title = meta_title;
    }

    if (isFilled.keyText(meta_description)) {
        seoData.description = meta_description;
    }

    if (isFilled.image(meta_image)) {
        seoData.openGraph = {
            images: [{ url: asImageSrc(meta_image) as string }],
        };
    }

    return seoData;
}

export default generateSEO;