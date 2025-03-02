import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";

export default new SeasonalSpirit({
	id: SpiritId.CompassionateCellist,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Shared memory spell",
				cosmetic: Cosmetic.CompassionateCellistSharedMemorySpell,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.CompassionateCellistFaceAccessory,
				cost: { candles: 85 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CompassionateCellistHeart,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.CompassionateCellistProp,
				cost: { candles: 200 },
			},
		],
	},
});
