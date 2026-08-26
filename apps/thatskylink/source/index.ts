import { httpServerIntegration, withSentry } from "@sentry/cloudflare";
import { resolveRedirect, THATSKYLINK_PAGE_URL } from "@thatskyapplication/sky-links";

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
			const redirect = resolveRedirect(url.pathname.toLowerCase().slice(1));

			return redirect
				? Response.redirect(redirect.url, redirect.status)
				: Response.redirect(THATSKYLINK_PAGE_URL, 302);
		},
	} satisfies ExportedHandler<Env>,
);
