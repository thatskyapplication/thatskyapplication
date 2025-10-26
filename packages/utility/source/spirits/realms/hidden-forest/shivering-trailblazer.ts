import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shiver;

export default new StandardSpirit({
	id: SpiritId.ShiveringTrailblazer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteShiver1 },
				{
					cosmetic: Cosmetic.EmoteShiver2,
					cost: { candles: 2 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ShiveringTrailblazerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ShiveringTrailblazerOutfit,
					cost: { hearts: 2 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ShiveringTrailblazerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ShiveringTrailblazerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteShiver3,
					cost: { candles: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteShiver4,
					cost: { candles: 3 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ShiveringTrailblazerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ShiveringTrailblazerHair,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
