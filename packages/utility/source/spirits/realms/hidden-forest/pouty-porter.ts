import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Angry;

export default new StandardSpirit({
	id: SpiritId.PoutyPorter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteAngry1 },
				{
					cosmetic: Cosmetic.EmoteAngry2,
					cost: { candles: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PoutyPorterBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PoutyPorterHair,
					cost: { hearts: 3 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PoutyPorterHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.PoutyPorterWingBuff1,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteAngry3,
					cost: { candles: 4 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteAngry4,
					cost: { candles: 4 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PoutyPorterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PoutyPorterCape1,
					cost: { hearts: 20 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.PoutyPorterWingBuff2,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PoutyPorterCape2,
					cost: { hearts: 60 },
				},
			],
		],
	},
});
