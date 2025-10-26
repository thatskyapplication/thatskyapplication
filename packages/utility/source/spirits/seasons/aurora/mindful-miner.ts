import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.RaiseTheRoof;

export default new SeasonalSpirit({
	id: SpiritId.MindfulMiner,
	seasonId: SeasonId.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
				{ cosmetic: Cosmetic.EmoteRaiseTheRoof2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MindfulMinerBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ translation: CosmeticCommon.Mask, cosmetic: Cosmetic.MindfulMinerMask, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteRaiseTheRoof3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteRaiseTheRoof4, seasonPass: true, level: 4 },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MindfulMinerHair,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MindfulMinerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MindfulMinerBlessing3,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MindfulMinerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.MindfulMinerCape,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.MindfulMinerBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
				{
					cosmetic: Cosmetic.EmoteRaiseTheRoof2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MindfulMinerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.MindfulMinerMask,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MindfulMinerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteRaiseTheRoof3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteRaiseTheRoof4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MindfulMinerHair,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MindfulMinerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MindfulMinerOutfit,
					cost: { candles: 55 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.MindfulMinerCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 2, 27), end: skyDate(2025, 3, 3) }],
		returning: [9],
	},
});
