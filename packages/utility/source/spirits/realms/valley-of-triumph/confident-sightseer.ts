import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Confident;

export default new StandardSpirit({
	id: SpiritId.ConfidentSightseer,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ cosmetic: Cosmetic.StanceConfident },
			{
				cosmetic: Cosmetic.ConfidentSightseerHair,
				cost: { hearts: 2 },
			},
			{
				cosmetic: Cosmetic.ConfidentSightseerBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.ConfidentSightseerHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.ConfidentSightseerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.ConfidentSightseerBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ConfidentSightseerOutfit,
				cost: { hearts: 5 },
			},
		],
	},
});
