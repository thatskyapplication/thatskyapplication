import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Backflip;

export default new StandardSpirit({
	id: SpiritId.BackflippingChampion,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBackflip1 },
				{
					cosmetic: Cosmetic.EmoteBackflip2,
					cost: { candles: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.BackflippingChampionBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.BackflippingChampionHair,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.BackflippingChampionHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.BackflippingChampionWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBackflip3,
					cost: { candles: 4 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBackflip4,
					cost: { candles: 4 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.BackflippingChampionBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.BackflippingChampionFaceAccessory,
					cost: { hearts: 5 },
				},
			],
		],
	},
});
