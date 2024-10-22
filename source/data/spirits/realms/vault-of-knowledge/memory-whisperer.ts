import { StandardSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../utility/spirits.js";

const call = SpiritCall.CosmicManta;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.MemoryWhisperer,
	call,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallCosmicManta, emoji: callEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MemoryWhispererOutfit,
				cost: { hearts: 3 },
				emoji: OUTFIT_EMOJIS.Outfit09,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MemoryWhispererBlessing1,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.MemoryWhispererHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.MemoryWhispererWingBuff1,
				cost: { ascendedCandles: 4 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.MemoryWhispererBlessing2,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{
				name: "Cape 1",
				cosmetic: Cosmetic.MemoryWhispererCape1,
				cost: { hearts: 50 },
				emoji: CAPE_EMOJIS.Cape12,
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.MemoryWhispererWingBuff2,
				cost: { ascendedCandles: 12 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Cape 2",
				cosmetic: Cosmetic.MemoryWhispererCape2,
				cost: { hearts: 150 },
				emoji: CAPE_EMOJIS.Cape77,
			},
		],
	},
});
