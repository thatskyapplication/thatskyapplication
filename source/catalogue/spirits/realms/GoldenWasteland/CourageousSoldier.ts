import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../Utility/spirits.js";

const stance = SpiritStance.Courageous;
const stanceEmoji = SpiritStanceToEmoji[stance];

export default new StandardSpirit({
	name: SpiritName.CourageousSoldier,
	stance,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${stance} stance`, bit: 1 << 0, emoji: stanceEmoji },
			{ name: "Hair", bit: 1 << 1, cost: { hearts: 4 }, emoji: HAIR_EMOJIS.Hair23 },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff 1", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 },
			{ name: "Cape 1", bit: 1 << 6, cost: { hearts: 15 }, emoji: CAPE_EMOJIS.Cape09 },
			{ name: "Wing buff 2", bit: 1 << 7, cost: { ascendedCandles: 6 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Cape 2", bit: 1 << 8, cost: { hearts: 45 }, emoji: CAPE_EMOJIS.Cape47 },
		],
	},
});
