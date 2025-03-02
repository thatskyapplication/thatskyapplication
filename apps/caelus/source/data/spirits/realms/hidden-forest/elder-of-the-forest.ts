import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheForestHair,
				cost: { ascendedCandles: 6 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfTheForestFaceAccessory,
				cost: { ascendedCandles: 250 },
			},
		],
	},
});
