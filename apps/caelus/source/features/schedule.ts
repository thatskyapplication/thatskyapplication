import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type InteractionsAPI,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	currentSeasonalSpirits,
	EventId,
	formatEmoji,
	INTERNATIONAL_SPACE_STATION_DATES,
	ScheduleType,
	type ScheduleTypes,
	shardEruption,
	skyNow,
	TRAVELLING_DATES,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import { SHARD_ERUPTION_URL } from "../utility/constants.js";
import {
	CAPE_EMOJIS,
	EVENT_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SeasonIdToSeasonalEmoji,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../utility/emojis.js";
import { isChatInputCommand } from "../utility/functions.js";
import {
	resolveShardEruptionEmoji,
	shardEruptionInformationString,
} from "../utility/shard-eruption.js";

export const SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID" as const;

function nextDailyReset(date: DateTime, locale: Locale) {
	const tomorrow = date.plus({ day: 1 }).toUnixInteger();

	return t("schedule.next-daily-reset", {
		lng: locale,
		ns: "features",
		timestamp1: `<t:${tomorrow}:t>`,
		timestamp2: `<t:${tomorrow}:R>`,
	});
}

function dailyResetDetailedBreakdown(date: DateTime, locale: Locale): APIComponentInContainer[] {
	const shard = shardEruption();

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID,
		label: t(`schedule.type.${ScheduleType.ShardEruption}`, { lng: locale, ns: "features" }),
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	return [
		{
			type: ComponentType.TextDisplay,
			content: t("schedule.detailed-breakdown-daily-reset-message", {
				lng: locale,
				ns: "features",
				time: nextDailyReset(date, locale),
			}),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID,
					label: t("schedule.detailed-breakdown-daily-reset-daily-guides-button-label", {
						lng: locale,
						ns: "features",
					}),
					emoji: MISCELLANEOUS_EMOJIS.DailyQuest,
				},
				shardEruptionButton,
			],
		},
	];
}

function nextEyeOfEden(date: DateTime, locale: Locale) {
	const timestamp = date.plus({ days: 7 - (date.weekday % 7) }).toUnixInteger();

	return t("schedule.next-eye-of-eden", {
		lng: locale,
		ns: "features",
		timestamp1: `<t:${timestamp}:f>`,
		timestamp2: `<t:${timestamp}:R>`,
	});
}

function eyeOfEdenDetailedBreakdown(date: DateTime, locale: Locale): APIComponentInContainer[] {
	const shard = shardEruption();

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID,
		label: t(`schedule.type.${ScheduleType.ShardEruption}`, { lng: locale, ns: "features" }),
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	return [
		{
			type: ComponentType.TextDisplay,
			content: t("schedule.detailed-breakdown-eye-of-eden-message", {
				lng: locale,
				ns: "features",
				time: nextEyeOfEden(date, locale),
			}),
		},
		{
			type: ComponentType.ActionRow,
			components: [shardEruptionButton],
		},
	];
}

function internationalSpaceStationOverview(date: DateTime) {
	const targetDay = INTERNATIONAL_SPACE_STATION_DATES.find(
		(internationalSpaceStationDates) => internationalSpaceStationDates > date.day,
	);

	const targetDate = targetDay
		? date.set({ day: targetDay })
		: date.plus({ month: 1 }).set({ day: INTERNATIONAL_SPACE_STATION_DATES[0] });

	return {
		now: INTERNATIONAL_SPACE_STATION_DATES.includes(
			date.day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
		),
		next: `<t:${targetDate.toUnixInteger()}:R>`,
	};
}

function internationalSpaceStationDetailedBreakdown(
	date: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const result = [];

	for (const internationalSpaceStationDate of INTERNATIONAL_SPACE_STATION_DATES) {
		if (internationalSpaceStationDate > date.daysInMonth!) {
			continue;
		}

		const issDateUnix = date.set({ day: internationalSpaceStationDate }).toUnixInteger();

		let string = t("schedule.detailed-breakdown-international-space-station-time", {
			lng: locale,
			ns: "features",
			timestamp1: `<t:${issDateUnix}:f>`,
			timestamp2: `<t:${issDateUnix}:R>`,
		});

		if (date.toUnixInteger() > issDateUnix) {
			string = `~~${string}~~`;
		}

		result.push(`- ${string}`);
	}

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-international-space-station-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-international-space-station-message", {
						lng: locale,
						ns: "features",
						result: result.join("\n"),
					}),
				},
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-international-space-station-requires", {
						lng: locale,
						ns: "features",
						emoji1: formatEmoji(CAPE_EMOJIS.Cape02),
						emoji2: formatEmoji(CAPE_EMOJIS.Cape15),
					}),
				},
			],
		},
	];
}

function travellingSpiritOverview(now: DateTime, locale: Locale) {
	const travellingSpirit = TRAVELLING_DATES.findLast(({ start, end }) => now >= start && now < end);

	return {
		now: travellingSpirit
			? t(`spirits.${travellingSpirit.spiritId}`, { lng: locale, ns: "general" })
			: (false as const),
		next: `<t:${TRAVELLING_DATES.last()!.start.plus({ weeks: 2 }).toUnixInteger()}:R>`,
	};
}

function travellingSpiritDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const visit = TRAVELLING_DATES.findLast(({ start, end }) => now >= start && now < end);
	const nextArrival = TRAVELLING_DATES.last()!.start.plus({ weeks: 2 }).toUnixInteger();

	const travellingSpiritButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: `${SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID}§${visit?.spiritId}`,
	};

	if (visit?.spiritId === undefined) {
		travellingSpiritButton.label = t(
			"schedule.detailed-breakdown-travelling-spirit-view-spirit-button-label",
			{ lng: locale, ns: "features" },
		);

		travellingSpiritButton.disabled = true;
	} else {
		travellingSpiritButton.label = t(`spirits.${visit.spiritId}`, { lng: locale, ns: "general" });
		const emoji = SeasonIdToSeasonalEmoji[currentSeasonalSpirits().get(visit.spiritId)!.seasonId];

		if (emoji) {
			travellingSpiritButton.emoji = emoji;
		}
	}

	return [
		{
			type: ComponentType.TextDisplay,
			content: visit
				? t("schedule.detailed-breakdown-travelling-spirit-message-now", {
						lng: locale,
						ns: "features",
						spirit: t(`spirits.${visit.spiritId}`, { lng: locale, ns: "general" }),
						timestamp: `<t:${visit.end.toUnixInteger()}:R>`,
					})
				: t("schedule.detailed-breakdown-travelling-spirit-message-none", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${nextArrival}:R>`,
					}),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				travellingSpiritButton,
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID,
					label: t("schedule.detailed-breakdown-travelling-spirit-history-button-label", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
	];
}

function pollutedGeyserOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 5 && minute < 15,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute < 5 ? 5 - minute : 125 - minute) : 65 - minute }).toUnixInteger()}:R>`,
	};
}

function pollutedGeyserDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const startOfEvent = startOfDay.plus({ minutes: 5 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 10 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const pollutedGeyser = pollutedGeyserOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-polluted-geyser-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-polluted-geyser-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfEvent.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: pollutedGeyser.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: pollutedGeyser.next,
								}),
					}),
				},
			],
		},
	];
}

function grandmaOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 35 && minute < 45,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute < 35 ? 35 - minute : 155 - minute) : 95 - minute }).toUnixInteger()}:R>`,
	};
}

function grandmaDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const startOfEvent = startOfDay.plus({ minutes: 35 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 10 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const grandma = grandmaOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-grandma-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-grandma-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfEvent.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: grandma.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: grandma.next,
								}),
					}),
				},
			],
		},
	];
}

function turtleOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 50 && minute < 60,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute < 50 ? 50 - minute : 170 - minute) : 110 - minute }).toUnixInteger()}:R>`,
	};
}

function turtleDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const startOfEvent = startOfDay.plus({ minutes: 50 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 10 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const turtle = turtleOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-turtle-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-turtle-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfEvent.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: turtle.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: turtle.next,
								}),
					}),
				},
			],
		},
	];
}

function shardEruptionOverview(now: DateTime) {
	const shard = shardEruption();
	let nextShard = shard?.timestamps.find(({ start }) => now < start);

	if (!nextShard) {
		for (let index = 1; ; index++) {
			const nextPossibleShard = shardEruption(index);

			if (!nextPossibleShard) {
				continue;
			}

			nextShard = nextPossibleShard.timestamps.find(({ start }) => now < start)!;
			break;
		}
	}

	return {
		now: shard?.timestamps.some(({ start, end }) => now >= start && now < end),
		next: `<t:${nextShard.start.toUnixInteger()}:R>`,
	};
}

function shardEruptionDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const shard = shardEruption();
	const timestamps = [];

	for (const { start, end } of shard?.timestamps ?? []) {
		let string = `<t:${start.toUnixInteger()}:T>–<t:${end.toUnixInteger()}:T>`;

		if (now >= end) {
			string = `~~${string}~~`;
		}

		timestamps.push(`- ${string}`);
	}

	const shardOverview = shardEruptionOverview(now);

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: SCHEDULE_DETAILED_BREAKDOWN_SHARD_ERUPTION_BUTTON_CUSTOM_ID,
		label: t("schedule.detailed-breakdown-shard-eruptions-view", { lng: locale, ns: "features" }),
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: SHARD_ERUPTION_URL,
				label: t("schedule.detailed-breakdown-shard-eruptions-website", {
					lng: locale,
					ns: "features",
				}),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-shard-eruptions-message", {
						lng: locale,
						ns: "features",
						timestamps: timestamps.join("\n"),
						status: shard
							? `${shardEruptionInformationString(shard, true, locale)}\n${timestamps.join("\n")}`
							: t("schedule.detailed-breakdown-shard-eruptions-upcoming", {
									lng: locale,
									ns: "features",
									timestamp: shardOverview.next,
								}),
					}),
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [shardEruptionButton],
		},
	];
}

function dreamsSkaterOverview(date: DateTime) {
	const { weekday, hour, minute } = date;

	const dreamsSkaterDate =
		weekday !== 5 && weekday !== 6 && weekday !== 7
			? date.plus({ days: 5 - weekday }).set({ hour: 1, minute: 0, second: 0, millisecond: 0 })
			: hour % 2 === 0
				? date.plus({ minutes: 60 - minute })
				: date.plus({ minutes: 120 - minute });

	return {
		now: (weekday === 5 || weekday === 6 || weekday === 7) && hour % 2 === 1 && minute < 15,
		next: `<t:${dreamsSkaterDate.toUnixInteger()}:R>`,
	};
}

function dreamsSkaterDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const { weekday } = now;
	const timestamps = [];

	const startOfDay = now.startOf("day").plus({
		days: weekday !== 5 && weekday !== 6 && weekday !== 7 ? 5 - weekday : 0,
	});

	const startOfEvent = startOfDay.plus({ hours: 1 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 15 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const dreamsSkater = dreamsSkaterOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-dreams-skater-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-dreams-skater-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfEvent.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: dreamsSkater.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: dreamsSkater.next,
								}),
					}),
				},
			],
		},
	];
}

function auroraOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 10 && minute < 58,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute < 10 ? 10 - minute : 130 - minute) : 70 - minute }).toUnixInteger()}:R>`,
	};
}

function auroraDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const startOfEvent = startOfDay.plus({ minutes: 10 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 48 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const aurora = auroraOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-aurora-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-aurora-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfEvent.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: aurora.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: aurora.next,
								}),
					}),
				},
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-aurora-requires", {
						lng: locale,
						ns: "features",
						emoji: formatEmoji(CAPE_EMOJIS.Cape96),
					}),
				},
			],
		},
	];
}

function nextPassage(date: DateTime) {
	const { minute } = date;
	return `<t:${date.plus({ minutes: 15 - (minute % 15) }).toUnixInteger()}:R>`;
}

function passageDetailedBreakdown(now: DateTime, locale: Locale): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfDay; start < tomorrow; start = start.plus({ minutes: 15 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-passage-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-passage-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfDay.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: t("schedule.event-will-occur", {
							lng: locale,
							ns: "features",
							timestamp: nextPassage(now),
						}),
					}),
				},
			],
		},
	];
}

function aviarysFireworkFestivalOverview(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		now: date.day === 1 && hour % 4 === 0 && minute <= 10,
		next: `<t:${(
			date.day === 1
				? date.plus({ minutes: 240 - (minutesSince % 240) })
				: date.plus({ month: 1 }).startOf("month")
		).toUnixInteger()}:R>`,
	};
}

function aviarysFireworkFestivalDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.day === 1 ? now.startOf("day") : now.plus({ month: 1 }).startOf("month");
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfDay; start < tomorrow; start = start.plus({ hours: 4 })) {
		let string = `<t:${start.toUnixInteger()}:f>`;

		if (now >= start.plus({ minutes: 10 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(`- ${string}`);
	}

	const aviarysFireworkFestival = aviarysFireworkFestivalOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t(`event-wiki.${EventId.AviarysFireworkFestival2023}`, { lng: locale, ns: "general" }),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-aviarys-firework-festival-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfDay.toUnixInteger()}:f>`,
						timestamps: timestamps.join("\n"),
						status: aviarysFireworkFestival.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: aviarysFireworkFestival.next,
								}),
					}),
				},
			],
		},
	];
}

function nineColouredDeerOverview(date: DateTime) {
	const { minute } = date;

	return {
		now: minute < 20 || (minute >= 30 && minute < 50),
		next: `<t:${date.plus({ minutes: 30 - (minute % 30) }).toUnixInteger()}:R>`,
	};
}

function nineColouredDeerDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const startOfDay = now.startOf("day");
	const startOfEvent = now.set({ minute: now.minute >= 30 ? 30 : 0 });
	const nineColouredDeer = nineColouredDeerOverview(now);

	return [
		{
			type: ComponentType.TextDisplay,
			content: t("schedule.detailed-breakdown-nine-coloured-deer-message", {
				lng: locale,
				ns: "features",
				timestamp: `<t:${startOfDay.toUnixInteger()}:t>`,
				timestamps: [
					`- ${t("schedule.detailed-breakdown-nine-coloured-deer-time-0", { lng: locale, ns: "features", timestamp: `<t:${startOfEvent.toUnixInteger()}:t>` })}`,
					`- ${t("schedule.detailed-breakdown-nine-coloured-deer-time-120", { lng: locale, ns: "features", timestamp: `<t:${startOfEvent.plus({ minutes: 2 }).toUnixInteger()}:t>` })}`,
					`- ${t("schedule.detailed-breakdown-nine-coloured-deer-time-600", { lng: locale, ns: "features", timestamp: `<t:${startOfEvent.plus({ minutes: 10 }).toUnixInteger()}:t>` })}`,
					`- ${t("schedule.detailed-breakdown-nine-coloured-deer-time-720", { lng: locale, ns: "features", timestamp: `<t:${startOfEvent.plus({ minutes: 12 }).toUnixInteger()}:t>` })}`,
					`- ${t("schedule.detailed-breakdown-nine-coloured-deer-time-1200", { lng: locale, ns: "features", timestamp: `<t:${startOfEvent.plus({ minutes: 20 }).toUnixInteger()}:t>` })}`,
				].join("\n"),
				status: nineColouredDeer.now
					? t("schedule.event-ongoing", { lng: locale, ns: "features" })
					: t("schedule.event-will-occur", {
							lng: locale,
							ns: "features",
							timestamp: nineColouredDeer.next,
						}),
			}),
		},
		{
			type: ComponentType.TextDisplay,
			content: t("schedule.detailed-breakdown-nine-coloured-deer-requires", {
				lng: locale,
				ns: "features",
				emoji: formatEmoji(CAPE_EMOJIS.Cape125),
			}),
		},
	];
}

function nextNestingWorkshop(now: DateTime, locale: Locale) {
	const timestamp = now.plus({ week: 1 }).startOf("week").toUnixInteger();

	return t("schedule.next-nesting-workshop", {
		lng: locale,
		ns: "features",
		timestamp1: `<t:${timestamp}:f>`,
		timestamp2: `<t:${timestamp}:R>`,
	});
}

function nestingWorkshopDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-nesting-workshop-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-nesting-workshop-message", {
						lng: locale,
						ns: "features",
						timestamp: nextNestingWorkshop(now, locale),
					}),
				},
			],
		},
	];
}

function vaultEldersBlessingOverview(date: DateTime) {
	const { minute } = date;

	return {
		now: minute % 20 === 0,
		next: `<t:${date.plus({ minutes: 20 - (minute % 20) }).toUnixInteger()}:R>`,
	};
}

function vaultEldersBlessingDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfDay; start < tomorrow; start = start.plus({ minutes: 20 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 1 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const vaultEldersBlessing = vaultEldersBlessingOverview(now);

	return [
		{
			type: ComponentType.TextDisplay,
			content: t("schedule.detailed-breakdown-vault-elders-blessing-message", {
				lng: locale,
				ns: "features",
				timestamp: `<t:${startOfDay.toUnixInteger()}:t>`,
				timestamps: timestamps.join(" "),
				status: vaultEldersBlessing.now
					? t("schedule.event-ongoing", { lng: locale, ns: "features" })
					: t("schedule.event-will-occur", {
							lng: locale,
							ns: "features",
							timestamp: vaultEldersBlessing.next,
						}),
			}),
		},
	];
}

function projectorOfMemoriesOverview(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		now: minutesSince % 80 < 78,
		next: `<t:${date.plus({ minutes: 80 - (minutesSince % 80) }).toUnixInteger()}:R>`,
	};
}

function projectorOfMemoriesDetailedBreakdown(
	now: DateTime,
	locale: Locale,
): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfDay; start < tomorrow; start = start.plus({ minutes: 80 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 78 })) {
			string = `~~${string}~~`;
		}

		timestamps.push(string);
	}

	const projectorOfMemories = projectorOfMemoriesOverview(now);

	return [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: t("schedule.detailed-breakdown-projector-of-memories-wiki-button-url", {
					lng: locale,
					ns: "features",
				}),
				label: t("wiki", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-projector-of-memories-message", {
						lng: locale,
						ns: "features",
						timestamp: `<t:${startOfDay.toUnixInteger()}:t>`,
						timestamps: timestamps.join(" "),
						status: projectorOfMemories.now
							? t("schedule.event-ongoing", { lng: locale, ns: "features" })
							: t("schedule.event-will-occur", {
									lng: locale,
									ns: "features",
									timestamp: projectorOfMemories.next,
								}),
					}),
				},
				{
					type: ComponentType.TextDisplay,
					content: t("schedule.detailed-breakdown-projector-of-memories-requires", {
						lng: locale,
						ns: "features",
						emoji: formatEmoji(SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp106),
					}),
				},
			],
		},
	];
}

interface ScheduleOverviewOptions {
	ephemeral?: boolean;
}

export async function scheduleOverview(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	{ ephemeral }: ScheduleOverviewOptions = {},
) {
	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");
	const internationalSpaceStation = internationalSpaceStationOverview(startOfDay);
	const travellingSpirit = travellingSpiritOverview(startOfDay, locale);
	const pollutedGeyser = pollutedGeyserOverview(now);
	const grandma = grandmaOverview(now);
	const turtle = turtleOverview(now);
	const shardEruption = shardEruptionOverview(now);
	const aurora = auroraOverview(now);
	const dreamsSkater = dreamsSkaterOverview(now);
	const aviarysFireworkFestival = aviarysFireworkFestivalOverview(now);
	const nineColouredDeer = nineColouredDeerOverview(now);
	const vaultEldersBlessing = vaultEldersBlessingOverview(now);
	const projectorOfMemories = projectorOfMemoriesOverview(now);
	let flags = MessageFlags.IsComponentsV2;

	if (ephemeral) {
		flags |= MessageFlags.Ephemeral;
	}

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.DailyReset}`, { lng: locale, ns: "features" }),
							details: nextDailyReset(startOfDay, locale),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.EyeOfEden}`, { lng: locale, ns: "features" }),
							details: nextEyeOfEden(startOfDay, locale),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.ShardEruption}`, {
								lng: locale,
								ns: "features",
							}),
							details: shardEruption.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: shardEruption.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.TravellingSpirit}`, {
								lng: locale,
								ns: "features",
							}),
							details: travellingSpirit.now
								? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} ${travellingSpirit.now}`
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: travellingSpirit.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.NestingWorkshop}`, {
								lng: locale,
								ns: "features",
							}),
							details: nextNestingWorkshop(now, locale),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.AviarysFireworkFestival}`, {
								lng: locale,
								ns: "features",
							}),
							details: aviarysFireworkFestival.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: aviarysFireworkFestival.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.InternationalSpaceStation}`, {
								lng: locale,
								ns: "features",
							}),
							details: internationalSpaceStation.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: internationalSpaceStation.next,
									}),
						}),
					},
				],
			},
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.PollutedGeyser}`, {
								lng: locale,
								ns: "features",
							}),
							details: pollutedGeyser.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: pollutedGeyser.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.Grandma}`, {
								lng: locale,
								ns: "features",
							}),
							details: grandma.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: grandma.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.Turtle}`, {
								lng: locale,
								ns: "features",
							}),
							details: turtle.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: turtle.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.AURORA}`, {
								lng: locale,
								ns: "features",
							}),
							details: aurora.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: aurora.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.DreamsSkater}`, {
								lng: locale,
								ns: "features",
							}),
							details: dreamsSkater.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: dreamsSkater.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.VaultEldersBlessing}`, {
								lng: locale,
								ns: "features",
							}),
							details: vaultEldersBlessing.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: vaultEldersBlessing.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.Passage}`, {
								lng: locale,
								ns: "features",
							}),
							details: t("schedule.overview-next", {
								lng: locale,
								ns: "features",
								timestamp: nextPassage(now),
							}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.NineColouredDeer}`, {
								lng: locale,
								ns: "features",
							}),
							details: nineColouredDeer.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: nineColouredDeer.next,
									}),
						}),
					},
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview", {
							lng: locale,
							ns: "features",
							type: t(`schedule.type.${ScheduleType.ProjectorOfMemories}`, {
								lng: locale,
								ns: "features",
							}),
							details: projectorOfMemories.now
								? t("schedule.overview-available", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									})
								: t("schedule.overview-next", {
										lng: locale,
										ns: "features",
										timestamp: projectorOfMemories.next,
									}),
						}),
					},
				],
			},
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("schedule.overview-detailed-breakdown-message", {
							lng: locale,
							ns: "features",
						}),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID,
								options: [
									{
										label: t(`schedule.type.${ScheduleType.DailyReset}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.DailyReset.toString(),
										emoji: MISCELLANEOUS_EMOJIS.DailyReset,
									},
									{
										label: t(`schedule.type.${ScheduleType.EyeOfEden}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.EyeOfEden.toString(),
										emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
									},
									{
										label: t(`schedule.type.${ScheduleType.ShardEruption}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.ShardEruption.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.TravellingSpirit}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.TravellingSpirit.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.NestingWorkshop}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.NestingWorkshop.toString(),
										emoji: SEASON_EMOJIS.Nesting,
									},
									{
										label: t(`schedule.type.${ScheduleType.AviarysFireworkFestival}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.AviarysFireworkFestival.toString(),
										emoji: EVENT_EMOJIS.AviarysFireworkFestival,
									},
									{
										label: t(`schedule.type.${ScheduleType.InternationalSpaceStation}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.InternationalSpaceStation.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.PollutedGeyser}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.PollutedGeyser.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.Grandma}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.Grandma.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.Turtle}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.Turtle.toString(),
									},
									{
										label: t(`schedule.type.${ScheduleType.AURORA}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.AURORA.toString(),
										emoji: CAPE_EMOJIS.Cape96,
									},
									{
										label: t(`schedule.type.${ScheduleType.DreamsSkater}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.DreamsSkater.toString(),
										emoji: SEASON_EMOJIS.Dreams,
									},
									{
										label: t(`schedule.type.${ScheduleType.VaultEldersBlessing}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.VaultEldersBlessing.toString(),
										emoji: CAPE_EMOJIS.Cape156,
									},
									{
										label: t(`schedule.type.${ScheduleType.Passage}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.Passage.toString(),
										emoji: SEASON_EMOJIS.Passage,
									},
									{
										label: t(`schedule.type.${ScheduleType.NineColouredDeer}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.NineColouredDeer.toString(),
										emoji: CAPE_EMOJIS.Cape125,
									},
									{
										label: t(`schedule.type.${ScheduleType.ProjectorOfMemories}`, {
											lng: locale,
											ns: "features",
										}),
										value: ScheduleType.ProjectorOfMemories.toString(),
										emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp106,
									},
								],
								max_values: 1,
								min_values: 1,
								placeholder: t(
									"schedule.overview-detailed-breakdown-string-select-menu-placeholder",
									{
										lng: locale,
										ns: "features",
									},
								),
							},
						],
					},
				],
			},
		],
		flags,
	};

	await (isChatInputCommand(interaction)
		? client.api.interactions.reply(interaction.id, interaction.token, response)
		: client.api.interactions.updateMessage(interaction.id, interaction.token, response));
}

interface ScheduleDetailedBreakdownOptions {
	type: ScheduleTypes;
	reply?: boolean;
	ephemeral?: boolean;
}

export async function scheduleDetailedBreakdown(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentSelectMenuInteraction,
	{ type, reply, ephemeral }: ScheduleDetailedBreakdownOptions,
) {
	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");
	let detailedBreakdown: APIComponentInContainer[];

	switch (type) {
		case ScheduleType.DailyReset: {
			detailedBreakdown = dailyResetDetailedBreakdown(startOfDay, locale);
			break;
		}
		case ScheduleType.EyeOfEden: {
			detailedBreakdown = eyeOfEdenDetailedBreakdown(startOfDay, locale);
			break;
		}
		case ScheduleType.InternationalSpaceStation: {
			detailedBreakdown = internationalSpaceStationDetailedBreakdown(startOfDay, locale);
			break;
		}
		case ScheduleType.TravellingSpirit: {
			detailedBreakdown = travellingSpiritDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.PollutedGeyser: {
			detailedBreakdown = pollutedGeyserDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.Grandma: {
			detailedBreakdown = grandmaDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.Turtle: {
			detailedBreakdown = turtleDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.ShardEruption: {
			detailedBreakdown = shardEruptionDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.DreamsSkater: {
			detailedBreakdown = dreamsSkaterDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.AURORA: {
			detailedBreakdown = auroraDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.Passage: {
			detailedBreakdown = passageDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.AviarysFireworkFestival: {
			detailedBreakdown = aviarysFireworkFestivalDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.NineColouredDeer: {
			detailedBreakdown = nineColouredDeerDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.NestingWorkshop: {
			detailedBreakdown = nestingWorkshopDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.VaultEldersBlessing: {
			detailedBreakdown = vaultEldersBlessingDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.ProjectorOfMemories: {
			detailedBreakdown = projectorOfMemoriesDetailedBreakdown(now, locale);
			break;
		}
		default: {
			throw new Error("Invalid schedule type for a detailed breakdown received.");
		}
	}

	const components: APIMessageTopLevelComponent[] = [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## ${t(`schedule.type.${type}`, { lng: locale, ns: "features" })}`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				...detailedBreakdown,
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Secondary,
							custom_id: SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID,
							label: t("schedule.back", { lng: locale, ns: "features" }),
							emoji: { name: "⬅️" },
						},
					],
				},
			],
		},
	];

	let flags = MessageFlags.IsComponentsV2;

	if (ephemeral) {
		flags |= MessageFlags.Ephemeral;
	}

	await (reply
		? client.api.interactions.reply(interaction.id, interaction.token, { components, flags })
		: client.api.interactions.updateMessage(interaction.id, interaction.token, { components }));
}
