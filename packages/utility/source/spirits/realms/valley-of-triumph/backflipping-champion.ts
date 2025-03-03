import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.Backflip;

export default new StandardSpirit({
	id: SpiritId.BackflippingChampion,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBackflip1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBackflip2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BackflippingChampionBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BackflippingChampionHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BackflippingChampionHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BackflippingChampionWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBackflip3,
				cost: { candles: 4 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBackflip4,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BackflippingChampionBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.BackflippingChampionFaceAccessory,
				cost: { hearts: 5 },
			},
		],
	},
});
