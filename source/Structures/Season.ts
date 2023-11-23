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
import { type Emoji, EMOJI, formatEmoji } from "../Utility/emojis.js";

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
	[SeasonName.Gratitude]: EMOJI.SeasonGratitude,
	[SeasonName.Lightseekers]: EMOJI.SeasonLightseekers,
	[SeasonName.Belonging]: EMOJI.SeasonBelonging,
	[SeasonName.Rhythm]: EMOJI.SeasonRhythm,
	[SeasonName.Enchantment]: EMOJI.SeasonEnchantment,
	[SeasonName.Sanctuary]: EMOJI.SeasonSanctuary,
	[SeasonName.Prophecy]: EMOJI.SeasonProphecy,
	[SeasonName.Dreams]: EMOJI.SeasonDreams,
	[SeasonName.Assembly]: EMOJI.SeasonAssembly,
	[SeasonName.LittlePrince]: EMOJI.SeasonLittlePrince,
	[SeasonName.Flight]: EMOJI.SeasonFlight,
	[SeasonName.Abyss]: EMOJI.SeasonAbyss,
	[SeasonName.Performance]: EMOJI.SeasonPerformance,
	[SeasonName.Shattering]: EMOJI.SeasonShattering,
	[SeasonName.Aurora]: EMOJI.SeasonAurora,
	[SeasonName.Remembrance]: EMOJI.SeasonRemembrance,
	[SeasonName.Passage]: EMOJI.SeasonPassage,
	[SeasonName.Moments]: EMOJI.SeasonMoments,
	[SeasonName.Revival]: EMOJI.SeasonRevival,
} as const satisfies Readonly<Record<SeasonName, Emoji>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: EMOJI.CandleGratitude,
	[SeasonName.Lightseekers]: EMOJI.CandleLightseekers,
	[SeasonName.Belonging]: EMOJI.CandleBelonging,
	[SeasonName.Rhythm]: EMOJI.CandleRhythm,
	[SeasonName.Enchantment]: EMOJI.CandleEnchantment,
	[SeasonName.Sanctuary]: EMOJI.CandleSanctuary,
	[SeasonName.Prophecy]: EMOJI.CandleProphecy,
	[SeasonName.Dreams]: EMOJI.CandleDreams,
	[SeasonName.Assembly]: EMOJI.CandleAssembly,
	[SeasonName.LittlePrince]: EMOJI.CandleLittlePrince,
	[SeasonName.Flight]: EMOJI.CandleFlight,
	[SeasonName.Abyss]: EMOJI.CandleAbyss,
	[SeasonName.Performance]: EMOJI.CandlePerformance,
	[SeasonName.Shattering]: EMOJI.CandleShattering,
	[SeasonName.Aurora]: EMOJI.CandleAurora,
	[SeasonName.Remembrance]: EMOJI.CandleRemembrance,
	[SeasonName.Passage]: EMOJI.CandlePassage,
	[SeasonName.Moments]: EMOJI.CandleMoments,
	[SeasonName.Revival]: EMOJI.CandleRevival,
} as const satisfies Readonly<Record<SeasonName, Emoji>>;

export const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: EMOJI.HeartBelonging,
	[SeasonName.Rhythm]: EMOJI.HeartRhythm,
	[SeasonName.Enchantment]: EMOJI.HeartEnchantment,
	[SeasonName.Sanctuary]: EMOJI.HeartSanctuary,
	[SeasonName.Prophecy]: EMOJI.HeartProphecy,
	[SeasonName.Dreams]: EMOJI.HeartDreams,
	[SeasonName.Assembly]: EMOJI.HeartAssembly,
	[SeasonName.LittlePrince]: EMOJI.HeartLittlePrince,
	[SeasonName.Flight]: EMOJI.HeartFlight,
	[SeasonName.Abyss]: EMOJI.HeartAbyss,
	[SeasonName.Performance]: EMOJI.HeartPerformance,
	[SeasonName.Shattering]: EMOJI.HeartShattering,
	[SeasonName.Aurora]: EMOJI.HeartAurora,
	[SeasonName.Remembrance]: EMOJI.HeartRemembrance,
	[SeasonName.Passage]: EMOJI.HeartPassage,
	[SeasonName.Moments]: EMOJI.HeartMoments,
	[SeasonName.Revival]: EMOJI.HeartRevival,
} as const satisfies Readonly<Record<Exclude<SeasonName, SeasonName.Gratitude | SeasonName.Lightseekers>, Emoji>>;

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
