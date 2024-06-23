import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Polite;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.PoliteScholar,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Outfit", bit: 1 << 1, cost: { hearts: 2 }, emoji: OUTFIT_EMOJIS.Outfit08 },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 },
			{ name: "Hair", bit: 1 << 6, cost: { hearts: 15 }, emoji: HAIR_EMOJIS.Hair28 },
		],
	},
});
