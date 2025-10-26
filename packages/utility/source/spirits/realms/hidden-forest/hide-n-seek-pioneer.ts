import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HideAndSeek;

export default new StandardSpirit({
	id: SpiritId.HideNSeekPioneer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteHideAndSeek },
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.HideAndSeekPioneerHair,
					cost: { hearts: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.HideAndSeekPioneerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.HideAndSeekPioneerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.HideAndSeekPioneerWingBuff1,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.HideAndSeekPioneerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.HideAndSeekPioneerMask,
					cost: { hearts: 20 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.HideAndSeekPioneerWingBuff2,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.HideAndSeekPioneerOutfit,
					cost: { hearts: 15 },
				},
			],
		],
	},
});
