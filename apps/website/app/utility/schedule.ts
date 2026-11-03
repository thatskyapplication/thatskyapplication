import {
	DOUBLE_HEART_EVENTS,
	type DoublePeriodName,
	type Emoji,
	EventId,
	RADIANCE_EVENTS,
	ScheduleType,
	type ScheduleTypes,
	type Season,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
} from "@thatskyapplication/utility";
import {
	type DyeTypeToEmoji,
	MISCELLANEOUS_EMOJIS,
	seasonalCandleEmoji,
} from "~/utility/emojis.js";

export const NESTING_WORKSHOP_CATALOGUE_URL = "/me/catalogue?view=nesting-workshop" as const;
export const RETURNING_SPIRITS_CATALOGUE_URL = "/me/catalogue?view=returning-spirits" as const;

export const SCHEDULE_TYPE_TO_WIKI_KEY: Readonly<Partial<Record<ScheduleTypes, string>>> = {
	[ScheduleType.InternationalSpaceStation]:
		"features:schedule.detailed-breakdown-international-space-station-wiki-button-url",
	[ScheduleType.PollutedGeyser]:
		"features:schedule.detailed-breakdown-polluted-geyser-wiki-button-url",
	[ScheduleType.Grandma]: "features:schedule.detailed-breakdown-grandma-wiki-button-url",
	[ScheduleType.Turtle]: "features:schedule.detailed-breakdown-turtle-wiki-button-url",
	[ScheduleType.DreamsSkater]: "features:schedule.detailed-breakdown-dreams-skater-wiki-button-url",
	[ScheduleType.AURORA]: "features:schedule.detailed-breakdown-aurora-wiki-button-url",
	[ScheduleType.Passage]: "features:schedule.detailed-breakdown-passage-wiki-button-url",
	[ScheduleType.AviarysFireworkFestival]: `general:event-wiki.${EventId.AviarysFireworkFestival2023}`,
	[ScheduleType.NestingWorkshop]:
		"features:schedule.detailed-breakdown-nesting-workshop-wiki-button-url",
	[ScheduleType.VaultEldersBlessing]:
		"features:schedule.detailed-breakdown-vault-elders-blessing-wiki-button-url",
	[ScheduleType.ProjectorOfMemories]:
		"features:schedule.detailed-breakdown-projector-of-memories-wiki-button-url",
	[ScheduleType.ReturningSpirits]:
		"features:schedule.detailed-breakdown-returning-spirits-wiki-button-url",
};

export interface LimitedPeriodGroup {
	emoji: Emoji;
	name: string;
	source: readonly {
		dyes?: readonly (keyof typeof DyeTypeToEmoji)[] | undefined;
		end: Temporal.ZonedDateTime;
		start: Temporal.ZonedDateTime;
	}[];
}

export interface DoublePeriodGroup extends LimitedPeriodGroup {
	name: DoublePeriodName;
}

export const RADIANCE_PERIODS: LimitedPeriodGroup = {
	emoji: MISCELLANEOUS_EMOJIS.Dye,
	name: "radiance-event",
	source: RADIANCE_EVENTS,
};

export const DOUBLE_HEART_PERIODS: DoublePeriodGroup = {
	emoji: MISCELLANEOUS_EMOJIS.Heart,
	name: "double-hearts",
	source: DOUBLE_HEART_EVENTS,
};

export const DOUBLE_TREASURE_CANDLE_PERIODS: DoublePeriodGroup = {
	emoji: MISCELLANEOUS_EMOJIS.TreasureCandle,
	name: "double-treasure-candles",
	source: TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
};

export function doubleSeasonalLightPeriods(season: Season): DoublePeriodGroup {
	return {
		emoji: seasonalCandleEmoji(season.id),
		name: "double-seasonal-light",
		source: season.doubleSeasonalLight?.dates ?? [],
	};
}

export function dailyGuidesURL(date: string, skyToday: string) {
	return date === skyToday ? "/daily-guides" : `/daily-guides?date=${date}`;
}
