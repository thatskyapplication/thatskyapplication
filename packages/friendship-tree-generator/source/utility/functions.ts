import {
	type ItemCost,
	SeasonId,
	type SeasonIds,
	type Snowflake,
} from "@thatskyapplication/utility";
import {
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
} from "./emojis.js";

export function resolveCostEmojiId(cost: ItemCost, seasonId: SeasonIds | undefined): Snowflake {
	if ("candles" in cost) {
		return MISCELLANEOUS_EMOJIS.Candle.id;
	}

	if ("hearts" in cost) {
		return MISCELLANEOUS_EMOJIS.Heart.id;
	}

	if ("ascendedCandles" in cost) {
		return MISCELLANEOUS_EMOJIS.AscendedCandle.id;
	}

	if (seasonId !== undefined && cost.seasonalCandles.length > 0) {
		return SeasonIdToSeasonalCandleEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalCandle.id;
	}

	if (
		seasonId !== undefined &&
		seasonId !== SeasonId.Gratitude &&
		seasonId !== SeasonId.Lightseekers &&
		cost.seasonalHearts.length > 0
	) {
		return SeasonIdToSeasonalHeartEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalHeart.id;
	}

	throw new Error("A cost was specified with no currency.");
}
