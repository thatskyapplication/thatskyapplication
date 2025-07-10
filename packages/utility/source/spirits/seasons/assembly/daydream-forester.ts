import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Bubbles;

export default new SeasonalSpirit({
	id: SpiritId.DaydreamForester,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteBubbles1 },
			{ cosmetic: Cosmetic.EmoteBubbles2 },
			{
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { seasonalCandles: 5 },
			},
			{ cosmetic: Cosmetic.DaydreamForesterBlessing1 },
			{
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.EmoteBubbles4 },
			{
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { seasonalCandles: 15 },
			},
			{ cosmetic: Cosmetic.DaydreamForesterBlessing2 },
			{
				cosmetic: Cosmetic.DaydreamForesterBlessing3,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.DaydreamForesterHair },
			{
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteBubbles1 },
			{
				cosmetic: Cosmetic.EmoteBubbles2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterMask,
				cost: { candles: 24 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteBubbles3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteBubbles4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.DaydreamForesterHair,
				cost: { candles: 44 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 4, 28), end: skyDate(2022, 5, 2) },
			{ start: skyDate(2024, 3, 14), end: skyDate(2024, 3, 18) },
		],
	},
});
