/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CALL_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritCall, SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, StandardSpirit } from "../../Base.js";

const call = SpiritCall.Manta;
const callEmoji = CALL_EMOJIS.Manta;

export default new StandardSpirit({
	name: SpiritName.MantaWhisperer,
	call,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { item: "Wing buff", cost: { ascendedCandles: 1 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 5, { item: "Music sheet", cost: { hearts: 3 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet }),
	},
});
