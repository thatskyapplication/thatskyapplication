import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";

export default new ElderSpirit({
	id: SpiritId.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfThePrairieHair,
				cost: { ascendedCandles: 3 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfThePrairieFaceAccessory,
				cost: { ascendedCandles: 75 },
			},
		],
	},
});
