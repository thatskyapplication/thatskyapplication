import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Come;

export default new StandardSpirit({
	id: SpiritId.UsheringStargazer,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCome1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCome2,
				cost: { candles: 1 },
			},
			{ name: "Hair", cosmetic: Cosmetic.UsheringStargazerHair },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.UsheringStargazerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.UsheringStargazerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.UsheringStargazerWingBuff,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCome3,
				cost: { candles: 2 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCome4,
				cost: { candles: 2 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.UsheringStargazerOutfit,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.UsheringStargazerBlessing2,
				cost: { candles: 5 },
			},
		],
	},
});
