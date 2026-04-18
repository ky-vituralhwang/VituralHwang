import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://www.vituralhwang.com";

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/slice-simulator',
				],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
