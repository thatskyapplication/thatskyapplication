import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Ouch;

export default new SeasonalSpirit({
	id: SpiritId.BumblingBoatswain,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteOuch1 },
				{ cosmetic: Cosmetic.EmoteOuch2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing1,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BumblingBoatswainMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteOuch3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteOuch4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing3,
					cost: { seasonalCandles: 20 },
				},
				{ cosmetic: Cosmetic.BumblingBoatswainCape, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteOuch1 },
				{ cosmetic: Cosmetic.EmoteOuch2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.BumblingBoatswainMask,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BumblingBoatswainSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BumblingBoatswainWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteOuch3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteOuch4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.BumblingBoatswainMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BumblingBoatswainBlessing2,
					cost: { candles: 5 },
				},
				{
					cosmetic: Cosmetic.BumblingBoatswainHairAccessory,
					cost: { candles: 35 },
				},
			],
			[
				{
					cosmetic: Cosmetic.BumblingBoatswainCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 10, 10), end: skyDate(2024, 10, 14) }],
		returning: [10],
	},
});
