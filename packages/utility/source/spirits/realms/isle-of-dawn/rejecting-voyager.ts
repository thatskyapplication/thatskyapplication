import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.NoThanks;

export default new StandardSpirit({
	id: SpiritId.RejectingVoyager,
	emote,
	realm: RealmName.IsleOfDawn,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteNoThanks1 },
				{
					cosmetic: Cosmetic.EmoteNoThanks2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RejectingVoyagerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RejectingVoyagerHair,
					cost: { hearts: 1 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.RejectingVoyagerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.RejectingVoyagerWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteNoThanks3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteNoThanks4,
					cost: { candles: 2 },
					level: 4,
				},
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.RejectingVoyagerFaceAccessory,
					cost: { hearts: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RejectingVoyagerBlessing2,
					cost: { candles: 5 },
				},
			],
		],
	},
});
