import "./tailwind.css";
import { captureException } from "@sentry/react-router";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "react-router";
import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "react-router";
import ConditionalLayout from "~/components/ConditionalLayout";
import { getLocale, i18nextMiddleware } from "~/middleware/i18next";
import { getSession } from "~/session.server";
import {
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
} from "~/utility/constants";
import type { Route } from "./+types/root.js";
import { SENTRY_DATA_SOURCE_NAME } from "./config.server";

export const middleware = [i18nextMiddleware];

export const meta: MetaFunction = () => [
	{ charSet: "utf-8" },
	{ name: "viewport", content: "width=device-width, initial-scale=1" },
	{ name: "robots", content: "index, follow" },
	{
		name: "keywords",
		content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application`,
	},
	{ title: APPLICATION_NAME },
	{ name: "description", content: APPLICATION_DESCRIPTION },
	{ name: "theme-color", content: "#A5B5F1" },
	{ property: "og:title", content: APPLICATION_NAME },
	{ property: "og:description", content: APPLICATION_DESCRIPTION },
	{ property: "og:type", content: "website" },
	{ property: "og:site_name", content: "thatskyapplication" },
	{ property: "og:image", content: APPLICATION_ICON_URL },
	{ property: "og:url", content: WEBSITE_URL },
	{ name: "twitter:card", content: "summary" },
	{ name: "twitter:title", content: APPLICATION_NAME },
	{ name: "twitter:description", content: APPLICATION_DESCRIPTION },
	{ rel: "canonical", href: WEBSITE_URL },
];

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let status: number | undefined;

	if (isRouteErrorResponse(error)) {
		({ status } = error);
	} else if (error instanceof Error) {
		captureException(error);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<header className="text-center mb-4">
				{status === 404 ? (
					<>
						<h1>The Void</h1>
						<p className="text-xl text-gray-600 dark:text-gray-400">
							Well well well. What do we have here? It seems you're lost in the void. That's okay,
							the button below will take you to safety. Promise. 100%. Just don't ask the last guy.
						</p>
					</>
				) : (
					<>
						<h1>Error</h1>
						<p>Something bad happened. We're not sure what, but it's bad.</p>
					</>
				)}
			</header>
			<Link
				className="px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				to="/"
			>
				Return
			</Link>
		</div>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { ENV } = useLoaderData<typeof loader>();
	const { i18n } = useTranslation();

	return (
		<html dir={i18n.dir(i18n.language)} lang={i18n.language}>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: https://v2.remix.run/docs/guides/envvars
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(ENV)};`,
					}}
				/>
				<Scripts />
			</body>
		</html>
	);
}

export async function loader({ request, context }: LoaderFunctionArgs) {
	const locale = getLocale(context);
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("discord_user") ?? null;
	return { locale, user, ENV: { SENTRY_DATA_SOURCE_NAME } };
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { locale, user } = loaderData;
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale, i18n]);

	return (
		<ConditionalLayout locale={locale} user={user}>
			<Outlet />
		</ConditionalLayout>
	);
}
