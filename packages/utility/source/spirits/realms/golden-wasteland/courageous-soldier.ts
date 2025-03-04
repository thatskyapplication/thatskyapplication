import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Courageous;

export default new StandardSpirit({
	id: SpiritId.CourageousSoldier,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceCourageous },
			{
				name: "Hair",
				cosmetic: Cosmetic.CourageousSoldierHair,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CourageousSoldierBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CourageousSoldierHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.CourageousSoldierWingBuff1,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CourageousSoldierBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.CourageousSoldierCape1,
				cost: { hearts: 15 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.CourageousSoldierWingBuff2,
				cost: { ascendedCandles: 6 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.CourageousSoldierCape2,
				cost: { hearts: 45 },
			},
		],
	},
});
