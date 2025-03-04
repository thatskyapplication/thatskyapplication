import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLookAround1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteLookAround2,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LookoutScoutBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Horn",
				cosmetic: Cosmetic.LookoutScoutHorn,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LookoutScoutHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LookoutScoutWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteLookAround3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteLookAround4,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LookoutScoutBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.LookoutScoutFaceAccessory,
				cost: { hearts: 10 },
			},
		],
	},
});
