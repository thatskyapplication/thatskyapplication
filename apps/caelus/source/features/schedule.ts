import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	type InteractionsAPI,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	Cosmetic,
	currentSeasonalSpirits,
	type Emoji,
	EventId,
	formatEmoji,
	INTERNATIONAL_SPACE_STATION_DATES,
	ScheduleType,
	shardEruption,
	skyNow,
	TRAVELLING_DATES,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import {
	CAPE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../utility/emojis.js";
import { isChatInputCommand } from "../utility/functions.js";
import { resolveShardEruptionEmoji } from "../utility/shard-eruption.js";

export const SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_BACK_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_SHARD_ERUPTION_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_SHARD_ERUPTION_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID" as const;

export const SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID =
	"SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID" as const;

const SCHEDULE_DETAILED_BREAKDOWN_TYPES = [
	ScheduleType.DailyReset,
	ScheduleType.TravellingSpirit,
	ScheduleType.AviarysFireworkFestival,
	ScheduleType.InternationalSpaceStation,
	ScheduleType.PollutedGeyser,
	ScheduleType.Grandma,
	ScheduleType.Turtle,
	ScheduleType.AURORA,
	ScheduleType.DreamsSkater,
	ScheduleType.Passage,
	ScheduleType.NineColouredDeer,
	ScheduleType.ProjectorOfMemories,
] as const satisfies readonly ScheduleType[];

type ScheduledDetailedBreakdownTypes = (typeof SCHEDULE_DETAILED_BREAKDOWN_TYPES)[number];

function isScheduleDetailedBreakdownType(type: number): type is ScheduledDetailedBreakdownTypes {
	return SCHEDULE_DETAILED_BREAKDOWN_TYPES.includes(type as ScheduledDetailedBreakdownTypes);
}

type ScheduleDetailedBreakdownTypesWithEmoji = ScheduleType.AURORA;

const ScheduleDetailedBreakdownTypeToEmoji = {
	[ScheduleType.AURORA]: CAPE_EMOJIS.Cape96,
} as const satisfies Readonly<Record<ScheduleDetailedBreakdownTypesWithEmoji, Emoji>>;

function nextDailyReset(date: DateTime) {
	const tomorrow = date.plus({ day: 1 }).toUnixInteger();
	return `<t:${tomorrow}:t> (<t:${tomorrow}:R>)`;
}

function dailyResetDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
	const shard = shardEruption();

	const shardEruptionButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_SHARD_ERUPTION_BUTTON_CUSTOM_ID,
		label: "Shard eruption",
	};

	if (shard) {
		shardEruptionButton.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	return [
		{
			type: ComponentType.TextDisplay,
			content: `The new day happens at ${nextDailyReset(now)}. You may send your friends light again, there will be a new set of daily quests to complete, and more!`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: SCHEDULE_DETAILED_BREAKDOWN_DAILY_RESET_DAILY_GUIDES_BUTTON_CUSTOM_ID,
					label: "Daily guides",
					emoji: MISCELLANEOUS_EMOJIS.DailyQuest,
				},
				shardEruptionButton,
			],
		},
	];
}

function eyeOfEdenResetTime(date: DateTime) {
	return date.set({ weekday: 7 }).toUnixInteger();
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

function internationalSpaceStationDetailedBreakdown(date: DateTime): APIComponentInContainer[] {
	const result = [];

	for (const internationalSpaceStationDate of INTERNATIONAL_SPACE_STATION_DATES) {
		if (internationalSpaceStationDate > date.daysInMonth!) {
			continue;
		}

		const issDateUnix = date.set({ day: internationalSpaceStationDate }).toUnixInteger();
		let string = `<t:${issDateUnix}:f> (<t:${issDateUnix}:R>)`;

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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Secret_Area#The_International_Space_Station_(ISS)",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available on specific days of the month. See below for a list of dates:\n${result.join("\n")}`,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# Requires ${formatEmoji(CAPE_EMOJIS.Cape02)} or ${formatEmoji(CAPE_EMOJIS.Cape15)}`,
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

	const text = visit
		? `${t(`spirits.${visit.spiritId}`, { lng: locale, ns: "general" })} is currently visiting and will leave <t:${visit.end.toUnixInteger()}:R>.`
		: `There is currently no travelling spirit. The next one is scheduled to arrive <t:${nextArrival}:R>.`;

	const travellingSpiritButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: ButtonStyle.Secondary,
		custom_id: `${SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_SPIRIT_BUTTON_CUSTOM_ID}§${visit?.spiritId}`,
	};

	if (visit?.spiritId === undefined) {
		travellingSpiritButton.label = "View travelling spirit";
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
			content: `Travelling spirits visit every 2 weeks on Thursday and leave on Monday.\n\n${text}`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				travellingSpiritButton,
				{
					type: ComponentType.Button,
					style: ButtonStyle.Secondary,
					custom_id: SCHEDULE_DETAILED_BREAKDOWN_TRAVELLING_SPIRIT_HISTORY_BUTTON_CUSTOM_ID,
					label: "View history",
				},
			],
		},
	];
}

function pollutedGeyserOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 5 && minute < 15,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 5 ? 5 - minute : 125 - minute) : 65 - minute }).toUnixInteger()}:R>`,
	};
}

function pollutedGeyserDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Polluted_Geyser",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 2 hours from <t:${startOfEvent.toUnixInteger()}:t> lasting 10 minutes.\n\n${timestamps.join(" ")}\n\n${pollutedGeyser.now ? "The event is ongoing!" : `The event will occur again ${pollutedGeyser.next}.`}`,
				},
			],
		},
	];
}

function grandmaOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 35 && minute < 45,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 35 ? 35 - minute : 155 - minute) : 95 - minute }).toUnixInteger()}:R>`,
	};
}

function grandmaDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Grandma's_Dinner_Event",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 2 hours from <t:${startOfEvent.toUnixInteger()}:t> lasting 10 minutes.\n\n${timestamps.join(" ")}\n\n${grandma.now ? "The event is ongoing!" : `The event will occur again ${grandma.next}.`}`,
				},
			],
		},
	];
}

function turtleOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 50 && minute < 60,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 50 ? 50 - minute : 170 - minute) : 110 - minute }).toUnixInteger()}:R>`,
	};
}

function turtleDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Sunset_Sanctuary_Turtle",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 2 hours from <t:${startOfEvent.toUnixInteger()}:t> lasting 10 minutes.\n\n${timestamps.join(" ")}\n\n${turtle.now ? "The event is ongoing!" : `The event will occur again ${turtle.next}.`}`,
				},
			],
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

function dreamsSkaterDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Dreams_Skater",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every Friday, Saturday, and Sunday every 2 hours from <t:${startOfEvent.toUnixInteger()}:t> lasting 15 minutes.\n\n${timestamps.join(" ")}\n\n${dreamsSkater.now ? "The event is ongoing!" : `The event will occur again ${dreamsSkater.next}.`}`,
				},
			],
		},
	];
}

function auroraOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 9 && minute < 58,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? 129 - minute : 69 - minute }).toUnixInteger()}:R>`,
	};
}

function auroraDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const startOfEvent = startOfDay.plus({ minutes: 9 });
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfEvent; start < tomorrow; start = start.plus({ hours: 2 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 49 })) {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/AURORA_Concert",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 2 hours from <t:${startOfEvent.toUnixInteger()}:t> lasting 49 minutes.\n\n${timestamps.join(" ")}\n\n${aurora.now ? "The event is ongoing!" : `The event will occur again ${aurora.next}.`}`,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# Requires ${formatEmoji(CAPE_EMOJIS.Cape96)}`,
				},
			],
		},
	];
}

function nextPassage(date: DateTime) {
	const { minute } = date;
	return `<t:${date.plus({ minutes: 15 - (minute % 15) }).toUnixInteger()}:R>`;
}

function passageDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Season_of_Passage#Spirit_Memory_Quests",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 15 minutes from <t:${startOfDay.toUnixInteger()}:t>.\n\n${timestamps.join(" ")}\n\nThe event will occur again ${nextPassage(now)}.`,
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
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 4 hours from <t:${startOfDay.toUnixInteger()}:f> lasting 10 minutes only on the 1st of a month. See below for a list of dates:\n${timestamps.join("\n")}\n\n${aviarysFireworkFestival.now ? "The event is ongoing!" : `The event will occur again ${aviarysFireworkFestival.next}.`}`,
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

function deer(locale: Locale) {
	const date = new Date();
	date.setUTCMinutes(date.getUTCMinutes() >= 30 ? 30 : 0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	const unix = date.getTime() / 1_000;

	return [
		{
			text: t("schedule.deer-0", { lng: locale, ns: "commands" }),
			time: `<t:${unix}:t>`,
		},
		{
			text: t("schedule.deer-120", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 120}:t>`,
		},
		{
			text: t("schedule.deer-600", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 600}:t>`,
		},
		{
			text: t("schedule.deer-720", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 720}:t>`,
		},
		{
			text: t("schedule.deer-1200", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 1_200}:t>`,
		},
		{
			text: t("schedule.deer-1800", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 1_800}:t>`,
		},
	];
}

function projectorOfMemoriesOverview(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		// Assume it lasts 70 minutes.
		now: minutesSince % 80 < 70,
		next: `<t:${date.plus({ minutes: 80 - (minutesSince % 80) }).toUnixInteger()}:R>`,
	};
}

function projectorOfMemoriesDetailedBreakdown(now: DateTime): APIComponentInContainer[] {
	const timestamps = [];
	const startOfDay = now.startOf("day");
	const tomorrow = startOfDay.plus({ days: 1 });

	for (let start = startOfDay; start < tomorrow; start = start.plus({ minutes: 80 })) {
		let string = `<t:${start.toUnixInteger()}:t>`;

		if (now >= start.plus({ minutes: 70 })) {
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
				url: "https://sky-children-of-the-light.fandom.com/wiki/Season_of_The_Two_Embers_-_Part_1#Projector_of_Memories",
				label: "Wiki",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `Available every 80 minutes from <t:${startOfDay.toUnixInteger()}:t>.\n\n${timestamps.join(" ")}\n\n${projectorOfMemories.now ? "The event is ongoing!" : `The event will occur again ${projectorOfMemories.next}.`}`,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# Requires ${formatEmoji(SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp106)}`,
				},
			],
		},
	];
}

export async function scheduleOverview(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");
	const internationalSpaceStation = internationalSpaceStationOverview(startOfDay);
	const travellingSpirit = travellingSpiritOverview(startOfDay, locale);
	const pollutedGeyser = pollutedGeyserOverview(now);
	const grandma = grandmaOverview(now);
	const turtle = turtleOverview(now);
	const aurora = auroraOverview(now);
	const dreamsSkater = dreamsSkaterOverview(now);
	const aviarysFireworkFestival = aviarysFireworkFestivalOverview(now);
	const deer = nineColouredDeerOverview(now);
	const projectorOfMemories = projectorOfMemoriesOverview(now);

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.DailyReset}`, { lng: locale, ns: "features" })}:** ${nextDailyReset(startOfDay)}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.EyeOfEden}`, { lng: locale, ns: "features" })}:** <t:${eyeOfEdenResetTime(startOfDay)}:f> (<t:${eyeOfEdenResetTime(startOfDay)}:R>)`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.TravellingSpirit}`, { lng: locale, ns: "features" })}:** ${travellingSpirit.now ? `${travellingSpirit.now}. ` : ""}Next available ${travellingSpirit.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.AviarysFireworkFestival}`, { lng: locale, ns: "features" })}:** ${aviarysFireworkFestival.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${aviarysFireworkFestival.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.InternationalSpaceStation}`, { lng: locale, ns: "features" })}:** ${internationalSpaceStation.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${internationalSpaceStation.next}`,
					},
				],
			},
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.PollutedGeyser}`, { lng: locale, ns: "features" })}:** ${pollutedGeyser.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${pollutedGeyser.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.Grandma}`, { lng: locale, ns: "features" })}:** ${grandma.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${grandma.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.Turtle}`, { lng: locale, ns: "features" })}:** ${turtle.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${turtle.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.AURORA}`, { lng: locale, ns: "features" })}:** ${aurora.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${aurora.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.DreamsSkater}`, { lng: locale, ns: "features" })}:** ${dreamsSkater.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${dreamsSkater.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.Passage}`, { lng: locale, ns: "features" })}:** Next available ${nextPassage(now)}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`schedule.type.${ScheduleType.NineColouredDeer}`, { lng: locale, ns: "features" })}:** ${deer.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${deer.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`cosmetic-names.${Cosmetic.ProjectorOfMemories}`, { lng: locale, ns: "general" })}:** ${projectorOfMemories.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${projectorOfMemories.next}`,
					},
				],
			},
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "You may select an event to see a detailed breakdown!",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: SCHEDULE_DETAILED_BREAKDOWN_SELECT_MENU_CUSTOM_ID,
								options: SCHEDULE_DETAILED_BREAKDOWN_TYPES.map((type) => {
									const option: APISelectMenuOption = {
										label: t(`schedule.type.${type}`, { lng: locale, ns: "features" }),
										value: type.toString(),
									};

									const emoji =
										ScheduleDetailedBreakdownTypeToEmoji[
											type as ScheduleDetailedBreakdownTypesWithEmoji
										];

									if (emoji) {
										option.emoji = emoji;
									}

									return option;
								}),
								max_values: 1,
								min_values: 1,
								placeholder: "View a detailed breakdown of an event?",
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	await (isChatInputCommand(interaction)
		? client.api.interactions.reply(interaction.id, interaction.token, response)
		: client.api.interactions.updateMessage(interaction.id, interaction.token, response));
}

export async function scheduleDetailedBreakdown(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const type = Number(interaction.data.values[0]);

	if (!isScheduleDetailedBreakdownType(type)) {
		throw new Error("Invalid schedule detailed breakdown type received.");
	}

	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");
	let detailedBreakdown: APIComponentInContainer[];

	switch (type) {
		case ScheduleType.DailyReset: {
			detailedBreakdown = dailyResetDetailedBreakdown(startOfDay);
			break;
		}
		case ScheduleType.InternationalSpaceStation: {
			detailedBreakdown = internationalSpaceStationDetailedBreakdown(startOfDay);
			break;
		}
		case ScheduleType.TravellingSpirit: {
			detailedBreakdown = travellingSpiritDetailedBreakdown(startOfDay, locale);
			break;
		}
		case ScheduleType.PollutedGeyser: {
			detailedBreakdown = pollutedGeyserDetailedBreakdown(now);
			break;
		}
		case ScheduleType.Grandma: {
			detailedBreakdown = grandmaDetailedBreakdown(now);
			break;
		}
		case ScheduleType.Turtle: {
			detailedBreakdown = turtleDetailedBreakdown(now);
			break;
		}
		case ScheduleType.DreamsSkater: {
			detailedBreakdown = dreamsSkaterDetailedBreakdown(now);
			break;
		}
		case ScheduleType.AURORA: {
			detailedBreakdown = auroraDetailedBreakdown(now);
			break;
		}
		case ScheduleType.Passage: {
			detailedBreakdown = passageDetailedBreakdown(now);
			break;
		}
		case ScheduleType.AviarysFireworkFestival: {
			detailedBreakdown = aviarysFireworkFestivalDetailedBreakdown(now, locale);
			break;
		}
		case ScheduleType.ProjectorOfMemories: {
			detailedBreakdown = projectorOfMemoriesDetailedBreakdown(now);
			break;
		}
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
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
		],
	});
}

// content: `### Nine-Coloured Deer\n\n-# Requires ${formatEmoji(CAPE_EMOJIS.Cape125)}\nEvery 30 minutes from <t:${startOfDay.toUnixInteger()}:t>.\nNext available: ${nextDeer(now)}`,
