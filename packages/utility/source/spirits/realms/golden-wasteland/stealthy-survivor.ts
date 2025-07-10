import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

const stance = SpiritStance.Sneaky;

export default new StandardSpirit({
	id: SpiritId.StealthySurvivor,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ cosmetic: Cosmetic.StanceSneaky },
			{
				cosmetic: Cosmetic.StealthySurvivorHair,
				cost: { hearts: 5 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorHeart,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorWingBuff1,
				cost: { ascendedCandles: 4 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorCape1,
				cost: { hearts: 50 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorWingBuff2,
				cost: { ascendedCandles: 12 },
			},
			{
				cosmetic: Cosmetic.StealthySurvivorCape2,
				cost: { hearts: 150 },
			},
		],
	},
});
