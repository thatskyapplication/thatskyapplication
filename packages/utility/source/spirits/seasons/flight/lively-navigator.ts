import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Navigate;

export default new SeasonalSpirit({
	id: SpiritId.LivelyNavigator,
	seasonId: SeasonId.Flight,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteNavigate1 },
			{ cosmetic: Cosmetic.EmoteNavigate2 },
			{
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.LivelyNavigatorHair },
			{
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.LivelyNavigatorBlessing2 },
			{
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteNavigate4 },
			{
				cosmetic: Cosmetic.LivelyNavigatorTrailSpell1,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.LivelyNavigatorCape },
			{
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.LivelyNavigatorTrailSpell2 },
			{
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteNavigate1 },
			{
				cosmetic: Cosmetic.EmoteNavigate2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorHairAccessory,
				cost: { candles: 45 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteNavigate3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteNavigate4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorMusicSheet,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorHair,
				cost: { candles: 55 },
			},
			{
				cosmetic: Cosmetic.LivelyNavigatorCape,
				cost: { candles: 70 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2023, 8, 17), end: skyDate(2023, 8, 21) },
			{ start: skyDate(2025, 5, 8), end: skyDate(2025, 5, 12) },
		],
	},
});
