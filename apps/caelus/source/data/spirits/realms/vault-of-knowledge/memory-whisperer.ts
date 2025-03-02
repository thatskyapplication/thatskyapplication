import {
	Cosmetic,
	RealmName,
	SpiritCall,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const call = SpiritCall.CosmicManta;

export default new StandardSpirit({
	id: SpiritId.MemoryWhisperer,
	call,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCosmicManta },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MemoryWhispererOutfit,
				cost: { hearts: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MemoryWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MemoryWhispererHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.MemoryWhispererWingBuff1,
				cost: { ascendedCandles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MemoryWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.MemoryWhispererCape1,
				cost: { hearts: 50 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.MemoryWhispererWingBuff2,
				cost: { ascendedCandles: 12 },
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.MemoryWhispererCape2,
				cost: { hearts: 150 },
			},
		],
	},
});
