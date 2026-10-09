import { type APIContainerComponent, ButtonStyle, ComponentType } from "@discordjs/core/http-only";
import { useTranslation } from "react-i18next";
import { redirect, type ShouldRevalidateFunctionArgs, useSearchParams } from "react-router";
import {
	type Spirit,
	spiritContainer,
	spiritOriginTranslationKey,
	type SpiritIds,
	spirits,
	spiritsHistoryContainer,
	TRAVELLING_DATES,
	visitsForSpirit,
	VISITS_ABSENT,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { SitePage } from "~/components/PageLayout";
import { SpiritHistory } from "~/components/spirits/SpiritHistory.js";
import { SpiritSearch } from "~/components/spirits/SpiritSearch.js";
import { SpiritView } from "~/components/spirits/SpiritView.js";
import { useCurrentTimestamp } from "~/hooks/use-current-timestamp.js";
import { getInstance } from "~/middleware/i18next.js";
import {
	SPIRITS_DESCRIPTION,
	SPIRITS_TITLE,
	WEBSITE_COLOUR,
	WEBSITE_ICON_URL,
} from "~/utility/constants.js";
import { fitsDiscordComponentEmbed } from "~/utility/discord-component-embed.server.js";
import { EMOJIS } from "~/utility/emojis.js";
import { spiritHistoryURL, spiritsHistoryPagination } from "~/utility/spirits.js";
import { dateTimeLabels } from "~/utility/time.js";
import { getTimePreferences } from "~/utility/time.server.js";
import type { Route } from "./+types/spirits.js";

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const selection = loaderData?.selection;
	const selected = selection?.status === "selected" ? selection : null;
	const pageURL = new URL(location.pathname, WEBSITE_URL);

	if (selected) {
		pageURL.searchParams.set("spirit", selected.spiritId.toString());
	}

	const title = selected?.spiritName ?? loaderData?.pageTitle ?? SPIRITS_TITLE;
	const description = selected?.description ?? loaderData?.pageDescription ?? SPIRITS_DESCRIPTION;
	const url = String(pageURL);

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title },
		{ name: "description", content: description },
		{ name: "theme-color", content: `#${WEBSITE_COLOUR.toString(16)}` },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

function resolveSpirit(rawSpiritId: string | null) {
	if (rawSpiritId === null || !/^\d+$/.test(rawSpiritId)) {
		return undefined;
	}

	const spiritId = Number(rawSpiritId);
	return Number.isSafeInteger(spiritId) ? spirits().get(spiritId as SpiritIds) : undefined;
}

function spiritPageURL(pathname: string, spiritId: SpiritIds) {
	const url = new URL(pathname, WEBSITE_URL);
	url.searchParams.set("spirit", String(spiritId));
	return url.href;
}

function visitTimestamps(spirit: Spirit | undefined) {
	const timestamps = new Set<number>();

	for (const [, visit] of TRAVELLING_DATES) {
		timestamps.add(visit.start.epochMilliseconds);
	}

	for (const [, visit] of VISITS_ABSENT) {
		timestamps.add(visit.start.epochMilliseconds);
	}

	if (spirit?.isSeasonalSpirit()) {
		const { returning, travelling } = visitsForSpirit(spirit.id);

		for (const [, { start }] of travelling) {
			timestamps.add(start.epochMilliseconds);
		}

		for (const [, { start }] of returning) {
			timestamps.add(start.epochMilliseconds);
		}

		for (const [, start] of spirit.visits.travellingErrors) {
			timestamps.add(start.epochMilliseconds);
		}
	}

	return timestamps;
}

export const loader = ({ context, request, url }: Route.LoaderArgs) => {
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const rawSpiritId = url.searchParams.get("spirit");
	const spirit = resolveSpirit(rawSpiritId);
	const t = getInstance(context).getFixedT(locale);

	if (rawSpiritId !== null && !spirit) {
		throw redirect(spiritHistoryURL(url.searchParams));
	}

	const spiritName = spirit ? t(`spirits.${spirit.id}`, { ns: "general" }) : null;
	const origin = spirit ? t(spiritOriginTranslationKey(spirit), { ns: "general" }) : null;
	const selection =
		spirit && spiritName && origin
			? {
					status: "selected" as const,
					description: t("spirits.meta-description", {
						ns: "features",
						origin,
						spirit: spiritName,
					}),
					origin,
					spiritId: spirit.id,
					spiritName,
				}
			: ({ status: "none" } as const);

	const pageDescription = t("spirits.description", { ns: "features" });
	const pageTitle = t("spirit-plural", { ns: "general" });
	let container: APIContainerComponent;

	if (spirit) {
		container = spiritContainer({ emojis: EMOJIS, locale, spirit, t });
	} else if (url.searchParams.has("order") || url.searchParams.has("page")) {
		const { order, page } = spiritsHistoryPagination(url.searchParams);

		container = spiritsHistoryContainer({
			locale,
			page,
			t,
			type: order,
			viewButton: (spiritId) => ({
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				label: t("view", { ns: "general" }),
				url: spiritPageURL(url.pathname, spiritId),
			}),
		}).container;
	} else {
		container = {
			type: ComponentType.Container,
			accent_color: WEBSITE_COLOUR,
			components: [
				{
					type: ComponentType.Section,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `## [${pageTitle}](${new URL(url.pathname, WEBSITE_URL).href})`,
						},
						{ type: ComponentType.TextDisplay, content: pageDescription },
					],
					accessory: { type: ComponentType.Thumbnail, media: { url: WEBSITE_ICON_URL } },
				},
			],
		};
	}

	return {
		dateTimeLabels: dateTimeLabels(visitTimestamps(spirit), { locale, timeZone, hour12 }),
		discordComponentEmbed: fitsDiscordComponentEmbed(container) ? container : null,
		initialTimestamp: Date.now(),
		locale,
		pageDescription,
		pageTitle,
		selection,
		timeZone,
		timeZoneEstimated,
	};
};

function loaderSearchParameters(url: URL) {
	const parameters = new URLSearchParams(url.search);
	parameters.delete("order");
	parameters.delete("page");
	return parameters.toString();
}

export function shouldRevalidate({
	currentUrl,
	defaultShouldRevalidate,
	nextUrl,
}: ShouldRevalidateFunctionArgs) {
	return currentUrl.href !== nextUrl.href &&
		currentUrl.pathname === nextUrl.pathname &&
		loaderSearchParameters(currentUrl) === loaderSearchParameters(nextUrl)
		? false
		: defaultShouldRevalidate;
}

export default function Spirits({ loaderData }: Route.ComponentProps) {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const currentTimestamp = useCurrentTimestamp(loaderData.initialTimestamp);
	const selectedSpirit =
		loaderData.selection.status === "selected"
			? spirits().get(loaderData.selection.spiritId)
			: undefined;

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
				<header>
					<h1 className="mb-1 text-4xl font-bold text-gray-900 dark:text-gray-100">
						{t("spirit-plural", { ns: "general" })}
					</h1>
					<p className="mt-4 text-base text-gray-600 dark:text-gray-400">
						{t("spirits.description", { ns: "features" })}
					</p>
				</header>

				<SpiritSearch />

				{selectedSpirit ? (
					<SpiritView
						dateTimeLabels={loaderData.dateTimeLabels}
						historyURL={spiritHistoryURL(searchParams)}
						locale={loaderData.locale}
						now={currentTimestamp}
						spirit={selectedSpirit}
						timeZone={loaderData.timeZone}
						timeZoneEstimated={loaderData.timeZoneEstimated}
					/>
				) : (
					<SpiritHistory
						dateTimeLabels={loaderData.dateTimeLabels}
						locale={loaderData.locale}
						now={currentTimestamp}
						searchParams={searchParams}
						timeZone={loaderData.timeZone}
						timeZoneEstimated={loaderData.timeZoneEstimated}
					/>
				)}
			</div>
		</SitePage>
	);
}
