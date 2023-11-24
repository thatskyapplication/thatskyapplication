/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import { URL } from "node:url";
import type { DateTime } from "luxon";
import { CDN_URL, Realm } from "../Utility/Constants.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	skyDate,
} from "../Utility/dates.js";
import { type Emoji, formatEmoji, MISCELLANEOUS_EMOJIS, type MiscellaneousEmojis } from "../Utility/emojis.js";

export enum SeasonName {
	Gratitude = "Gratitude",
	Lightseekers = "Lightseekers",
	Belonging = "Belonging",
	Rhythm = "Rhythm",
	Enchantment = "Enchantment",
	Sanctuary = "Sanctuary",
	Prophecy = "Prophecy",
	Dreams = "Dreams",
	Assembly = "Assembly",
	LittlePrince = "Little Prince",
	Flight = "Flight",
	Abyss = "Abyss",
	Performance = "Performance",
	Shattering = "Shattering",
	Aurora = "AURORA",
	Remembrance = "Remembrance",
	Passage = "Passage",
	Moments = "Moments",
	Revival = "Revival",
}

const SEASON_NAME_VALUES = Object.values(SeasonName);

export const SeasonNameToSeasonalEmoji = {
	[SeasonName.Gratitude]: MISCELLANEOUS_EMOJIS.SeasonGratitude,
	[SeasonName.Lightseekers]: MISCELLANEOUS_EMOJIS.SeasonLightseekers,
	[SeasonName.Belonging]: MISCELLANEOUS_EMOJIS.SeasonBelonging,
	[SeasonName.Rhythm]: MISCELLANEOUS_EMOJIS.SeasonRhythm,
	[SeasonName.Enchantment]: MISCELLANEOUS_EMOJIS.SeasonEnchantment,
	[SeasonName.Sanctuary]: MISCELLANEOUS_EMOJIS.SeasonSanctuary,
	[SeasonName.Prophecy]: MISCELLANEOUS_EMOJIS.SeasonProphecy,
	[SeasonName.Dreams]: MISCELLANEOUS_EMOJIS.SeasonDreams,
	[SeasonName.Assembly]: MISCELLANEOUS_EMOJIS.SeasonAssembly,
	[SeasonName.LittlePrince]: MISCELLANEOUS_EMOJIS.SeasonLittlePrince,
	[SeasonName.Flight]: MISCELLANEOUS_EMOJIS.SeasonFlight,
	[SeasonName.Abyss]: MISCELLANEOUS_EMOJIS.SeasonAbyss,
	[SeasonName.Performance]: MISCELLANEOUS_EMOJIS.SeasonPerformance,
	[SeasonName.Shattering]: MISCELLANEOUS_EMOJIS.SeasonShattering,
	[SeasonName.Aurora]: MISCELLANEOUS_EMOJIS.SeasonAurora,
	[SeasonName.Remembrance]: MISCELLANEOUS_EMOJIS.SeasonRemembrance,
	[SeasonName.Passage]: MISCELLANEOUS_EMOJIS.SeasonPassage,
	[SeasonName.Moments]: MISCELLANEOUS_EMOJIS.SeasonMoments,
	[SeasonName.Revival]: MISCELLANEOUS_EMOJIS.SeasonRevival,
} as const satisfies Readonly<Record<SeasonName, MiscellaneousEmojis>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: MISCELLANEOUS_EMOJIS.CandleGratitude,
	[SeasonName.Lightseekers]: MISCELLANEOUS_EMOJIS.CandleLightseekers,
	[SeasonName.Belonging]: MISCELLANEOUS_EMOJIS.CandleBelonging,
	[SeasonName.Rhythm]: MISCELLANEOUS_EMOJIS.CandleRhythm,
	[SeasonName.Enchantment]: MISCELLANEOUS_EMOJIS.CandleEnchantment,
	[SeasonName.Sanctuary]: MISCELLANEOUS_EMOJIS.CandleSanctuary,
	[SeasonName.Prophecy]: MISCELLANEOUS_EMOJIS.CandleProphecy,
	[SeasonName.Dreams]: MISCELLANEOUS_EMOJIS.CandleDreams,
	[SeasonName.Assembly]: MISCELLANEOUS_EMOJIS.CandleAssembly,
	[SeasonName.LittlePrince]: MISCELLANEOUS_EMOJIS.CandleLittlePrince,
	[SeasonName.Flight]: MISCELLANEOUS_EMOJIS.CandleFlight,
	[SeasonName.Abyss]: MISCELLANEOUS_EMOJIS.CandleAbyss,
	[SeasonName.Performance]: MISCELLANEOUS_EMOJIS.CandlePerformance,
	[SeasonName.Shattering]: MISCELLANEOUS_EMOJIS.CandleShattering,
	[SeasonName.Aurora]: MISCELLANEOUS_EMOJIS.CandleAurora,
	[SeasonName.Remembrance]: MISCELLANEOUS_EMOJIS.CandleRemembrance,
	[SeasonName.Passage]: MISCELLANEOUS_EMOJIS.CandlePassage,
	[SeasonName.Moments]: MISCELLANEOUS_EMOJIS.CandleMoments,
	[SeasonName.Revival]: MISCELLANEOUS_EMOJIS.CandleRevival,
} as const satisfies Readonly<Record<SeasonName, MiscellaneousEmojis>>;

export const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: MISCELLANEOUS_EMOJIS.HeartBelonging,
	[SeasonName.Rhythm]: MISCELLANEOUS_EMOJIS.HeartRhythm,
	[SeasonName.Enchantment]: MISCELLANEOUS_EMOJIS.HeartEnchantment,
	[SeasonName.Sanctuary]: MISCELLANEOUS_EMOJIS.HeartSanctuary,
	[SeasonName.Prophecy]: MISCELLANEOUS_EMOJIS.HeartProphecy,
	[SeasonName.Dreams]: MISCELLANEOUS_EMOJIS.HeartDreams,
	[SeasonName.Assembly]: MISCELLANEOUS_EMOJIS.HeartAssembly,
	[SeasonName.LittlePrince]: MISCELLANEOUS_EMOJIS.HeartLittlePrince,
	[SeasonName.Flight]: MISCELLANEOUS_EMOJIS.HeartFlight,
	[SeasonName.Abyss]: MISCELLANEOUS_EMOJIS.HeartAbyss,
	[SeasonName.Performance]: MISCELLANEOUS_EMOJIS.HeartPerformance,
	[SeasonName.Shattering]: MISCELLANEOUS_EMOJIS.HeartShattering,
	[SeasonName.Aurora]: MISCELLANEOUS_EMOJIS.HeartAurora,
	[SeasonName.Remembrance]: MISCELLANEOUS_EMOJIS.HeartRemembrance,
	[SeasonName.Passage]: MISCELLANEOUS_EMOJIS.HeartPassage,
	[SeasonName.Moments]: MISCELLANEOUS_EMOJIS.HeartMoments,
	[SeasonName.Revival]: MISCELLANEOUS_EMOJIS.HeartRevival,
} as const satisfies Readonly<Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, MiscellaneousEmojis>>;

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

	public readonly emoji: Emoji;

	public readonly candleEmoji: Emoji;

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
				`daily_guides/seasonal_candles/${resolveFullSeasonName(this.name).toLowerCase().replaceAll(" ", "_")}/${realm
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

export function resolveFullSeasonName(season: SeasonName) {
	return `Season of ${season === SeasonName.LittlePrince ? "the " : ""}${season}`;
}

export function resolveBitsToSeasons(bits: number) {
	const platforms = [];

	for (const [bit, season] of Object.entries(SeasonFlagsToSeasonName)) {
		const bit_ = Number(bit);
		if ((bits & bit_) === bit_) platforms.push(formatEmoji(SeasonNameToSeasonalEmoji[season]));
	}

	return platforms;
}
