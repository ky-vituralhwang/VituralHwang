import { MetadataRoute } from 'next';
import { createClient, routes as pageRoutes } from '@/prismicio';

export const revalidate = 1800; // 30 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const client = createClient();
	const baseUrl = "https://www.vituralhwang.com";

	// Generate static routes from pageRoutes (non-dynamic paths)
	const staticRoutes: MetadataRoute.Sitemap = pageRoutes
		.filter((route) => !route.path.includes(':uid'))
		.map((route) => {
			const isHome = route.path === '/';
			return {
				url: `${baseUrl}${route.path}`,
				lastModified: new Date(),
				changeFrequency: isHome ? 'weekly' : 'monthly',
				priority: isHome ? 1 : 0.8,
			} as MetadataRoute.Sitemap[number];
		});

	try {
		// Get dynamic routes from pageRoutes (exclude article because it opens in new tab)
		const dynamicRoutes = pageRoutes.filter(
			(route) => route.path.includes(':uid') && route.type !== 'article'
		);

		// Fetch and generate URLs for all dynamic content types
		const dynamicSitemapEntries = await Promise.all(
			dynamicRoutes.map(async (route) => {
				try {
					const documents = await client.getAllByType(route.type as any);
					return documents.map((doc) => ({
						url: `${baseUrl}${route.path.replace(':uid', doc.uid!)}`,
						lastModified: new Date(doc.last_publication_date),
						changeFrequency: 'monthly',
						priority: 0.6,
					} as MetadataRoute.Sitemap[number]));
				} catch (error) {
					console.error(`Error fetching ${route.type}:`, error);
					return [];
				}
			})
		);

		const allDynamicRoutes = dynamicSitemapEntries.flat();

		return [...staticRoutes, ...allDynamicRoutes];
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return staticRoutes;
	}
}
