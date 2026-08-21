import { httpServerIntegration, withSentry } from "@sentry/cloudflare";
import { LATEST_PATCH_NOTE } from "@thatskyapplication/patch-notes";
import { REDIRECTS } from "./redirects.js";
import { THIS_MONTH_IN_SKY_MONTH_NAMES, THIS_MONTH_IN_SKY_REGEX } from "./utility/constants.js";

export default withSentry(
	(env: Env) => ({
		dataCollection: {},
		dsn: env.SENTRY_DATA_SOURCE_NAME,
		integrations: [httpServerIntegration({ maxRequestBodySize: "none" })],
	}),
	{
		fetch(request) {
			if (!(request.method === "GET" || request.method === "HEAD")) {
				return new Response(null, { headers: { Allow: "GET, HEAD" }, status: 405 });
			}

			const url = new URL(request.url);
			const pathname = url.pathname.toLowerCase().slice(1);

			if (pathname.startsWith("profiles/")) {
				const userId = pathname.slice(9);

				if (userId) {
					return Response.redirect(`https://thatskyapplication.com/sky-profiles/${userId}`, 301);
				}
			}

			const tmisMatch = THIS_MONTH_IN_SKY_REGEX.exec(pathname);

			if (tmisMatch) {
				const [, year, rawMonth] = tmisMatch;
				const month = Number(rawMonth);

				if (month >= 1 && month <= 12) {
					return Response.redirect(
						`https://www.thatskygame.com/news/this-month-in-sky-${THIS_MONTH_IN_SKY_MONTH_NAMES[month - 1]}-${year}-edition`,
						301,
					);
				}
			}

			if (pathname === "p") {
				return Response.redirect(LATEST_PATCH_NOTE.url, 302);
			}

			const redirect = REDIRECTS.get(pathname);

			if (redirect) {
				return Response.redirect(redirect, 301);
			}

			return Response.redirect(
				"https://github.com/thatskyapplication/thatskyapplication/tree/main/apps/thatskylink",
				302,
			);
		},
	} satisfies ExportedHandler<Env>,
);
