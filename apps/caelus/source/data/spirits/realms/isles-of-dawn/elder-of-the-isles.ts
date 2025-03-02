import { Cosmetic, ElderSpirit, RealmName, SpiritId } from "@thatskyapplication/utility";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheIsle,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheIsleHair,
				cost: { ascendedCandles: 4 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfTheIsleFaceAccessory,
				cost: { ascendedCandles: 125 },
			},
		],
	},
});
