import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Apologise;

export default new StandardSpirit({
	id: SpiritId.ApologeticLumberjack,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteApologise1 },
			{
				cosmetic: Cosmetic.EmoteApologise2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ApologeticLumberjackBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.ApologeticLumberjackHair,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.ApologeticLumberjackHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ApologeticLumberjackWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				cosmetic: Cosmetic.EmoteApologise3,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteApologise4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ApologeticLumberjackBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ApologeticLumberjackFaceAccessory,
				cost: { hearts: 5 },
			},
		],
	},
});
