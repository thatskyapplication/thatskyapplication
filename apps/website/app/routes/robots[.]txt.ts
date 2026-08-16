import { WEBSITE_URL } from "@thatskyapplication/utility";

export function loader() {
	return new Response(`User-agent: *\nAllow: /\nSitemap: ${WEBSITE_URL}/sitemap.xml\n`, {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
