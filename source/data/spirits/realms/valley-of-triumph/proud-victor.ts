import { StandardSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Proud;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.ProudVictor,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceProud, emoji: stanceEmoji },
			{
				name: "Cape 1",
				cosmetic: Cosmetic.ProudVictorCape1,
				cost: { hearts: 10 },
				emoji: CAPE_EMOJIS.Cape07,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProudVictorBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProudVictorHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.ProudVictorWingBuff1,
				cost: { ascendedCandles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProudVictorBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProudVictorMask,
				cost: { hearts: 30 },
				emoji: MASK_EMOJIS.Mask04,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.ProudVictorWingBuff2,
				cost: { ascendedCandles: 9 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.ProudVictorCape2,
				cost: { hearts: 30 },
				emoji: CAPE_EMOJIS.Cape40,
			},
		],
	},
});
