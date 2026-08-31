import { spirits, WEBSITE_URL } from "@thatskyapplication/utility";

const PUBLIC_PATHS = [
	"/",
	"/acknowledgements",
	"/caelus/terms-privacy",
	"/calendar",
	"/daily-guides",
	"/donate",
	"/schedule",
	"/shard-eruption",
	"/sky-elder/terms-privacy",
	"/sky-profiles",
	"/spirits",
	"/thatskylink",
] as const;

function sitemapEntry(path: string) {
	return `<url><loc>${new URL(path, WEBSITE_URL).href}</loc></url>`;
}

export function loader() {
	const paths = [...PUBLIC_PATHS, ...spirits().map((spirit) => `/spirits?spirit=${spirit.id}`)];
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(sitemapEntry).join("\n")}\n</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
