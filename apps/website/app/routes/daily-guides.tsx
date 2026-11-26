import { ButtonStyle, ComponentType } from "@discordjs/core/http-only";
import { useTranslation } from "react-i18next";
import type { HeadersArgs } from "react-router";
import { data, Link, redirect } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	dailyGuidesContainer,
	fetchDailyGuides,
	fetchFirstDailyGuidesDate,
	nestingWorkshopDate,
	nextDailyReset,
	parsePlainDate,
	skyNow,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { DailyGuidesCard } from "~/components/daily-guides/DailyGuidesCard.js";
import { DatePicker } from "~/components/DatePicker";
import { CentredSitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination.js";
import { CDN_URL } from "~/config.server";
import database from "~/database.server";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session.js";
import { WEBSITE_COLOUR, WEBSITE_ICON_URL } from "~/utility/constants.js";
import { dailyGuidesCardData } from "~/utility/daily-guides.server.js";
import { fitsDiscordComponentEmbed } from "~/utility/discord-component-embed.server.js";
import { EMOJIS } from "~/utility/emojis.js";
import { hexColour } from "~/utility/functions.js";
import { firstDayOfWeek } from "~/utility/locale.js";
import { fetchNestingWorkshopProps } from "~/utility/nesting-workshop.server.js";
import { DATE_NAVIGATION_CLASS } from "~/utility/styles.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/daily-guides.js";

const DAILY_GUIDES_DESCRIPTION =
	"Today's quests, treasure candles, seasonal candles, returning spirits, shard eruption, travelling rock, Nesting Workshop, maintenance, and countdowns for Sky: Children of the Light." as const;

function dailyGuidesCacheMaxAge(now: Temporal.ZonedDateTime, maximum: number) {
	const secondsUntilDailyReset = Math.floor(nextDailyReset(now).since(now).total("seconds"));

	return Math.max(0, Math.min(maximum, secondsUntilDailyReset));
}

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: loaderData.title },
		{ name: "description", content: DAILY_GUIDES_DESCRIPTION },
		{ name: "theme-color", content: hexColour(WEBSITE_COLOUR) },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: DAILY_GUIDES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: DAILY_GUIDES_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const dateParameter = url.searchParams.get("date");
	const todayParameter = url.searchParams.get("today");
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const t = getInstance(context).getFixedT(getLocale(context));
	const now = skyNow();
	const todayDate = now.toPlainDate();
	const firstDate = (await fetchFirstDailyGuidesDate(database)) ?? todayDate;
	const minimumPage = Math.min(0, firstDate.since(todayDate).days);
	let date = todayDate;

	if (todayParameter !== "1" && dateParameter !== null) {
		const targetDate = parsePlainDate(dateParameter);

		if (targetDate === null || Temporal.PlainDate.compare(targetDate, todayDate) > 0) {
			url.searchParams.delete("date");
			throw redirect(`${url.pathname}${url.search}`);
		}

		if (Temporal.PlainDate.compare(targetDate, firstDate) < 0) {
			url.searchParams.set("date", firstDate.toString());
			throw redirect(`${url.pathname}${url.search}`);
		}

		date = targetDate;
	}

	const page = date.since(todayDate).days;
	const paginationDateFormat = new Intl.DateTimeFormat(locale, {
		timeZone: "UTC",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	const paginationLabels: Record<number, string> = {};

	for (let offset = Math.max(minimumPage, page - 1); offset <= Math.min(0, page + 1); offset++) {
		paginationLabels[offset] = paginationDateFormat.format(
			todayDate.add({ days: offset }).toZonedDateTime("UTC").epochMilliseconds,
		);
	}

	const discordUser = getRequestSession(context).get("discord_user");

	const [dailyGuides, nestingWorkshop] = await Promise.all([
		fetchDailyGuides(database, date),
		fetchNestingWorkshopProps(date, discordUser?.id),
	]);

	const card = dailyGuidesCardData({
		dailyGuides,
		date,
		hour12,
		locale,
		nestingWorkshop,
		t,
		timeZone,
		timeZoneEstimated,
		today: todayDate,
	});

	const inCurrentNestingWorkshop =
		nestingWorkshopDate(date)?.getTime() === nestingWorkshopDate(todayDate)?.getTime();

	const upcomingUpdate = upcomingPatchNote(date.toString());
	const shardEruptionURL = new URL("/shard-eruption", WEBSITE_URL);

	if (!card.isToday) {
		shardEruptionURL.searchParams.set("date", date.toString());
	}

	const { container } = dailyGuidesContainer(
		{
			cdnURL: CDN_URL,
			currentTime: now,
			dailyGuides,
			date,
			emojis: EMOJIS,
			locale,
			nestingWorkshopItems: nestingWorkshop.map(({ item }) => item),
			shardEruptionButton: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: shardEruptionURL.href,
				label: t("more", { ns: "general" }),
			},
			t,
			upcomingUpdate: upcomingUpdate && {
				date: upcomingUpdate.date,
				version: patchNoteVersion(upcomingUpdate.identifier),
			},
			url: new URL(url.pathname, WEBSITE_URL).href,
		},
		{ bold: false, fits: fitsDiscordComponentEmbed, showShardTimestampStatus: true },
	);

	const cacheMaxAge = dailyGuidesCacheMaxAge(
		now,
		card.isToday || inCurrentNestingWorkshop ? 300 : 3600,
	);

	return data(
		{
			...card,
			title: t("daily-guides.name", { ns: "features" }),
			initialTimestamp: now.epochMilliseconds,
			page,
			minimumPage,
			paginationLabels,
			minimumDate: firstDate.toString(),
			todayDate: todayDate.toString(),
			weekStartsOn: firstDayOfWeek(locale),
			discordComponentEmbed: fitsDiscordComponentEmbed(container) ? container : null,
		},
		{
			headers: {
				"Cache-Control": discordUser ? "private, no-cache" : `private, max-age=${cacheMaxAge}`,
				Vary: "Cookie",
			},
		},
	);
};

export function headers({ loaderHeaders }: HeadersArgs) {
	return loaderHeaders;
}

export default function DailyGuides({ loaderData }: Route.ComponentProps) {
	const {
		date,
		initialTimestamp,
		locale,
		minimumDate,
		minimumPage,
		page,
		paginationLabels,
		todayDate,
		weekStartsOn,
	} = loaderData;

	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp, initialTimestamp);

	return (
		<CentredSitePage>
			<div className="flex w-full max-w-6xl flex-col items-center py-4 sm:py-8">
				<div className="mb-4 flex w-full justify-center gap-2">
					<Link className={DATE_NAVIGATION_CLASS} to="?today=1">
						{t("today", { ns: "general" })}
					</Link>
					<DatePicker
						anchorDate={date}
						className={DATE_NAVIGATION_CLASS}
						getDateURL={(value) => (value === todayDate ? "?today=1" : `?date=${value}`)}
						label={t("jump-to-date", { ns: "general" })}
						locale={locale}
						maximumDate={todayDate}
						minimumDate={minimumDate}
						monthOpensDays
						todayDate={todayDate}
						weekStartsOn={weekStartsOn}
					/>
				</div>
				<DailyGuidesCard card={loaderData} currentTimestamp={currentTimestamp} />
				<Pagination
					currentPage={page}
					dates={{
						label: (offset) => paginationLabels[offset] ?? String(offset),
						url: (offset) =>
							offset === 0
								? "?today=1"
								: `?date=${Temporal.PlainDate.from(todayDate).add({ days: offset }).toString()}`,
					}}
					maximumPage={0}
					minimumPage={minimumPage}
				/>
			</div>
		</CentredSitePage>
	);
}
