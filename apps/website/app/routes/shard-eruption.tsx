import {
	epochSeconds,
	formatEmojiURL,
	type ShardEruptionData,
	shardEruption,
	skyNow,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { SitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination.js";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getLocale } from "~/middleware/i18next.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import {
	APPLICATION_NAME,
	SHARD_ERUPTION_DESCRIPTION,
	SHARD_ERUPTION_MAXIMUM_PAGE,
	SHARD_ERUPTION_MINIMUM_PAGE,
} from "~/utility/constants";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server";
import type { Route } from "./+types/shard-eruption.js";

type ShardEruptionCardProps = {
	shard:
		| (Omit<ShardEruptionData, "timestamps"> & {
				timestamps: {
					start: { unix: number; format: string };
					end: { unix: number; format: string };
				}[];
		  })
		| null;
	todayFormat: string;
	now: number;
	onPreview: (imageURL: string, acknowledgement: string | null) => void;
};

export const meta = ({ location }: Route.MetaArgs) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Shard Eruptions, Shards`,
		},
		{ title: "Shard Eruption" },
		{ name: "description", content: SHARD_ERUPTION_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: "Shard Eruption" },
		{ property: "og:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: formatEmojiURL(MISCELLANEOUS_EMOJIS.ShardStrong.id) },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: "Shard Eruption" },
		{ name: "twitter:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const pageParameter = url.searchParams.get("page");
	const shards = [];
	const locale = getLocale(context);
	const timeZone = await getPreferredTimeZone(request);
	const now = skyNow();
	const today = now.startOfDay();
	let page = pageParameter ? Number(pageParameter) : 0;

	if (!Number.isInteger(page)) {
		page = 0;
	}

	page = Math.max(SHARD_ERUPTION_MINIMUM_PAGE, Math.min(SHARD_ERUPTION_MAXIMUM_PAGE, page));

	const amount = page === 0 ? 31 : 30;
	const startIndex = page * amount + (page <= 0 ? 0 : 1);
	const endIndex = startIndex + amount;

	for (let index = startIndex; index < endIndex; index++) {
		const shard = shardEruption(index);

		const todayFormat = new Intl.DateTimeFormat(locale, {
			timeZone,
			dateStyle: "full",
		}).format(today.add({ days: index }).epochMilliseconds);

		shards.push({
			shard: shard && {
				...shard,
				timestamps: shard.timestamps.map(({ start, end }) => ({
					start: {
						unix: epochSeconds(start),
						format: new Intl.DateTimeFormat(locale, {
							timeZone,
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}).format(start.epochMilliseconds),
					},
					end: {
						unix: epochSeconds(end),
						format: new Intl.DateTimeFormat(locale, {
							timeZone,
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}).format(end.epochMilliseconds),
					},
				})),
			},
			todayFormat,
		});
	}

	return { currentUnix: epochSeconds(now), shards, page };
};

function ShardEruptionCard({ shard, todayFormat, now, onPreview }: ShardEruptionCardProps) {
	const cdnURL = useCDNURL();
	const { t } = useTranslation();

	return (
		<div
			className={clsx(
				"border rounded-lg shadow-sm flex flex-col items-center text-center w-full max-w-sm p-6",
				shard?.strong
					? "bg-red-300 dark:bg-red-950/50 hover:bg-red-300/70 dark:hover:bg-red-950/40 border-red-400 dark:border-red-900"
					: "bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-700",
			)}
		>
			<div className="flex flex-row items-center justify-center">
				{shard && (
					<div
						aria-label={`${shard.strong ? "Strong" : "Regular"} shard eruption icon.`}
						className="discord-emoji w-5 h-5 mr-1"
						role="img"
						style={{
							backgroundImage: `url(${formatEmojiURL(shard.strong ? MISCELLANEOUS_EMOJIS.ShardStrong.id : MISCELLANEOUS_EMOJIS.ShardRegular.id)})`,
						}}
					/>
				)}
				<h2 className="text-lg my-0">{todayFormat}</h2>
			</div>
			{shard ? (
				<>
					<button
						className="regular-link inline-flex items-center text-sm"
						onClick={() => onPreview(shard.url, shard.acknowledgement)}
						type="button"
					>
						{t("shard-eruption.realm-area", {
							ns: "features",
							realm: shard.realm,
							area: shard.area,
						})}
					</button>
					<div className="inline-flex items-center">
						<span className="text-sm">{shard.reward}</span>
						{shard.strong ? (
							<div
								aria-label={t("ascended-candles", { ns: "general" })}
								className="discord-emoji h-4 w-4 ml-1"
								role="img"
								style={{
									backgroundImage: `url(${formatEmojiURL(MISCELLANEOUS_EMOJIS.AscendedCandle.id)})`,
								}}
							/>
						) : (
							<div
								aria-label="Piece of light."
								className="h-4 w-4 ml-1 bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/piece_of_light.webp")})`,
								}}
							/>
						)}
					</div>
					{shard.timestamps.map(({ start, end }) => (
						<span key={start.unix}>
							<code
								className={clsx(
									"bg-inherit text-xs",
									end.unix < now && "line-through text-black/50 dark:text-white/50",
								)}
							>
								{t("time-range", { ns: "general", start: start.format, end: end.format })}
							</code>
						</span>
					))}
				</>
			) : (
				<p className="pt-6">{t("shard-eruption.none", { ns: "features" })}</p>
			)}
		</div>
	);
}

export default function ShardEruption({ loaderData }: Route.ComponentProps) {
	const { currentUnix, shards, page } = loaderData;
	const { t } = useTranslation();
	const [selectedInfographic, setSelectedInfographic] = useState<SelectedInfographic | null>(null);
	const currentTimestamp = useCurrentTimestamp(currentUnix * 1000);
	useSkyDailyResetRevalidator(currentTimestamp);
	const currentUnixTimestamp = Math.floor(currentTimestamp / 1000);

	const shardCards = shards.map((shard) => (
		<ShardEruptionCard
			key={shard.todayFormat}
			now={currentUnixTimestamp}
			onPreview={(imageURL, acknowledgement) =>
				setSelectedInfographic({ acknowledgement, imageURL })
			}
			shard={shard.shard}
			todayFormat={shard.todayFormat}
		/>
	));

	const [firstShard, ...restShards] = shardCards;

	return (
		<SitePage>
			<div className="flex flex-col items-center justify-center">
				<div className="flex-wrap">
					{page === 0 ? (
						<>
							<div className="flex mb-2 w-full justify-center">{firstShard}</div>
							<div className="gap-2 flex flex-wrap justify-center w-full max-w-full">
								{restShards}
							</div>
						</>
					) : (
						<div className="gap-2 flex flex-wrap justify-center w-full max-w-full">
							{shardCards}
						</div>
					)}
					<Pagination
						currentPage={page}
						maximumPage={SHARD_ERUPTION_MAXIMUM_PAGE}
						minimumPage={SHARD_ERUPTION_MINIMUM_PAGE}
					/>
				</div>
			</div>
			{selectedInfographic && (
				<InfographicPreview
					acknowledgement={selectedInfographic.acknowledgement}
					imageURL={selectedInfographic.imageURL}
					onClose={() => setSelectedInfographic(null)}
					title={t("infographic", { ns: "general" })}
				/>
			)}
		</SitePage>
	);
}
