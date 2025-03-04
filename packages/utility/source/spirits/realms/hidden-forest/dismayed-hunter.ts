import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shocked;

export default new StandardSpirit({
	id: SpiritId.DismayedHunter,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.Shocked1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.Shocked2, cost: { candles: 3 } },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DismayedHunterBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DismayedHunterHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DismayedHunterHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.DismayedHunterWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.Shocked3, cost: { candles: 5 } },
			{ name: `${emote} 4`, cosmetic: Cosmetic.Shocked4, cost: { candles: 5 } },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DismayedHunterBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.DismayedHunterCape1,
				cost: { hearts: 30 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.DismayedHunterWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.DismayedHunterCape2,
				cost: { hearts: 90 },
			},
		],
	},
});
