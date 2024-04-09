/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import { URL } from "node:url";
import type { Locale } from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { CDN_URL, Realm } from "../Utility/Constants.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	skyDate,
} from "../Utility/dates.js";
import { type SeasonEmojis, formatEmoji, SEASON_EMOJIS } from "../Utility/emojis.js";

export enum SeasonName {
	Gratitude = "Season of Gratitude",
	Lightseekers = "Season of Lightseekers",
	Belonging = "Season of Belonging",
	Rhythm = "Season of Rhythm",
	Enchantment = "Season of Enchantment",
	Sanctuary = "Season of Sanctuary",
	Prophecy = "Season of Prophecy",
	Dreams = "Season of Dreams",
	Assembly = "Season of Assembly",
	LittlePrince = "Season of the Little Prince",
	Flight = "Season of Flight",
	Abyss = "Season of Abyss",
	Performance = "Season of Performance",
	Shattering = "Season of Shattering",
	Aurora = "Season of AURORA",
	Remembrance = "Season of Remembrance",
	Passage = "The Season of Passage",
	Moments = "The Season of Moments",
	Revival = "Season of Revival",
	NineColoredDeer = "Season of the Nine-Colored Deer",
	Nesting = "Season of Nesting",
}

export const SEASON_NAME_VALUES = Object.values(SeasonName);

export const SeasonNameToSeasonalEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.Gratitude,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.Lightseekers,
	[SeasonName.Belonging]: SEASON_EMOJIS.Belonging,
	[SeasonName.Rhythm]: SEASON_EMOJIS.Rhythm,
	[SeasonName.Enchantment]: SEASON_EMOJIS.Enchantment,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.Sanctuary,
	[SeasonName.Prophecy]: SEASON_EMOJIS.Prophecy,
	[SeasonName.Dreams]: SEASON_EMOJIS.Dreams,
	[SeasonName.Assembly]: SEASON_EMOJIS.Assembly,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrince,
	[SeasonName.Flight]: SEASON_EMOJIS.Flight,
	[SeasonName.Abyss]: SEASON_EMOJIS.Abyss,
	[SeasonName.Performance]: SEASON_EMOJIS.Performance,
	[SeasonName.Shattering]: SEASON_EMOJIS.Shattering,
	[SeasonName.Aurora]: SEASON_EMOJIS.Aurora,
	[SeasonName.Remembrance]: SEASON_EMOJIS.Remembrance,
	[SeasonName.Passage]: SEASON_EMOJIS.Passage,
	[SeasonName.Moments]: SEASON_EMOJIS.Moments,
	[SeasonName.Revival]: SEASON_EMOJIS.Revival,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeer,
	// @ts-expect-error No seasonal emoji for Season of Nesting.
	[SeasonName.Nesting]: SEASON_EMOJIS.Nesting,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: SEASON_EMOJIS.GratitudeCandle,
	[SeasonName.Lightseekers]: SEASON_EMOJIS.LightseekersCandle,
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingCandle,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmCandle,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentCandle,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryCandle,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyCandle,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsCandle,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyCandle,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceCandle,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightCandle,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssCandle,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceCandle,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringCandle,
	[SeasonName.Aurora]: SEASON_EMOJIS.AuroraCandle,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceCandle,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageCandle,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsCandle,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalCandle,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeerCandle,
	// @ts-expect-error Seasonal emoji needs to be added first.
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingCandle,
} as const satisfies Readonly<Record<SeasonName, SeasonEmojis>>;

export const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: SEASON_EMOJIS.BelongingHeart,
	[SeasonName.Rhythm]: SEASON_EMOJIS.RhythmHeart,
	[SeasonName.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
	[SeasonName.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
	[SeasonName.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
	[SeasonName.Dreams]: SEASON_EMOJIS.DreamsHeart,
	[SeasonName.Assembly]: SEASON_EMOJIS.AssemblyHeart,
	[SeasonName.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
	[SeasonName.Flight]: SEASON_EMOJIS.FlightHeart,
	[SeasonName.Abyss]: SEASON_EMOJIS.AbyssHeart,
	[SeasonName.Performance]: SEASON_EMOJIS.PerformanceHeart,
	[SeasonName.Shattering]: SEASON_EMOJIS.ShatteringHeart,
	[SeasonName.Aurora]: SEASON_EMOJIS.AuroraHeart,
	[SeasonName.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
	[SeasonName.Passage]: SEASON_EMOJIS.PassageHeart,
	[SeasonName.Moments]: SEASON_EMOJIS.MomentsHeart,
	[SeasonName.Revival]: SEASON_EMOJIS.RevivalHeart,
	[SeasonName.NineColoredDeer]: SEASON_EMOJIS.NineColoredDeerHeart,
	// @ts-expect-error Seasonal emoji needs to be added first.
	[SeasonName.Nesting]: SEASON_EMOJIS.NestingHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, SeasonEmojis>
>;

export type RotationNumber = 1 | 2 | 3;
export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;

enum SeasonFlags {
	Gratitude = 1 << 0,
	Lightseekers = 1 << 1,
	Belonging = 1 << 2,
	Rhythm = 1 << 3,
	Enchantment = 1 << 4,
	Sanctuary = 1 << 5,
	Prophecy = 1 << 6,
	Dreams = 1 << 7,
	Assembly = 1 << 8,
	LittlePrince = 1 << 9,
	Flight = 1 << 10,
	Abyss = 1 << 11,
	Performance = 1 << 12,
	Shattering = 1 << 13,
	Aurora = 1 << 14,
	Remembrance = 1 << 15,
	Passage = 1 << 16,
	Moments = 1 << 17,
	Revival = 1 << 18,
	NineColoredDeer = 1 << 19,
}

export const SeasonFlagsToSeasonName = {
	[SeasonFlags.Gratitude]: SeasonName.Gratitude,
	[SeasonFlags.Lightseekers]: SeasonName.Lightseekers,
	[SeasonFlags.Belonging]: SeasonName.Belonging,
	[SeasonFlags.Rhythm]: SeasonName.Rhythm,
	[SeasonFlags.Enchantment]: SeasonName.Enchantment,
	[SeasonFlags.Sanctuary]: SeasonName.Sanctuary,
	[SeasonFlags.Prophecy]: SeasonName.Prophecy,
	[SeasonFlags.Dreams]: SeasonName.Dreams,
	[SeasonFlags.Assembly]: SeasonName.Assembly,
	[SeasonFlags.LittlePrince]: SeasonName.LittlePrince,
	[SeasonFlags.Flight]: SeasonName.Flight,
	[SeasonFlags.Abyss]: SeasonName.Abyss,
	[SeasonFlags.Performance]: SeasonName.Performance,
	[SeasonFlags.Shattering]: SeasonName.Shattering,
	[SeasonFlags.Aurora]: SeasonName.Aurora,
	[SeasonFlags.Remembrance]: SeasonName.Remembrance,
	[SeasonFlags.Passage]: SeasonName.Passage,
	[SeasonFlags.Moments]: SeasonName.Moments,
	[SeasonFlags.Revival]: SeasonName.Revival,
	[SeasonFlags.NineColoredDeer]: SeasonName.NineColoredDeer,
} as const satisfies Readonly<Record<SeasonFlags, SeasonName>>;

export const SEASON_FLAGS_TO_SEASON_NAME_ENTRIES = Object.entries(SeasonFlagsToSeasonName);
type SeasonalCandlesRotation = Readonly<{ rotation: Exclude<RotationNumber, 3>; realm: Realm }[]>;

interface SeasonData {
	name: SeasonName;
	start: DateTime;
	end: DateTime;
	readonly seasonalCandlesRotation: SeasonalCandlesRotation;
}

class Season {
	public readonly name: SeasonName;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly duration: number;

	public readonly emoji: SeasonEmojis;

	public readonly candleEmoji: SeasonEmojis;

	private readonly seasonalCandlesRotation: SeasonalCandlesRotation;

	public constructor(data: SeasonData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.duration = this.end.diff(this.start, "days").days + 1;
		this.emoji = SeasonNameToSeasonalEmoji[this.name];
		this.candleEmoji = SeasonNameToSeasonalCandleEmoji[this.name];
		this.seasonalCandlesRotation = data.seasonalCandlesRotation;
	}

	public daysLeft(date: DateTime, locale: Locale) {
		const daysLeftInSeason = this.end.diff(date, "days").days;
		return t("days-left.season", { lng: locale, ns: "general", count: daysLeftInSeason });
	}

	public remainingSeasonalCandles(date: DateTime) {
		const { end, duration, start } = this;

		const seasonalDoubleLightEvent =
			DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE >= start && DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE <= end;

		// Calculate the total amount of seasonal candles.
		let seasonalCandlesTotal = duration * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesTotalWithSeasonPass =
			duration * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (seasonalDoubleLightEvent) {
			seasonalCandlesTotal += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
			seasonalCandlesTotalWithSeasonPass += DOUBLE_SEASONAL_LIGHT_EVENT_DURATION;
		}

		// Calculate the amount of seasonal candles so far.
		const daysSoFar = date.diff(start, "days").days + 1;
		let seasonalCandlesSoFar = daysSoFar * SEASONAL_CANDLES_PER_DAY;

		let seasonalCandlesSoFarWithSeasonPass =
			daysSoFar * SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS + SEASON_PASS_SEASONAL_CANDLES_BONUS;

		if (seasonalDoubleLightEvent && date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days >= 0) {
			const difference = date.diff(DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, "days").days;

			const extraSeasonalCandles =
				// The difference will be a negative number if the event is still ongoing.
				difference > 0 ? DOUBLE_SEASONAL_LIGHT_EVENT_DURATION : DOUBLE_SEASONAL_LIGHT_EVENT_DURATION + difference;

			seasonalCandlesSoFar += extraSeasonalCandles;
			seasonalCandlesSoFarWithSeasonPass += extraSeasonalCandles;
		}

		// Calculate the amount of seasonal candles left.
		return {
			seasonalCandlesLeft: seasonalCandlesTotal - seasonalCandlesSoFar,
			seasonalCandlesLeftWithSeasonPass: seasonalCandlesTotalWithSeasonPass - seasonalCandlesSoFarWithSeasonPass,
		};
	}

	public resolveSeasonalCandlesRotation(date: DateTime) {
		return this.seasonalCandlesRotation[date.diff(this.start, "days").days % 10]!;
	}

	public seasonalCandlesRotationURL(realm: Realm, rotation: RotationNumber) {
		return String(
			new URL(
				`daily_guides/seasonal_candles/${this.name.toLowerCase().replaceAll(/ |-/g, "_")}/${realm
					.toLowerCase()
					.replaceAll(" ", "_")}/rotation_${rotation}.webp`,
				CDN_URL,
			),
		);
	}
}

const SEASONS = [
	new Season({
		name: SeasonName.Revival,
		start: skyDate(2_023, 10, 16),
		end: skyDate(2_023, 12, 31),
		seasonalCandlesRotation: [
			{ rotation: 2, realm: Realm.DaylightPrairie },
			{ rotation: 1, realm: Realm.HiddenForest },
			{ rotation: 1, realm: Realm.ValleyOfTriumph },
			{ rotation: 1, realm: Realm.GoldenWasteland },
			{ rotation: 1, realm: Realm.VaultOfKnowledge },
			{ rotation: 1, realm: Realm.DaylightPrairie },
			{ rotation: 2, realm: Realm.HiddenForest },
			{ rotation: 2, realm: Realm.ValleyOfTriumph },
			{ rotation: 2, realm: Realm.GoldenWasteland },
			{ rotation: 2, realm: Realm.VaultOfKnowledge },
		],
	}),
	new Season({
		name: SeasonName.NineColoredDeer,
		start: skyDate(2_024, 1, 15),
		end: skyDate(2_024, 3, 31),
		seasonalCandlesRotation: [
			{ rotation: 1, realm: Realm.HiddenForest },
			{ rotation: 1, realm: Realm.ValleyOfTriumph },
			{ rotation: 1, realm: Realm.GoldenWasteland },
			{ rotation: 1, realm: Realm.VaultOfKnowledge },
			{ rotation: 1, realm: Realm.DaylightPrairie },
			{ rotation: 2, realm: Realm.HiddenForest },
			{ rotation: 2, realm: Realm.ValleyOfTriumph },
			{ rotation: 2, realm: Realm.GoldenWasteland },
			{ rotation: 2, realm: Realm.VaultOfKnowledge },
			{ rotation: 2, realm: Realm.DaylightPrairie },
		],
	}),
	new Season({
		name: SeasonName.Nesting,
		start: skyDate(2_024, 4, 15),
		// @ts-expect-error Unknown.
		end: skyDate(2_024),
		seasonalCandlesRotation: [
			{ rotation: 1, realm: Realm.ValleyOfTriumph },
			{ rotation: 1, realm: Realm.GoldenWasteland },
			{ rotation: 1, realm: Realm.VaultOfKnowledge },
			{ rotation: 1, realm: Realm.DaylightPrairie },
			{ rotation: 1, realm: Realm.HiddenForest },
			{ rotation: 2, realm: Realm.ValleyOfTriumph },
			{ rotation: 2, realm: Realm.GoldenWasteland },
			{ rotation: 2, realm: Realm.VaultOfKnowledge },
			{ rotation: 2, realm: Realm.DaylightPrairie },
			{ rotation: 2, realm: Realm.HiddenForest },
		],
	}),
] as const satisfies Readonly<Season[]>;

export function resolveSeason(date: DateTime) {
	return SEASONS.find(({ start, end }) => date >= start && date <= end) ?? null;
}

export function nextSeason(date: DateTime) {
	const closestSeasonIndex = SEASONS.findLastIndex(({ start }) => date >= start);
	return closestSeasonIndex === -1 ? null : SEASONS.at(closestSeasonIndex + 1) ?? null;
}

export function isSeasonName(season: string): season is SeasonName {
	return SEASON_NAME_VALUES.includes(season as SeasonName);
}

export function resolveBitsToSeasons(bits: number) {
	const platforms = [];

	for (const [bit, season] of Object.entries(SeasonFlagsToSeasonName)) {
		const bit_ = Number(bit);
		if ((bits & bit_) === bit_) platforms.push(formatEmoji(SeasonNameToSeasonalEmoji[season]));
	}

	return platforms;
}
