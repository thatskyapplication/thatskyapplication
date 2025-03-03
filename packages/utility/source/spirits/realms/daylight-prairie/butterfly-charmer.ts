import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../index.js";

const emote = SpiritEmote.Butterfly;

export default new StandardSpirit({
	id: SpiritId.ButterflyCharmer,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteButterfly1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteButterfly2,
				cost: { candles: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ButterflyCharmerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.ButterflyCharmerCape1,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ButterflyCharmerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.ButterflyCharmerWingBuff1,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteButterfly3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteButterfly4,
				cost: { candles: 2 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ButterflyCharmerOutfit,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ButterflyCharmerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.ButterflyCharmerWingBuff2,
				cost: { ascendedCandles: 3 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.ButterflyCharmerCape2,
				cost: { hearts: 9 },
			},
		],
	},
});
