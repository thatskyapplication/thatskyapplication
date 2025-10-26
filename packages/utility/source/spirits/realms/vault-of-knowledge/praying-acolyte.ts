import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Pray;

export default new StandardSpirit({
	id: SpiritId.PrayingAcolyte,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmotePray1 },
				{
					cosmetic: Cosmetic.EmotePray2,
					cost: { candles: 3 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.PrayingAcolyteBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.PrayingAcolyteHair,
					cost: { hearts: 5 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.PrayingAcolyteHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.PrayingAcolyteWingBuff1,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmotePray3,
					cost: { candles: 5 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmotePray4,
					cost: { candles: 7 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.PrayingAcolyteBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PrayingAcolyteCape1,
					cost: { hearts: 25 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.PrayingAcolyteWingBuff2,
					cost: { ascendedCandles: 9 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PrayingAcolyteCape2,
					cost: { hearts: 75 },
				},
			],
		],
	},
});
