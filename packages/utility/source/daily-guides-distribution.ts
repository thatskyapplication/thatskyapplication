import {
	type APIButtonComponent,
	type APIComponentInContainer,
	type APIContainerComponent,
	type APIMediaGalleryItem,
	type APITextDisplayComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import { nestingWorkshopPropsTextDisplay } from "./catalogue.js";
import {
	daysLeftText,
	type DoublePeriodName,
	doublePeriodCountdown,
	returningSpiritsCountdown,
	upcomingEventCountdown,
	upcomingMaintenanceCountdown,
} from "./countdowns.js";
import {
	type DailyGuidesDaysCountItem,
	DailyGuidesDistributionType,
	type DailyGuidesDistributionTypes,
	type DailyQuests,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	dailyQuestLabel,
	type fetchDailyGuides,
	isDailyQuest,
	visibleDaysCountItems,
} from "./daily-guides.js";
import { daysUntil, epochSeconds, TIME_ZONE } from "./dates.js";
import { formatEmoji, resolveCurrencyEmoji } from "./emojis/emoji.js";
import {
	communityUpcomingEvents,
	skyCurrentEventsWithEventTickets,
	skyNotEndedEvents,
} from "./events/index.js";
import { DOUBLE_HEART_EVENTS, RADIANCE_EVENTS } from "./events/miscellaneous.js";
import { KINGDOM } from "./kingdom/index.js";
import { skyCurrentSeason, skyUpcomingSeason } from "./kingdom/seasons/index.js";
import {
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
} from "./kingdom/treasure-candles.js";
import { maintenancePeriodsOn, upcomingMaintenancePeriods } from "./maintenance.js";
import { returningSpiritsSchedule, ScheduleType, ScheduleTypeToLocaleKey } from "./schedule.js";
import {
	SHARD_ERUPTION_START_DATE,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "./shard-eruption.js";
import { spiritWikiMarkdownLink } from "./spirits.js";
import type { MessageFormatting } from "./types/index.js";
import type { Item } from "./utility/spirits.js";

interface DailyQuestWithMedia {
	acknowledgement: string | null;
	index: number;
	quest: DailyQuests;
	url: string;
}

interface DailyGuidesFooterItem extends DailyGuidesDaysCountItem {
	text: string;
}

interface DailyGuidesContainerData extends MessageFormatting {
	cdnURL: string;
	currentTime: Temporal.ZonedDateTime;
	dailyGuides: Awaited<ReturnType<typeof fetchDailyGuides>>;
	date: Temporal.PlainDate;
	nestingWorkshopItems: readonly Item[];
	shardEruptionButton: APIButtonComponent;
	upcomingUpdate: { date: string; version: string } | null;
	url: string;
}

interface DailyGuidesContainerOptions {
	bold?: boolean;
	fits?: (container: APIContainerComponent) => boolean;
	showShardTimestampStatus?: boolean;
	type?: DailyGuidesDistributionTypes;
}

interface DailyGuidesContainer {
	container: APIContainerComponent;
	isToday: boolean;
	missingDailyQuests: boolean;
	missingTravellingRock: boolean;
}

function dailyGuidesEventData(
	date: Temporal.ZonedDateTime,
	{ emojis, locale, t }: MessageFormatting,
) {
	const { EventIdToEventTicketEmoji } = emojis;

	const eventEndText = skyNotEndedEvents(date).map(({ id, name, start, end }) => {
		const eventName = t(name, { lng: locale, ns: "general" });
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		const countdown =
			daysUntil(start, date) > 0
				? upcomingEventCountdown(eventName, start, `<t:${epochSeconds(start)}:t>`, date, {
						locale,
						t,
					})
				: daysLeftText("event", end, date, { locale, t }, eventName);

		return {
			end,
			start,
			text: `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${countdown}`,
		};
	});

	const currentEventsWithEventTickets = skyCurrentEventsWithEventTickets(date).filter(
		(event) => event.resolveInfographicURL(date) !== null,
	);

	const eventTickets =
		currentEventsWithEventTickets.size > 0
			? currentEventsWithEventTickets
					.map((event) => {
						const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

						return `[${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("view", {
							lng: locale,
							ns: "general",
						})}](${event.resolveInfographicURL(date)!} "${t(event.name, { lng: locale, ns: "general" })}")`;
					})
					.join(" | ")
			: null;

	return { eventEndText, eventTickets };
}

export function dailyGuidesContainer(
	{
		cdnURL,
		currentTime,
		dailyGuides,
		date,
		emojis,
		locale,
		nestingWorkshopItems,
		shardEruptionButton,
		t,
		upcomingUpdate,
		url,
	}: DailyGuidesContainerData,
	{
		bold = true,
		fits = () => true,
		showShardTimestampStatus = false,
		type = DailyGuidesDistributionType.Compact,
	}: DailyGuidesContainerOptions = {},
): DailyGuidesContainer {
	const { DyeTypeToEmoji, MISCELLANEOUS_EMOJIS, seasonalCandleEmoji, SeasonIdToSeasonalEmoji } =
		emojis;

	const isToday = date.equals(currentTime.toPlainDate());
	const now = isToday ? currentTime : date.toZonedDateTime(TIME_ZONE);
	const today = now.startOfDay();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(today.epochMilliseconds)}](${isToday ? url : `${url}?date=${today.toPlainDate().toString()}`})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const todayMaintenance = maintenancePeriodsOn(now);

	const upcomingMaintenance = upcomingMaintenancePeriods(now).map(
		({ days, period: { end, start } }): DailyGuidesFooterItem => ({
			end,
			start,
			text: upcomingMaintenanceCountdown(days, `<t:${epochSeconds(start)}:t>`, { locale, t }),
		}),
	);

	if (todayMaintenance.length > 0) {
		let maintenanceString: string;

		if (todayMaintenance.length > 1) {
			maintenanceString = t("maintenance-description-many-with-times", {
				lng: locale,
				ns: "general",
				times: todayMaintenance
					.map(
						(maintenance) =>
							`- ${t("time-range", {
								lng: locale,
								ns: "general",
								start: `<t:${epochSeconds(maintenance.start)}:t>`,
								end: `<t:${epochSeconds(maintenance.end)}:t>`,
							})}`,
					)
					.join("\n"),
			});
		} else {
			maintenanceString = t("maintenance-description-singular", {
				lng: locale,
				ns: "general",
				start: `<t:${epochSeconds(todayMaintenance[0]!.start)}:t>`,
				end: `<t:${epochSeconds(todayMaintenance[0]!.end)}:t>`,
			});
		}

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("maintenance", { lng: locale, ns: "general" })}\n\n${formatEmoji(MISCELLANEOUS_EMOJIS.Report)} ${maintenanceString}`,
		});
	}

	const {
		quest1,
		quest2,
		quest3,
		quest4,
		travelling_rock: travellingRock,
		travelling_rock_not_spawned: travellingRockNotSpawned,
	} = dailyGuides;

	const quests = [];
	let missingDailyQuests = false;

	for (const quest of [quest1, quest2, quest3, quest4]) {
		if (quest !== null && isDailyQuest(quest)) {
			quests.push({
				quest,
				url: DailyQuestToInfographicURL[quest],
				acknowledgement: DailyQuestToAcknowledgement[quest],
			});
		} else {
			missingDailyQuests = true;
		}
	}

	if (quests.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.quests-heading", { lng: locale, ns: "features" })}\n${quests
				.map(
					({ quest, url }, index) =>
						`${index + 1}. ${type === DailyGuidesDistributionType.Compact && url ? `[${dailyQuestLabel(quest, t, { lng: locale })}](${url})` : dailyQuestLabel(quest, t, { lng: locale })}`,
				)
				.join("\n")}`,
		});

		if (type === DailyGuidesDistributionType.Media) {
			const questsWithMedia: DailyQuestWithMedia[] = [];
			let questMediaIndex = 1;

			for (const quest of quests) {
				if (quest.url) {
					questsWithMedia.push({
						acknowledgement: quest.acknowledgement,
						index: questMediaIndex++,
						quest: quest.quest,
						url: quest.url,
					});
				}
			}

			if (questsWithMedia.length > 0) {
				const acknowledgementContent: string[] = [];

				for (const { acknowledgement, index } of questsWithMedia) {
					if (acknowledgement) {
						acknowledgementContent.push(
							t("daily-guides.infographic-acknowledgement-item", {
								lng: locale,
								ns: "features",
								infographic: index,
								acknowledgement,
							}),
						);
					}
				}

				containerComponents.push({
					type: ComponentType.MediaGallery,
					items: questsWithMedia.map(({ quest, url }) => ({
						media: { url },
						description: dailyQuestLabel(quest, t, { lng: locale }),
					})),
				});

				if (acknowledgementContent.length > 0) {
					containerComponents.push({
						type: ComponentType.TextDisplay,
						content: `-# ${acknowledgementContent.join(" | ")}`,
					});
				}
			}
		}
	}

	const treasureCandleSchedule = treasureCandles(today);
	const treasureCandleLinks: string[] = [];
	const treasureCandleNotes: string[] = [];
	let treasureCandleGalleryItems: APIMediaGalleryItem[] = [];

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `### ${t("daily-guides.treasure-candles", { lng: locale, ns: "features" })}`,
	});

	for (const [index, { url, availableFrom, unavailableAt }] of treasureCandleSchedule.entries()) {
		const next = treasureCandleSchedule[index + 1];
		const endsAvailabilityWindow =
			!next ||
			availableFrom?.epochNanoseconds !== next.availableFrom?.epochNanoseconds ||
			unavailableAt?.epochNanoseconds !== next.unavailableAt?.epochNanoseconds;

		if (type === DailyGuidesDistributionType.Compact) {
			const label =
				treasureCandleSchedule.length === 1
					? t("view", { lng: locale, ns: "general" })
					: `${index * 4 + 1}–${index * 4 + 4}`;

			treasureCandleLinks.push(`[${label}](${url})`);
		} else if (type === DailyGuidesDistributionType.Media) {
			treasureCandleGalleryItems.push({ media: { url } });

			if (treasureCandleGalleryItems.length === 10 || endsAvailabilityWindow) {
				containerComponents.push({
					type: ComponentType.MediaGallery,
					items: treasureCandleGalleryItems,
				});

				treasureCandleGalleryItems = [];
			}
		}

		if (!endsAvailabilityWindow) {
			continue;
		}

		let description = null;

		if (unavailableAt) {
			description = t("daily-guides.treasure-candles-previous-day", {
				lng: locale,
				ns: "features",
			});
		} else if (availableFrom) {
			description = t("daily-guides.treasure-candles-available-from", {
				lng: locale,
				ns: "features",
			});
		}

		if (type === DailyGuidesDistributionType.Compact) {
			if (description) {
				treasureCandleNotes.push(description);
			}
		} else if (type === DailyGuidesDistributionType.Media && description) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: `-# ${description}`,
			});
		}
	}

	if (treasureCandleSchedule.length === 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: t("none", { lng: locale, ns: "general" }),
		});
	} else if (type === DailyGuidesDistributionType.Compact) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: [
				treasureCandleLinks.join(" | "),
				...treasureCandleNotes.map((note) => `-# ${note}`),
			].join("\n"),
		});
	}

	const season = skyCurrentSeason(today);
	const footerItems: DailyGuidesFooterItem[] = [];

	const addDoublePeriods = (
		name: DoublePeriodName,
		periods: readonly { end: Temporal.ZonedDateTime; start: Temporal.ZonedDateTime }[],
		prefix: string,
	) => {
		for (const period of periods) {
			if (Temporal.ZonedDateTime.compare(period.end, today) > 0) {
				footerItems.push({
					end: period.end,
					start: period.start,
					text: `${prefix} ${doublePeriodCountdown(name, period, today, { locale, t })}`,
				});
			}
		}
	};

	if (season) {
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		footerItems.push({
			end: season.end,
			start: season.start,
			text: `${seasonEmoji ? `${formatEmoji(seasonEmoji)} ` : ""}${daysLeftText("season", season.end, now, { locale, t })}`,
		});

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const candleEmoji = seasonalCandleEmoji(season.id);

		addDoublePeriods(
			"double-seasonal-light",
			season.doubleSeasonalLight?.dates ?? [],
			formatEmoji(candleEmoji),
		);

		const seasonalCandlesRotation = season.seasonalCandles(today);

		const seasonalCandlesRemaining = t("daily-guides.seasonal-candles-remain-with-season-pass", {
			lng: locale,
			ns: "features",
			remaining: resolveCurrencyEmoji({
				emoji: candleEmoji,
				amount: seasonalCandlesLeft.toLocaleString(locale),
			}),
			remainingSeasonPass: resolveCurrencyEmoji({
				emoji: candleEmoji,
				amount: seasonalCandlesLeftWithSeasonPass.toLocaleString(locale),
			}),
		});

		let seasonalCandlesContent = `### ${t("seasonal-candles", { lng: locale, ns: "general" })}\n\n`;

		if (type === DailyGuidesDistributionType.Compact && seasonalCandlesRotation) {
			seasonalCandlesContent += `[${t("view", { lng: locale, ns: "general" })}](${seasonalCandlesRotation})\n`;
		}

		seasonalCandlesContent += seasonalCandlesRemaining;

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: seasonalCandlesContent,
		});

		if (type === DailyGuidesDistributionType.Media && seasonalCandlesRotation) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: seasonalCandlesRotation } }],
			});
		}
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		footerItems.push({
			end: next.end,
			start: next.start,
			text: `${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: Math.floor(daysUntil(next.start, today)) })}`,
		});
	}

	const eventData = dailyGuidesEventData(today, { emojis, locale, t });
	footerItems.push(...eventData.eventEndText);

	const returningSpirits = returningSpiritsSchedule(today);

	if (returningSpirits) {
		const { start, end, spiritIds } = returningSpirits;

		const commonSeason = KINGDOM.commonSeasonOf(spiritIds);
		const returningSpiritsSeasonEmoji = commonSeason && SeasonIdToSeasonalEmoji[commonSeason.id];

		const spiritLinks = new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(
			spiritIds.map((spiritId) => spiritWikiMarkdownLink(spiritId, { locale, t })),
		);

		const countdown = returningSpiritsCountdown(returningSpirits, spiritLinks, today, {
			locale,
			t,
		});

		footerItems.push({
			end,
			start,
			text: `${returningSpiritsSeasonEmoji ? `${formatEmoji(returningSpiritsSeasonEmoji)} ` : ""}${countdown}`,
		});
	}

	if (eventData.eventTickets) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("event-tickets", { lng: locale, ns: "general" })}\n\n${eventData.eventTickets}`,
		});
	}

	if (Temporal.ZonedDateTime.compare(today, SHARD_ERUPTION_START_DATE) >= 0) {
		const shard = shardEruption(today);
		let shardEruptionContent = `### ${t("shard-eruption", { lng: locale, ns: "general" })}\n\n`;

		if (shard) {
			if (type === DailyGuidesDistributionType.Compact) {
				shardEruptionContent += `${shardEruptionInformationString(shard, { emojis, locale, t })}\n`;
			}

			shardEruptionContent += shardEruptionTimestampsString(
				{
					bold,
					now: showShardTimestampStatus ? currentTime : undefined,
					timestamps: shard.timestamps,
				},
				{ locale, t },
			);
		} else {
			shardEruptionContent += t("none", { lng: locale, ns: "general" });
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory: shardEruptionButton,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: shardEruptionContent,
				},
			],
		});

		if (type === DailyGuidesDistributionType.Media && shard) {
			containerComponents.push(
				{
					type: ComponentType.MediaGallery,
					items: [{ media: { url: shard.infographic.url } }],
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# ${t("infographic-by", { lng: locale, ns: "general", acknowledgement: shard.infographic.acknowledgement })}`,
				},
			);
		}
	}

	let missingTravellingRock: boolean;

	if (travellingRock || travellingRockNotSpawned) {
		missingTravellingRock = false;
		let travellingRockContent = `### ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}\n\n`;
		const travellingRockURL = travellingRock
			? new URL(`daily_guides/travelling_rocks/${travellingRock}.webp`, cdnURL).href
			: null;

		if (travellingRockURL && type === DailyGuidesDistributionType.Compact) {
			travellingRockContent += `[${t("view", { lng: locale, ns: "general" })}](${travellingRockURL})`;
		} else if (travellingRockNotSpawned) {
			travellingRockContent += t("none", {
				lng: locale,
				ns: "general",
				context: "travelling-rock",
			});
		}

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: travellingRockContent,
		});

		if (travellingRockURL && type === DailyGuidesDistributionType.Media) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: travellingRockURL } }],
			});
		}
	} else {
		missingTravellingRock = true;
	}

	if (nestingWorkshopItems.length > 0) {
		containerComponents.push(
			nestingWorkshopPropsTextDisplay(
				t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop], { lng: locale }),
				nestingWorkshopItems,
				{ emojis, locale, t },
			),
		);
	}

	for (const { start, name, marketingURL } of communityUpcomingEvents(today)) {
		footerItems.push({
			start,
			text: upcomingEventCountdown(
				marketingURL ? `[${name}](${marketingURL})` : name,
				start,
				`<t:${epochSeconds(start)}:t>`,
				today,
				{ locale, t },
			),
		});
	}

	const radianceEvents = RADIANCE_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	);

	if (radianceEvents.length > 0) {
		const radianceName = t("event-names.radiance-event", { lng: locale, ns: "general" });
		const dyePrefix = formatEmoji(MISCELLANEOUS_EMOJIS.Dye);

		for (const radianceEvent of radianceEvents) {
			const dyeEmojis = radianceEvent.dyes.map((dye) => formatEmoji(DyeTypeToEmoji[dye])).join("");

			footerItems.push({
				end: radianceEvent.end,
				start: radianceEvent.start,
				text: `${
					Temporal.ZonedDateTime.compare(today, radianceEvent.start) >= 0
						? `${dyePrefix} ${daysLeftText("event", radianceEvent.end, today, { locale, t }, radianceName)}`
						: upcomingEventCountdown(
								`${dyePrefix} ${radianceName}`,
								radianceEvent.start,
								`<t:${epochSeconds(radianceEvent.start)}:t>`,
								today,
								{ locale, t },
							)
				} ${dyeEmojis}`,
			});
		}
	}

	addDoublePeriods(
		"double-treasure-candles",
		TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
		formatEmoji(MISCELLANEOUS_EMOJIS.TreasureCandle),
	);

	addDoublePeriods("double-hearts", DOUBLE_HEART_EVENTS, formatEmoji(MISCELLANEOUS_EMOJIS.Heart));

	footerItems.push(...upcomingMaintenance);

	if (upcomingUpdate) {
		const daysUntilUpdate = today
			.toPlainDate()
			.until(Temporal.PlainDate.from(upcomingUpdate.date)).days;

		footerItems.push({
			start: Temporal.PlainDate.from(upcomingUpdate.date).toZonedDateTime(TIME_ZONE),
			text: t(
				daysUntilUpdate === 0
					? "daily-guides.update-releases-today"
					: "daily-guides.update-upcoming",
				{
					lng: locale,
					ns: "features",
					count: daysUntilUpdate,
					update: t("schedule.update-version", {
						lng: locale,
						ns: "features",
						version: upcomingUpdate.version,
					}),
				},
			),
		});
	}

	const container: APIContainerComponent = {
		type: ComponentType.Container,
		components: containerComponents,
	};

	const visibleFooterItems = visibleDaysCountItems(footerItems, today);

	if (visibleFooterItems.length > 0) {
		const footer: APITextDisplayComponent = { type: ComponentType.TextDisplay, content: "" };

		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			footer,
		);

		for (let lines = visibleFooterItems.length; lines > 0; lines--) {
			footer.content = visibleFooterItems
				.slice(0, lines)
				.map(({ text }) => `-# ${text}`)
				.join("\n");

			if (fits(container)) {
				break;
			}
		}

		if (!fits(container)) {
			containerComponents.splice(-2);
		}
	}

	return { container, isToday, missingDailyQuests, missingTravellingRock };
}
