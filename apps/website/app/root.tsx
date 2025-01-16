import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import type React from "react";
import "./tailwind.css";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { LocaleProvider } from "~/contexts/LocaleContext";
import {
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
} from "~/utility/constants";
import { getLocaleFromRequest } from "~/utility/functions";

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

export function ErrorBoundary() {
	const { status } = useRouteError() as { status: number };

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
				to="/"
				className="px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
			>
				Return
			</Link>
		</div>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export const loader = ({ request }: LoaderFunctionArgs) => getLocaleFromRequest(request);

export default function App() {
	const locale = useLoaderData<typeof loader>();

	return (
		<LocaleProvider locale={locale}>
			<Outlet />
		</LocaleProvider>
	);
}
