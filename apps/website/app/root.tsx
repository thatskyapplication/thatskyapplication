import { Tooltip } from "@base-ui/react/tooltip";
import "./tailwind.css";
import { Locale } from "@discordjs/core/http-only";
import { captureException } from "@sentry/react-router";
import type { i18n as I18n, Resource, ResourceKey, ResourceLanguage } from "i18next";
import type React from "react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	type ShouldRevalidateFunctionArgs,
	useRouteLoaderData,
} from "react-router";
import { CDN, WEBSITE_URL } from "@thatskyapplication/utility";
import ConditionalLayout from "~/components/ConditionalLayout";
import { CDN_URL } from "~/config.server";
import database from "~/database.server";
import { getLocale, i18nextMiddleware } from "~/middleware/i18next";
import { getRequestSession, sessionMiddleware } from "~/middleware/session";
import { cdnAssetURL } from "~/utility/cdn";
import {
	APPLICATION_DESCRIPTION,
	APPLICATION_NAME,
	EXCLUDE_TOP_BAR_AND_FOOTER,
	LOCALE_RESOURCES_ELEMENT_ID,
} from "~/utility/constants";
import { cookieStoreSet } from "~/utility/cookie-store.client";
import {
	getBrowserTimeZone,
	TIME_ZONE_COOKIE_MAX_AGE,
	TIME_ZONE_COOKIE_NAME,
} from "~/utility/time-zone";
import type { Route } from "./+types/root.js";

export const middleware = [sessionMiddleware, i18nextMiddleware];

const cdn = new CDN(CDN_URL);

function localeResourceBundle(i18n: I18n, locale: string): ResourceLanguage {
	return {
		general: i18n.getResourceBundle(locale, "general") as ResourceKey,
		features: i18n.getResourceBundle(locale, "features") as ResourceKey,
	};
}

async function persistBrowserTimeZone(browserTimeZone: string) {
	try {
		await cookieStoreSet({
			name: TIME_ZONE_COOKIE_NAME,
			value: browserTimeZone,
			maxAge: TIME_ZONE_COOKIE_MAX_AGE,
		});
	} catch (error) {
		captureException(error);
	}
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
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
	{
		property: "og:image",
		content: loaderData?.cdnURL
			? cdnAssetURL(loaderData.cdnURL, "avatar_icons/caelus.webp")
			: undefined,
	},
	{ property: "og:url", content: WEBSITE_URL },
	{ name: "twitter:card", content: "summary" },
	{ name: "twitter:title", content: APPLICATION_NAME },
	{ name: "twitter:description", content: APPLICATION_DESCRIPTION },
	{ rel: "canonical", href: WEBSITE_URL },
];

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let status: number | undefined;

	if (isRouteErrorResponse(error)) {
		({ status } = error);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<header className="mb-4 text-center">
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
				className="rounded-md bg-discord-button px-6 py-3 font-medium text-white shadow-md transition duration-200 hover:bg-blue-700"
				to="/"
			>
				Return
			</Link>
		</div>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { i18n } = useTranslation();
	const data = useRouteLoaderData<typeof loader>("root");
	const locale = data?.locale ?? Locale.EnglishGB;

	// oxlint-disable-next-line react/preserve-manual-memoization -- Reading resource bundles off the i18next instance is opaque to the compiler, so it skips this component.
	const localeResources = useMemo(() => {
		const resources: Resource = { [locale]: localeResourceBundle(i18n, locale) };

		if (locale !== Locale.EnglishGB) {
			resources[Locale.EnglishGB] = localeResourceBundle(i18n, Locale.EnglishGB);
		}

		return JSON.stringify(resources).replaceAll("<", String.raw`\u003c`);
	}, [i18n, locale]);

	return (
		<html data-locale={i18n.language} dir={i18n.dir(i18n.language)} lang={i18n.language}>
			<head>
				<Meta />
				{data?.cdnURL && <link href={data.cdnURL} rel="preconnect" />}
				<link href="https://cdn.discordapp.com" rel="preconnect" />
				<Links />
				{data?.bareLayout && <style>{"html,body{background-color:#04060f}"}</style>}
			</head>
			<body>
				{children}
				<script
					dangerouslySetInnerHTML={{ __html: localeResources }}
					id={LOCALE_RESOURCES_ELEMENT_ID}
					suppressHydrationWarning
					type="application/json"
				/>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function shouldRevalidate({
	currentUrl,
	defaultShouldRevalidate,
	formMethod,
	nextUrl,
}: ShouldRevalidateFunctionArgs) {
	return formMethod !== undefined || currentUrl.pathname !== nextUrl.pathname
		? defaultShouldRevalidate
		: false;
}

export async function loader({ context, url }: Route.LoaderArgs) {
	const locale = getLocale(context);
	const { pathname } = url;
	const bareLayout = EXCLUDE_TOP_BAR_AND_FOOTER.includes(
		pathname as (typeof EXCLUDE_TOP_BAR_AND_FOOTER)[number],
	);
	const session = getRequestSession(context);
	const user = session.get("discord_user") ?? null;
	const skyProfile = user
		? await database
				.selectFrom("sky_profiles")
				.select(["name", "icon"])
				.where("user_id", "=", user.id)
				.executeTakeFirst()
		: null;
	const skyProfileName = skyProfile?.name;
	const userDisplayName = user ? (skyProfileName ?? user.username) : null;
	const userIconURL =
		user && skyProfile?.icon ? cdn.skyProfileIconURL(user.id, skyProfile.icon) : null;

	return { bareLayout, cdnURL: CDN_URL, locale, user, userDisplayName, userIconURL };
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { locale, user, userDisplayName, userIconURL } = loaderData;
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language !== locale) {
			void i18n.changeLanguage(locale);
		}
	}, [locale, i18n]);

	useEffect(() => {
		const browserTimeZone = getBrowserTimeZone();

		if (!browserTimeZone) {
			return;
		}

		void persistBrowserTimeZone(browserTimeZone);
	}, []);

	return (
		<Tooltip.Provider>
			<ConditionalLayout user={user} userDisplayName={userDisplayName} userIconURL={userIconURL}>
				<Outlet />
			</ConditionalLayout>
		</Tooltip.Provider>
	);
}
