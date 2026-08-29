import { Tooltip } from "@base-ui/react/tooltip";
import { Locale } from "@discordjs/core/http-only";
import "./tailwind.css";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { captureException } from "@sentry/react-router";
import type { i18n as I18n, Resource, ResourceKey, ResourceLanguage } from "i18next";
import { House } from "lucide-react";
import type React from "react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	type ShouldRevalidateFunctionArgs,
	useRevalidator,
	useRouteLoaderData,
} from "react-router";
import { CDN, WEBSITE_URL } from "@thatskyapplication/utility";
import { ActionAnchor, ActionLink } from "~/components/ActionButton";
import ConditionalLayout from "~/components/ConditionalLayout";
import { CentredSitePage } from "~/components/PageLayout";
import { CDN_URL } from "~/config.server";
import database from "~/database.server";
import { getLocale, i18nextMiddleware } from "~/middleware/i18next";
import { getRequestSession, sessionMiddleware } from "~/middleware/session";
import {
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	EXCLUDE_TOP_BAR_AND_FOOTER,
	INVITE_SUPPORT_SERVER_URL,
	LOCALE_RESOURCES_ELEMENT_ID,
} from "~/utility/constants";
import { cookieStoreSet } from "~/utility/cookie-store.client";
import {
	getBrowserTimeZone,
	TIME_ZONE_COOKIE_MAX_AGE,
	TIME_ZONE_COOKIE_NAME,
} from "~/utility/time-zone";
import { resolvePreferredTimeZone } from "~/utility/time-zone.server";
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

export const meta: Route.MetaFunction = ({ location }) => [
	{ charSet: "utf-8" },
	{ name: "viewport", content: "width=device-width, initial-scale=1" },
	{ name: "robots", content: "index, follow" },
	{
		name: "keywords",
		content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application`,
	},
	{ title: APPLICATION_NAME },
	{ name: "description", content: APPLICATION_DESCRIPTION },
	{
		name: "theme-color",
		content: location.pathname.startsWith("/caelus") ? "#a5b5f1" : "#49add8",
	},
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const { t } = useTranslation();
	const status = isRouteErrorResponse(error) ? error.status : undefined;
	const title = t("pity-room", { ns: "general" });

	return (
		<CentredSitePage className="min-h-screen">
			<title>{title}</title>
			<div className="w-full max-w-2xl text-center">
				<div className="relative mx-auto w-full max-w-xl">
					<div className="pointer-events-none absolute inset-0 bg-radial from-sky-200/70 to-transparent to-65% dark:from-sky-400/10" />
					<div
						className="relative aspect-640/420 w-full bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: "url(/dark-crab-flipped.svg)" }}
					/>
				</div>
				<h1 className="mb-2 text-3xl text-balance sm:text-4xl lg:text-5xl">{title}</h1>
				{status !== undefined && (
					<div className="text-sm text-gray-500 dark:text-gray-400">{status}</div>
				)}
				<p className="text-lg text-pretty whitespace-pre-line text-gray-600 dark:text-gray-400">
					{t("error-description", { ns: "general" })}
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<ActionLink size="large" to="/" variant="primary">
						<House className="h-5 w-5" />
						{t("home", { ns: "general" })}
					</ActionLink>
					<ActionAnchor
						href={INVITE_SUPPORT_SERVER_URL}
						rel="noopener noreferrer"
						size="large"
						target="_blank"
						variant="neutral"
					>
						<SiDiscord className="h-5 w-5" />
						{t("support-server", { ns: "general" })}
					</ActionAnchor>
				</div>
			</div>
		</CentredSitePage>
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
				<link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
				<link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
				<link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml" />
				<link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
				<link color="#49add8" href="/safari-pinned-tab.svg" rel="mask-icon" />
				<link href="/site.webmanifest" rel="manifest" />
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

export async function loader({ context, request, url }: Route.LoaderArgs) {
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

	return {
		bareLayout,
		cdnURL: CDN_URL,
		locale,
		...resolvePreferredTimeZone(request),
		user,
		userDisplayName,
		userIconURL,
	};
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { locale, timeZone, timeZoneEstimated, user, userDisplayName, userIconURL } = loaderData;
	const { i18n } = useTranslation();
	const { revalidate } = useRevalidator();

	useEffect(() => {
		if (i18n.language !== locale) {
			void i18n.changeLanguage(locale);
		}
	}, [locale, i18n]);

	useEffect(() => {
		const browserTimeZone = getBrowserTimeZone();

		if (!browserTimeZone || (!timeZoneEstimated && browserTimeZone === timeZone)) {
			return;
		}

		void persistBrowserTimeZone(browserTimeZone).then(revalidate);
	}, [timeZone, timeZoneEstimated, revalidate]);

	return (
		<Tooltip.Provider>
			<ConditionalLayout user={user} userDisplayName={userDisplayName} userIconURL={userIconURL}>
				<Outlet />
			</ConditionalLayout>
		</Tooltip.Provider>
	);
}
