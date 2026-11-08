import {
	type APIContainerComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "@discordjs/core/http-only";
import type { TFunction } from "i18next";
import {
	type Emoji,
	epochSeconds,
	formatEmoji,
	type Item,
	KINGDOM,
	nestingWorkshopPropsLine,
	returningSpiritsSchedule,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	SeasonId,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
	skyCurrentEvents,
	skyCurrentSeason,
	skyUpcomingEvents,
	skyUpcomingSeason,
	spiritWikiMarkdownLink,
	TIME_ZONE,
	travellingSpiritSchedule,
} from "@thatskyapplication/utility";
import {
	WEBSITE_COLOUR,
	WEBSITE_ICON_URL,
	WHATS_HAPPENING_IN_SKY_DESCRIPTION,
} from "~/utility/constants.js";
import {
	cardContainer,
	fitsDiscordComponentEmbed,
} from "~/utility/discord-component-embed.server.js";
import { EMOJIS, EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";

export function whatsHappeningInSkyDiscordEmbed({
	locale,
	nestingWorkshopItems,
	now,
	t,
	title,
	url,
}: {
	locale: string;
	nestingWorkshopItems: readonly Item[];
	now: Temporal.ZonedDateTime;
	t: TFunction;
	title: string;
	url: string;
}): APIContainerComponent {
	const formatting = { emojis: EMOJIS, locale, t };

	const row = (emoji: Emoji | null, type: string, details: string) =>
		`${emoji ? `${formatEmoji(emoji)} ` : ""}${t("schedule.overview", { ns: "features", type, details })}`;

	const timing = (
		start: Temporal.ZonedDateTime,
		end: Temporal.ZonedDateTime,
		endUnconfirmed = false,
	) =>
		Temporal.ZonedDateTime.compare(now, start) >= 0
			? endUnconfirmed
				? t("end-unconfirmed", { ns: "general" })
				: t("schedule.overview-ends-timestamp", {
						ns: "features",
						timestamp: `<t:${epochSeconds(end)}:f>`,
					})
			: t("schedule.overview-next-timestamp", {
					ns: "features",
					timestamp: `<t:${epochSeconds(start)}:f>`,
				});

	const seasonAndEvents: string[] = [];
	const season = skyCurrentSeason(now) ?? skyUpcomingSeason(now);

	if (season) {
		seasonAndEvents.push(
			row(
				SeasonIdToSeasonalEmoji[season.id],
				t(`seasons.${season.id}`, { ns: "general" }),
				timing(season.start, season.end),
			),
		);
	}

	const events = [
		...skyCurrentEvents(now)
			.toSorted((a, b) => Temporal.ZonedDateTime.compare(a.end, b.end))
			.values(),
	];

	const nextEvent = skyUpcomingEvents(now)
		.toSorted((a, b) => Temporal.ZonedDateTime.compare(a.start, b.start))
		.first();

	if (nextEvent) {
		events.push(nextEvent);
	}

	for (const { end, endUnconfirmed, id, name, start } of events) {
		seasonAndEvents.push(
			row(
				EventIdToEventTicketEmoji[id],
				t(name, { ns: "general" }),
				timing(start, end, endUnconfirmed),
			),
		);
	}

	const shard = shardEruption(now);

	const shardEruptionLine = row(
		null,
		t("shard-eruption", { ns: "general" }),
		shard
			? `${shardEruptionInformationString(shard, formatting)}\n${shardEruptionTimestampsString({ bold: false, now: undefined, timestamps: shard.timestamps }, formatting)}`
			: t("shard-eruption.no-shard-eruptions-today", { ns: "features" }),
	);

	const spirits: string[] = [];
	const returning = returningSpiritsSchedule(now);

	if (returning) {
		const { end, spiritIds, start } = returning;
		const commonSeason = KINGDOM.commonSeasonOf(spiritIds);

		spirits.push(
			row(
				commonSeason && SeasonIdToSeasonalEmoji[commonSeason.id],
				t("returning-spirits", { ns: "general" }),
				timing(start, end),
			),
			new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(
				spiritIds.map((spiritId) => spiritWikiMarkdownLink(spiritId, formatting)),
			),
		);
	}

	const { spirit, start: travellingSpiritStart, visit } = travellingSpiritSchedule(now);

	if (visit || Temporal.ZonedDateTime.compare(travellingSpiritStart, now) > 0) {
		const spiritSeason = spirit && KINGDOM.seasonOf(spirit.spiritId);

		spirits.push(
			row(
				spiritSeason && SeasonIdToSeasonalEmoji[spiritSeason.id],
				t("travelling-spirit", { ns: "general" }),
				timing(travellingSpiritStart, visit?.end ?? travellingSpiritStart),
			),
		);

		if (spirit) {
			spirits.push(spiritWikiMarkdownLink(spirit.spiritId, formatting));
		}
	}

	const nestingWorkshop =
		nestingWorkshopItems.length > 0
			? [
					row(
						SeasonIdToSeasonalEmoji[SeasonId.Nesting],
						t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop]),
						nestingWorkshopPropsLine(nestingWorkshopItems, formatting),
					),
				]
			: [];

	const date = new Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(
		now.epochMilliseconds,
	);

	const container = cardContainer({
		colour: WEBSITE_COLOUR,
		description: `${WHATS_HAPPENING_IN_SKY_DESCRIPTION}\n-# ${date}`,
		icon: WEBSITE_ICON_URL,
		title,
		url,
	});

	for (const lines of [seasonAndEvents, [shardEruptionLine], spirits, nestingWorkshop]) {
		if (lines.length > 0) {
			container.components.push(
				{ type: ComponentType.Separator, divider: true, spacing: SeparatorSpacingSize.Small },
				{ type: ComponentType.TextDisplay, content: lines.join("\n") },
			);

			if (!fitsDiscordComponentEmbed(container)) {
				container.components.splice(-2);
			}
		}
	}

	return container;
}
