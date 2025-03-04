import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.NoThanks;

export default new StandardSpirit({
	id: SpiritId.RejectingVoyager,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNoThanks1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteNoThanks2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.RejectingVoyagerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RejectingVoyagerHair,
				cost: { hearts: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.RejectingVoyagerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.RejectingVoyagerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNoThanks3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNoThanks4,
				cost: { candles: 2 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.RejectingVoyagerFaceAccessory,
				cost: { hearts: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.RejectingVoyagerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
