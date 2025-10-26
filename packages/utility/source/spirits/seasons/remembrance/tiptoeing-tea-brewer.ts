import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Tiptoeing;

export default new SeasonalSpirit({
	id: SpiritId.TiptoeingTeaBrewer,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteTiptoeing1 },
				{ cosmetic: Cosmetic.EmoteTiptoeing2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TiptoeingTeaBrewerHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTiptoeing3,
					cost: { seasonalCandles: 24 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteTiptoeing4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing2,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TiptoeingTeaBrewerCape,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TiptoeingTeaBrewerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteTiptoeing1 },
				{ cosmetic: Cosmetic.EmoteTiptoeing2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TiptoeingTeaBrewerHair,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TiptoeingTeaBrewerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TiptoeingTeaBrewerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteTiptoeing3,
					cost: { hearts: 3 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteTiptoeing4, cost: { hearts: 6 }, level: 4 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TiptoeingTeaBrewerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit,
					cost: { candles: 55 },
				},
			],
			[
				{
					cosmetic: Cosmetic.TiptoeingTeaBrewerCape,
					cost: { candles: 65 },
				},
			],
		],
	},
	visits: { returning: [10] },
});
