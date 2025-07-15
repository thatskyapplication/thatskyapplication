import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Balance;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfAir,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteBalance1 },
			{ cosmetic: Cosmetic.EmoteBalance2 },
			{
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { seasonalCandles: 13 },
			},
			{ cosmetic: Cosmetic.ProphetOfAirBlessing1 },
			{
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteBalance4 },
			{
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { seasonalCandles: 23 },
			},
			{ cosmetic: Cosmetic.ProphetOfAirMask },
			{
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { seasonalCandles: 29 },
			},
			{ cosmetic: Cosmetic.ProphetOfAirBlessing3 },
			{
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteBalance1 },
			{
				cosmetic: Cosmetic.EmoteBalance2,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirProp,
				cost: { candles: 15 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirHair,
				cost: { candles: 44 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ProphetOfAirWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteBalance3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteBalance4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirMask,
				cost: { candles: 54 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfAirCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2022, 5, 12), end: skyDate(2022, 5, 16) }],
		returning: [2],
	},
});
