import { StandardSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritCallToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const call = SpiritCall.Bird;
const callEmoji = SpiritCallToEmoji[call];

export default new StandardSpirit({
	name: SpiritName.BirdWhisperer,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${call} call`, bit: 1 << 0, emoji: callEmoji },
			{ name: "Music sheet", bit: 1 << 1, cost: { hearts: 1 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 },
			{ name: "Hair", bit: 1 << 6, cost: { hearts: 5 }, emoji: HAIR_EMOJIS.Hair09 },
		],
	},
});
