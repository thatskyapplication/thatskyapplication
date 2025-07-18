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
			{ cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
			{ cosmetic: Cosmetic.EmoteRaiseTheRoof2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ cosmetic: Cosmetic.MindfulMinerMask },
			{
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EmoteRaiseTheRoof4 },
			{
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { seasonalCandles: 24 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.MindfulMinerBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.MindfulMinerBlessing3,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.MindfulMinerOutfit },
			{
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { seasonalCandles: 32 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.MindfulMinerBlessing4,
			},
			{
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteRaiseTheRoof1 },
			{
				cosmetic: Cosmetic.EmoteRaiseTheRoof2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.MindfulMinerBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MindfulMinerMask,
				cost: { candles: 35 },
			},
			{
				cosmetic: Cosmetic.MindfulMinerSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.MindfulMinerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteRaiseTheRoof3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteRaiseTheRoof4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.MindfulMinerHair,
				cost: { candles: 40 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.MindfulMinerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MindfulMinerOutfit,
				cost: { hearts: 55 },
			},
			{
				cosmetic: Cosmetic.MindfulMinerCape,
				cost: { candles: 75 },
			},
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 2, 27), end: skyDate(2025, 3, 3) }],
		returning: [9],
	},
});
