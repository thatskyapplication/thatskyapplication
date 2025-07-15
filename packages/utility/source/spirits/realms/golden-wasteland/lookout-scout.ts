import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.LookAround;

export default new StandardSpirit({
	id: SpiritId.LookoutScout,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ cosmetic: Cosmetic.EmoteLookAround1 },
			{
				cosmetic: Cosmetic.EmoteLookAround2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LookoutScoutBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.LookoutScoutHorn,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.LookoutScoutHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.LookoutScoutWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteLookAround3,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.EmoteLookAround4,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LookoutScoutBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.LookoutScoutFaceAccessory,
				cost: { hearts: 10 },
			},
		],
	},
});
