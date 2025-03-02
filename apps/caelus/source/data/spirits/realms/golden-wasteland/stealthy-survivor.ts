import {
	Cosmetic,
	RealmName,
	SpiritId,
	SpiritStance,
	StandardSpirit,
} from "@thatskyapplication/utility";

const stance = SpiritStance.Sneaky;

export default new StandardSpirit({
	id: SpiritId.StealthySurvivor,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSneaky },
			{
				name: "Hair",
				cosmetic: Cosmetic.StealthySurvivorHair,
				cost: { hearts: 5 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StealthySurvivorBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.StealthySurvivorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.StealthySurvivorWingBuff1,
				cost: { ascendedCandles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StealthySurvivorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.StealthySurvivorCape1,
				cost: { hearts: 50 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.StealthySurvivorWingBuff2,
				cost: { ascendedCandles: 12 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.StealthySurvivorCape2,
				cost: { hearts: 150 },
			},
		],
	},
});
