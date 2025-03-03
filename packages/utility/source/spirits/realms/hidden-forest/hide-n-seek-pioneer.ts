import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.HideAndSeek;

export default new StandardSpirit({
	id: SpiritId.HideNSeekPioneer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: emote, cosmetic: Cosmetic.EmoteHideAndSeek },
			{
				name: "Hair",
				cosmetic: Cosmetic.HideAndSeekPioneerHair,
				cost: { hearts: 2 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HideAndSeekPioneerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HideAndSeekPioneerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.HideAndSeekPioneerWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HideAndSeekPioneerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.HideAndSeekPioneerMask,
				cost: { hearts: 20 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.HideAndSeekPioneerWingBuff2,
				cost: { ascendedCandles: 6 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.HideAndSeekPioneerOutfit,
				cost: { hearts: 15 },
			},
		],
	},
});
