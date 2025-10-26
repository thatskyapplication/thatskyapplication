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
			[
				{ cosmetic: Cosmetic.EmoteBalance1 },
				{ cosmetic: Cosmetic.EmoteBalance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfAirHair,
					cost: { seasonalCandles: 13 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfAirBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBalance3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBalance4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfAirBlessing2,
					cost: { seasonalCandles: 23 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.ProphetOfAirMask, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ProphetOfAirCape,
					cost: { seasonalCandles: 29 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ProphetOfAirBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBalance1 },
				{
					cosmetic: Cosmetic.EmoteBalance2,
					cost: { hearts: 3 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ProphetOfAirProp,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfAirBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfAirHair,
					cost: { candles: 44 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ProphetOfAirSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ProphetOfAirWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBalance3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBalance4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfAirMask,
					cost: { candles: 54 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfAirBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ProphetOfAirCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 5, 12), end: skyDate(2022, 5, 16) },
			{ start: skyDate(2025, 9, 25), end: skyDate(2025, 9, 29) },
		],
		returning: [2],
	},
});
