import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

const call = SpiritCall.CosmicManta;

export default new StandardSpirit({
	id: SpiritId.MemoryWhisperer,
	call,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ cosmetic: Cosmetic.CallCosmicManta },
			{
				cosmetic: Cosmetic.MemoryWhispererOutfit,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.MemoryWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				cosmetic: Cosmetic.MemoryWhispererHeart,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
				cosmetic: Cosmetic.MemoryWhispererWingBuff1,
				cost: { ascendedCandles: 4 },
			},
			{
				cosmetic: Cosmetic.MemoryWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.MemoryWhispererCape1,
				cost: { hearts: 50 },
			},
			{
				translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
				cosmetic: Cosmetic.MemoryWhispererWingBuff2,
				cost: { ascendedCandles: 12 },
			},
			{
				cosmetic: Cosmetic.MemoryWhispererCape2,
				cost: { hearts: 150 },
			},
		],
	},
});
