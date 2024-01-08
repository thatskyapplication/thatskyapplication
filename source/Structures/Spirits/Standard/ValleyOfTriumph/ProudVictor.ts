/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, STANCES_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Stance, SpiritName, StandardSpirit } from "../../Base.js";

const stance = Stance.Proud;
const stanceEmoji = STANCES_EMOJIS.Proud;

export default new StandardSpirit({
	name: SpiritName.ProudVictor,
	stance,
	realm: Realm.ValleyOfTriumph,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null, emoji: stanceEmoji })
			.set(1 << 1, { item: "Cape 1", cost: { hearts: 10 }, emoji: CAPE_EMOJIS.Cape07 })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 }, emoji: MISCELLANEOUS_EMOJIS.Blessing1 })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff 1", cost: { ascendedCandles: 3 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: MISCELLANEOUS_EMOJIS.Blessing2 })
			.set(1 << 6, { item: "Mask", cost: { hearts: 30 }, emoji: MASK_EMOJIS.Mask04 })
			.set(1 << 7, { item: "Wing buff 2", cost: { ascendedCandles: 9 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 8, { item: "Cape 2", cost: { hearts: 30 }, emoji: CAPE_EMOJIS.Cape40 }),
	},
});
