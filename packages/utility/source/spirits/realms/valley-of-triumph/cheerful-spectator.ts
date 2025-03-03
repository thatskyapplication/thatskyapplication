import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.Cheer;

export default new StandardSpirit({
	id: SpiritId.CheerfulSpectator,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCheer1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCheer2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CheerfulSpectatorBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CheerfulSpectatorHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CheerfulSpectatorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CheerfulSpectatorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCheer3,
				cost: { candles: 4 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCheer4,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CheerfulSpectatorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Piano",
				cosmetic: Cosmetic.CheerfulSpectatorPiano,
				cost: { hearts: 10 },
			},
		],
	},
});
