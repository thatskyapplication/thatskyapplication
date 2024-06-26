import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.CosmicManta;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.MemoryWhisperer,
	call,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Outfit", bit: 1 << 1, cost: { hearts: 3 }, emoji: OUTFIT_EMOJIS.Outfit09 },
			{
				name: "Blessing 1",
				bit: 1 << 2,
				cost: { candles: 1 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing1,
			},
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff 1",
				bit: 1 << 4,
				cost: { ascendedCandles: 4 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				bit: 1 << 5,
				cost: { candles: 5 },
				emoji: MISCELLANEOUS_EMOJIS.Blessing2,
			},
			{ name: "Cape 1", bit: 1 << 6, cost: { hearts: 50 }, emoji: CAPE_EMOJIS.Cape12 },
			{
				name: "Wing buff 2",
				bit: 1 << 7,
				cost: { ascendedCandles: 12 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Cape 2", bit: 1 << 8, cost: { hearts: 150 }, emoji: CAPE_EMOJIS.Cape77 },
		],
	},
});
