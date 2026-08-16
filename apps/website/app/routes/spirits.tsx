import { useTranslation } from "react-i18next";
import { redirect, useSearchParams } from "react-router";
import {
	spiritOriginTranslationKey,
	type SpiritIds,
	spirits,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { SitePage } from "~/components/PageLayout";
import { SpiritHistory } from "~/components/spirits/SpiritHistory.js";
import { SpiritSearch } from "~/components/spirits/SpiritSearch.js";
import { SpiritView } from "~/components/spirits/SpiritView.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, SPIRITS_DESCRIPTION, SPIRITS_TITLE } from "~/utility/constants.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";
import type { Route } from "./+types/spirits.js";

export const meta: Route.MetaFunction = ({ loaderData, location, matches }) => {
	const selection = loaderData?.selection;
	const selected = selection?.status === "selected" ? selection : null;
	const cdnURL = getCDNURLFromMatches(matches);
	const pageURL = new URL(location.pathname, WEBSITE_URL);

	if (selected) {
		pageURL.searchParams.set("spirit", selected.spiritId.toString());
	}

	const title = selected?.spiritName ?? SPIRITS_TITLE;
	const description = selected?.description ?? SPIRITS_DESCRIPTION;
	const keywords = [
		"Sky",
		"Children of the Light",
		APPLICATION_NAME,
		"Spirits",
		"Travelling Spirits",
		"Spirit History",
		"Friendship Trees",
	];

	if (selected) {
		keywords.push(selected.spiritName, selected.origin);
	}

	const url = String(pageURL);

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ name: "keywords", content: keywords.join(", ") },
		{ title },
		{ name: "description", content: description },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ rel: "canonical", href: url },
	];
};

function resolveSpirit(rawSpiritId: string | null) {
	if (rawSpiritId === null || !/^\d+$/.test(rawSpiritId)) {
		return undefined;
	}

	const spiritId = Number(rawSpiritId);
	return Number.isSafeInteger(spiritId) ? spirits().get(spiritId as SpiritIds) : undefined;
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const rawSpiritId = url.searchParams.get("spirit");
	const spirit = resolveSpirit(rawSpiritId);
	const t = getInstance(context).getFixedT(locale);

	if (rawSpiritId !== null && !spirit) {
		throw redirect("/spirits");
	}

	const spiritName = spirit ? t(`spirits.${spirit.id}`, { ns: "general" }) : null;
	const origin = spirit ? t(spiritOriginTranslationKey(spirit), { ns: "general" }) : null;
	const selection =
		spirit && spiritName && origin
			? {
					status: "selected",
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

	return {
		hour12: getPreferredHour12(request),
		locale,
		now: Date.now(),
		selection,
		timeZone: await getPreferredTimeZone(request),
	};
};

function historyURL(searchParams: URLSearchParams) {
	const parameters = new URLSearchParams(searchParams);
	parameters.delete("spirit");
	const query = parameters.toString();
	return query.length > 0 ? `?${query}` : "/spirits";
}

export default function Spirits({ loaderData }: Route.ComponentProps) {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
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
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						{t("spirits.description", { ns: "features" })}
					</p>
				</header>

				<SpiritSearch />

				{selectedSpirit ? (
					<SpiritView
						historyURL={historyURL(searchParams)}
						hour12={loaderData.hour12}
						locale={loaderData.locale}
						now={loaderData.now}
						spirit={selectedSpirit}
						timeZone={loaderData.timeZone}
					/>
				) : (
					<SpiritHistory {...loaderData} searchParams={searchParams} />
				)}
			</div>
		</SitePage>
	);
}
