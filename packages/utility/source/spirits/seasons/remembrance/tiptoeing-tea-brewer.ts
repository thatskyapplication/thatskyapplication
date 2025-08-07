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
		hasInfographic: false,
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
				{ cosmetic: Cosmetic.TiptoeingTeaBrewerHair, seasonPass: true },
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
				{ cosmetic: Cosmetic.TiptoeingTeaBrewerOutfit, seasonPass: true },
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
	},
	visits: { returning: [10] },
});
