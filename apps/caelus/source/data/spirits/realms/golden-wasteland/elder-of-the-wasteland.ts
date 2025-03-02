import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheWastelandHair,
				cost: { ascendedCandles: 6 },
			},
		],
	},
});
