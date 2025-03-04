import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Proud;

export default new StandardSpirit({
	id: SpiritId.ProudVictor,
	stance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceProud },
			{
				name: "Cape 1",
				cosmetic: Cosmetic.ProudVictorCape1,
				cost: { hearts: 10 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ProudVictorBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ProudVictorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.ProudVictorWingBuff1,
				cost: { ascendedCandles: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ProudVictorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ProudVictorMask,
				cost: { hearts: 30 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.ProudVictorWingBuff2,
				cost: { ascendedCandles: 9 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.ProudVictorCape2,
				cost: { hearts: 30 },
			},
		],
	},
});
