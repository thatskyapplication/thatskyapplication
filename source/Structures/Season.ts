/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import { URL } from "node:url";
import { formatEmoji } from "discord.js";
import type { DateTime } from "luxon";
import { CDN_URL, Emoji, Realm } from "../Utility/Constants.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_DURATION,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	skyDate,
} from "../Utility/dates.js";

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
	[SeasonName.Gratitude]: Emoji.SeasonGratitude,
	[SeasonName.Lightseekers]: Emoji.SeasonLightseekers,
	[SeasonName.Belonging]: Emoji.SeasonBelonging,
	[SeasonName.Rhythm]: Emoji.SeasonRhythm,
	[SeasonName.Enchantment]: Emoji.SeasonEnchantment,
	[SeasonName.Sanctuary]: Emoji.SeasonSanctuary,
	[SeasonName.Prophecy]: Emoji.SeasonProphecy,
	[SeasonName.Dreams]: Emoji.SeasonDreams,
	[SeasonName.Assembly]: Emoji.SeasonAssembly,
	[SeasonName.LittlePrince]: Emoji.SeasonLittlePrince,
	[SeasonName.Flight]: Emoji.SeasonFlight,
	[SeasonName.Abyss]: Emoji.SeasonAbyss,
	[SeasonName.Performance]: Emoji.SeasonPerformance,
	[SeasonName.Shattering]: Emoji.SeasonShattering,
	[SeasonName.Aurora]: Emoji.SeasonAurora,
	[SeasonName.Remembrance]: Emoji.SeasonRemembrance,
	[SeasonName.Passage]: Emoji.SeasonPassage,
	[SeasonName.Moments]: Emoji.SeasonMoments,
	[SeasonName.Revival]: Emoji.SeasonRevival,
} as const satisfies Readonly<Record<SeasonName, Emoji>>;

export const SeasonNameToSeasonalCandleEmoji = {
	[SeasonName.Gratitude]: Emoji.CandleGratitude,
	[SeasonName.Lightseekers]: Emoji.CandleLightseekers,
	[SeasonName.Belonging]: Emoji.CandleBelonging,
	[SeasonName.Rhythm]: Emoji.CandleRhythm,
	[SeasonName.Enchantment]: Emoji.CandleEnchantment,
	[SeasonName.Sanctuary]: Emoji.CandleSanctuary,
	[SeasonName.Prophecy]: Emoji.CandleProphecy,
	[SeasonName.Dreams]: Emoji.CandleDreams,
	[SeasonName.Assembly]: Emoji.CandleAssembly,
	[SeasonName.LittlePrince]: Emoji.CandleLittlePrince,
	[SeasonName.Flight]: Emoji.CandleFlight,
	[SeasonName.Abyss]: Emoji.CandleAbyss,
	[SeasonName.Performance]: Emoji.CandlePerformance,
	[SeasonName.Shattering]: Emoji.CandleShattering,
	[SeasonName.Aurora]: Emoji.CandleAurora,
	[SeasonName.Remembrance]: Emoji.CandleRemembrance,
	[SeasonName.Passage]: Emoji.CandlePassage,
	[SeasonName.Moments]: Emoji.CandleMoments,
	[SeasonName.Revival]: Emoji.CandleRevival,
} as const satisfies Readonly<Record<SeasonName, Emoji>>;

export const SeasonNameToSeasonalHeartEmoji = {
	[SeasonName.Belonging]: Emoji.HeartBelonging,
	[SeasonName.Rhythm]: Emoji.HeartRhythm,
	[SeasonName.Enchantment]: Emoji.HeartEnchantment,
	[SeasonName.Sanctuary]: Emoji.HeartSanctuary,
	[SeasonName.Prophecy]: Emoji.HeartProphecy,
	[SeasonName.Dreams]: Emoji.HeartDreams,
	[SeasonName.Assembly]: Emoji.HeartAssembly,
	[SeasonName.LittlePrince]: Emoji.HeartLittlePrince,
	[SeasonName.Flight]: Emoji.HeartFlight,
	[SeasonName.Abyss]: Emoji.HeartAbyss,
	[SeasonName.Performance]: Emoji.HeartPerformance,
	[SeasonName.Shattering]: Emoji.HeartShattering,
	[SeasonName.Aurora]: Emoji.HeartAurora,
	[SeasonName.Remembrance]: Emoji.HeartRemembrance,
	[SeasonName.Passage]: Emoji.HeartPassage,
	[SeasonName.Moments]: Emoji.HeartMoments,
	[SeasonName.Revival]: Emoji.HeartRevival,
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

export function currentSeason(date: DateTime) {
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
