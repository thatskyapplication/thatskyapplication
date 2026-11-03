import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	fetchDailyGuides,
	fetchNestingWorkshop,
	resolveNestingWorkshopItems,
	skyNow,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { CosmeticPopover } from "~/components/cosmetics/CosmeticPopover.js";
import { ExternalLink } from "~/components/ExternalLink";
import { MaintenanceBanner } from "~/components/MaintenanceBanner.js";
import { SitePage } from "~/components/PageLayout";
import { ActiveCardItem } from "~/components/whats-happening-in-sky/ActiveCardItem.js";
import { ChecklistToggle } from "~/components/whats-happening-in-sky/ChecklistToggle.js";
import { TodaySections } from "~/components/whats-happening-in-sky/TodaySections.js";
import { UpcomingSection } from "~/components/whats-happening-in-sky/UpcomingSection.js";
import database from "~/database.server";
import { getSkyProfileCatalogueData } from "~/features/sky-profile/sky-profile-public.server.js";
import { useCosmeticSelection } from "~/hooks/use-cosmetic-selection.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session.js";
import pino from "~/pino.js";
import {
	WEBSITE_COLOUR,
	WEBSITE_ICON_URL,
	WHATS_HAPPENING_IN_SKY_DESCRIPTION,
} from "~/utility/constants.js";
import { hexColour } from "~/utility/functions.js";
import { PAGE_TITLE_CLASS, SECTION_HEADING_CLASS } from "~/utility/styles.js";
import { getTimePreferences } from "~/utility/time.server";
import { whatsHappeningInSkyDiscordEmbed } from "~/utility/whats-happening-in-sky-embed.server.js";
import { WHATS_HAPPENING_IN_SKY_CARD_CLASS } from "~/utility/whats-happening-in-sky.js";
import {
	buildWhatsHappeningInSkyView,
	resolveChecklist,
} from "~/utility/whats-happening-in-sky.server.js";
import type { Route } from "./+types/whats-happening-in-sky.js";

const WHATS_HAPPENING_IN_SKY_PATH = "/whats-happening-in-sky" as const;

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: loaderData.title },
		{ name: "description", content: WHATS_HAPPENING_IN_SKY_DESCRIPTION },
		{ name: "theme-color", content: hexColour(WEBSITE_COLOUR) },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: WHATS_HAPPENING_IN_SKY_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: WHATS_HAPPENING_IN_SKY_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

function nullOnFailure<Result>(promise: Promise<Result>, message: string) {
	return promise.catch((error: unknown) => {
		pino.error(error, message);
		return null;
	});
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const now = skyNow();
	const { timeZoneEstimated, ...preferences } = getTimePreferences(request, context);
	const i18n = getInstance(context);
	const t = i18n.getFixedT(getLocale(context));
	const discordUser = getRequestSession(context).get("discord_user");

	const [catalogue, checklistPacket, dailyGuides, nestingWorkshopPacket] = await Promise.all([
		discordUser
			? nullOnFailure(getSkyProfileCatalogueData(discordUser.id), "Failed to fetch the catalogue.")
			: null,
		discordUser
			? nullOnFailure(
					database
						.selectFrom("checklist")
						.selectAll()
						.where("user_id", "=", discordUser.id)
						.executeTakeFirst(),
					"Failed to fetch the checklist.",
				)
			: null,
		nullOnFailure(
			fetchDailyGuides(database, now.toPlainDate()),
			"Failed to fetch the daily guides.",
		),
		nullOnFailure(
			fetchNestingWorkshop(database, now.toPlainDate()),
			"Failed to fetch the Nesting Workshop.",
		),
	]);

	const owned = catalogue?.size ? catalogue : null;
	const checklist = checklistPacket === null ? null : resolveChecklist(checklistPacket, now);
	const title = t("whats-happening-in-sky.name", { ns: "features" });

	const nestingWorkshopItems = resolveNestingWorkshopItems(nestingWorkshopPacket?.cosmetics ?? []);

	return {
		...buildWhatsHappeningInSkyView({
			checklist,
			dailyGuides,
			i18n,
			nestingWorkshopItems,
			now,
			owned,
			preferences,
			t,
		}),
		discordComponentEmbed: whatsHappeningInSkyDiscordEmbed({
			locale: preferences.locale,
			nestingWorkshopItems,
			now,
			t,
			title,
			url: new URL(url.pathname, WEBSITE_URL).href,
		}),
		initialTimestamp: now.epochMilliseconds,
		locale: preferences.locale,
		prompt: discordUser
			? owned === null
				? {
						label: t("whats-happening-in-sky.catalogue-prompt", { ns: "features" }),
						to: "/me/catalogue",
					}
				: null
			: {
					label: t("whats-happening-in-sky.sign-in-prompt", { ns: "features" }),
					to: `/login?returnTo=${encodeURIComponent(WHATS_HAPPENING_IN_SKY_PATH)}`,
				},
		timeZoneEstimated,
		title,
	};
};

export default function WhatsHappeningInSky({ loaderData }: Route.ComponentProps) {
	const {
		active,
		initialTimestamp,
		latestUpdates,
		locale,
		maintenance,
		nextUpdate,
		prompt,
		thisMonthInSky,
		timeZoneEstimated,
		title,
		today,
		upcomingSections,
	} = loaderData;

	const { t } = useTranslation();
	const { onOpenChange, selectTile, selection } = useCosmeticSelection();

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
				<h1 className={PAGE_TITLE_CLASS}>{title}</h1>
				{maintenance.length > 0 && (
					<MaintenanceBanner maintenances={maintenance} timeZoneEstimated={timeZoneEstimated} />
				)}
				{prompt && (
					<p className="text-sm text-gray-600 dark:text-gray-300">
						<Link className="regular-link" to={prompt.to}>
							{prompt.label}
						</Link>
					</p>
				)}
				<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr]">
					<div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
						<TodaySections
							initialTimestamp={initialTimestamp}
							timeZoneEstimated={timeZoneEstimated}
							today={today}
						/>
					</div>
					<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:col-start-1 lg:row-span-2 lg:row-start-1">
						{active.length > 0 ? (
							active.map((entry) =>
								"column" in entry ? (
									<div className="md:col-span-2" key={entry.column}>
										<ChecklistToggle toggle={entry} />
									</div>
								) : (
									<ActiveCardItem
										card={entry}
										key={entry.key}
										locale={locale}
										onSelectTile={selectTile}
										timeZoneEstimated={timeZoneEstimated}
									/>
								),
							)
						) : (
							<p className="text-sm text-gray-600 dark:text-gray-300">
								{t("calendar.nothing-scheduled", { ns: "features" })}
							</p>
						)}
					</div>
					<aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-2">
						{upcomingSections.map(({ heading, rows }) => (
							<UpcomingSection
								heading={heading}
								key={heading}
								locale={locale}
								rows={rows}
								timeZoneEstimated={timeZoneEstimated}
							/>
						))}
						<section className={WHATS_HAPPENING_IN_SKY_CARD_CLASS}>
							<h2 className={SECTION_HEADING_CLASS}>
								{t("whats-happening-in-sky.this-month-in-sky", { ns: "features" })}
							</h2>
							<p className="text-sm">
								<ExternalLink href={thisMonthInSky.url} icon iconClassName="h-3.5 w-3.5">
									{thisMonthInSky.label}
								</ExternalLink>
							</p>
						</section>
						<section className={WHATS_HAPPENING_IN_SKY_CARD_CLASS}>
							<h2 className={SECTION_HEADING_CLASS}>
								{t("whats-happening-in-sky.latest-updates", { ns: "features" })}
							</h2>
							<ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
								{latestUpdates.map(({ date, key, label, url }) => (
									<li className="flex items-center justify-between gap-3" key={key}>
										<ExternalLink href={url} icon iconClassName="h-3.5 w-3.5">
											{label}
										</ExternalLink>
										<span className="text-gray-500 dark:text-gray-400">{date}</span>
									</li>
								))}
								{nextUpdate && (
									<li className="flex items-center justify-between gap-3">
										<span className="font-medium text-gray-900 dark:text-gray-100">
											{nextUpdate.label}
										</span>
										<span className="text-gray-500 dark:text-gray-400">
											{nextUpdate.date}{" "}
											<span className="text-gray-400 dark:text-gray-500">
												({nextUpdate.relative})
											</span>
										</span>
									</li>
								)}
							</ul>
						</section>
						<nav className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-sm">
							<Link className="regular-link" to="/me/checklist">
								{t("checklist.title", { ns: "features" })}
							</Link>
							<Link className="regular-link" to="/schedule">
								{t("schedule.name", { ns: "features" })}
							</Link>
							<Link className="regular-link" to="/calendar">
								{t("calendar.name", { ns: "features" })}
							</Link>
						</nav>
					</aside>
				</div>
			</div>
			<CosmeticPopover onOpenChange={onOpenChange} selection={selection} />
		</SitePage>
	);
}
