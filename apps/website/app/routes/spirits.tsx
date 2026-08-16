import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { type SpiritIds, spirits, WEBSITE_URL } from "@thatskyapplication/utility";
import { BackButton } from "~/components/catalogue/BackButton.js";
import { SitePage } from "~/components/PageLayout";
import { SpiritHistory } from "~/components/spirits/SpiritHistory.js";
import { SpiritSearch } from "~/components/spirits/SpiritSearch.js";
import { SpiritView } from "~/components/spirits/SpiritView.js";
import { getLocale } from "~/middleware/i18next.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, SPIRITS_DESCRIPTION, SPIRITS_TITLE } from "~/utility/constants.js";
import { getPreferredHour12 } from "~/utility/hour-cycle.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";
import type { Route } from "./+types/spirits.js";

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Spirits, Travelling Spirits, Spirit History, Friendship Trees`,
		},
		{ title: SPIRITS_TITLE },
		{ name: "description", content: SPIRITS_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: SPIRITS_TITLE },
		{ property: "og:description", content: SPIRITS_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: SPIRITS_TITLE },
		{ name: "twitter:description", content: SPIRITS_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ context, request }: Route.LoaderArgs) => ({
	hour12: getPreferredHour12(request),
	locale: getLocale(context),
	now: Date.now(),
	timeZone: await getPreferredTimeZone(request),
});

function historyURL(searchParams: URLSearchParams) {
	const parameters = new URLSearchParams(searchParams);
	parameters.delete("spirit");
	const query = parameters.toString();
	return query.length > 0 ? `?${query}` : "/spirits";
}

export default function Spirits({ loaderData }: Route.ComponentProps) {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const rawSpiritId = searchParams.get("spirit");
	const parsedSpiritId =
		rawSpiritId !== null && /^\d+$/.test(rawSpiritId) ? Number(rawSpiritId) : null;
	const selectedSpirit =
		parsedSpiritId !== null && Number.isSafeInteger(parsedSpiritId)
			? spirits().get(parsedSpiritId as SpiritIds)
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
				) : rawSpiritId === null ? (
					<SpiritHistory {...loaderData} searchParams={searchParams} />
				) : (
					<section className="flex flex-col gap-4">
						<BackButton to={historyURL(searchParams)} />
						<p className="m-0 rounded-lg border border-gray-200 bg-gray-100 p-4 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
							{t("spirits.not-encountered-spirit", { ns: "features" })}
						</p>
					</section>
				)}
			</div>
		</SitePage>
	);
}
