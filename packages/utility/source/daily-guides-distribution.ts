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
import { epochSeconds, TIME_ZONE } from "./dates.js";
import { formatEmoji, formatEmojiURL, resolveCurrencyEmoji } from "./emojis/emoji.js";
import { communityUpcomingEvents, skyCurrentEvents, skyNotEndedEvents } from "./events/index.js";
import { DOUBLE_HEART_EVENTS, RADIANCE_EVENTS } from "./events/miscellaneous.js";
import { KINGDOM } from "./kingdom/index.js";
import { skyCurrentSeason, skyUpcomingSeason } from "./kingdom/seasons/index.js";
import {
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
} from "./kingdom/treasure-candles.js";
import { MAINTENANCE_PERIODS } from "./maintenance.js";
import { returningSpiritsSchedule, ScheduleType, ScheduleTypeToLocaleKey } from "./schedule.js";
import {
	SHARD_ERUPTION_START_DATE,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "./shard-eruption.js";
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
	date: Temporal.PlainDate | undefined;
	nestingWorkshopItems: readonly Item[];
	shardEruptionButton: APIButtonComponent;
	upcomingUpdate: { date: string; version: string } | null;
	url: string;
}

interface DailyGuidesContainerOptions {
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
	const events = skyCurrentEvents(date);

	const eventEndText = skyNotEndedEvents(date).map(({ id, name, start, end }) => {
		const daysUntilStart = start.since(date).total({ unit: "days", relativeTo: date });
		const eventName = t(name, { lng: locale, ns: "general" });
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			return {
				end,
				start,
				text: `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${
					daysUntilStart < 1
						? t("daily-guides.event-upcoming-time", {
								lng: locale,
								ns: "features",
								event: eventName,
								time: `<t:${epochSeconds(start)}:t>`,
							})
						: t("daily-guides.event-upcoming", {
								lng: locale,
								ns: "features",
								event: eventName,
								count: Math.floor(daysUntilStart),
							})
				}`,
			};
		}

		const eventDaysLeft = Math.ceil(end.since(date).total({ unit: "days", relativeTo: date })) - 1;

		return {
			end,
			start,
			text: `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t(
				eventDaysLeft === 0 ? "days-left.event-ends-today" : "days-left.event",
				{
					lng: locale,
					ns: "general",
					count: eventDaysLeft,
					name: eventName,
				},
			)}`,
		};
	});

	const event1 = events.first();
	let iconURL = null;

	if (event1) {
		const eventTicketEmoji = EventIdToEventTicketEmoji[event1.id];

		if (eventTicketEmoji) {
			iconURL = formatEmojiURL(eventTicketEmoji.id);
		}
	}

	const currentEventsWithEventTickets = events.filter(
		(event) =>
			event.eventTickets &&
			Temporal.ZonedDateTime.compare(date, event.eventTickets.end) < 0 &&
			event.resolveInfographicURL(date) !== null,
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

	return { eventEndText, iconURL, eventTickets };
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
		fits = () => true,
		showShardTimestampStatus = false,
		type = DailyGuidesDistributionType.Compact,
	}: DailyGuidesContainerOptions = {},
): DailyGuidesContainer {
	const {
		DyeTypeToEmoji,
		MISCELLANEOUS_EMOJIS,
		SeasonIdToSeasonalCandleEmoji,
		SeasonIdToSeasonalEmoji,
	} = emojis;

	const isToday = date === undefined || date.equals(currentTime.toPlainDate());
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

	const todayMaintenance = [];
	const upcomingMaintenance: DailyGuidesFooterItem[] = [];
	const seenMaintenanceDays = new Set<number>();

	for (const maintenance of MAINTENANCE_PERIODS) {
		if (Temporal.ZonedDateTime.compare(maintenance.end, now) <= 0) {
			continue;
		}

		const daysUntilStart = maintenance.start
			.since(today)
			.total({ unit: "days", relativeTo: today });

		if (daysUntilStart < 1) {
			todayMaintenance.push(maintenance);
			continue;
		}

		const floorDays = Math.floor(daysUntilStart);

		if (floorDays >= 2) {
			if (!seenMaintenanceDays.has(floorDays)) {
				seenMaintenanceDays.add(floorDays);

				upcomingMaintenance.push({
					end: maintenance.end,
					start: maintenance.start,
					text: t("daily-guides.maintenance-upcoming", {
						ns: "features",
						lng: locale,
						count: floorDays,
					}),
				});
			}
		} else {
			upcomingMaintenance.push({
				end: maintenance.end,
				start: maintenance.start,
				text: t("daily-guides.maintenance-tomorrow", {
					ns: "features",
					lng: locale,
					time: `<t:${epochSeconds(maintenance.start)}:t>`,
				}),
			});
		}
	}

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
	} else {
		missingDailyQuests = true;
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

	if (type === DailyGuidesDistributionType.Compact) {
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
	const doubleTreasureCandlePrefix = formatEmoji(MISCELLANEOUS_EMOJIS.TreasureCandle);

	if (season) {
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		const seasonDaysLeft =
			Math.ceil(season.end.since(now).total({ unit: "days", relativeTo: now })) - 1;

		footerItems.push({
			end: season.end,
			start: season.start,
			text: `${seasonEmoji ? `${formatEmoji(seasonEmoji)} ` : ""}${t(
				seasonDaysLeft === 0 ? "days-left.season-ends-today" : "days-left.season",
				{
					lng: locale,
					ns: "general",
					count: seasonDaysLeft,
				},
			)}`,
		});

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const candleEmoji =
			SeasonIdToSeasonalCandleEmoji[season.id] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle;

		for (const doubleSeasonalLight of season.doubleSeasonalLight?.dates.filter(
			({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
		) ?? []) {
			const candlePrefix = formatEmoji(candleEmoji);

			const doubleSeasonalLightDaysLeft =
				Math.ceil(doubleSeasonalLight.end.since(today).total({ unit: "days", relativeTo: today })) -
				1;

			footerItems.push({
				end: doubleSeasonalLight.end,
				start: doubleSeasonalLight.start,
				text:
					Temporal.ZonedDateTime.compare(today, doubleSeasonalLight.start) >= 0
						? `${candlePrefix} ${t(
								doubleSeasonalLightDaysLeft === 0
									? "days-left.double-seasonal-light-ends-today"
									: "days-left.double-seasonal-light",
								{ lng: locale, ns: "general", count: doubleSeasonalLightDaysLeft },
							)}`
						: `${candlePrefix} ${t("daily-guides.double-seasonal-light-upcoming", {
								lng: locale,
								ns: "features",
								count: Math.floor(
									doubleSeasonalLight.start.since(today).total({ unit: "days", relativeTo: today }),
								),
							})}`,
			});
		}

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
		const daysUntilStart = next.start.since(today).total({ unit: "days", relativeTo: today });
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		footerItems.push({
			end: next.end,
			start: next.start,
			text: `${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: Math.floor(daysUntilStart) })}`,
		});
	}

	const eventData = dailyGuidesEventData(today, { emojis, locale, t });
	footerItems.push(...eventData.eventEndText);

	const returningSpiritsName = t("returning-spirits", {
		lng: locale,
		ns: "general",
	});
	const returningSpirits = returningSpiritsSchedule(today);

	if (returningSpirits) {
		const { active, start, end, spiritIds } = returningSpirits;

		const seasonIds = new Set(spiritIds.map((spiritId) => KINGDOM.seasonOf(spiritId)?.id));
		const [seasonId] = seasonIds;

		const returningSpiritsSeasonEmoji =
			seasonIds.size === 1 && seasonId !== undefined ? SeasonIdToSeasonalEmoji[seasonId] : null;

		const spiritLinks = new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(
			spiritIds.map(
				(spiritId) =>
					`[${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spiritId}`, { lng: locale, ns: "general" })})`,
			),
		);

		const returningSpiritsDaysLeft =
			Math.ceil(end.since(today).total({ unit: "days", relativeTo: today })) - 1;

		const countdown = active
			? t(
					returningSpiritsDaysLeft === 0
						? "daily-guides.returning-spirits-leave-today"
						: "daily-guides.returning-spirits-active-list",
					{
						lng: locale,
						ns: "features",
						count: returningSpiritsDaysLeft,
						returningSpirits: returningSpiritsName,
						spirits: spiritLinks,
					},
				)
			: t("daily-guides.returning-spirits-upcoming-list", {
					lng: locale,
					ns: "features",
					count: start.since(today).total({ unit: "days", relativeTo: today }),
					returningSpirits: returningSpiritsName,
					spirits: spiritLinks,
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
				{ now: showShardTimestampStatus ? now : undefined, timestamps: shard.timestamps },
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

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const untilStart = start.since(today).total({ unit: "days", relativeTo: today });
			const formattedName = marketingURL ? `[${name}](${marketingURL})` : name;

			footerItems.push({
				start,
				text:
					untilStart >= 1
						? t("daily-guides.event-upcoming", {
								lng: locale,
								ns: "features",
								event: formattedName,
								count: Math.floor(untilStart),
							})
						: t("daily-guides.event-upcoming-time", {
								lng: locale,
								ns: "features",
								event: formattedName,
								time: `<t:${epochSeconds(start)}:t>`,
							}),
			});
		}
	}

	const radianceEvents = RADIANCE_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	);

	if (radianceEvents.length > 0) {
		const radianceName = t("event-names.radiance-event", { lng: locale, ns: "general" });
		const dyePrefix = formatEmoji(MISCELLANEOUS_EMOJIS.Dye);

		for (const radianceEvent of radianceEvents) {
			const dyeEmojis = radianceEvent.dyes.map((dye) => formatEmoji(DyeTypeToEmoji[dye])).join("");

			if (Temporal.ZonedDateTime.compare(today, radianceEvent.start) >= 0) {
				const radianceDaysLeft =
					Math.ceil(radianceEvent.end.since(today).total({ unit: "days", relativeTo: today })) - 1;

				footerItems.push({
					end: radianceEvent.end,
					start: radianceEvent.start,
					text: `${dyePrefix} ${t(
						radianceDaysLeft === 0 ? "days-left.event-ends-today" : "days-left.event",
						{
							lng: locale,
							ns: "general",
							count: radianceDaysLeft,
							name: radianceName,
						},
					)} ${dyeEmojis}`,
				});
			} else {
				footerItems.push({
					end: radianceEvent.end,
					start: radianceEvent.start,
					text: `${t("daily-guides.event-upcoming", {
						lng: locale,
						ns: "features",
						event: `${dyePrefix} ${radianceName}`,
						count: Math.floor(
							radianceEvent.start.since(today).total({ unit: "days", relativeTo: today }),
						),
					})} ${dyeEmojis}`,
				});
			}
		}
	}

	for (const doubleTreasureCandleEvent of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		const doubleTreasureCandlesDaysLeft =
			Math.ceil(
				doubleTreasureCandleEvent.end.since(today).total({ unit: "days", relativeTo: today }),
			) - 1;

		footerItems.push({
			end: doubleTreasureCandleEvent.end,
			start: doubleTreasureCandleEvent.start,
			text:
				Temporal.ZonedDateTime.compare(today, doubleTreasureCandleEvent.start) >= 0
					? `${doubleTreasureCandlePrefix} ${t(
							doubleTreasureCandlesDaysLeft === 0
								? "days-left.double-treasure-candles-ends-today"
								: "days-left.double-treasure-candles",
							{ lng: locale, ns: "general", count: doubleTreasureCandlesDaysLeft },
						)}`
					: `${doubleTreasureCandlePrefix} ${t("daily-guides.double-treasure-candles-upcoming", {
							lng: locale,
							ns: "features",
							count: Math.floor(
								doubleTreasureCandleEvent.start
									.since(today)
									.total({ unit: "days", relativeTo: today }),
							),
						})}`,
		});
	}

	const doubleHeartEvents = DOUBLE_HEART_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	);

	if (doubleHeartEvents.length > 0) {
		const heartPrefix = formatEmoji(MISCELLANEOUS_EMOJIS.Heart);

		for (const doubleHeartEvent of doubleHeartEvents) {
			if (Temporal.ZonedDateTime.compare(today, doubleHeartEvent.start) >= 0) {
				const doubleHeartsDaysLeft =
					Math.ceil(doubleHeartEvent.end.since(today).total({ unit: "days", relativeTo: today })) -
					1;

				footerItems.push({
					end: doubleHeartEvent.end,
					start: doubleHeartEvent.start,
					text: `${heartPrefix} ${t(
						doubleHeartsDaysLeft === 0
							? "days-left.double-hearts-ends-today"
							: "days-left.double-hearts",
						{
							lng: locale,
							ns: "general",
							count: doubleHeartsDaysLeft,
						},
					)}`,
				});
			} else {
				footerItems.push({
					end: doubleHeartEvent.end,
					start: doubleHeartEvent.start,
					text: `${heartPrefix} ${t("daily-guides.double-hearts-upcoming", {
						lng: locale,
						ns: "features",
						count: Math.floor(
							doubleHeartEvent.start.since(today).total({ unit: "days", relativeTo: today }),
						),
					})}`,
				});
			}
		}
	}

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
	}

	return { container, isToday, missingDailyQuests, missingTravellingRock };
}
