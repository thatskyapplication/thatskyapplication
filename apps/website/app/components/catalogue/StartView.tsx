import {
	CLOTHING_SHOP,
	catalogueEventItems,
	catalogueItems,
	cataloguePercentage,
	catalogueProgress,
	catalogueSeasonItems,
	catalogueSpiritItems,
	ELDER_SPIRITS,
	type Emoji,
	type Item,
	NESTING_WORKSHOP,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	SECRET_AREA,
	STANDARD_SPIRITS,
	STARTER_PACKS,
	skyCurrentEvents,
	skyCurrentSeason,
	skyEvents,
	skyNow,
	skySeasons,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ChevronRight, Receipt } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher } from "react-router";
import { CARD_CLASS } from "~/utility/catalogue.js";
import { EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { EmojiIcon } from "./EmojiIcon";
import { SectionCard } from "./SectionCard";

export function StartView({
	data,
	showEverythingButton,
}: {
	data: ReadonlySet<number>;
	showEverythingButton: boolean;
}) {
	const { t } = useTranslation();
	const fetcher = useFetcher();

	const optimisticShowEverythingButton = fetcher.formData
		? fetcher.formData.get("enabled") === "true"
		: showEverythingButton;

	const now = skyNow();
	const currentSeason = skyCurrentSeason(now);
	const currentEvents = skyCurrentEvents(now);
	const travellingSpirit = resolveTravellingSpirit(now);
	const returningSpirits = resolveReturningSpirits(now);

	const overallProgress = useMemo(
		() => cataloguePercentage(catalogueProgress(catalogueItems(), data)),
		[data],
	);

	const sections = useMemo(() => {
		const percentage = (items: readonly Item[]) =>
			cataloguePercentage(catalogueProgress(items, data));

		return [
			{
				percentage: percentage(catalogueSpiritItems(STANDARD_SPIRITS.values())),
				title: t("catalogue.standard-spirits", { ns: "features" }),
				to: "?view=realms",
			},
			{
				percentage: percentage(catalogueSpiritItems(ELDER_SPIRITS.values())),
				title: t("catalogue.elders", { ns: "features" }),
				to: "?view=elders",
			},
			{
				percentage: percentage(catalogueSeasonItems(skySeasons().values())),
				title: t("season-plural", { ns: "general" }),
				to: "?view=seasons",
			},
			{
				percentage: percentage(catalogueEventItems(skyEvents().values())),
				title: t("catalogue.events", { ns: "features" }),
				to: "?view=events",
			},
			{
				percentage: percentage(STARTER_PACKS.items),
				title: t("catalogue.starter-packs", { ns: "features" }),
				to: "?view=starter-packs",
			},
			{
				percentage: percentage(SECRET_AREA.items),
				title: t("catalogue.secret-area", { ns: "features" }),
				to: "?view=secret-area",
			},
			{
				percentage: percentage(CLOTHING_SHOP.items),
				title: t("catalogue.clothing-shop", { ns: "features" }),
				to: "?view=clothing-shop",
			},
			{
				percentage: percentage(NESTING_WORKSHOP.items),
				title: t("catalogue.nesting-workshop", { ns: "features" }),
				to: "?view=nesting-workshop",
			},
		];
	}, [data, t]);

	const quickAccess: { emoji: Emoji | null | undefined; label: string; to: string }[] = [];

	if (currentSeason) {
		quickAccess.push({
			emoji: SeasonIdToSeasonalEmoji[currentSeason.id],
			label: t(`seasons.${currentSeason.id}`, { ns: "general" }),
			to: `?view=season&season=${currentSeason.id}`,
		});
	}

	for (const event of currentEvents.values()) {
		quickAccess.push({
			emoji: EventIdToEventTicketEmoji[event.id],
			label: t(event.name, { ns: "general" }),
			to: `?view=event&event=${event.id}`,
		});
	}

	if (travellingSpirit) {
		quickAccess.push({
			emoji: SeasonIdToSeasonalEmoji[travellingSpirit.seasonId],
			label: t("catalogue.travelling-spirit", { ns: "features" }),
			to: `?view=spirit&spirit=${travellingSpirit.id}`,
		});
	}

	if (returningSpirits) {
		const seasonId = returningSpirits.first()?.seasonId;
		const sharedSeason =
			seasonId !== undefined &&
			returningSpirits.every((returningSpirit) => returningSpirit.seasonId === seasonId);

		quickAccess.push({
			emoji: sharedSeason ? SeasonIdToSeasonalEmoji[seasonId] : undefined,
			label: t("catalogue.returning-spirits", { ns: "features" }),
			to: "?view=returning-spirits",
		});
	}

	return (
		<>
			<div>
				<h1 className="mb-1 text-4xl font-bold text-gray-900 dark:text-gray-100">
					{t("catalogue.main-title", { ns: "features" })}
				</h1>
				<p className="mb-0 whitespace-pre-line text-base text-gray-600 dark:text-gray-400">
					{t("catalogue.main-description", {
						ns: "features",
						progress: overallProgress ?? 0,
					})}
				</p>
			</div>

			{quickAccess.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{quickAccess.map(({ emoji, label, to }) => (
						<Link
							className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
							key={to}
							to={to}
						>
							{emoji ? <EmojiIcon emoji={emoji} /> : null}
							{label}
						</Link>
					))}
				</div>
			)}

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{sections.map((section) => (
					<SectionCard key={section.to} {...section} />
				))}
			</div>

			<Link
				className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-900/50"
				to="?view=total-spent"
			>
				<Receipt className="h-4 w-4 text-gray-600 dark:text-gray-400" />
				{t("catalogue.total-spent", { ns: "features" })}
				<ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
			</Link>

			<div className={clsx(CARD_CLASS, "flex flex-wrap items-center justify-between gap-3")}>
				<p className="m-0 text-sm text-gray-600 dark:text-gray-400">
					{t("catalogue.settings-everything", { ns: "features" })}
				</p>
				<fetcher.Form method="post">
					<input name="intent" type="hidden" value="settings-everything" />
					<input name="enabled" type="hidden" value={String(!optimisticShowEverythingButton)} />
					<button
						className={clsx(
							"cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors",
							optimisticShowEverythingButton
								? "bg-red-600 hover:bg-red-700"
								: "bg-green-600 hover:bg-green-700",
						)}
						type="submit"
					>
						{optimisticShowEverythingButton
							? t("catalogue.settings-button-label-disable", { ns: "features" })
							: t("catalogue.settings-button-label-enable", { ns: "features" })}
					</button>
				</fetcher.Form>
			</div>
		</>
	);
}
