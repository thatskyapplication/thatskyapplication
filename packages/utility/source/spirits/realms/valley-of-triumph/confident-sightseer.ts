import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../index.js";

const stance = SpiritStance.Confident;

export default new StandardSpirit({
	id: SpiritId.ConfidentSightseer,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceConfident },
			{
				name: "Hair",
				cosmetic: Cosmetic.ConfidentSightseerHair,
				cost: { hearts: 2 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ConfidentSightseerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ConfidentSightseerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ConfidentSightseerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ConfidentSightseerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ConfidentSightseerOutfit,
				cost: { hearts: 5 },
			},
		],
	},
});
